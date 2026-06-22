// ==================== প্রো কুইজ (নো রিপিট) ====================

let allQuestions = [
    // বাংলাদেশ
    { c: "🇧🇩 বাংলাদেশ", q: "বাংলাদেশের রাজধানী?", o: ["চট্টগ্রাম","ঢাকা","খুলনা","রাজশাহী"], a: 1 },
    { c: "🇧🇩 বাংলাদেশ", q: "জাতীয় ফুল?", o: ["গোলাপ","শাপলা","সূর্যমুখী","জবা"], a: 1 },
    { c: "🇧🇩 বাংলাদেশ", q: "জাতীয় পাখি?", o: ["কাক","দোয়েল","টিয়া","চড়ুই"], a: 1 },
    { c: "🇧🇩 বাংলাদেশ", q: "মুক্তিযুদ্ধ শুরু?", o: ["১৯৫২","১৯৬৯","১৯৭১","১৯৭৫"], a: 2 },
    { c: "🇧🇩 বাংলাদেশ", q: "মুদ্রার নাম?", o: ["রুপি","টাকা","ডলার","ইউরো"], a: 1 },
    { c: "🇧🇩 বাংলাদেশ", q: "সংসদ ভবনের স্থপতি?", o: ["লুই কান","এফ আর খান","মাজহারুল","রবিউল"], a: 0 },
    // বিশ্ব
    { c: "🌍 বিশ্ব", q: "বৃহত্তম মহাদেশ?", o: ["আফ্রিকা","এশিয়া","ইউরোপ","অস্ট্রেলিয়া"], a: 1 },
    { c: "🌍 বিশ্ব", q: "বৃহত্তম মহাসাগর?", o: ["আটলান্টিক","ভারত","প্রশান্ত","উত্তর"], a: 2 },
    { c: "🌍 বিশ্ব", q: "সর্বোচ্চ পর্বত?", o: ["কিলিমাঞ্জারো","এভারেস্ট","আল্পস","ফুজি"], a: 1 },
    { c: "🌍 বিশ্ব", q: "গভীরতম স্থান?", o: ["ডেড সি","মারিয়ানা ট্রেঞ্চ","বৈকাল","লোহিত"], a: 1 },
    // ইতিহাস
    { c: "📜 ইতিহাস", q: "প্রথম বিশ্বযুদ্ধ শুরু?", o: ["১৯১০","১৯১৪","১৯১৮","১৯৩৯"], a: 1 },
    { c: "📜 ইতিহাস", q: "দ্বিতীয় বিশ্বযুদ্ধ শেষ?", o: ["১৯৪২","১৯৪৩","১৯৪৫","১৯৪৭"], a: 2 },
    { c: "📜 ইতিহাস", q: "বাংলাদেশ স্বাধীন?", o: ["১৯৪৭","১৯৫২","১৯৭১","১৯৭৫"], a: 2 },
    // গণিত
    { c: "🔢 গণিত", q: "২^৮ = ?", o: ["১২৮","২৫৬","৫১২","১০২৪"], a: 1 },
    { c: "🔢 গণিত", q: "১ KB = কত বাইট?", o: ["১০০","১০০০","১০২৪","৫১২"], a: 2 },
    { c: "🔢 গণিত", q: "১ GB = কত MB?", o: ["১০০","৫১২","১০২৪","২০৪৮"], a: 2 },
    { c: "🔢 গণিত", q: "১ মিনিট = কত সেকেন্ড?", o: ["১০০","৩০","৬০","৯০"], a: 2 },
    { c: "🔢 গণিত", q: "১০০ ÷ ৪ = ?", o: ["২০","২৫","৩০","১৫"], a: 1 },
    // বিজ্ঞান
    { c: "🔬 বিজ্ঞান", q: "পানির সংকেত?", o: ["H2O","CO2","NaCl","O2"], a: 0 },
    { c: "🔬 বিজ্ঞান", q: "আলোর বেগ (প্রায়)?", o: ["১ লক্ষ","৩ লক্ষ","৫ লক্ষ","১০ লক্ষ"], a: 1 },
    { c: "🔬 বিজ্ঞান", q: "রক্ত লাল কেন?", o: ["প্লাজমা","হিমোগ্লোবিন","শ্বেতকণিকা","অণুচক্রিকা"], a: 1 },
    { c: "🔬 বিজ্ঞান", q: "হার্টে চেম্বার?", o: ["২","৩","৪","৫"], a: 2 },
    { c: "🔬 বিজ্ঞান", q: "সূর্যালোকে ভিটামিন?", o: ["A","B","C","D"], a: 3 },
    // ইংরেজি
    { c: "📖 ইংরেজি", q: "Synonym of 'Happy'?", o: ["Sad","Joyful","Angry","Tired"], a: 1 },
    { c: "📖 ইংরেজি", q: "Past tense of 'go'?", o: ["goed","went","gone","going"], a: 1 },
    { c: "📖 ইংরেজি", q: "Plural of 'child'?", o: ["childs","childes","children","child"], a: 2 },
    // বাংলা
    { c: "📝 বাংলা", q: "বাংলা বর্ণমালায় মোট বর্ণ?", o: ["৪৪","৪৮","৫০","৫২"], a: 2 },
    { c: "📝 বাংলা", q: "'স্বাধীনতা' সন্ধি বিচ্ছেদ?", o: ["স্ব+অধীনতা","স্ব+হীনতা","স্ব+ধীনতা","স্বাধ+হীনতা"], a: 0 },
    // প্রযুক্তি
    { c: "💻 প্রযুক্তি", q: "HTML পূর্ণরূপ?", o: ["HyperText Markup Language","HighText Machine","Hyper Trainer","None"], a: 0 },
    { c: "💻 প্রযুক্তি", q: "CSS দিয়ে কী হয়?", o: ["লজিক","ডিজাইন","ডাটাবেস","সার্ভার"], a: 1 },
    { c: "💻 প্রযুক্তি", q: "JavaScript ধরন?", o: ["Compiled","Interpreted","Machine","Assembly"], a: 1 },
    { c: "💻 প্রযুক্তি", q: "GitHub কী?", o: ["গেম","সোশ্যাল","কোড হোস্টিং","অ্যাপ"], a: 2 },
    { c: "💻 প্রযুক্তি", q: "npm পূর্ণরূপ?", o: ["Node Package Manager","New Program","Network Protocol","None"], a: 0 },
    { c: "💻 প্রযুক্তি", q: "localStorage কী?", o: ["সার্ভার","ব্রাউজার স্টোরেজ","ডাটাবেস","ফাইল"], a: 1 },
];

