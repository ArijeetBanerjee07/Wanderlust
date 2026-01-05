let express = require("express");
const router = express.Router({ mergeParams: true });
const {isLoggedIn, isReviewAuthor} = require("../middleware.js");
let wrapAsync = require("../utills/wrapAsync.js");
let list = require("../models/list.js");
let Review = require("../models/review.js");
let ExpressError = require("../utills/ExpressError.js");
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await list.findById(id);
    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("Sucess","Review Added Sucessfully !!");
    res.redirect(`/listing/show/${id}`);
  })
);

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await list.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("Sucess","Review Deleted Sucessfully");
    res.redirect(`/listing/show/${id}`)
}))

module.exports = router;