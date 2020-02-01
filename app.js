var express = require("express");
var ejs = require("ejs");
var router = require("./controller/router.js")

var app = express();

//静态文件托管，public文件夹
app.use(express.static("./public"))
app.use(express.static("./uploads"))
//显示首页
app.get("/", router.showIndex);
//弹出上传表单
app.get("/uploads/:albumName", router.upAlbum);
// 接受post请求的图片，暂时不识别
app.post("/uploads/:albumName", router.upPicture);
// 新建文件夹,转到表单，使用get提交，接收提交后的反应
app.get("/newdir", router.newDir);
//其他情况下404,可以next()到这里来，但我采取了直接render的方法xin
app.get("/:albumName", router.showAlbum);
// app.use(router.show404);
app.listen(3030)
