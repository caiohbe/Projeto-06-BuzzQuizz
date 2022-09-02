const urlServer = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let amountOfQuestions = 0, amountOfLevels = 0, cont = 0, filterAnswerResult = [];
let titleQuiz = '', imageQuiz = '', questionsQuiz = [], levelsQuiz = '';

function nextSection(section) {
	if (section.className.includes('First')) {
		firstSection(section);
	} else if (section.className.includes('Second')) {
		secondSection(section);
	} else if (section.className.includes('Third')) {
		thirdSection(section);
	} else if (section.className.includes('Last')) {
		lastSection(section);
	}
}

function goToHome() {
	window.location.reload();
}

function firstSection(section) {
	const Title = document.querySelector("[data-firstSection='1']");
	const ImgUrl = document.querySelector("[data-firstSection='2']");
	const Questions = document.querySelector("[data-firstSection='3']");
	const Levels = document.querySelector("[data-firstSection='4']");

	Title.style.backgroundColor = 'transparent';
	ImgUrl.style.backgroundColor = 'transparent';
	Questions.style.backgroundColor = 'transparent';
	Levels.style.backgroundColor = 'transparent';

	const title = Title.value;
	const imgUrl = ImgUrl.value;
	const questions = Questions.value;
	const levels = Levels.value;

	const titleResult = title.length > 20 && title.length < 65;
	const imgUrlResult = imgUrl.includes('https://');
	const questionsResult = Number(questions) >= 3;
	const levelsResult = Number(levels) >= 2;
	let wrong = document.querySelector('[data-firstWrong="1"]');

	for (i=0; i < 4; i++){
		wrong = document.querySelector(`[data-firstWrong="${i+1}"]`);
		wrong.innerHTML = '';
	}

	if (titleResult && imgUrlResult && questionsResult && levelsResult) {

		titleQuiz = title;
		imageQuiz = imgUrl;
		amountOfQuestions = Number(questions);
		amountOfLevels = Number(levels);

		section.classList.add('Hide');
		const secondSection = document.querySelector('.Second.Section');
		secondSection.classList.remove('Hide');
		nextSection(secondSection);
	} else {
		if (!titleResult) {		
			Title.style.backgroundColor = '#FFE9E9';
			wrong = document.querySelector('[data-firstWrong="1"]');
			wrong.innerHTML	= 'O título do quiz deve ter entre 20 e 65 caracteres';
		}

		if (!imgUrlResult) {
			ImgUrl.style.backgroundColor = '#FFE9E9';
			wrong = document.querySelector('[data-firstWrong="2"]');
			wrong.innerHTML	= 'O valor informado não é uma URL válida';
		}

		if (!questionsResult) {
			Questions.style.backgroundColor = '#FFE9E9';
			wrong = document.querySelector('[data-firstWrong="3"]');
			wrong.innerHTML	= 'O quizz deve ter no mínimo 3 perguntas';
		}

		if (!levelsResult) {
			Levels.style.backgroundColor = '#FFE9E9';
			wrong = document.querySelector('[data-firstWrong="4"]');
			wrong.innerHTML	= 'O quizz deve ter no mínimo 2 níveis';
		}
	}
}

