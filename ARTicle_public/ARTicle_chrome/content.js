chrome.runtime.onMessage.addListener(function(message) {

    var article;
    var allTexts = [];
    var allWords = [];
    var finalWords = [];
    var keywordSentiment = {};
    var para = document.getElementsByTagName('p');
    // This is for new york times articles
    var articleText = document.getElementsByClassName('story-body-text story-content');

    var typeOfSentiment = null;
    var scoreOfSentiment = null;
    var emotionAnger = null;
    var emotionDisgust = null;
    var emotionFear = null;
    var emotionJoy = null;
    var emotionSadness = null;
    var emotionAngerMinus = null;
    var emotionDisgustMinus = null;
    var emotionFearMinus = null;
    var emotionJoyMinus = null;
    var emotionSadnessMinus = null;

    // Initialize Firebase
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",
        messagingSenderId: ""
    };
    firebase.initializeApp(config);


    getSentences(articleText);

    // get all texts from an article and split into words
    function getSentences(tag) {
        for (i = 0; i < tag.length; i++) {
            var text = tag[i].textContent
            if (text.indexOf("  ") !== 1) {
                if (text !== "") {
                    allTexts.push(text);
                }
            }
        }



        for (i = 0; i < allTexts.length; i++) {
            article = allTexts.join("\n");
            allWords = article.split(/\W+/);
        }
    }

    var database = firebase.database();
    var ref = database.ref('article');
    ref.push(article);

    setTimeout(loadWatson, 1000);

    // get the result of Watson API analysis
    function loadWatson() {

        var emotionRef = database.ref('sentiment');
        emotionRef.once('value').then(function(data) {
            var rawData = data.val()
            var keys = Object.keys(rawData)
            var sentimentData = rawData[keys[keys.length - 1]];

            // typeOfSentiment = sentimentData.docSentiment.type;

            // mapping into hue color
            // scoreOfSentiment = sentimentData.docSentiment.score;
            // scoreOfSentiment = Math.floor(calMapping(scoreOfSentiment, -1, 1, 220, 60));
            // console.log(typeOfSentiment, scoreOfSentiment);


            var keyword = sentimentData.keywords;

            for (i = 0; i < keyword.length; i++) {
                var text = keyword[i].text;
                var sentimentType = keyword[i].sentiment.type;
                keywordSentiment[text] = sentimentType;
            }

            console.log(keywordSentiment);

            emotionAnger = sentimentData.docEmotions.anger;
            emotionAnger = Math.floor(calMapping(emotionAnger, 0.05, 0.7, 0, 100));
            emotionAngerMinus = Math.floor(calMapping(emotionAnger, 0, 100, 90, 50));

            // emotionDisgust = sentimentData.docEmotions.disgust;
            // emotionDisgust = Math.floor(calMapping(emotionDisgust, 0.05, 0.7, 0, 100));
            // emotionDisgustMinus = Math.floor(calMapping(emotionDisgust, 0, 100, 90, 50));

            emotionFear = sentimentData.docEmotions.fear;
            emotionFear = Math.floor(calMapping(emotionFear, 0.05, 0.7, 0, 100));
            emotionFearMinus = Math.floor(calMapping(emotionFear, 0, 100, 90, 50));

            emotionJoy = sentimentData.docEmotions.joy;
            emotionJoy = Math.floor(calMapping(emotionJoy, 0.05, 0.7, 0, 100));
            emotionJoyMinus = Math.floor(calMapping(emotionJoy, 0, 100, 90, 50));

            emotionSadness = sentimentData.docEmotions.sadness;
            emotionSadness = Math.floor(calMapping(emotionSadness, 0.05, 0.7, 0, 100));
            emotionSadnessMinus = Math.floor(calMapping(emotionSadness, 0, 100, 90, 50));

            console.log(emotionAnger, emotionFear, emotionJoy, emotionSadness);
            console.log(emotionAngerMinus, emotionFearMinus, emotionJoyMinus, emotionSadnessMinus);



        }, function(err) {});

        function calMapping(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        setTimeout(displayKeyword, 1000);
    }

    // display words and the result of analysis with color variations
    function displayKeyword() {

        var link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css?family=Heebo:900|Roboto:900i';
        link.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(link);


        // background color : emotional state of article (anger, fear, joy, sadness)
        var storyHeader = document.getElementById('story-header');
        document.body.style.backgroundImage = "-webkit-linear-gradient(left, hsl(343, " + emotionAnger + "%, " + emotionAngerMinus + "%) 25%, hsl(277, " + emotionFear + "%, " + emotionFearMinus + "%) 50%, hsl(52, " + emotionJoy + "%, " + emotionJoyMinus + "%) 75%, hsl(212, " + emotionSadness + "%, " + emotionSadnessMinus + "%) 100%)";

        // remove attribute of title in link to prevent errors
        $('p a').removeAttr("title");

        //picked font color : important keywords with sentimemt (posivite, neutral, negative)
        var keywordsKeys = Object.keys(keywordSentiment);
        for (i = 0; i < keywordsKeys.length; i++) {
            var search = keywordsKeys[i];
            var value = keywordSentiment[search];

            if (value == 'negative') {
                $('p:contains(' + search + ')', document.body).each(function() {
                    $(this).html($(this).html().replace(
                        new RegExp(search, 'gi'), '<span style="color: black; font-family: Roboto, sans-serif;">' + search + '</span>'
                    ));
                });
            } else if (value == 'positive') {
                $('p:contains(' + search + ')', document.body).each(function() {
                    $(this).html($(this).html().replace(
                        new RegExp(search, 'gi'), '<span style="color: white; font-family: Roboto, sans-serif;">' + search + '</span>'
                    ));
                });
            } else if (value == 'neutral') {
                $('p:contains(' + search + ')', document.body).each(function() {
                    $(this).html($(this).html().replace(
                        new RegExp(search, 'gi'), '<span style="color: #737370; font-family: Roboto, sans-serif;">' + search + '</span>'
                    ));
                });
            }
        }
    }
});
