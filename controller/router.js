var file = require("../models/file.js")
var formidable = require("formidable")

// 显示主页
exports.showIndex = function (req, res) {
    file.getAllAlbums(req, res, function (files) {
        res.render("index.ejs", {
            albums: files
        })
    })
}

//展示一个相册
exports.showAlbum = function (req, res) {
    file.getPictures(req, res, function (files) {
        res.render("album.ejs", {
            images: files,
            albumName: req.params.albumName
        })
    })
}

//展示一个相册+上传文件
exports.upAlbum =  function (req, res) {
    file.getPictures(req, res, function (files) {
        res.render("uploads.ejs", {
            images: files,
            albumName: req.params.albumName
        })
    })
}


//上传文件，post请求
exports.upPicture = function(req, res){
    var form = new formidable.IncomingForm;
    form.keepExtensions = true;
    form.uploadDir = __dirname + "/../uploads/"+req.params.albumName;
    //接收文件
    form.parse(req,function(err, fields, files){
        if(err){
            throw err;
        }else{
            //未实现文件改名，应当在file里面写一个函数
            this.upAlbum(req, res)
        }
    })
}

//新建文件夹， get请求提交表单
exports.newDir = function(req, res){
    if(JSON.stringify(req.query)=='{}'){
        res.render("newdir.ejs");
        return;
    }else{
        file.buildAlbum(req, res, function(){
            res.send("success"+req.query.dirname);
        })
    }
}