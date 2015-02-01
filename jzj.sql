use jzj;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cashout`(in inPoints int(11), in inAmount int(11), 
		in inFee int, in inTypeId int, in inUserBankId int, in inComment varchar(500), in inUserId int, out outSuccess int)
BEGIN

DECLARE bal_cash, bal_points, bal_frozen int default 0;
DECLARE code varchar(20);
DECLARE msg TEXT;

DECLARE cur_transact CURSOR FOR 
	select cash_balance, points_balance, frozen_balance from t_transaction 
    where user_id = inUserId order by created_at desc limit 1;
DECLARE CONTINUE HANDLER FOR SQLSTATE '02000'set bal_cash = 0; 


DECLARE exit handler for sqlexception
  BEGIN
    -- ERROR
	select -1 as outSuccess;
	ROLLBACK;
 	GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
	call sp_write_log(code, msg);

END;

DECLARE exit handler for sqlwarning
 BEGIN
    -- WARNING
	select -2 as outSuccess;

	ROLLBACK;
	GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
	call sp_write_log(code, msg);
END;


START TRANSACTION;
SET bal_cash=0;
SET bal_points=0;
SET bal_frozen=0;

Insert into t_cashout (amount, points, fee, cashout_type_id, user_bank_id, comment, user_id, created_at) 
			values (inAmount, inPoints, inFee, inTypeId, inUserBankId, inComment, inUserId, now());

        
         /*add record to transaction table*/ 
        open cur_transact;
		FETCH cur_transact INTO bal_cash, bal_points, bal_frozen;  
		close cur_transact;  
        set bal_cash = bal_cash - inAmount;
        insert into t_transaction (cash_in, cash_out, points_in, points_out, cash_balance, points_balance, frozen_balance, 
				type_id, comment, user_id, created_at)
        values (null, inAmount, null, null, bal_cash, bal_points, bal_frozen, inTypeId, inComment, inUserId, now());
        /* end of adding transaction record */
       
        if (inFee > 0) then
           /*add record to transaction table*/ 
			open cur_transact;
			FETCH cur_transact INTO bal_cash, bal_points, bal_frozen;  
			close cur_transact;  
			set bal_cash = bal_cash - inFee;

			insert into t_transaction (cash_in, cash_out, points_in, points_out, cash_balance, points_balance, frozen_balance, 
					 comment, user_id, created_at)
			values (null, inFee, null, null, bal_cash, bal_points, bal_frozen, CONCAT(inComment, '费用'), inUserId, now());
			/* end of adding transaction record */
        end if;

		/* update user balance */
		IF ( SELECT EXISTS (
			SELECT 1
			FROM t_user_balance
			WHERE user_id = inUserId) ) THEN 
			update t_user_balance set points = bal_points,
								  cash = bal_cash,
                                  cash_frozen = bal_frozen,
                                  updated_at = now()
			where user_id = inUserId;
		ELSE
			insert into t_user_balance (points, cash, cash_frozen, user_id, created_at) 
					values (bal_points, bal_cash, bal_frozen, inUserId, now());
		END IF;
		/*  end of update user balance */

    COMMIT;
	select true as outSuccess;

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_points2cash`(in inPoints int(11), in inAmount int(11), 
		in inFee int, in inComment varchar(500), in inUserId int, out outSuccess int)
BEGIN
DECLARE bal_cash, bal_points, bal_frozen int default 0;
DECLARE code varchar(20);
DECLARE msg TEXT;

DECLARE cur_transact CURSOR FOR 
	select cash_balance, points_balance, frozen_balance from t_transaction 
    where user_id = inUserId order by created_at desc limit 1;
DECLARE CONTINUE HANDLER FOR SQLSTATE '02000'set bal_cash = 0; 


DECLARE exit handler for sqlexception
BEGIN
    -- ERROR
  select -1 as outSuccess;
  ROLLBACK;
  GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
  call sp_write_log(code, msg);
END;

DECLARE exit handler for sqlwarning
BEGIN
    -- WARNING
	select -2 as outSuccess;
	ROLLBACK;
	GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
	call sp_write_log(code, msg);
END;

