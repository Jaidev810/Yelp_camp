//all the middleware goes here
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "you don't have permission to do that");
                    res.redirect("back");
                }
            }
       });
    }else{
        req.flash("error","you need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                //does user own the comment
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                }else{
                    res.redirect("back");
                }
                
            }
        });

    }else{
        req.flash("error", "you need to be logged in to do that");
        res.redirect("back");
    }
}


middlewareObj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "you  need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;