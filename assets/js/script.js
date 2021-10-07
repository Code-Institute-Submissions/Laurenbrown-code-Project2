const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.answer-text'));
const progress = document.querySelector('#progress');
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
    option1:"Bobbing for apples",
    option2:"Juggling bananas",
    option3:"Smashing pineapples",
    correctAnswer: 1,
},
{
    question: "Who are Dr. Peter Venkman, Dr. Raymond Stantz, and Dr. Egon Spengler better known as?",
    option1:"The Ghostbusters",
    option2:"Five Guys",
    option3:"The A Team",
    correctAnswer: 1,
},
{
    question: "Who sang the 1962 song 'Monster Mash'?",
    option1:"The Clash",
    option2:"Bobby Pickett and the Crypt Kickers",
    option3:"Creepers",
    correctAnswer: 2,
},
{
    question:"On Halloween, if a black cat crosses your path, what will you receive?",
    option1:"£200",
    option2:"A dodgy stomach",
    option3:"Bad Luck",
    correctAnswer: 3,
},
{
    question: "The word 'witch' comes from an old English word meaning...",
    option1:"Wise Woman",
    option2:"Scary Features",
    option3:"Pointy Nose",
    correctAnswer: 1,
},
{
    question: "What did the Scottish Witchcraft Act of 1735 forbid the consumption of?",
    option1:"Pumpkins",
    option2:"Sausage Rolls",
    option3:"Treacle Toffee",
    correctAnswer: 2,
},
{
    question:"What type of vegetable is disliked by vampires and is used to frighten them away?",
    option1:"Onions",
    option2:"Garlic",
    option3:"Parsnips",
    correctAnswer: 2,
},
{
    question:"True or false: The word ‘hallow’ means saint or holy person?",
    option1:"True",
    option2:"False",
    option3:"Your guess is as good as mine ",
    correctAnswer: 1,
},
{
    question:"Which magical characters must be appeased with offerings of biscuits and a saucer of milk?",
    option1:"House elves",
    option2:"Pixies",
    option3:"The Borrowers",
    correctAnswer: 1,
},
{
    question:"What is the day after Hallowe’en called?",
    option1:"Monday",
    option2:"All Souls Day",
    option3:"Treat Day",
    correctAnswer: 2,
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
    progress.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    answers.forEach(option => {
        const number = option.dataset['number']
        option.innerText = currentQuestion['option' + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

answers.forEach(option => {
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

