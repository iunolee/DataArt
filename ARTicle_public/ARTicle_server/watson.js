var firebase = require("firebase");
var watson = require('watson-developer-cloud');

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
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
        api_key: ''
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
