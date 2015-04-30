'use strict';

/*获取url的查询参数*/
function getQueryString(url,key){
    var rs = new RegExp("(^|)"+key+"=([^\&]*)(\&|$)","gi").exec(url), tmp;
    if(tmp=rs){
        return tmp[2];
    }
    // parameter cannot be found
    return "";
}
