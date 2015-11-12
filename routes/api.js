/**
 * Recent Tweet Counter
 * A nodejs app that analyzes the popularity of a certain hashtags based on the number of Tweets using the hashtag posted in the last 30 minutes.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
// Git ignore keys
var keys = require('../keys.js');

var twit = require('twitter'),
    util = require('util'),
    request = require('request'),
    _ = require('lodash');

var twitter_api = new twit({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var hashtag_query = '#hollywood';


/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
    "posts": [{
        "title": "Lorem ipsum",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }, {
        "title": "Sed egestas",
        "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }]
};

// GET

exports.posts = function(req, res) {
    var posts = [],
        i, post, text;
    for (i = 0; i < Math.min(data.posts.length, 5); i++) {
        post = data.posts[i];
        posts.push({
            id: i,
            title: post.title,
            text: post.text.substr(0, 50) + '...'
        });
    }
    res.json({
        posts: posts
    });
};

exports.tweets = function(req, res) {


    twitter_api.get('search/tweets.json', {
        q: '#' + req.params.hashtag,
        // Maximum number of results allowed by Twitter API 
        count: 100
    }, function(err, tweets, resp) {
        res.json(tweets);
    });
};

exports.tweetsHandle = function(req, res) {
    twitter_api.get('search/tweets.json', {
        q: '@' + req.params.hashtag,
        // Maximum number of results allowed by Twitter API 
        count: 100
    }, function(err, tweets, resp) {
        res.json(tweets);
    });
};
