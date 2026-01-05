let express = require("express");
let app = express();
let port = 3000;
let cookieparser = require("cookie-parser");
let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(cookieparser("secretcode"));

app.get("/",(req,res)=>{
    res.send("Welcome to the Cookie Server!");
})
app.get("/cookie",(req,res)=>{
    res.cookie("ILove","Priyee");
    console.dir(req.cookies);
    res.send("Cookie has been set!");
})

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("SignedCookie","This is a signed cookie",{signed:true});
    console.dir(req.signedCookies);
    res.send("Signed Cookie has been set!");
})
app.get("/verify",(req,res)=>{
    res.send("verified");
    console.dir(req.signedCookies);
})
app.listen(port,()=>{
    console.log("Server is running on port 3000");
})