const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


var myQuestions = [
	{
		question: "Name the actor who starred as Michael Knight in the “Knight Rider”?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/knightrider.jpeg",
		answers: {
			choiceA: 'David Hasselhoff',
			choiceB: 'Richard Dean Anderson',
            choiceC: 'Tom Selleck',
            choiceD: 'Don Johnson'
		},
		correctAnswer: 'A'
	},
	{
		question: "Which actress was never nude in the series “Sex And The City”?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/sexandthecity.jpeg",
		answers: {
			choiceA: 'Kristin Davis',
			choiceB: 'Cynthia Nixon',
            choiceC: 'Sarah Jessica Parker',
            choiceD: 'Kim Cattrall'
		},
		correctAnswer: 'C'
    },
    {
		question: "How many people Jack Bauer killed in 192 hours?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/jackbauer.jpeg",
		answers: {
			choiceA: '125',
			choiceB: '267',
            choiceC: '275',
            choiceD: '309'
		},
		correctAnswer: 'B'
    },
    {
		question: "In the TV series 'Lost', what is the name of the group that conducted scientific experiments on the island?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/lost.jpeg",
		answers: {
			choiceA: 'Dharma Initiative',
			choiceB: 'Oceanic Six',
            choiceC: 'Ajira',
            choiceD: 'The Others'
		},
		correctAnswer: 'A'
    },
    {
		question: "What is Doug Heffernan's profession on the TV sitcom 'The King of Queens'?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/kingofqueens.jpeg",
		answers: {
			choiceA: 'Delivery Driver',
			choiceB: 'Electrician',
            choiceC: 'Plumber',
            choiceD: 'Mailman'
		},
		correctAnswer: 'A'
    },
    {
		question: "Which of the following animated sitcoms was created by Seth MacFarlane?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/seth.jpeg",
		answers: {
			choiceA: 'The Simpsons',
			choiceB: 'American Dad',
            choiceC: 'Futurama',
            choiceD: 'South Park'
		},
		correctAnswer: 'B'
    },
    {
		question: "Airing from 1994 to 2000, in which city was the medical drama TV show ER set?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/ER.jpeg",
		answers: {
			choiceA: 'Dallas',
			choiceB: 'St. Louis',
            choiceC: 'Chicago',
            choiceD: 'Denver'
		},
		correctAnswer: 'C'
    },
    {
		question: "Who plays Nancy Botwin on the comedy-drama TV show 'Weeds'?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/weeds.jpeg",
		answers: {
			choiceA: 'Tonye Patano',
			choiceB: 'Allie Grant',
            choiceC: 'Elizabeth Perkins',
            choiceD: 'Mary-Louis Parker'
		},
		correctAnswer: 'D'
    },
    {
		question: "Which character owned the bar on the popular American sitcom 'Cheers'?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/cheers.jpeg",
		answers: {
			choiceA: 'Sam Malone',
			choiceB: 'Woody Boyd',
			choiceC: 'Frasier Crane',
            choiceD: 'Cliff Clavin'
		},
		correctAnswer: 'A'
    },
    {
		question: "What was the name of the hangout on the show 'Saved by the Bell'?",
		imgSrc : "/Users/caseykelleher/UCF/TriviaGame/assets/images/savedbythebell.jpeg",
		answers: {
			choiceA: 'The Malibu Latch Club',
			choiceB: 'The Malibu Warf',
            choiceC: 'The Pier',
            choiceD: 'Malibu Sands Beach Club'
		},
		correctAnswer: 'D'
	}
];

var lastQuestion = question.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

function renderQuestion(){
    let q = question[runningQuestion];
    
    question.innerHTML = "<p>"+ question +"</p>";
    // qImg.innerHTML = "<img src="+ imgSrc +">";
    choiceA.innerHTML = choiceA;
    choiceB.innerHTML = choiceB;
    choiceC.innerHTML = choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == question[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