function secondSection() {
	let form = document.querySelector('.Form_question');

	for (i = 0; i < amountOfQuestions; i++) {
		if (i === 0) {
			let firstQuestion = `            
		<div class="Options Hide" data-form="${i + 1}" onclick="toggleForm(this)">
			<h3>Pergunta 1</h3>
			<img src="images/Pencil-icon.svg" alt="">
		</div>
		<form data-form="${i + 1}">

			<h3 onclick="toggleForm(this.parentNode)">Pergunta 1</h3>
			<input type="text" placeholder="Texto da pergunta" data-secondSection='pergunta ${i + 1}'>
			<input type="text" placeholder="Cor de fundo da pergunta" data-secondSection="cor ${i + 1}">

			<h3>Resposta correta</h3>
			<input type="text" placeholder="Resposta correta" data-secondSection="resposta ${i + 1}">
			<input type="text" placeholder="URL da imagem" data-secondSection="resposta-imagem ${i + 1}">

			<h3>Respostas incorretas</h3>
			<div>
				<input type="text" placeholder="Resposta incorreta 1" data-secondSection="incorreta ${i + 1}.1">
				<input type="text" placeholder="URL da imagem 1" data-secondSection="incorreta-imagem ${i + 1}.1">
			</div>

			<div>
				<input type="text" placeholder="Resposta incorreta 2" data-secondSection="incorreta ${i + 1}.2">
				<input type="text" placeholder="URL da imagem 2" data-secondSection="incorreta-imagem ${i + 1}.2">
			</div>

			<div>
				<input type="text" placeholder="Resposta incorreta 3" data-secondSection="incorreta ${i + 1}.3">
				<input type="text" placeholder="URL da imagem 3" data-secondSection="incorreta-imagem ${i + 1}.3">
			</div>
		</form>
	`;
			form.innerHTML += firstQuestion;
		} else {
			let secondQuestion = `
		<div class="Options" data-form="${i + 1}" onclick="toggleForm(this)">
			<h3>Pergunta ${i + 1}</h3>
			<img src="images/Pencil-icon.svg" alt="">
		</div>
		<form class="Hide" data-form="${i + 1}">

			<h3 onclick="toggleForm(this.parentNode)" >Pergunta ${i + 1}</h3>
			<input type="text" placeholder="Texto da pergunta" data-secondSection='pergunta ${i + 1}'>
			<input type="text" placeholder="Cor de fundo da pergunta" data-secondSection="cor ${i + 1}">

			<h3>Resposta correta</h3>
			<input type="text" placeholder="Resposta correta" data-secondSection="resposta ${i + 1}">
			<input type="text" placeholder="URL da imagem" data-secondSection="resposta-imagem ${i + 1}">

			<h3>Respostas incorretas</h3>
			<div>
				<input type="text" placeholder="Resposta incorreta 1" data-secondSection="incorreta ${i + 1}.1">
				<input type="text" placeholder="URL da imagem 1" data-secondSection="incorreta-imagem ${i + 1}.1">
			</div>

			<div>
				<input type="text" placeholder="Resposta incorreta 2" data-secondSection="incorreta ${i + 1}.2">
				<input type="text" placeholder="URL da imagem 2" data-secondSection="incorreta-imagem ${i + 1}.2">
			</div>

			<div>
				<input type="text" placeholder="Resposta incorreta 3" data-secondSection="incorreta ${i + 1}.3">
				<input type="text" placeholder="URL da imagem 3" data-secondSection="incorreta-imagem ${i + 1}.3">
			</div>
		</form>
	`;
			form.innerHTML += secondQuestion;
		}
	}
}

function validSecondSection(section) {
	let questions = [];
	for (i = 0; i < amountOfQuestions; i++) {

		let question = {
			title: document.querySelector(`[data-secondSection='pergunta ${i + 1}']`).value,
			color: document.querySelector(`[data-secondSection='cor ${i + 1}']`).value,
			answers: [
				{
					text: document.querySelector(`[data-secondSection='resposta ${i + 1}']`).value,
					image: document.querySelector(`[data-secondSection='resposta-imagem ${i + 1}']`).value,
					isCorrectAnswer: true
				},
				{
					text: document.querySelector(`[data-secondSection='incorreta ${i + 1}.1']`).value,
					image: document.querySelector(`[data-secondSection='incorreta-imagem ${i + 1}.1']`).value,
					isCorrectAnswer: false
				},
				{
					text: document.querySelector(`[data-secondSection='incorreta ${i + 1}.2']`).value,
					image: document.querySelector(`[data-secondSection='incorreta-imagem ${i + 1}.2']`).value,
					isCorrectAnswer: false
				},
				{
					text: document.querySelector(`[data-secondSection='incorreta ${i + 1}.3']`).value,
					image: document.querySelector(`[data-secondSection='incorreta-imagem ${i + 1}.3']`).value,
					isCorrectAnswer: false
				}
			]
		};

		let titleResult = question.title.length >= 20;
		let colorResult = question.color.length === 7 && question.color[0] === '#';
		let answerResult = '';
		let problem = [];
		let cont = i;

		filterAnswers(question)
		i = cont;
		if (filterAnswerResult[0].text === '') {
			answerResult = false;
		} else {
			answerResult = filterAnswerResult[0].text.length > 0 && (filterAnswerResult[1].text.length > 0 || filterAnswerResult[2].text.length > 0 || filterAnswerResult[3].text.length > 0);
		}

		if (titleResult && colorResult && answerResult) {
			
			question.answers = filterAnswerResult;
			questions.push(question);
			
			if (questions.length === amountOfQuestions) {
				questionsQuiz = questions;
				section.classList.add('Hide');
				const thirdSection = document.querySelector('.Third.Section');
				thirdSection.classList.remove('Hide');
				nextSection(thirdSection);
			}
		} else {
			if (!titleResult) {
				problem.push(`Título da questão ${i + 1}`);
			}
			if (!colorResult) {
				problem.push(`cor da questão ${i + 1}`);
			}
			if (!answerResult) {
				problem.push(`Perguntas da questão ${i + 1}`);
			}
			alert(`Os seguintes dados não foram preenchidos corretamente: ${problem.join(', ')}`)
		}
		cont = 0;
		filterAnswerResult = []
	}
}

