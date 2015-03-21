/**
 * Created by mcheng on 2/6/15.
 */

var moment = require('moment');


function md5params (msg) {
  var crypto = require('crypto');
  var md5sum = crypto.createHash('md5');

  console.log(msg);
  md5sum.update(msg);
  var result = md5sum.digest('hex').toUpperCase();
  console.log(result);
  return result;
}


module.exports = {

  send: function (req, res) {
    // get user ID of the current logged in user
    var userId = 0;
    if (req.userData && req.userData.userId) userId = req.userData.userId;
    var tokenIn = req.param('token');

    AccessToken.findOne({token:tokenIn}).exec(function (err, userData) {
      if (err) return res.customError('508', sails.config.errs.systemError('硬盘数据出错'));
      if (userData) {
        req.userData = userData;
        AccessToken.update({token:tokenIn},{updatedAt:new Date()}).exec(function cb (err, updated){
          if (err) sails.log.error(err);
          console.log('IsLoggedIn.js token:' + tokenIn + updated[0].updatedAt);
        });

        var orderAmount = parseFloat(req.param('orderAmount'));
        var productId = parseInt(req.param('productId'));
        var points = parseInt(req.param('points'));
        var userId = userData.userId;
        var ext1 = userId + '-' + productId + '-' + points;

        if (isNaN(productId) || (productId != 3 && productId != 4)
          || isNaN(orderAmount) || isNaN(points)) {
          return res.customError('508', "参数错误！");
        }
        orderAmount = orderAmount * 100;

        var dateStr =   moment().format('YYYYMMDDHHmmss');
        var bill99 = {
          merchantAcctId:'1002421178901',
          key:"ZRF336TLNR62AXJH",
          inputCharset:"3",
          pageUrl:"http://119.29.22.94:1337/bill/rec",
          bgUrl:"http://119.29.22.94:1337/bill/rec",
          version:"v2.0",
          language:"1",
          signMsg:"",
          signType:"1",
          payerName:userId,
          payerContactType:"1",
          payerContact:"mchengcat@hotmail.com",
          orderId:dateStr,
          orderAmount:orderAmount,
          orderTime:dateStr,
          productName:"productName",
          productNum:productId,
          productId:"55558888",
          productDesc:"test",
          ext1:ext1,
          ext2:"ext2",
          payType:"00",
// following is for bank direct payment, payType : 10
          bankId:"",
//whether to allow repeat submission, 0 for real product, 1 for virtual
          redoFlag:"0",
          pid:""
        }

        var signMsgVal = "inputCharset=" + bill99.inputCharset;
        signMsgVal=signMsgVal + "&" + "pageUrl=" + bill99.pageUrl;
        signMsgVal=signMsgVal + "&" + "bgUrl=" + bill99.bgUrl;
        signMsgVal=signMsgVal + "&" + "version=" + bill99.version;
        signMsgVal=signMsgVal + "&" + "language=" + bill99.language;
        signMsgVal=signMsgVal + "&" + "signType=" + bill99.signType
        signMsgVal=signMsgVal + "&" + "merchantAcctId=" + bill99.merchantAcctId;
        signMsgVal=signMsgVal + "&" + "payerName=" + bill99.payerName;
        signMsgVal=signMsgVal + "&" + "payerContactType=" + bill99.payerContactType;
        signMsgVal=signMsgVal + "&" + "payerContact=" + bill99.payerContact;
        signMsgVal=signMsgVal + "&" + "orderId=" + bill99.orderId;
        signMsgVal=signMsgVal + "&" + "orderAmount=" + bill99.orderAmount;
        signMsgVal=signMsgVal + "&" + "orderTime=" + bill99.orderTime;
        signMsgVal=signMsgVal + "&" + "productName=" + bill99.productName;
        signMsgVal=signMsgVal + "&" + "productNum=" + bill99.productNum;
        signMsgVal=signMsgVal + "&" + "productId=" + bill99.productId;
        signMsgVal=signMsgVal + "&" + "productDesc=" + bill99.productDesc;
        signMsgVal=signMsgVal + "&" + "ext1=" + bill99.ext1;
        signMsgVal=signMsgVal + "&" + "ext2=" + bill99.ext2;
        signMsgVal=signMsgVal + "&" + "payType=" + bill99.payType;
        if(bill99.bankId) signMsgVal=signMsgVal + "&" + "bankId=" + bill99.bankId;
        signMsgVal=signMsgVal + "&" + "redoFlag=" + bill99.redoFlag;
        if(bill99.pid) signMsgVal=signMsgVal + "&" + "pid=" + bill99.pid;
        signMsgVal=signMsgVal + "&" + "key=" + bill99.key;

        bill99.signMsg = md5params(signMsgVal);
//    bill99.signMsgVal = signMsgVal;

        console.log(signMsgVal);
        console.log(bill99.signMsg);
        req.bill99 = bill99;
        res.view();

      } else {
        return res.customError('403', sails.config.errs.access_notloggedin);
      }
    });

  },

  rec: function (req, res) {


    var rtnUrl = 'http://119.29.22.94:1337/bill/result';

    var merchantAcctId = req.param('merchantAcctId');
    var version = req.param('version');
    var language = req.param('language');
    var signType = req.param('signType');
    var payType = req.param('payType');
    var bankId = req.param('bankId');
    var orderId = req.param('orderId');
    var orderTime = req.param('orderTime');
    var orderAmount = req.param('orderAmount');
    var dealId = req.param('dealId');
    var bankDealId = req.param('bankDealId');
    var dealTime = req.param('dealTime');
    var payAmount = req.param('payAmount');
    var fee = req.param('fee');
    var ext1 = req.param('ext1');
    var ext2 = req.param('ext2');
    var payResult = req.param('payResult');
    var errCode = req.param('errCode');
    var signMsg = req.param('signMsg');
    var key = "ZRF336TLNR62AXJH";

    var crypto = require('crypto');
    var md5sum = crypto.createHash('md5');

    var merchantSignMsgVal= "merchantAcctId=" + merchantAcctId.trim();
    if (version) merchantSignMsgVal= merchantSignMsgVal + '&' + "version=" + version.trim();
    if (language) merchantSignMsgVal= merchantSignMsgVal + '&' + "language=" + language.trim();
    if (signType) merchantSignMsgVal= merchantSignMsgVal + '&' + "signType=" + signType.trim();
    if (payType) merchantSignMsgVal= merchantSignMsgVal + '&' + "payType=" + payType.trim();
    if (bankId) merchantSignMsgVal= merchantSignMsgVal + '&' + "bankId=" + bankId.trim();
    if (orderId) merchantSignMsgVal= merchantSignMsgVal + '&' + "orderId=" + orderId.trim();
    if (orderTime) merchantSignMsgVal= merchantSignMsgVal + '&' + "orderTime=" + orderTime.trim();
    if (orderAmount) merchantSignMsgVal= merchantSignMsgVal + '&' + "orderAmount=" + orderAmount.trim();
    if (dealId) merchantSignMsgVal= merchantSignMsgVal + '&' + "dealId=" + dealId.trim();
    if (bankDealId) merchantSignMsgVal= merchantSignMsgVal + '&' + "bankDealId=" + bankDealId.trim();
    if (dealTime) merchantSignMsgVal= merchantSignMsgVal + '&' + "dealTime=" + dealTime.trim();
    if (payAmount) merchantSignMsgVal= merchantSignMsgVal + '&' + "payAmount=" + payAmount.trim();
    if (fee) merchantSignMsgVal= merchantSignMsgVal + '&' + "fee=" + fee.trim();
    if (ext1) merchantSignMsgVal= merchantSignMsgVal + '&' + "ext1=" + ext1.trim();
    if (ext2) merchantSignMsgVal= merchantSignMsgVal + '&' + "ext2=" + ext2.trim();
    if (payResult) merchantSignMsgVal= merchantSignMsgVal + '&' + "payResult=" + payResult.trim();
    if (errCode) merchantSignMsgVal= merchantSignMsgVal + '&' + "errCode=" + errCode.trim();
    if (key) merchantSignMsgVal= merchantSignMsgVal + '&' + "key=" + key.trim();


    var merchantSignMsg = md5params(merchantSignMsgVal);

    var rtnOk=0;
    var rtnUrl="http://119.29.22.94:1337/bill/result";

    console.log('in - ', merchantSignMsg.toUpperCase());
    console.log('out - ', signMsg);

    if (signMsg == merchantSignMsg.toUpperCase()) {
        if (payResult == 10){
          rtnOk=1;
          rtnUrl= rtnUrl + "?msg=success!";
          // update balance

          var bankType = "快钱";
          var arrExt1 = ext1.split('-');

          recharge (arrExt1[2], payAmount, arrExt1[1], bankType, arrExt1[0], function () {
            // Error handling
            if (err) {
              console.log(err);
              res.customError('508', "失败！");
            } else {
              if (data[0][0].outSuccess == 1) {
                console.log(data);
                res.ok("成功！");
              } else {
                res.customError('508', "失败！");
              }
            }
          });
      }
    }

    req.result ='<result>' + rtnOk + '</result><redirecturl>' + rtnUrl + '</redirecturl>';
    res.view();
  },

  result: function (req, res) {
    res.view();
  }


};

function recharge (points, amount, type, bankType, userId, cb) {

  if (type == 3) {
      var comment = "充值押金";
      var isFronzen = true;
  } else {
    var comment = "充值赚点";
    var isFronzen = false;
  }

  var sql = "call sp_recharge(" + points + ","
    + amount  + ","
    + type  + ","
    + '"' + bankType  + '"' + ","
    + comment + ","
    + userId + ","
    + isFrozen + ","
    + " @result);";

  console.log(sql);
  User.query(sql, cb);

}
