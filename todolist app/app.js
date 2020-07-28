const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const _ = require("lodash");


app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-vedant:Vedant@123@cluster0-pppat.mongodb.net/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false} );

const itemSchema = mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);


const item1 = new Item({
  name: "Check assignment"
});

const item2 = new Item({
  name: "complete Course"
});

const item3 = new Item({
  name: "Watch lecture"
});

const defaultItems = [item1, item2, item3];

const listSchema = mongoose.Schema( {
  name:  {
    type: String,
    createIndexes: true
  },
  items: [itemSchema]
});

const List = mongoose.model("List", listSchema);



app.set('view engine', 'ejs');


app.get("/",function(req,res) {

  Item.find(function(err, foundItems) {
    if(err){
      console.log(err);
    }else {

      if(foundItems.length === 0){
        Item.insertMany(defaultItems, function (err) {
          if(err){
            console.log(err);
          }else {
            console.log("Sucessfully saved default items to DB");
          }
        });
        res.redirect("/");
      }else {
        res.render("list", {
          listTitle:"Today",
          newListItem:foundItems
        });
      }
    }
  });

});


app.post("/",function(req,res) {

  const itemName = req.body.item;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name: listName}, function(err, found) {
      found.items.push(item);
      found.save();
      res.redirect("/"+listName);
    })
  }


});

app.post("/delete", function(req,res) {
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.deleteOne({_id:checkedItem},function(err) {
      if (err) {
        console.log(err);
      }else {
        console.log("Data removed Sucessfully!!");
      }
    })
    res.redirect("/");
  }else {
    List.findOneAndUpdate({name:listName}, {$pull: {items: {_id: checkedItem}}}, function(err, foundList) {
      if(!err){
        res.redirect("/"+listName)
      }
    });
  }

});

app.get("/:listName",function(req,res) {
  const requestedList = _.capitalize(req.params.listName);

  List.findOne({name:requestedList},function(err,foundList) {
    if(!err){
      if(!foundList){
        const list = new List({
          name: requestedList,
          items: defaultItems
        });
      list.save();
      res.redirect("/"+requestedList);
      }else {
        res.render("list", {
          listTitle:foundList.name,
          newListItem:foundList.items
        });
      }
    }
  });



})

// app.get("/work",function(req,res){
//   res.render("list",{listTitle:"Work", newListItem:workItems});
// });

app.get("/about",function(req,res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function() {
  console.log("Server has started!");
})
