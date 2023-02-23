const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerBtnEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

var timeInMinutes = 1;
var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeInMinutes*60*1000);

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  currentTime = Date.parse(new Date());
  deadline = new Date(currentTime + timeInMinutes*60*1000);
  console.log(new Date, deadline) 
  initializeClock('clockdiv', deadline);
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtnEl.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextBtn.classList.add('hide')
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerBtnEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
  } else {
    startBtn.innerText = 'Restart'
    startBtn.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'How many questions are on this quiz?',
    answers: [
      { text: 'One', correct: false },
      { text: 'Some', correct: true },
    ]
  },
  {
    question: 'Is this question 2?',
    answers: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ]
  },
  {
    question: 'What question is this?',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: true }
    ]
  }
]