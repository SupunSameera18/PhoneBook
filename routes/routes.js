const express = require("express");
const router = express.Router();
const User = require("../models/user");



router.get("/", (req, res) => {
    const message = req.session.message;
    req.session.message = null;

    User.find({})
        .then((users) => {
            let alertType = '';
            if(message){
                if(message.includes('Added')){
                    alertType = 'alert-success'
                } else if (message.includes('Updated')) {
                    alertType = 'alert-warning'
                } else {
                    alertType = 'alert-danger'
                }
            }
            res.render("index", { title: "Home", users: users, message: message, alertType: alertType});
        })
        .catch((err) => {
            console.error('Error occured: ' + err);
        });
});

router.get("/add", (req, res) => {
    res.render("add", { title: "Add User" });
});

router.post("/add", (req, res) => {
    const newUser = {
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email,
    };

    User.create(newUser)
        .then(() => {
            req.session.message = 'User Added Successfully!';
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error occured: ' + err);
        });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});

router.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            if (user) {
                res.render("edit", { title: "Edit Record", user: user })
            } else {
                console.log('User not found');
            }
        })
        .catch(err => {
            console.error('Error occured: ' + err);
        });
});

router.post("/edit/:id", (req, res) => {
    let id = req.params.id;
    const updatedUserInfo = {
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email
    }
    User.findByIdAndUpdate(id, updatedUserInfo, { new: true })
        .then(updatedUser => {
            if (updatedUser) {
                req.session.message = 'User Updated Successfully'
                res.redirect('/')
            } else {
                console.log('User not found');
            }
        })
        .catch(err => {
            console.error('Error occured: ' + err);
        });
})

router.get("/delete/:id", (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove(id)
        .then((deletedUser) => {
            if (deletedUser) {
                req.session.message = 'User Deleted Successfully'
                res.redirect('/')
            } else {
                console.log('User not found');
            }
        })
        .catch(err => {
            console.error('Error occured: ' + err);
        });
});

module.exports = router;