function filterAnswers(question) {
	let mark = 0;
	for (l = 0; l < question.answers.length; l++) {
		let answer = question.answers[l].text.length > 0 && question.answers[l].image.includes('https://');

		if (l === 0 && answer) {
			mark = 1;
		}

		if (mark === 1) {
			if (!answer) {
				question.answers[l].text = '';
				question.answers[l].image = '';
			}

			if (l === question.answers.length - 1) {
				for (k = 0; k < question.answers.length; k++) {
					if (k === 0 && question.answers[k].text !== '') {
						filterAnswerResult.push({
							text: question.answers[k].text,
							image: question.answers[k].image,
							isCorrectAnswer: true
						});
					} else if(question.answers[k].text !== '') {
						filterAnswerResult.push({
							text: question.answers[k].text,
							image: question.answers[k].image,
							isCorrectAnswer: false
						});
					}else if (k === question.answers.length -1 && filterAnswerResult.length < 2) {
						alert(`Os seguintes dados não foram preenchidos corretamente: Perguntas`)
					}

				}
			}
		} else {
			question.answers[l].text = '';
			question.answers[l].image = '';
			if (l === question.answers.length - 1) {
				for (i = 0; i < question.answers.length; i++) {
					filterAnswerResult.push({
						text: question.answers[i].text,
						image: question.answers[i].image,
						isCorrectAnswer: false
					});
				}
			}
		}
	}
}

function toggleForm(form) {
	let data = form.dataset.form;
	let show = document.querySelectorAll(`[data-form='${data}']`);

	for (i = 0; i < show.length; i++) {
		let option = show[i];
		option.classList.toggle('Hide');
	}
}

function thirdSection() {
	let form = document.querySelector('.Third_Form_Question');

	for (i = 0; i < amountOfLevels; i++) {
		if (i === 0) {
			let firstQuestion = `            
			<div>
				<div data-third-form="${i + 1}" class="Options Hide" onclick="toggleThirdForm(this)">
					<h3>Nível ${i + 1}</h3>
					<img src="images/Pencil-icon.svg" alt="">
				</div>
				<form data-third-form="${i + 1}">
					<h3 onclick="toggleThirdForm(this.parentNode)">Nível ${i + 1}</h3>
					<input type="text" placeholder="Título do nível" data-thirdSection="titulo ${i + 1}">
					<input type="text" placeholder="% de acerto mínima" data-thirdSection="porcentagem ${i + 1}">
					<input type="text" placeholder="URL da imagem do nível" data-thirdSection="imagem ${i + 1}">
					<input type="text" placeholder="Descrição do nível" data-thirdSection="descricao ${i + 1}">
				</form>
			</div>
	`;
			form.innerHTML += firstQuestion;
		} else {
			let secondQuestion = `
			<div">
				<div data-third-form="${i + 1}" class="Options" onclick="toggleThirdForm(this)">
					<h3>Nível ${i + 1}</h3>
					<img src="images/Pencil-icon.svg" alt="">
				</div>
				<form data-third-form="${i + 1}" class="Hide">
					<h3 onclick="toggleThirdForm(this.parentNode)">Nível ${i + 1}</h3>
					<input type="text" placeholder="Título do nível" data-thirdSection="titulo ${i + 1}">
					<input type="text" placeholder="% de acerto mínima" data-thirdSection="porcentagem ${i + 1}">
					<input type="text" placeholder="URL da imagem do nível" data-thirdSection="imagem ${i + 1}">
					<input type="text" placeholder="Descrição do nível" data-thirdSection="descricao ${i + 1}">
				</form>
			</div>
	`;
			form.innerHTML += secondQuestion;
		}
	}
}

