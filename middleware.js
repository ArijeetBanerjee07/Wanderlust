const list = require("./models/list")
const Review = require("./models/review")
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("Error","You must be logged in to add a new listing and edit a listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await list.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("Error","You do not have permission to edit this listing !!");
        return res.redirect(`/listing/show/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("Error", "Review not found");
        return res.redirect(`/listing/show/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("Error", "You do not have permission to delete this review!");
        return res.redirect(`/listing/show/${id}`);
    }

    next();
};
