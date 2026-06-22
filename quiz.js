// ==================== কুইজ অ্যাপ ====================

let questions = [
    { q: "JavaScript কী ধরনের ভাষা?", opts: ["Compiled", "Interpreted", "Machine", "Assembly"], ans: 1 },
    { q: "let x = 5; x = 'hello'; এটা কি ঠিক?", opts: ["ঠিক", "ভুল", "Error দেবে", "কিছুই না"], ans: 0 },
    { q: "console.log(typeof []) কী দেখাবে?", opts: ["array", "object", "undefined", "null"], ans: 1 },
    { q: "== আর === এর মধ্যে পার্থক্য কী?", opts: ["কোনো পার্থক্য নেই", "== টাইপ চেক করে", "=== টাইপ চেক করে", "দুটোই ভুল"], ans: 2 },
    { q: "document.getElementById() কী করে?", opts: ["ক্লাস ধরে", "ID ধরে", "ট্যাগ ধরে", "সব ধরে"], ans: 1 },
    { q: "localStorage.setItem() দিয়ে কী করা যায়?", opts: ["ডাটা ডিলিট", "ডাটা সেইভ", "ডাটা প্রিন্ট", "কিছুই না"], ans: 1 },
    { q: "NaN কী?", opts: ["একটা নাম্বার", "Not a Number", "Null", "Array"], ans: 1 },
    { q: "null === undefined কী রিটার্ন করবে?", opts: ["true", "false", "null", "undefined"], ans: 1 },
    { q: "Array-তে নতুন আইটেম যোগ করতে কোন মেথড?", opts: ["pop()", "push()", "shift()", "slice()"], ans: 1 },
    { q: "addEventListener দিয়ে কী করা হয়?", opts: ["স্টাইল বদলানো", "ইভেন্ট শোনা", "ডাটা সেইভ", "কিছুই না"], ans: 1 }
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadBest() {
    let best = localStorage.getItem("quizBest") || "--";
    document.getElementById("quizBest").textContent = best;
}

function startTimer() {
    timeLeft = 15;
    document.getElementById("timerText").textContent = "⏰ " + timeLeft + " সেকেন্ড";
    document.getElementById("timerBar").style.width = "100%";
    document.getElementById("timerBar").style.background = "#22c55e";

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timerText").textContent = "⏰ " + timeLeft + " সেকেন্ড";
        let percent = (timeLeft / 15) * 100;
        document.getElementById("timerBar").style.width = percent + "%";

        if (timeLeft <= 5) document.getElementById("timerBar").style.background = "#ef4444";
        else if (timeLeft <= 10) document.getElementById("timerBar").style.background = "#f59e0b";

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoNext();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function loadQuestion() {
    if (currentQ >= questions.length) {
        showResult();
        return;
    }

    let q = questions[currentQ];
    document.getElementById("quizQno").textContent = (currentQ + 1) + "/" + questions.length;
    document.getElementById("quizQuestion").textContent = q.q;
    document.getElementById("quizScore").textContent = score;
    document.getElementById("nextBtn").style.display = "none";

    let optDiv = document.getElementById("quizOptions");
    optDiv.innerHTML = "";

    q.opts.forEach(function(opt, i) {
        let btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.textContent = opt;
        btn.onclick = function() { selectAnswer(i); };
        optDiv.appendChild(btn);
    });

    startTimer();
}

function selectAnswer(idx) {
    stopTimer();

    let q = questions[currentQ];
    let btns = document.querySelectorAll(".quiz-opt-btn");

    btns.forEach(function(btn, i) {
        btn.disabled = true;
        if (i === q.ans) btn.classList.add("correct");
        if (i === idx && idx !== q.ans) btn.classList.add("wrong");
    });

    if (idx === q.ans) {
        score++;
        document.getElementById("quizScore").textContent = score;
    }

    document.getElementById("nextBtn").style.display = "block";
}

function autoNext() {
    let q = questions[currentQ];
    let btns = document.querySelectorAll(".quiz-opt-btn");
    btns.forEach(function(btn, i) {
        btn.disabled = true;
        if (i === q.ans) btn.classList.add("correct");
    });
    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    currentQ++;
    loadQuestion();
}

function showResult() {
    document.getElementById("quizQno").textContent = "শেষ";
    document.getElementById("quizQuestion").textContent = "";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("timerText").textContent = "";
    document.getElementById("timerBar").style.width = "0%";

    let total = questions.length;
    let percent = Math.round((score / total) * 100);
    let msg = "";

    if (percent >= 80) msg = "🌟 অসাধারণ! তুমি সেরা!";
    else if (percent >= 60) msg = "👍 ভালো করেছো!";
    else if (percent >= 40) msg = "📚 আরও প্র্যাকটিস করতে হবে!";
    else msg = "💪 চেষ্টা চালিয়ে যাও!";

    let resultDiv = document.getElementById("quizResult");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <h2>${msg}</h2>
        <p>তোমার স্কোর: <strong>${score}</strong> / ${total}</p>
        <p>শতকরা: <strong>${percent}%</strong></p>
        <button class="btn-primary" onclick="restartQuiz()">🔄 আবার খেলো</button>
    `;

    // বেস্ট স্কোর
    let best = localStorage.getItem("quizBest") || 0;
    if (score > parseInt(best)) {
        localStorage.setItem("quizBest", score);
        document.getElementById("quizBest").textContent = score;
    }
}

function restartQuiz() {
    currentQ = 0;
    score = 0;
    document.getElementById("quizResult").style.display = "none";
    document.getElementById("quizScore").textContent = "0";
    loadQuestion();
}

// শুরু
loadBest();
loadQuestion();