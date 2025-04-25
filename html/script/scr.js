document.querySelector('#button').addEventListener('click', getFormData);
var Answers = {
    question1: "d", // Асинхронный двигатель
    question2: "b", // Предотвращение возникновения пожаров
    question3: "да", // Нужно закрывать окна при пожаре
    question4: "d", // Все перечисленное
    question5: "сообщить в службу спасения",
    question6: ["a", "d"], // Проверка проводки и датчики дыма
    question7: "a", // Электропроводку
    question8: ["101", "112"], // номер пожарной службы
    question9: "ежемесячно",
    question10: "b" // Ползком
};

function getFormData(e) {
    e.preventDefault();
    const form = document.forms.test;
    const formData = new FormData(form);

    // Преобразуем FormData в объект
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);
    createTable(data);
    checkAnswers(data);
};
function createTable(data) {
    const TABLE = document.querySelector("#results");
    const ROW = document.createElement("tr");
    ROW.innerHTML = ``;
}
function checkAnswers(data) {
    var userAnswers = {};
    for (const question in Answers) {
        if (data[question]){
            const userAnswer = data[question];
            const correctAnswer = Answers[question];
            if (userAnswer.toString().toLowerCase() === correctAnswer.toString().toLowerCase()){
                userAnswers[question] = 1;
            }
        }
    }
}
