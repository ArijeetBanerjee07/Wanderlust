let express = require("express");
let app = express();
let Port = 3000;
const Sessions = require("express-session");
const flash = require("connect-flash");
let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(Sessions({
    secret:"MyLovePriyee",
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name = "Rahul"} = req.query;
    req.session.name = name;
    if(name === "Rahul"){
        req.flash("error","User not registered");
    }else{
        req.flash("Sucess","User registered sucessfully");
    }
    res.redirect("/greet");
})

app.get("/greet",(req,res)=>{
    res.locals.msgS = req.flash("Sucess");
    res.locals.msgE = req.flash("error");
    res.render("page.ejs",{name: req.session.name});
})


app.get("/",(req,res)=>{
    res.send("Welcome to the Root page of Express Sessions!!");
});
app.get("/test",(req,res)=>{
    res.send("Test Successfull");
});

app.get("/getcount",(req,res)=>{
    if(req.session.count){
        req.session.count+=1;
    }
    else{
        req.session.count=1;
    }
    res.send(`req send for ${req.session.count} times`)
})
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});