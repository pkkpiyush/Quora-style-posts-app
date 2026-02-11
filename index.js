const express = require("express");
const app = express();
const port = 8080;
const {v4 :uuidv4} = require("uuid");
const path = require("path");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

let posts = [
    {
        id : uuidv4(),
        username : "Piyush kumar",
        content : "I love coding",
    },
    
    {
        id : uuidv4(),
        username : "Raunak kumar",
        content : "I love gaming in free time",
    },
    
    {
        id : uuidv4(),
        username : "Rohan kumar",
        content : "I got my 1rst Internship",
    },
]

app.get("/Posts",(req,res) =>{
    res.render("home.ejs",{posts});
});

app.get("/Posts/New",(req,res)=>{
    res.render("newpost.ejs");
});

app.get("/Posts/:id",(req,res)=>{
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);   
    res.render("view.ejs",{ post });
});

app.post("/Posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({ id,username,content });
    res.redirect("/Posts");
});

app.patch("/Posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.redirect("/Posts");
}); 

app.get("/Posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/Posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/Posts");
})

app.listen(port, ()=>{
    console.log(`app running on port ${port}`);
});