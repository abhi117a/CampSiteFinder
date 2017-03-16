var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
       {name: "Yello Stone National Park", image:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHDJBjS5WC8CE8kX7GMoujQIHZh9S1Uj6S9zS3NH8A62KYte0B"},
       {name: "Jim Corbet", image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRMkaLeyJ1ErUhBo5tOZ7Qwn5H3FfXhXHH9JK9wMgwzXernEMi3sQ"},
       {name: "Gir Forest", image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSCSQN0s8xVc0XvMDDXEbbQ_e9x4GXyM8srlbV8E2OUM8KrQGN0w"}
       ] 

app.get("/",function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req,res){
   
       res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name: name, image: img};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping Site server standby");
    console.log("Camping Site server started");
});