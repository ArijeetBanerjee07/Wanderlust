let express = require("express");
const router = express.Router();
let wrapAsync = require("../utills/wrapAsync.js");
let list = require("../models/list.js");
let ExpressError = require("../utills/ExpressError.js");
const {isLoggedIn,isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image]'),wrapAsync(listingController.createNewListing)
);

router.get("/show/:id",wrapAsync(listingController.showIndexByID));
router.get("/new",isLoggedIn, listingController.renderNewForm);
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
router.get("/search",listingController.searchListing);
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'), wrapAsync(listingController.updateListing));
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


module.exports = router;