START TRANSACTION;
Insert into t_points2cash (amount, points, fee, user_id, created_at) 
			values (inAmount, inPoints, inFee, inUserId, now());

        
		/*add record to transaction table*/ 
        open cur_transact;
		FETCH cur_transact INTO bal_cash, bal_points, bal_frozen;  
		close cur_transact;  
        set bal_cash = bal_cash + inAmount;
		set bal_points = bal_points - inPoints;

        insert into t_transaction (cash_in, cash_out, points_in, points_out, cash_balance, points_balance, frozen_balance, 
				 comment, user_id, created_at)
        values (inAmount, null, null, inPoints, bal_cash, bal_points, bal_frozen, inComment, inUserId, now());
        /* end of adding transaction record */
        
        if (inFee > 0) then
           /*add record to transaction table*/ 
			open cur_transact;
			FETCH cur_transact INTO bal_cash, bal_points, bal_frozen;  
			close cur_transact;  
			set bal_cash = bal_cash - inFee;

			insert into t_transaction (cash_in, cash_out, points_in, points_out, cash_balance, points_balance, frozen_balance, 
					 comment, user_id, created_at)
			values (null, inFee, null, null, bal_cash, bal_points, bal_frozen, CONCAT(inComment, '费用'), inUserId, now());
			/* end of adding transaction record */
        end if;
        
        /* update user user balance */
		IF ( SELECT EXISTS (
			SELECT 1
			FROM t_user_balance
			WHERE user_id = inUserId) ) THEN 
			update t_user_balance set points = bal_points,
								  cash = bal_cash,
                                  cash_frozen = bal_frozen,
                                  updated_at = now()
					where user_id = inUserId;
		END IF;
        /* end of update user user balance */

	COMMIT;
	select true as outSuccess;

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_recharge`(in inPoints int(11), in inAmount int(11), 
		in inTypeId int, in inBankType varchar(255), in inComment varchar(500), in inUserId int, in isFrozen boolean, out outSuccess int)
BEGIN
DECLARE bal_cash, bal_points, bal_frozen int default 0;

DECLARE code varchar(20);
DECLARE msg TEXT;
  
DECLARE cur_transact CURSOR FOR 
	select cash_balance, points_balance, frozen_balance from t_transaction 
    where user_id = inUserId order by created_at desc limit 1;
DECLARE CONTINUE HANDLER FOR SQLSTATE '02000'set bal_cash = 0; 

DECLARE exit handler for sqlexception
BEGIN
    -- ERROR
	select -1 as outSuccess;
    ROLLBACK;
   
	GET DIAGNOSTICS CONDITION 1
        code = RETURNED_SQLSTATE, msg = MESSAGE_TEXT;
	call sp_write_log(code, msg);
END;

DECLARE exit handler for sqlwarning
 BEGIN
    -- WARNING
	select -2 as outSuccess;

 ROLLBACK;
END;

START TRANSACTION;


	Insert into t_recharge (amount, points, recharge_type_id, bank_type, comment, user_id, created_at) 
			values (inAmount, inPoints, inTypeId, inBankType, inComment, inUserId, now());
		
        /* get current balance and calculate new balance */
        open cur_transact;
		FETCH cur_transact INTO bal_cash, bal_points, bal_frozen;

        if (inPoints = 0) then
			if (isFrozen) then
                set bal_frozen = bal_frozen + inAmount;
			else
				set bal_cash = bal_cash + inAmount;
			end if;
        else
			set bal_points = bal_points + inPoints;
        end if;

		close cur_transact;  
		/* end of balance calculation  */

        /* adding to t_user_balance table */
		IF ( SELECT EXISTS (
			SELECT 1
			FROM t_user_balance
			WHERE user_id = inUserId) ) THEN 
            
			update t_user_balance set points = bal_points,
								  cash = bal_cash,
                                  cash_frozen = bal_frozen,
                                  updated_at = now()
					where user_id = inUserId;
		ELSE
			insert into t_user_balance (points, cash, cash_frozen, user_id, created_at) 
					values (bal_points, bal_cash, bal_frozen, inUserId, now());
		END IF;		
		/* end of adding to t_user_balance table */

         /*add record to transaction table*/  
        insert into t_transaction (cash_in, cash_out, points_in, points_out, cash_balance, points_balance, frozen_balance, 
				type_id, comment, user_id, created_at)
        values (inAmount, null, null, null, bal_cash, bal_points, bal_frozen, inTypeId, inComment, inUserId, now());
        /* end of adding transaction record */
        
COMMIT;
	select true as outSuccess;

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_write_log`(in inCode varchar(20), in inMsg varchar(2000))
BEGIN
	insert into t_log (code, msg) values (inCode, inMsg);
END$$
DELIMITER ;
CREATE ALGORITHM=UNDEFINED DEFINER=`juzhuanjie`@`%` SQL SECURITY DEFINER VIEW `v_shop_task` AS select `t_shop_task`.`shop_id` AS `shop_id`,`t_shop_task`.`commission` AS `commission`,`t_shop_task`.`bonus` AS `bonus`,`t_shop_task`.`terminal` AS `terminal`,`t_shop_task`.`status` AS `status`,`t_shop_task`.`comment` AS `comment`,`t_shop_task`.`task_id` AS `task_id`,`t_shop_task`.`product_id` AS `product_id`,`t_shop_product`.`product_price` AS `shop_product_price`,`t_shop_product`.`product_ext_id` AS `product_ext_id`,`t_shop_product`.`product_name` AS `product_name`,`t_shop_product`.`product_desc` AS `product_desc`,`t_shop_product`.`product_image` AS `product_image`,`t_shop_product`.`status_id` AS `status_id`,`t_shop_task`.`total_tasks` AS `total_tasks`,`t_shop_task`.`task_type_id` AS `task_type_id`,`t_shop_task`.`pay_by_id` AS `pay_by_id`,`t_shop_task`.`approval_priority` AS `approval_priority`,`t_shop_task`.`task_priority` AS `task_priority`,`t_shop_task`.`include_shipping` AS `include_shipping`,`t_shop_task`.`product_price` AS `task_product_price`,`t_seller_shop`.`platform_id` AS `platform_id`,`t_seller_shop`.`user_id` AS `user_id`,count(`t_task_buyer`.`task_id`) AS `assigned` from (((`t_shop_task` join `t_shop_product` on((`t_shop_task`.`product_id` = `t_shop_product`.`product_id`))) join `t_seller_shop` on((`t_seller_shop`.`shop_id` = `t_shop_task`.`shop_id`))) left join `t_task_buyer` on((`t_task_buyer`.`task_id` = `t_shop_task`.`task_id`))) group by `t_task_buyer`.`task_id`;
