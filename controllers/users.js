const User = require("../models/user.js");
const passport = require("passport");

module.exports.signupformrender = (req,res)=>{
    res.render("signup.ejs");
}

module.exports.signupformsubmit = async(req,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({
            email,
            username
        })
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
          if(err){
            return next(err);
          }
        req.flash("Sucess","Welcome to Wanderlust");
        res.redirect("/listing");
        })
    }
    catch(e){
        req.flash("Error",e.message);
        res.redirect("/signup");
    }
}

module.exports.loginformrender = (req,res)=>{
    res.render("login.ejs");
}
module.exports.loginformsubmit = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("Error", err.message);
      return res.redirect("/login");
    }
    if (!user) {
      req.flash("Error", info.message || "Invalid credentials");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        req.flash("Error", err.message);
        return res.redirect("/login");
      }
      req.flash("Sucess", "Welcome back!");
      res.redirect(res.locals.redirectUrl || "/listing");
    });
  })(req, res, next);
}
module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("Sucess","You are Logged Out !!")
    res.redirect("/listing");
  })
}