function validThirdSection(section) {
	let levels = [];
	for (i = 0; i < amountOfLevels; i++) {

		let level = {
			title: document.querySelector(`[data-thirdSection='titulo ${i + 1}']`).value,
			image: document.querySelector(`[data-thirdSection='imagem ${i + 1}']`).value,
			text: document.querySelector(`[data-thirdSection='descricao ${i + 1}']`).value,
			minValue: document.querySelector(`[data-thirdSection='porcentagem ${i + 1}']`).value
		};

		if (level.minValue) {
			level.minValue = Number(level.minValue);
		} else {
			level.minValue = -1;
		}

		let titleResult = level.title.length >= 10;
		let minValueResult = level.minValue >= 0 && level.minValue <= 100;
		let imageResult = level.image.includes('https://');
		let textResult = level.text.length >= 30;
		let problem = [];

		if (titleResult && minValueResult && imageResult && textResult) {
			levels.push(level);

			if (levels.length === amountOfLevels) {
				let cont = [];
				for (l = 0; l < levels.length; l++) {
					if (levels[l].minValue === 0) {
						cont.push(0);					
					} 
					
					if ((cont.indexOf(0) > -1) && l === levels.length - 1) {
						levelsQuiz = levels;
						section.classList.add('Hide');
						const lastSection = document.querySelector('.Last.Section');
						nextSection(lastSection);
					}else if (l === levels.length - 1) {
						alert('Pelo menos um nível deve ter porcentagem 0');
					}
				}
			}
		} else {
			if (!titleResult) {
				problem.push(`Título do nível ${i + 1}`);
			}
			if (!minValueResult) {
				problem.push(`Porcentagem do nível ${i + 1}`);
			}
			if (!imageResult) {
				problem.push(`Url da imagem do nível ${i + 1}`);
			}
			if (!textResult) {
				problem.push(`Descrição do nível ${i + 1}`);
			}
			alert(`Os seguintes dados não foram preenchidos corretamente: ${problem.join(', ')}`)
		}
	}
}

function toggleThirdForm(form) {
	let data = form.dataset.thirdForm;
	let show = document.querySelectorAll(`[data-third-form="${data}"]`);

	for (i = 0; i < show.length; i++) {
		let option = show[i];
		option.classList.toggle('Hide');
	}
}

function lastSection() {
	let quiz = {
		title: titleQuiz,
		image: imageQuiz,
		questions: questionsQuiz,
		levels: levelsQuiz
	};
	const quizServer = axios.post(urlServer, quiz);
	quizServer.then(sendQuiz);
	quizServer.catch(error);
}

function error(error) {
	alert(`Ocorreu o erro de código ${error.response.status}`);
}


let userQuizArray = [] // Array que vai guardar os quizzes no localStorage
let stringedArray = JSON.stringify(userQuizArray) // Dentro do JSON vai a variável com a array vazia
localStorage.setItem("emptyArray", stringedArray) // Armazenando a string da array

let arrayQuizzes = localStorage.getItem("quizzesUser") // Pegando de volta a primeira array em forma de string
let quizzesUserArray = JSON.parse(arrayQuizzes) // Transformando a string em array de novo

function sendQuiz(response) {
	let quiz = response.data;

	let arrayLocalStorage = localStorage.getItem("emptyArray") // Pegando de volta a array vazia em forma de string
	let quizzesArray = JSON.parse(arrayLocalStorage) // Transformando a string em array de novo

	quizzesArray.push(quiz)

	let stringedArrayOne = JSON.stringify(quizzesArray) // Dentro do JSON vai a variável da array com o quiz
	localStorage.setItem("quizzesUser", stringedArrayOne) // Armazenando a string da array (daqui vai pro index.js)

	if (quizzesUserArray !== null) {
		quizzesUserArray.push(quiz)
	
		let stringedArray = JSON.stringify(quizzesUserArray) // Dentro do JSON vai a variável com a array de objetos
		localStorage.setItem("quizzesUser", stringedArray) // Armazenando a string da array (daqui vai pro index.js)
	}
		
	/* EXIBINDO A ÚLTIMA SEÇÃO */
	const lastSection = document.querySelector('.Last.Section');
	lastSection.classList.remove('Hide');

	/* MOSTRANDO O QUIZ */
	const divQuiz = document.querySelector('.Show_quiz');
	divQuiz.innerHTML = `
        <div class="My_quiz">
			<span></span>
            <h4>${quiz.title}</h4>
        </div>
    `;
	
	/* COLOCANDO A IMAGEM DE FUNDO DO QUIZ */
	let myQuiz = document.querySelector('.My_quiz');
	myQuiz.style.backgroundImage = `url('${quiz.image}')`;

	/* PEGANDO A PARTE DE BOTÕES */
	let buttons = document.getElementById('Create_Page__Buttons');

	/* ADICIONANDO OS BOTÕES */
	buttons.innerHTML = `
	<button class="Last_section_btn" onclick="acessQuiz(${quiz.id})">Acessar Quizz</button>
	<button class="Go_to_home" onclick="goToHome()">Voltar pra home</button>
	`

	/* OBS: acessQuiz É A FUNÇÃO QUE VAI CARREGAR A PÁGINA DO QUIZ CRIADO
	goToHome É A PARTE QUE PEDI PARA O ESDRAS TERMINAR, ESSA FUNÇÃO JÁ REDIRECIONA
	PARA A PÁGINA INICIAL, MAS AINDA NÃO RECARREGA OS QUIZZES */
}