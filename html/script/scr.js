document.querySelector('#button').addEventListener('click', getFormData);
var Answers = {
    question1: "d", // Асинхронный двигатель
    question2: "b", // Предотвращение возникновения пожаров
    question3: "да", // Нужно закрывать окна при пожаре
    question4: "d", // Все перечисленное
    question5: "сообщить в службу спасения",
    question6: ["a", "d"], // Проверка проводки и датчики дыма
    question7: "a", // Электропроводку
    question8: 'нет', // номер пожарной службы
    question9: "ежемесячно",
    question10: "b" // Ползком
};

var answerOptions = {
    question1: {
        a: "Огнетушитель",
        b: "Песок",
        c: "Ведро с водой",
        d: "Асинхронный двигатель"
    },
    question2: {
        a: "Увеличение прибыли предприятия",
        b: "Предотвращение возникновения пожаров",
        c: "Украшение помещений предупреждающими знаками",
        d: "Сокращение числа сотрудников"
    },
    question4: {
        a: "Хранить горючие материалы",
        b: "Курить",
        c: "Использовать неисправные электроприборы",
        d: "Все перечисленное"
    },
    question6: {
        a: "Регулярная проверка электропроводки на повреждения",
        b: "Хранение легковоспламеняющихся жидкостей рядом с отопительными приборами",
        c: "Использование неисправных розеток и удлинителей",
        d: "Установка датчиков дыма в жилых помещениях"
    },
    question7: {
        a: "Электропроводку",
        b: "Бумагу",
        c: "Дерево",
        d: "Ткань"
    },
    question10: {
        a: "Бегом",
        b: "Ползком",
        c: "Прыжками",
        d: "Шагом"
    }
}

var userAnswers = {
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
    question6: 0,
    question7: 0,
    question8: 0,
    question9: 0,
    question10: 0
};


function getFormData(e) {
    e.preventDefault();
    const FORM = document.forms.test;
    const FORMDATA = new FormData(FORM);
    console.log(FORMDATA);
    const CHECKBOXES = document.querySelectorAll('input[name="question6"]:checked');
    const QUESTION6VALUES = Array.from(CHECKBOXES).map(checkbox => checkbox.value);
    const DATA = {};
    FORMDATA.forEach((value, key) => {
        DATA[key] = value;
    });
    DATA.question6 = QUESTION6VALUES;
    disableForm();
    checkAnswers(DATA);
    createTable(DATA);
    createRestartButton();
};

function createRestartButton(){
    const RESTART_BUTTON = document.createElement("button");
    RESTART_BUTTON.classList.add("submit-btn");
    const BODY = document.querySelector("body");
    RESTART_BUTTON.textContent = "Повторить тест";
    RESTART_BUTTON.addEventListener("click", restartTest);
    BODY.appendChild(RESTART_BUTTON);
}

function restartTest() {
    location.reload();
}

function disableForm() {
    const formElements = document.forms.test.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }
    document.querySelector('#button').disabled = true;
}

function createTable(data) {
    const TABLE = document.querySelector("#results");
    TABLE.innerHTML = ""; // Очищаем таблицу

    // Создаем заголовок таблицы
    const HEADER_ROW = document.createElement("tr");
    HEADER_ROW.innerHTML = `
        <th>№ вопроса</th>
        <th>Вопрос</th>
        <th>Ваш ответ</th>
        <th>Правильный ответ</th>`;
    TABLE.appendChild(HEADER_ROW);

    for (let i = 1; i <= 10; i++) {
        const QUESTION_KEY = `question${i}`;
        const QUESTION_TEXT = document.querySelector(`#question-text${i}`).textContent.replace(/^\D*(\d+)/, '');

        const ROW = document.createElement("tr");

        let userAnswer = data[QUESTION_KEY] || "нет ответа";
        console.log(userAnswer);
        let correctAnswer = Answers[QUESTION_KEY];

        if ([1, 2, 4, 7, 10].includes(i)) {
            userAnswer = answerOptions[QUESTION_KEY][userAnswer] || userAnswer;
            correctAnswer = answerOptions[QUESTION_KEY][correctAnswer];
        }
        else if (i === 6) {
            userAnswer = data[QUESTION_KEY].map(val => answerOptions[QUESTION_KEY][val]).join(", ") || "нет ответа";
            correctAnswer = Answers[QUESTION_KEY].map(val => answerOptions[QUESTION_KEY][val]).join(", ");
        }
        ROW.innerHTML = `
            <td>${i}</td>
            <td>${QUESTION_TEXT}</td>
            <td>${userAnswer}</td>
            <td>${correctAnswer}</td>`;
        if (userAnswers[QUESTION_KEY] == 1) ROW.style.backgroundColor = "green";
        else if (userAnswers[QUESTION_KEY] == 0) ROW.style.background = "red";
        TABLE.appendChild(ROW);
    }
}

function checkAnswer(userAnswer, correctAnswer, isMultiple) {
    if (isMultiple) {
        if (!userAnswer || !correctAnswer) return false;
        if (userAnswer.length !== correctAnswer.length) return false;
        return userAnswer.every(val => correctAnswer.includes(val));
    } else {
        if (!userAnswer) return false;
        return userAnswer.toString().toLowerCase() === correctAnswer.toString().toLowerCase();
    }
}

function checkAnswers(data) {
    userAnswers = {};
    for (const QUESTION in Answers) {
        if (QUESTION === "question6") {
            const ISCORRECT = checkAnswer(data[QUESTION], Answers[QUESTION], true);
            userAnswers[QUESTION] = ISCORRECT ? 1 : 0;
        } else {
            const ISCORRECT = checkAnswer(data[QUESTION], Answers[QUESTION], false);
            userAnswers[QUESTION] = ISCORRECT ? 1 : 0;
        }
    }
}
