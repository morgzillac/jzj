/**
 * Created by mcheng on 2/6/15.
 */

var moment = require('moment');


function md5params (bill99) {
  var crypto = require('crypto');
  var md5sum = crypto.createHash('md5');

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

  bill99.signMsgVal = signMsgVal;
  console.log(signMsgVal);
  md5sum.update(signMsgVal);
  bill99.signMsg = md5sum.digest('hex').toUpperCase();
}


module.exports = {

  send: function (req, res) {

    var dateStr =   moment().format('YYYYMMDDHHMMSS');

    var bill99 = {
      merchantAcctId:'1002421178901',
      key:"ZRF336TLNR62AXJH",
      inputCharset:"3",
      pageUrl:"http:/119.29.22.94:1337/bill/rec",
      bgUrl:"http:/119.29.22.94:1337/bill/rec",
      version:"v2.0",
      language:"1",
      signMsg:"",
      signType:"1",
      payerName:"TestUser",
      payerContactType:"1",
      payerContact:"mchengcat@hotmail.com",
      orderId:dateStr,
      orderAmount:"2",
      orderTime:dateStr,
      productName:"productName",
      productNum:"1",
      productId:"55558888",
      productDesc:"test",
      ext1:"jzj1",
      ext2:"jzj2",
      payType:"00",
// following is for bank direct payment, payType : 10
      bankId:"",
//whether to allow repeat submission, 0 for real product, 1 for virtual
      redoFlag:"0",
      pid:""
    }

    console.log(JSON.stringify(bill99));
    md5params(bill99);
    console.log(bill99.signMsg);
    req.bill99 = bill99;
    res.view();
  },

  rec: function (req, res) {
    res.view();
  }

};
