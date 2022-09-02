function comparator() {
    return Math.random() - 0.5; 
}

let questionsQtt;
const createPage = document.querySelector('.Create_quiz');
const body = document.querySelector('body');

function acessQuiz(quizId) {
    body.scrollIntoView();
    axios
    .get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    .then((quizzes) => {
        quizzesData = quizzes.data;
        
        const filteredQuiz = quizzesData.filter((quizzesData) => {
        if (quizzesData.id == quizId) {
            return true;
        }
        })
        selectedQuiz = filteredQuiz[0];
        
        homePage.classList.add('Hide');
        createPage.classList.add('Hide');
        quizPage.classList.remove('Hide');

        quizPage.innerHTML = `
        <div class="Quiz_title">
            <img src="" alt="">
            <h1>O quão Potterhead é você?</h1>
        </div>
        `;

        const quizTitle = document.querySelector('.Quiz_title');
        quizTitle.innerHTML = `
        <img src="${selectedQuiz.image}" alt="">
        <span></span>
        <h1>${selectedQuiz.title}</h1>
        `;

        const questions = selectedQuiz.questions;
        questionsQtt = questions.length;

        for(let i = 0; i < questions.length; i++) {
            questions[i].answers.sort(comparator);

            quizPage.innerHTML += `
            <div class="Question" data-identifier="question">
                <div class="Question_title" id="Question-1">
                    <h3>${questions[i].title}</h3>
                </div>
                <ul></ul>
            </div>
            `;
            const questionTitle = document.querySelectorAll('.Question_title');
            questionTitle[i].style.background = `${questions[i].color}`;
            
            quizQuestions = document.querySelectorAll('ul');
            const quizzAnswers = questions[i].answers;

            for(let j = 0; j < quizzAnswers.length; j++) {
                if (quizzAnswers[j].isCorrectAnswer === true) {
                    quizQuestions[i].innerHTML += `
                    <li class="correct" onclick="tryAnswer(this)" data-identifier="answer">
                        <img src="${quizzAnswers[j].image}" alt="">
                        <span><strong>${quizzAnswers[j].text}</strong></span>
                    </li>
                    `;
                } else {
                    quizQuestions[i].innerHTML += `
                    <li class="wrong" onclick="tryAnswer(this)" data-identifier="answer">
                        <img src="${quizzAnswers[j].image}" alt="">
                        <span><strong>${quizzAnswers[j].text}</strong></span>
                    </li>
                    `;
                }
            }
        }

        const header = document.querySelector('header');
        header.scrollIntoView();
    })
}

let totalTries = 0;
let correctAnswer = 0;

function tryAnswer(select) {
    const questionBox = select.parentNode;
    let nextQuestion = questionBox.firstElementChild;
    if (nextQuestion.classList.contains('Not_selected') || nextQuestion.nextElementSibling.classList.contains('Not_selected')) {
        return;
    }

    questionsQtt--;
    totalTries++;
    if (select.classList.contains('correct')) {
        correctAnswer++;
    }
    select.classList.add('current');

    while (true) {
        if(!nextQuestion.classList.contains('current')) {
            nextQuestion.classList.add('Not_selected');
        }
        if(nextQuestion.classList.contains('correct')) {
            nextQuestion.classList.add('Correct');
        } else {
            nextQuestion.classList.add('Incorrect');
        }
        if (nextQuestion.nextElementSibling) {
            nextQuestion = nextQuestion.nextElementSibling;
        } else {
            break;
        }
    }

    if(questionsQtt === 0) {
        const score = Math.round((correctAnswer/totalTries)*100);

        for(let i = selectedQuiz.levels.length - 1; i > -1; i--) {
            if (score >= selectedQuiz.levels[i].minValue) {
                quizPage.innerHTML += `
                <div class="Result" data-identifier="quizz-result">
                    <div class="Result_title">
                        <h3>${score}% de acerto: ${selectedQuiz.levels[i].title}</h3>
                    </div>
        
                    <div class="Result_text">
                        <img class="resultImg" src="${selectedQuiz.levels[i].image}" alt="">
                        <p><strong>${selectedQuiz.levels[i].text}</strong></p>
                    </div>
                </div>
                <div class="Buttons">
                    <button class="Restart" onclick="acessQuiz(selectedQuiz.id)">Reiniciar Quizz</button>
                    <button class="Go_to_home" onclick="location.reload()">Voltar pra home</button>
                </div>
                `;
                const result = document.querySelector('.Result');
                function scrollDown() {
                    result.scrollIntoView();
                }
                setTimeout(scrollDown, 2000);

                totalTries = 0;
                correctAnswer = 0;
                break;
            }
        }
    }
    
    setTimeout(() => {
        questionBox.parentNode.nextElementSibling.scrollIntoView();
    }, 2000);
}