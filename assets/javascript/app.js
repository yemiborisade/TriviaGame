// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is Batman's mother's name?",
        imgSrc : "https://i.pinimg.com/originals/73/e4/65/73e4657ecf2798d76fb811ba3ab4b707.jpg",
        choiceA : "Martha",
        choiceB : "Susan",
        choiceC : "Jill",
        correct : "A"
    },{
        question : "Who is Batman's greatest enemy?",
        imgSrc : "https://upload.wikimedia.org/wikipedia/en/f/ff/BATMANROUGUESUNDERGROUND.png",
        choiceA : "Scarecrow",
        choiceB : "The Joker",
        choiceC : "Penguin Cobblepot",
        correct : "B"
    },{
        question : "This Robin would be known as Batman's first son and would later lead the Teen Titans",
        imgSrc : "https://static.comicvine.com/uploads/original/11128/111283887/5944764-3255864761-37894.jpg",
        choiceA : "Jason Todd",
        choiceB : "Damian Wayne",
        choiceC : "Dick Grayson",
        correct : "C"
    },{
        question : "Joker's nickname is which of the following?",
        imgSrc : "https://www.bing.com/th?id=OIP.ZQClyk_jXeuK1mOFKq4CGAHaF7&pid=Api&rs=1",
        choiceA : "One Bad Day",
        choiceB : "Agent of Chaos",
        choiceC : "The Clown Prince",
        correct : "C"
    },{
        question : "Scarecrow uses what to attack people?",
        imgSrc : "https://static2.comicvine.com/uploads/scale_medium/10/100647/4733671-11737831_10153068336789007_2528858156749556392_n2.jpg",
        choiceA : "Fear Gas",
        choiceB : "Chains",
        choiceC : "Poison",
        correct : "A"
    },{
        question : "Bane broke which of Batman's body parts?",
        imgSrc : "http://www.fightersgeneration.com/nx5/injustice/bane-vs-batman.jpg",
        choiceA : "Legs",
        choiceB : "Back",
        choiceC : "Neck",
        correct : "B"
    },{
        question : "Who is the leader of the Gotham Sirens?",
        imgSrc : "https://d1466nnw0ex81e.cloudfront.net/n_iv/600/2851952.jpg",
        choiceA : "Catwoman",
        choiceB : "Harley Quinn",
        choiceC : "Poison Ivy",
        correct : "A"
    },{
        question : "Harley Quinn notoriously uses what weapon of choice?",
        imgSrc : "https://i.pinimg.com/736x/d6/98/ed/d698ed8f217807b93335b87a3ca2c1b2--vertigo-justice-league.jpg",
        choiceA : "Twin Pistols",
        choiceB : "Attack Dogs",
        choiceC : "Baseball Bat",
        correct : "C"
    },{
        question : "This helpful friend equips Batman with all of his gadgets",
        imgSrc : "https://www.bing.com/th?id=OIP.MH0PKOHPo0xAamTYsErANAHaFv&pid=Api&rs=1",
        choiceA : "Lucius Fox",
        choiceB : "Jim Gordon",
        choiceC : "Alfred Pennyworth",
        correct : "A"
    },{
        question : "Who is behind the mask of the iconic Batgirl",
        imgSrc : "https://wtfdccomics.files.wordpress.com/2012/08/batgirl-new-52-1.jpg",
        choiceA : "Betty Kane",
        choiceB : "Selina Kyle",
        choiceC : "Barbara Gordon",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
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
    if( answer == questions[runningQuestion].correct){
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
    let img = (scorePerCent >= 80) ? "https://cdn.vox-cdn.com/thumbor/pAOIY3gvUyx3j97J7gnQnGTWVoc=/0x0:1920x1080/1200x800/filters:focal(725x485:1031x791)/cdn.vox-cdn.com/uploads/chorus_image/image/53153749/legobatmancover.0.jpg" :
              (scorePerCent >= 60) ? "http://ep.yimg.com/ay/stylinonline/batman-joker-vintage-laugh-t-shirt-7.jpg" :
              (scorePerCent >= 40) ? "http://cdn.trendhunterstatic.com/thumbs/sad-batman.jpeg" :
              (scorePerCent >= 20) ? "http://cdn.trendhunterstatic.com/thumbs/sad-batman.jpeg" :
              "https://cdn.drawception.com/images/panels/2013/9-6/xCbY67E2cT-10.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}