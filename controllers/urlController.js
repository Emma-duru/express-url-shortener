const URL = require("../models/url");
const crypto = require("crypto-random-string");

exports.home_page = (req, res) => {
    res.render("index", {route: "home"});
}

exports.url_post = (req, res) => {
    // Checks whether the URL is present in the DB
    URL.findOne({url: req.body.url}, (err, data) => {
        if(err) throw err;
        
        if (data === null) {
            // If it is not present, a new url document is created
            const short_url = crypto({length: 5, type: "base64"});
            URL.create({
                url: req.body.url,
                shortened_url: short_url
            }, (err, url) => {
                if(err) throw err;
                console.log("URL successfully shortened");
                res.render("index", {
                    route: "short", 
                    url: url.url, 
                    short_url: req.hostname + "/" + url.shortened_url,
                    crypto: url.shortened_url
                })
            })
        } else {
            res.render("index", {
                route: "short", 
                crypto: data.shortened_url,
                short_url: req.hostname + "/" + data.shortened_url
            })
        }

        
        
    })
}

exports.url_redirect = (req, res) => {
    URL.findOne({shortened_url: req.params.crypto}, (err, data) => {
        if(err) throw err;
        res.redirect(`${data.url}`);
    })
}