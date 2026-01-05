const list = require("../models/list");

module.exports.index = async (req,res)=>{
    let allListings = await list.find();
    res.render("index.ejs",{allListings})
}

module.exports.showIndexByID = async (req,res)=>{
    let {id} = req.params;
    let listing = await list.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author",
        }
    })
    .populate("owner");
    // if(!listing){ throw new ExpressError("Listing Not Found", 404);}
    if(!listing){
        req.flash("Error","Listing is not available !!");
        return res.redirect("/listing");
    }
    res.render("show.ejs",{listing})
}

module.exports.renderNewForm = (req,res)=>{
    res.render("new.ejs");
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await list.findById(id);

    if (!listing) {
        throw new ExpressError("Listing Not Found", 404);
    }

    let originalImageUrl = listing.image.url;

    // Cloudinary-safe resize
    originalImageUrl = originalImageUrl.replace(
        "/upload/",
        "/upload/w_300/"
    );

    res.render("edit.ejs", { listing, originalImageUrl });
};


module.exports.createNewListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const { title, description, price, location, country } = req.body;

    const newListing = new list({
        title,
        description,
        price: Number(price),
        location,
        country,
        image: { url, filename },
        owner: req.user._id,
    });

    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    newListing.filter = req.body.filter;
    await newListing.save(); 
    req.flash("Sucess","New listing Added Sucssessfully!!");
    res.redirect("/listing");
}

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    let updatedData = req.body; // This contains title, description, img, price, location, country
    let listing = await list.findByIdAndUpdate(id, updatedData, { new: true,runValidators:true });

    if(typeof req.file !== "undefined" ) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("Sucess","Listing Updated Sucessfully!!");
    res.redirect(`/listing/show/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    await list.findByIdAndDelete(id);
    req.flash("Sucess","Listing Deleted Sucessfully !!");
    res.redirect("/listing");
}

module.exports.searchListing = async (req,res)=>{
    let {q} = req.query;
    if(!q){
        return res.redirect("/");
    }
    const allListings = await list.find({
    $or: [
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { title: { $regex: q, $options: "i" } }
    ]
  });
    res.render("index.ejs",{allListings})
}   