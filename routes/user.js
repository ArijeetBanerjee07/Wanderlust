let express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utills/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const reviewController = require("../controllers/users.js");



router.get("/signup",reviewController.signupformrender);
router.post("/signup",wrapAsync(reviewController.signupformsubmit))

router.get("/login",reviewController.loginformrender);

router.post("/login",saveRedirectUrl, reviewController.loginformsubmit);

router.get("/logout",reviewController.logout)

module.exports = router;