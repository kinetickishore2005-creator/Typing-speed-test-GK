const quotes = [

"Practice makes a person perfect.",
"Success comes to those who work hard.",
"Frontend development is creative and powerful.",
"Typing faster improves productivity and confidence.",
"JavaScript makes websites interactive and dynamic."

];

const quote = document.getElementById("quote");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progressBar");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const themeBtn = document.getElementById("themeBtn");

let timer = 60;
let interval = null;
let started = false;
let currentQuote = "";
let mistakes = 0;

function loadQuote(){

    currentQuote =
        quotes[Math.floor(Math.random() * quotes.length)];

    quote.innerText = currentQuote;
}

loadQuote();

function startTimer(){

    interval = setInterval(() => {

        timer--;

        timeDisplay.innerText = timer;

        if(timer <= 0){

            clearInterval(interval);

            input.disabled = true;
        }

    },1000);
}

input.addEventListener("input", () => {

    if(!started){

        startTimer();

        started = true;
    }

    const typedText = input.value;

    let correctChars = 0;

    mistakes = 0;

    for(let i = 0; i < typedText.length; i++){

        if(typedText[i] === currentQuote[i]){

            correctChars++;

        }else{

            mistakes++;
        }
    }

    mistakesDisplay.innerText = mistakes;

    const words =
        typedText.trim().split(" ").length;

    const timeSpent = 60 - timer;

    const wpm =
        timeSpent > 0
        ? Math.round((words / timeSpent) * 60)
        : 0;

    const accuracy =
        typedText.length > 0
        ? Math.round((correctChars / typedText.length) * 100)
        : 100;

    wpmDisplay.innerText = wpm;

    accuracyDisplay.innerText = accuracy + "%";

    const progress =
        (typedText.length / currentQuote.length) * 100;

    progressBar.style.width = progress + "%";
});

restartBtn.addEventListener("click", () => {

    clearInterval(interval);

    timer = 60;

    started = false;

    input.disabled = false;

    input.value = "";

    timeDisplay.innerText = 60;

    wpmDisplay.innerText = 0;

    accuracyDisplay.innerText = "100%";

    mistakesDisplay.innerText = 0;

    progressBar.style.width = "0%";

    loadQuote();
});

newQuoteBtn.addEventListener("click", () => {

    input.value = "";

    progressBar.style.width = "0%";

    loadQuote();
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerText = "☀ Light Mode";

    }else{

        themeBtn.innerText = "🌙 Dark Mode";
    }
});