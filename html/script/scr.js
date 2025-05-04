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
    const CHECKBOXES = document.querySelectorAll('input[name="question6"]:checked');
    const QUESTION6VALUES = Array.from(CHECKBOXES).map(checkbox => checkbox.value);
    const DATA = {};
    FORMDATA.forEach((value, key) => {
        DATA[key] = value;
    });
    DATA.question6 = QUESTION6VALUES;
    createTable(DATA);
    checkAnswers(DATA);
};
function createTable(data) {
    const TABLE = document.querySelector("#results");
    const TABLEBODY = document.createElement("tbody");
    const FIRSTROW = document.createElement("tr");
    FIRSTROW.innerHTML = `<th>Номер вопроса</th>
                <th>Вопрос</th>
                <th>Ваш ответ</th>
                <th>Правильный ответ</th>
                <th>Балл</th>`;
    TABLE.appendChild(TABLEBODY);
    TABLEBODY.appendChild(FIRSTROW);
    for (let i = 1; i <= 10; i++) {
        const ROW = document.createElement("tr");
        const TEXTOFQUESTION = document.querySelector(`#question-text${i}`).textContent;
        const QUESTIONTEXT = TEXTOFQUESTION.replace(/^\D*(\d+)/, '');
        if (data["question${i}"] in ['a', 'b', 'c', 'd']){
            const ID1 = data["question${i}"].toLowerCase();
            const TEXTOFANSWER = document.querySelector('#question${i}${ID1}"');
            const ID2 = data['Answers["question${i}"]'];
            const TEXTOFCORRECTANSWER = document.querySelector('#question${i}${ID2}');
        }
        else{
            const TEXTOFANSWER = data["question${i}"];
            const TEXTOFCORRECTANSWER = Answers["question${i}"];
        }

        console.log(TEXTOFANSWER);
        console.log(TEXTOFCORRECTANSWER);
        ROW.innerHTML = `
        <td>${i}</td>
        <td>${QUESTIONTEXT}</td>
        <td>${TEXTOFANSWER}</td>
        <td>${TEXTOFCORRECTANSWER}</td>`;
        TABLEBODY.appendChild(ROW);

    }
}
function checkAnswers(data) {
    for (const QUESTIONS in Answers) {
        if(QUESTIONS == "question6"){
            const USERANSWER = data[QUESTIONS];
            const CORRECTANSWER = Answers[QUESTIONS];
            if (USERANSWER === CORRECTANSWER){
                userAnswers[QUESTIONS] = 1;
            }
        }

        else if (data[QUESTIONS]){
            const USERANSWER = data[QUESTIONS];
            const CORRECTANSWER = Answers[QUESTIONS];
            if (USERANSWER.toLowerCase() == CORRECTANSWER.toLowerCase()){
                userAnswers[QUESTIONS] = 1;
            }
        }
    }
}
