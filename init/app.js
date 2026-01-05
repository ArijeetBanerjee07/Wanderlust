let mongoose = require("mongoose");
let initData = require("./data.js");
let list = require("../models/list.js")

main()
.then((res)=>{console.log("connection Succesaful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async ()=>{
    await list.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"6950024a540f639015f2c762"}));
    await list.insertMany(initData.data)
    console.log("Data Saved");
}

initDB();