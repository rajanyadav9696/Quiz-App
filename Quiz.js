const questions = [
    {
        question: "which is largest animal in world?",
        answers: [
            {text: "shark",correct: false },
            {text: "Blue Whale",correct: true },
            {text: "Elephant",correct: false },
            {text: "Giraffe",correct: false },   
        ]
    },
    { question: "which is largest continent in world?",
    answers: [
        {text: "Asia",correct: true },
        {text: "Australia",correct: false },
        {text: "Arctic",correct: false },
        {text: "Africa",correct: false },   
    ]

    },
    {
        question: "which is largest Desert in world?",
        answers: [
            {text: "Kalahari",correct: false },
            {text: "Gobi",correct: false },
            {text: "Sahara",correct: false },
            {text: "Antarctica",correct: true },   
        ]
    },
    {
        question: "which is Country  in world?",
        answers: [
            {text: "India",correct: false },
            {text: "vetican city",correct: true },
            {text: "America",correct: false },
            {text: "China",correct: false },   
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score = 0;

function startQuiz(){
currentQuestionIndex = 0;
Score = 0;  
nextButton.innerHTML = "Next";
showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach ( answer =>  {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild (button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild (answerButtons.firstChild);

        
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct =="true";
    if (iscorrect){
        selectedBtn.classList.add("correct");
        Score++;
    }
    else{
        selectedBtn.classList.add("incorrect");   
    }
    Array.from(answerButtons.children).forEach(button =>{
    if (button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
nextButton.style.display ="block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${Score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Event listener for the "Next" or "Play Again" button
nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();  // Restart the quiz when "Play Again" is clicked
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
});

startQuiz();