const quizData = [
    {
        question: "How many people live in the home?",
        zero: "1",
        five: "2",
        ten: "3 or 4",
        fifteen: "5 or more",
    },
    {
        question: "How many are children?",
        zero: "0",
        five: "1",
        ten: "2",
        fifteen: "3 or more",
    },
    {
        question: "Do you wear shoes in the home?",
        zero: "No",
        five: "Seldom",
        ten: "Occasionally",
        fifteen: "Often",
    },
    {
        question: "How often do you have guests over?",
        zero: "Never",
        five: "Seldom",
        ten: "Occasionally",
        fifteen: "Often",
    },
    {
        question: "How many guests at a time?",
        zero: "0",
        five: "1 to 2",
        ten: "3 to 4",
        fifteen: "5 or more",
    },
    {
        question: "How many cats in the home?",
        zero: "0",
        five: "1 to 2",
        ten: "3 to 4",
        fifteen: "5 or more",
    },
    {
        question: "How many dogs in the home?",
        zero: "0",
        five: "1",
        ten: "2",
        fifteen: "3 or more",
    },
    {
        question: "How many years until you plan on moving?",
        zero: "0",
        five: "1 to 2",
        ten: "3 to 10",
        fifteen: "11 or more",
    },
    {
        question: "How many years do you expect your flooring to last?",
        zero: "0",
        five: "1 to 5",
        ten: "6 to 10",
        fifteen: "11 or more",
    },
    {
        question: "If you were to sell your home, how much would you expect to get?",
        zero: "<$50,000",
        five: "$50,000 - $100,000",
        ten: "$100,000 - $200,000",
        fifteen: "$200,000+",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const zeroText = document.getElementById("0_text");
const fiveText = document.getElementById("5_text");
const tenText = document.getElementById("10_text");
const fifteenText = document.getElementById("15_text");
const submitBtn = document.getElementById("submit");
const loader = document.querySelector(".loader");
const recSection = document.getElementById("rec_products");

let currentQuiz = 0;
let score = 0;
let rating = "";
let userAnswers = [];

renderQuiz();

function renderQuiz() {
    recSection.style.display = "none";
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    zeroText.innerText = currentQuizData.zero;
    fiveText.innerText = currentQuizData.five;
    tenText.innerText = currentQuizData.ten;
    fifteenText.innerText = currentQuizData.fifteen;
};

function deselectAnswers() {
    answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = Number(answerEl.id);
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer || answer === 0) {
        score += answer;
        currentQuiz++;
        userAnswers.push(answer);

        if(currentQuiz < quizData.length) {
            setTimeout(() => {
                renderQuiz();
                loader.style.display = "none";
            }, 500);
            questionEl.innerText = "Loading Next Question...";
            loader.style.display = "flex";
            
        } else {
            setTimeout(() => {
                quiz.innerHTML = `
            <div class="quiz_header">
            <h2 id="question">Your Floor Score is: ${score}</h2>
            <div class="results">
                            <h3 class="value">VALUE: 0 - 35</h3>
                            <p>Selling soon, rentals & barely used areas</p>
                            <h3 class="good">GOOD: 35 - 55</h3>
                            <p>Light traffic to medium traffic</p>
                            <h3 class="better">BETTER: 60 - 70</h3>
                            <p>Medium traffic & better feel</p>
                            <h3 class="best">BEST: 75 - 80</h3>
                            <p>High traffic & less upkeep</p>
                            <h3 class="npr">NO PET REGRET: 85+</h3>
                            <p>Superior cleanability & waterproof backing</p>
                        </div>
            <button id="submit" onclick="location.reload()">Reload</button>
            <h2>Scroll Down For Some Recommendations!</h2>
            </div>
            `;
            results();
                loader.style.display = "none";
            }, 500);
            questionEl.innerText = "Loading Results...";
            loader.style.display = "flex";
        }
    }
});

function results() {

    if (score < 35) {
        document.querySelector(".value").classList += " highlight";
        rating = "Value";
    } else if (score > 35 && score < 56) {
        document.querySelector(".good").classList += " highlight";
        rating = "Good";
    } else if (score > 59 && score < 71) {
        document.querySelector(".better").classList += " highlight";
        rating = "Better";
    } else if (score > 74 && score < 81) {
        document.querySelector(".best").classList += " highlight";
        rating = "Best";
    } else if (score > 84) {
        document.querySelector(".npr").classList += " highlight";
        rating = "NPR";
    }
    

    let storage = JSON.parse(localStorage.getItem("userQuizData")) || [];
    let newItem = {
        score: score,
        date: Date(),
        completed: true,
    };
    //Delete any old data
    storage.splice(0, 1);
    storage.push(newItem);
    localStorage.setItem("userQuizData", JSON.stringify(storage));

   renderProducts();
}

async function renderProducts() {
    const hardwoodEl = document.querySelector(".hardwood");
    const carpetProducts = document.querySelector(".carpet_products");
    const lvpProducts = document.querySelector(".lvp_products");
    const hardProducts = document.querySelector(".hardwood_products");

    recSection.style.display = "block";

    if (rating === "NPR" || rating === "Good" || userAnswers[6] >= 10) {
        hardwoodEl.style.display = "none";
    }
    
    if (userAnswers[6] <= 5 && userAnswers[9] === 15 && rating !== "NPR" && rating !== "Good") {
        hardwoodEl.style.display = "flex";
    }

    try {
        const response = await fetch('../products.json');
        const data = await response.json();

        const preCarpetData = data.filter(product => product.productType === "Carpet");
        const preLvpData = data.filter(product => product.productType === "LVP");
        const preHardData = data.filter(product => product.productType === "Hardwood");

        const carpetData = preCarpetData.filter(product => product.rating === rating);
        const lvpData = preLvpData.filter(product => product.rating === rating);
        const hardData = preHardData.filter(product => product.rating === rating);
        console.log(carpetData);
        console.log(lvpData);
        console.log(hardData);

        for (let i = 0; i < 4; i++) {
            carpetProducts.innerHTML += `
            <a class="product_wrapper" href=itemPage.html onclick="selectedProduct(${carpetData[i].sfnStyleNumber})"><div class="product">
            <img class="product_image" src="../${carpetData[i].image}" alt="No Image">
            <h3 class="product_name">${carpetData[i].sfnName}</h3>
            </div></a>`; 

            lvpProducts.innerHTML += `
            <a class="product_wrapper" href=itemPage.html onclick="selectedProduct(${lvpData[i].sfnStyleNumber})"><div class="product">
            <img class="product_image" src="../${lvpData[i].image}" alt="No Image">
            <h3 class="product_name">${lvpData[i].sfnName}</h3>
            </div></a>`;

            if (userAnswers[6] <= 5 && userAnswers[9] === 15 && rating !== "NPR" && rating !== "Good") {
                hardProducts.innerHTML += `
                <a class="product_wrapper" href=itemPage.html onclick="selectedProduct(${hardData[i].sfnStyleNumber})"><div class="product">
                <img class="product_image" src="../${hardData[i].image}" alt="No Image">
                <h3 class="product_name">${hardData[i].sfnName}</h3>
                </div></a>`;
            }
        }

    } catch (error) {
        console.log(error);
    }
}