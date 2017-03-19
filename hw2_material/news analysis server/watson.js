var firebase = require("firebase");
var watson = require('watson-developer-cloud');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyANNXCX3qWs_hIaP8OU-JIpXYPBHYUQYzE",
    authDomain: "fir-c363f.firebaseapp.com",
    databaseURL: "https://fir-c363f.firebaseio.com",
    storageBucket: "fir-c363f.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();
var articleRef = database.ref('article');
articleRef.on('value', function(data) {
    var articleData = data.val()
    var keys = Object.keys(articleData)
    var article = articleData[keys[keys.length - 1]];
    // console.log(article);
    doWatson(article);
}, function(err) {});



function doWatson(data) {

    var alchemy_language = watson.alchemy_language({
        api_key: 'a29eabdbe0fd2f5aa6cba26ccce871193c2d332f'
    });

    var parameters = {
        extract: 'doc-sentiment,doc-emotion,keywords',
        sentiment: 1,
        maxRetrieve: 50,
        text: data
    };

    alchemy_language.combined(parameters, function(err, response) {
        if (err)
            console.log('error:', err);
        else {
            var emotionRef = database.ref('sentiment');
            emotionRef.push(response);
            console.log("sent");
        }
    });




}
