var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/campSiteFinder");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var campSiteSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var CampSite = mongoose.model("CampSite", campSiteSchema);


// CampSite.create(
//     {
//         name: "Jim Details",
//         image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRMkaLeyJ1ErUhBo5tOZ7Qwn5H3FfXhXHH9JK9wMgwzXernEMi3sQ",
//         description: "A good place in India"
//     }, function(err,camp){
//       if(err){
//           console.log("Not Saved");
//       } 
//       else {
//           console.log("Saved");
//       }
//     });


var campgrounds = [
       {name: "Yello Stone National Park", image:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHDJBjS5WC8CE8kX7GMoujQIHZh9S1Uj6S9zS3NH8A62KYte0B"},
       {name: "Jim Corbet", image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRMkaLeyJ1ErUhBo5tOZ7Qwn5H3FfXhXHH9JK9wMgwzXernEMi3sQ"},
       {name: "Gir Forest", image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSCSQN0s8xVc0XvMDDXEbbQ_e9x4GXyM8srlbV8E2OUM8KrQGN0w"}
       ] 



app.get("/",function(req, res){
   res.render("landing");
});


//Index
app.get("/campgrounds", function(req,res){
   
    CampSite.find({}, function(err,allcampsite){
       if(err){
           console.log(err);
       } 
       else {
            res.render("index",{campgrounds:allcampsite});         
       }
    });
  
});

//Add new
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name: name, image: img};
    
    CampSite.create(newCampground, function(err,newSite){
       if(err){
           
       } 
       else {
       res.redirect("/campgrounds");    
       }
    });
});


//form for adding new
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});


//show page- shows details of selected product

app.get("/campgrounds/:id", function(req, res) {
    CampSite.findById(req.params.id, function(err,foundId){
       if(err){
           console.log("fuckoff");
       } 
       else {
        res.render("show", {campsite:foundId});       
       }
    });
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping Site server standby");
    console.log("Camping Site server started");
});