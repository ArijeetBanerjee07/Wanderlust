if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


let express = require("express");
let app = express();
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
let wrapAsync = require("./utills/wrapAsync.js");
let mongoose = require("mongoose");
let list = require("./models/list.js")
let Review = require("./models/review.js");
let ExpressError = require("./utills/ExpressError.js");
const listing = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const Sessions = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const localStratergy = require("passport-local").Strategy;
const User = require("./models/user.js");
const user = require("./routes/user.js");
let port = 8080;
let db_Url = process.env.ATLASDB_URL

main()
.then((res)=>{console.log("connection Succesaful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(db_Url);
}
const store = MongoStore.create({
    mongoUrl: db_Url,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
});

store.on("error",function(e){
    console.log("SESSION STORE ERROR",e);
})
const sessionOption = {
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}


app.use(Sessions(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.msgS = req.flash("Sucess");
    res.locals.msgE = req.flash("Error");
    res.locals.currUser = req.user;
    next();
})


app.get("/home",(req,res)=>{
    res.render("home.ejs");
})
app.use("/listing",listing);

app.get("/listing/trending",(req,res)=>{
    res.render("./filters/trending.ejs")
})
app.get("/listing/lakefront",async (req,res)=>{
    const allListings = await list.find({ filter: "lakefront" });
    res.render("./filters/lakefront.ejs", { allListings });
})
app.get("/listing/tinyhome", async (req,res)=>{
    const allListings = await list.find({ filter: "tinyhome" });
    res.render("./filters/tinyhomes.ejs", { allListings });
})
app.get("/listing/treehouse",async (req,res)=>{
    const allListings = await list.find({ filter: "treehouse" });
    res.render("./filters/treehouse.ejs", { allListings });
})
app.get("/listing/contryside",async (req,res)=>{
    const allListings = await list.find({ filter: "countryside" });
    res.render("./filters/countryside.ejs", { allListings });
})
app.get("/listing/historical",async (req,res)=>{
    const allListings = await list.find({ filter: "historical" });
    res.render("./filters/historical.ejs", { allListings });
})
app.get("/listing/beachfront",async (req,res)=>{
    const allListings = await list.find({ filter: "beachfront" });
    res.render("./filters/beachfront.ejs", { allListings });
})
app.get("/listing/lux",async (req,res)=>{
    const allListings = await list.find({ filter: "lux" });
    res.render("./filters/lux.ejs", { allListings });
})
app.get("/listing/tropical",async (req,res)=>{
    const allListings = await list.find({ filter: "tropical" });
    res.render("./filters/tropical.ejs", { allListings });
})
app.get("/listing/vineyards",async (req,res)=>{
    const allListings = await list.find({ filter: "vineyards" });
    res.render("./filters/vineyards.ejs", { allListings });
})
// Review Route
app.use("/listing/:id/reviews",reviews);
//user routes
app.use("/",user);



app.use((req,res,next)=>{
    next(new ExpressError("Page Not Found",404));
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err); 
    }
    console.error(err);

    const status = Number(err.status) || 500;
    const message = err.message || "Something went wrong";

    // Mongo invalid ObjectId
    if (err.name === "CastError") {
        return res.status(404).render("404", {
            message: "Invalid or non-existent listing"
        });
    }

    // 404 page
    if (status === 404) {
        return res.status(404).render("404",{ message });
    }

    // Validation error
    if (err.name === "ValidationError") {
        const validationMessage = Object.values(err.errors)
            .map(e => e.message)
            .join(", ");

        return res.status(400).render("new", {
            error: validationMessage
        });
    }

    // fallback
    res.status(status).send(message);
});


app.listen(port,()=>{
    console.log("The app is listening on port 8080");
})