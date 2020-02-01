//所有和文件有关的操作
var fs = require("fs");

//列出所有的相册
exports.getAllAlbums = function (callback) {
    fs.readdir(__dirname + "/../uploads", function (err, files) {
        if (err) {
            res.render("error.ejs");
            return;
        } else {
            //return files;//返回所有的文件夹❌
            //node中函数返回的方法，将一个参数设置为callback，高层的一个函数，然后在函数内部执行完后调用该函数，因为只有在函数内部才有先后顺序可言，其他都是异步。
            callback(files);
            return;
        }
    });
}
//列出相册内所有的照片文件名，相册文件夹已经加入静态托管
exports.getPictures = function (req, res, callback) {
    var dir = req.params.albumName;
    fs.readdir(__dirname + "/../uploads/" + dir, function (err, files) {
        if (err) {
            res.render("error.ejs");
            return;
        } else {
            callback(files);
            return;
        }
    })
}