let questions = [];
let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 20;
let answered = [];

// Fisher-Yates shuffle (কোনো রিপিট হবে না)
function getRandomQuestions(arr, count) {
    let shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

function loadBest() {
    document.getElementById("quizBest").textContent = localStorage.getItem("proQuizBest") || "--";
}

function startTimer() {
    stopTimer();
    timeLeft = 20;
    document.getElementById("timerText").textContent = "⏰ " + timeLeft + " সে.";
    document.getElementById("timerBar").style.width = "100%";
    document.getElementById("timerBar").style.background = "#22c55e";
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timerText").textContent = "⏰ " + timeLeft + " সে.";
        let p = (timeLeft / 20) * 100;
        document.getElementById("timerBar").style.width = p + "%";
        if (timeLeft <= 5) document.getElementById("timerBar").style.background = "#ef4444";
        else if (timeLeft <= 10) document.getElementById("timerBar").style.background = "#f59e0b";
        if (timeLeft <= 0) { stopTimer(); autoNext(); }
    }, 1000);
}

function stopTimer() { clearInterval(timer); }

function loadQuestion() {
    if (currentQ >= questions.length) { showResult(); return; }
    let q = questions[currentQ];
    document.getElementById("quizQno").textContent = (currentQ + 1) + "/" + questions.length;
    document.getElementById("quizCategory").textContent = q.c;
    document.getElementById("quizQuestion").textContent = q.q;
    document.getElementById("quizScore").textContent = score;

    let pct = (currentQ / questions.length) * 100;
    document.getElementById("quizProgressBar").style.width = pct + "%";

    let optDiv = document.getElementById("quizOptions");
    optDiv.innerHTML = "";
    q.o.forEach(function(opt, i) {
        let btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.textContent = opt;
        if (answered[currentQ] !== undefined) {
            btn.disabled = true;
            if (i === q.a) btn.classList.add("correct");
            if (i === answered[currentQ] && i !== q.a) btn.classList.add("wrong");
        } else {
            btn.onclick = function() { selectAnswer(i); };
        }
        optDiv.appendChild(btn);
    });

    document.getElementById("prevBtn").style.display = currentQ > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display = answered[currentQ] !== undefined ? "inline-block" : "none";

    if (answered[currentQ] === undefined) startTimer();
    else stopTimer();
}

function selectAnswer(idx) {
    stopTimer();
    let q = questions[currentQ];
    answered[currentQ] = idx;
    if (idx === q.a) score++;
    document.getElementById("quizScore").textContent = score;
    loadQuestion();
}

function autoNext() {
    if (answered[currentQ] === undefined) answered[currentQ] = -1;
    loadQuestion();
}

function nextQuestion() {
    if (currentQ < questions.length - 1) { currentQ++; loadQuestion(); }
}

function prevQuestion() {
    if (currentQ > 0) { currentQ--; loadQuestion(); }
}

function showResult() {
    stopTimer();
    document.getElementById("quizQuestion").textContent = "";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("timerText").textContent = "";
    document.getElementById("timerBar").style.width = "0%";
    document.getElementById("quizProgressBar").style.width = "100%";
    document.getElementById("quizQno").textContent = "শেষ";
    document.getElementById("quizCategory").textContent = "";

    let total = questions.length;
    let pct = Math.round((score / total) * 100);
    let msg = pct >= 80 ? "🌟 অসাধারণ!" : pct >= 60 ? "👍 ভালো!" : pct >= 40 ? "📚 প্র্যাকটিস দরকার!" : "💪 চেষ্টা চালাও!";

    document.getElementById("quizResult").style.display = "block";
    document.getElementById("quizResult").innerHTML = `
        <h2>${msg}</h2>
        <p>স্কোর: <strong>${score}</strong> / ${total}</p>
        <p>শতকরা: <strong>${pct}%</strong></p>
        <button class="btn-primary" onclick="restartQuiz()">🔄 আবার খেলো</button>
    `;

    let best = parseInt(localStorage.getItem("proQuizBest") || 0);
    if (score > best) { localStorage.setItem("proQuizBest", score); document.getElementById("quizBest").textContent = score; }
}

function restartQuiz() {
    // একদম নতুন করে ২০টি প্রশ্ন নেওয়া (কোনো রিপিট হবে না)
    questions = getRandomQuestions(allQuestions, 20);
    currentQ = 0;
    score = 0;
    answered = [];
    document.getElementById("quizResult").style.display = "none";
    document.getElementById("quizScore").textContent = "0";
    document.getElementById("quizProgressBar").style.width = "0%";
    loadQuestion();
}

// শুরু — একদম নতুন প্রশ্ন
questions = getRandomQuestions(allQuestions, 20);
loadBest();
loadQuestion();