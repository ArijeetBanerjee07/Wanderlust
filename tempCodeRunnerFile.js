let express = require("express");
let app = express();

let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

let mongoose = require("mongoose");
let list = require("./models/list.js")

let port = 8080;

main()
.then((res)=>{console.log("connection Succesaful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.get("/",(req,res)=>{
    res.send("Hello This is from root");
})

// app.get("/sample",async (req,res)=>{
//     let list1 = new list ({
//         title:"Anand Guha (Laxmi Vilas)",
//         description:"Entire guest suite, 2 guests 1 bedroom 1 bed 1 bathroom",
//         img:"https://a0.muscache.com/im/pictures/ed6b7db8-e456-4b96-94f4-4c828dbb8bbf.jpg?im_w=1200",
//         price:4565,
//         location:"Pune City",
//         country:"India"
//     })

//     await list1.save();
//     console.log("data is saved");
//     res.send("Data Saved");
// })
app.get("/listing", async (req,res)=>{
    let allListings = await list.find();
    res.render("index.ejs",{allListings})
})
app.listen(port,()=>{
    console.log("The app is listening on port 8080");
})