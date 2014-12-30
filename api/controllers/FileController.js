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
      '<input type="text" name="title"><br>'+
      '<input type="file" name="thefile" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    )
  },

  upload: function  (req, res) {
    if (req.method.toUpperCase()=='GET') return res.serverError('文件提交错误');
    req.file('thefile').upload(function (err, files) {
      if (err)
        return res.serverError(err);

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

