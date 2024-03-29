$(document).ready(function () {

    //declare variables and set variables
    var timer = 25,
        correct = 0,
        incorrect = 0,
        unanswered = 0,
        currentQuestion = 0,
        myTimer;

    //declaring questions and answers as an array object
    var triviaQuestions = [{
        question: "In what year was Nintendo founded?",
        answerList: ["1979", "1889", "1986", "1992"],
        answer: 1
    }, {
        question: "Where is Nintendo's headquarters located?",
        answerList: ["Kyoto, Japan", "Seattle, Washington", "New York City, New York", "Tokyo, Japan"],
        answer: 0
    }, {
        question: "What is Nintendo's most popular game?",
        answerList: ["Wii Sports", "Super Mario Bros", "Pokemon Red/Blue", "Zelda, Link's Awakening"],
        answer: 0
    }, {
        question: "What did Nintendo start out making?",
        answerList: ["Video games", "Video game consoles", "Cards", "Power cords"],
        answer: 2
    }, {
        question: "Nintendo's first successful console was the NES. What does NES stand for??",
        answerList: ["Nintendo Electronic Station", "Nintendo Entertainment System", "Nintendo Engagement System", "Nintendo Entertainment System"],
        answer: 3
    }, {
        question: "Next up was the Nintendo 64. Why was it called this?",
        answerList: ["It was a 64-bit gaming system", " It had a processor 64 times more powerful than the original NES", "It was president Hiroshi Yamauchi's favourite number", "It took 64 attempts before being perfected"],
        answer: 0
    }, {
        question: "What is the first game with Princess Zelda as a playable character?",
        answerList: ["Super Smash Bros. Brawl", "Zelda: Wand of Gamelon", "The Legend of Zelda: Ocarina of Time", "Zelda: Link's Awakening"],
        answer: 1
    }, {
        question: "What is the best-selling Nintendo handheld of all time",
        answerList: ["Game Boy", "Nintendo 3DS", "Nintendo DS", "Game Boy Advance"],
        answer: 2
    }, {
        question: "Which pro baseball team did Nintendo become majority owner of in 1992?",
        answerList: ["Chicago White Sox", "Seattle Mariners", "New York Yankees", "Arizona Diamond Backs"],
        answer: 1
    }, {
        question: "Which Nintendo game caused enough injuries in children to result in a $80M settlement?",
        answerList: ["Wii Sports", "Smash Bros Ultimate", "Pokemon Red/Blue", "Mario Party"],
        answer: 3
    }, {
        question: "What is the first Nintendo game to feature Mario in it?",
        answerList: ["Donkey Kong", "Super Mario Bros", "Smash Bros Ultimate", "Mario Party"],
        answer: 0
    }, {
        question: "What was the first Nintendo game to have a save-game feature?",
        answerList: ["Pokemon Red/Blue", "The Legend of Zelda", "Super Mario Bros", "Zelda: Link's Awakening"],
        answer: 1
    }, {
        question: "What was Mario's original name?",
        answerList: ["Big Red", "Luigi", "Mustache", "Jumpman"],
        answer: 3
    }, {
        question: "What console had the highest selling rate before the Wii was released?",
        answerList: ["NES", "Game Boy", "SNES", "Game Boy Advance"],
        answer: 0
    }, {
        question: "'What was the first Pokemon created?",
        answerList: ["Squirtle", "Pikachu", "Rhydon", "Mewtwo"],
        answer: 2
    }];

    //function to start timer and tally results at zero seconds
    function startTimer() {
        if (timer > 1) {
            timer--;
            $("#timer").text("Time Remaining: " + timer + " seconds")
        } else if (currentQuestion < 14) {
            unanswered++;
            currentQuestion++;
            writeQuestion();
        } else {
            unanswered++;
            showResults();
        };
    };

    //function to write out the questions, possible answers, and finished button
    function writeQuestion() {
        timer = 25;

        $("#questions").html(triviaQuestions[currentQuestion].question + "<br><input type='radio' name='answers' class='answers' data-value='0'>" +
            triviaQuestions[currentQuestion].answerList[0] + "<input type='radio' name='answers' class='answers' data-value='1'>" + triviaQuestions[currentQuestion].answerList[1] +
            "<input type='radio' name='answers' class='answers' data-value='2'>" + triviaQuestions[currentQuestion].answerList[2] + "<input type='radio' name='answers' class='answers' data-value='3'>" +
            triviaQuestions[currentQuestion].answerList[3] + "<br><br>");

        //adding submit and skip buttons
        $("#questions").append("<button id='submit'>Submit</button>");
        $("#questions").append("<button id='skip'>Skip</button>");
    };

    //function to stop and reset timer, tally results, generate replay button and reset correct/incorrect
    function tallyResult() {
        var playerChoice = $(".answers:checked");
        if (triviaQuestions[currentQuestion].answer === $(playerChoice).attr("data-value")) {
            correct++;
        } else {
            incorrect++;
        };
    };

    function showResults() {
        clearInterval(myTimer);
        $("#timer").empty();
        $("#questions").html("Correct answers: " + correct + "<br>Incorrect answers: "
         + incorrect + "<br>Unanswered questions: " + unanswered + "<br><br><button id='replay'>Replay</button>");
    }

    //on click event for start button
    $("#start").on("click", function () {
        myTimer = setInterval(startTimer, 1000);
        $("#inner_container").html("<div id='questions'></div>");
        writeQuestion();
    });

    //on click events for finished and replay buttons using document to avoid event bubbling issue
    $(document).on("click", "#submit", function () {
        if (currentQuestion < 14) {
            currentQuestion++;
            tallyResult();
            writeQuestion();
        } else {
            showResults();
        }
    });

    //on click events for finished and replay buttons using document to avoid event bubbling issue
    $(document).on("click", "#skip", function () {
        unanswered++;
        currentQuestion++;
        writeQuestion();
    });

    //set on click event for replay button using document to avoid event bubbling issue
    $(document).on("click", "#replay", function () {
        $("#questions").empty();
        writeQuestion();
        startTimer();
    });
});