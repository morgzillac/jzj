/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/file/upload" enctype="multipart/form-data" method="post">'+
      'type: <input type="text" name="type"><br>'+
      '<input type="file" name="thefile" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    )
  },

  upload: function  (req, res) {
    var arrTypes = [
      {id:1,name:"userImg",remark:"头像信息和账号截图信息"},
      {id:2,name:"taskImg",remark:"任务截图信息"},
      {id:3,name:"productImg",remark:"产品截图信息"},
      {id:4,name:"otherImg",remark:"其他"}
    ];

    var type = parseInt(req.param('type'));
    if (isNaN(type) || type < 1 || type > 4) {
      type = 4;
    }
    var uploadPath = '../../assets/uploads/' + arrTypes[type-1].name;
    if (req.method.toUpperCase()=='GET') return res.serverError('文件提交错误');
    req.file('thefile').upload({ dirname: uploadPath },function (err, files) {
      if (err)
        return res.serverError(err);

      for (var i=0;i<files.length;i++) {
        var fd = files[i].fd;
        files[i].fd = fd.substr(fd.indexOf('uploads'));
      }

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }

};

/*
module.exports = {

upload: function  (req, res) {
	var uploadPath = './assets/images';
    req.file('avatar').upload({ dirname: uploadPath }, function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({status:200,file:files});
    })
  }
}*/

