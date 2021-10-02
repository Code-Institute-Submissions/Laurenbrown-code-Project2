const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.answer-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
let availableQuestion = []

let questions = [
{
    question: "Which game involving fruit is commonly played at Halloween?",
    optionA:"Bobbing for apples",
    optionB:"Juggling bananas",
    optionC:"Smashing pineapples",
    correctAnswer:"A",
},
{
    question: "Who are Dr. Peter Venkman, Dr. Raymond Stantz, and Dr. Egon Spengler better known as?",
    optionA:"The Ghostbusters",
    optionB:"Five Guys",
    optionC:"The A Team",
    correctAnswer:"A",
},
{
    question: "Who sang the 1962 song 'Monster Mash'?",
    optionA:"The Clash",
    optionB:"Bobby Pickett and the Crypt Kickers",
    optionC:"Creepers",
    correctAnswer:"B",
},
{
    question:"On Halloween, if a black cat crosses your path, what will you receive?",
    optionA:"£200",
    optionB:"A dodgy stomach",
    optionC:"Bad Luck",
    correctAnswer:"C",
},
{
    question: "The word 'witch' comes from an old English word meaning...",
    optionA:"Wise Woman",
    optionB:"Scary Features",
    optionC:"Pointy Nose",
    correctAnswer:"A",
},
{
    question: "What did the Scottish Witchcraft Act of 1735 forbid the consumption of?",
    optionA:"Pumpkins",
    optionB:"Sausage Rolls",
    optionC:"Treacle Toffee",
    correctAnswer:"B",
},
{
    question:"What type of vegetable is disliked by vampires and is used to frighten them away?",
    optionA:"Onions",
    optionB:"Garlic",
    optionC:"Parsnips",
    correctAnswer:"B",
},
{
    question:"True or false: The word ‘hallow’ means saint or holy person?",
    optionA:"True",
    optionB:"False",
    optionC:"Don't Know",
    correctAnswer:"A",
},
{
    question:"Which magical characters must be appeased with offerings of biscuits and a saucer of milk?",
    optionA:"House elves",
    optionB:"Pixies",
    optionC:"The Borrowers",
    correctAnswer:"A",
},
{
    question:"What is the day after Hallowe’en called?",
    optionA:"Monday",
    optionB:"All Souls Day",
    optionC:"Treat Day",
    correctAnswer:"B",
},
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    option.forEach(option => {
        const number = option.dataset['number']
        option.innerText = currentQuestion['option' + number]
    })

    availableQuestion.splice(questionsIndex, 1)
    acceptingAnswers = true
}

option.forEach(option => {
    option.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedOption = e.target
        const selectedAnswer = selectedOption.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.correctAnswer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedOption.parentElement.classList.add(classToApply)
        setTimeout ( () =>{
            selectedOption.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

    })

})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

}

startGame()