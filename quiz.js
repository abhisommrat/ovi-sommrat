// ==================== কুইজ PRO ====================

let allQuestions = [
    { q: "বাংলাদেশের রাজধানী কী?", opts: ["চট্টগ্রাম", "খুলনা", "ঢাকা", "রাজশাহী"], ans: 2 },
    { q: "পৃথিবীর বৃহত্তম মহাদেশ কোনটি?", opts: ["আফ্রিকা", "এশিয়া", "ইউরোপ", "অস্ট্রেলিয়া"], ans: 1 },
    { q: "HTML-এর পূর্ণরূপ কী?", opts: ["Hyper Trainer", "HyperText Markup Language", "HighText Machine", "None"], ans: 1 },
    { q: "CSS দিয়ে কী করা হয়?", opts: ["লজিক", "ডিজাইন", "ডাটাবেস", "সার্ভার"], ans: 1 },
    { q: "JavaScript কী ধরনের ভাষা?", opts: ["Compiled", "Interpreted", "Machine", "Assembly"], ans: 1 },
    { q: "১ কিলোবাইট = কত বাইট?", opts: ["১০০", "১০০০", "১০২৪", "৫১২"], ans: 2 },
    { q: "পানির রাসায়নিক সংকেত কী?", opts: ["H2O", "CO2", "NaCl", "O2"], ans: 0 },
    { q: "সূর্য কোন দিক থেকে ওঠে?", opts: ["পশ্চিম", "উত্তর", "দক্ষিণ", "পূর্ব"], ans: 3 },
    { q: "বাংলাদেশের মুদ্রার নাম কী?", opts: ["রুপি", "টাকা", "ডলার", "ইউরো"], ans: 1 },
    { q: "CPU-এর পূর্ণরূপ কী?", opts: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "None"], ans: 1 },
    { q: "কোন প্রাণী মরুভূমির জাহাজ নামে পরিচিত?", opts: ["ঘোড়া", "উট", "হাতি", "গরু"], ans: 1 },
    { q: "ওজোন স্তর কোথায় থাকে?", opts: ["ট্রপোস্ফিয়ার", "স্ট্রাটোস্ফিয়ার", "মেসোস্ফিয়ার", "থার্মোস্ফিয়ার"], ans: 1 },
    { q: "GitHub কী?", opts: ["সোশ্যাল মিডিয়া", "কোড হোস্টিং প্ল্যাটফর্ম", "গেম", "অ্যাপ"], ans: 1 },
    { q: "DNS-এর পূর্ণরূপ কী?", opts: ["Domain Name System", "Digital Network Service", "Data Name Server", "None"], ans: 0 },
    { q: "বাংলাদেশের জাতীয় ফুল কী?", opts: ["গোলাপ", "শাপলা", "সূর্যমুখী", "জবা"], ans: 1 },
    { q: "২^৮ = ?", opts: ["১২৮", "২৫৬", "৫১২", "১০২৪"], ans: 1 },
    { q: "পৃথিবীর সবচেয়ে উঁচু পর্বত কোনটি?", opts: ["কিলিমাঞ্জারো", "এভারেস্ট", "আল্পস", "ফুজি"], ans: 1 },
    { q: "localStorage কী?", opts: ["সার্ভার স্টোরেজ", "ব্রাউজার স্টোরেজ", "ডাটাবেস", "ফাইল"], ans: 1 },
    { q: "বাংলাদেশের জাতীয় পাখি কী?", opts: ["কাক", "দোয়েল", "টিয়া", "চড়ুই"], ans: 1 },
    { q: "API-এর পূর্ণরূপ কী?", opts: ["Application Program Interface", "Application Programming Interface", "Auto Program Interface", "None"], ans: 1 },
    { q: "অলিম্পিক গেমস কত বছর পর পর হয়?", opts: ["২ বছর", "৩ বছর", "৪ বছর", "৫ বছর"], ans: 2 },
    { q: "রক্তের লাল রঙের জন্য দায়ী কী?", opts: ["হিমোগ্লোবিন", "প্লাজমা", "শ্বেতকণিকা", "অণুচক্রিকা"], ans: 0 },
    { q: "WWW-এর পূর্ণরূপ কী?", opts: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], ans: 0 },
    { q: "সবচেয়ে ছোট গ্রহ কোনটি?", opts: ["শুক্র", "বুধ", "মঙ্গল", "পৃথিবী"], ans: 1 },
    { q: "১ মিনিট = কত সেকেন্ড?", opts: ["১০০", "৩০", "৬০", "৯০"], ans: 2 },
    { q: "আলোর বেগ কত (প্রায়)?", opts: ["৩ লক্ষ কিমি/সে", "১ লক্ষ কিমি/সে", "৫ লক্ষ কিমি/সে", "১০ লক্ষ কিমি/সে"], ans: 0 },
    { q: "কোন দেশের পতাকায় সূর্য আছে?", opts: ["বাংলাদেশ", "জাপান", "ভারত", "চীন"], ans: 1 },
    { q: "ইন্টারনেটের জনক কে?", opts: ["বিল গেটস", "স্টিভ জবস", "টিম বার্নার্স-লি", "মার্ক জাকারবার্গ"], ans: 2 },
    { q: "কোন গ্রহ লাল গ্রহ নামে পরিচিত?", opts: ["শুক্র", "বৃহস্পতি", "মঙ্গল", "শনি"], ans: 2 },
    { q: "JSON-এর পূর্ণরূপ কী?", opts: ["JavaScript Object Notation", "Java Serial Object", "Just Simple Object", "None"], ans: 0 },
    { q: "কোন ভিটামিন সূর্যের আলো থেকে পাওয়া যায়?", opts: ["A", "B", "C", "D"], ans: 3 },
    { q: "বাংলাদেশ কবে স্বাধীনতা লাভ করে?", opts: ["১৯৫২", "১৯৬৯", "১৯৭১", "১৯৭৫"], ans: 2 },
    { q: "হার্টের চেম্বার সংখ্যা কত?", opts: ["২", "৩", "৪", "৫"], ans: 2 },
    { q: "কম্পিউটারের মস্তিষ্ক বলা হয় কাকে?", opts: ["RAM", "CPU", "Hard Disk", "Monitor"], ans: 1 },
    { q: "Firefox কী?", opts: ["অপারেটিং সিস্টেম", "ব্রাউজার", "গেম", "ভাষা"], ans: 1 },
    { q: "পৃথিবীর সবচেয়ে বড় মহাসাগর কোনটি?", opts: ["আটলান্টিক", "ভারত", "প্রশান্ত", "উত্তর"], ans: 2 },
    { q: "১ গিগাবাইট = কত মেগাবাইট?", opts: ["১০০", "৫১২", "১০২৪", "২০৪৮"], ans: 2 },
    { q: "কোন প্রাণী সবচেয়ে বেশি দিন বাঁচে?", opts: ["হাতি", "কচ্ছপ", "তিমি", "মানুষ"], ans: 1 },
    { q: "npm-এর পূর্ণরূপ কী?", opts: ["Node Package Manager", "New Program Maker", "Network Protocol", "None"], ans: 0 },
    { q: "চাঁদ পৃথিবীকে প্রদক্ষিণ করতে কত দিন লাগে?", opts: ["৭ দিন", "১৫ দিন", "২৭ দিন", "৩০ দিন"], ans: 2 },
    { q: "HTML ট্যাগ কোন ব্র্যাকেটে লেখা হয়?", opts: ["{}", "[]", "<>", "()"], ans: 2 },
    { q: "মানবদেহে মোট হাড়ের সংখ্যা কত (প্রাপ্তবয়স্ক)?", opts: ["১০৬", "২০৬", "৩০৬", "৪০৬"], ans: 1 },
    { q: "CSS-এ রং দিতে কোন প্রপার্টি?", opts: ["bgcolor", "background-color", "color-bg", "bg"], ans: 1 },
    { q: "বাংলাদেশের জাতীয় সংসদ ভবনের স্থপতি কে?", opts: ["লুই কান", "এফ আর খান", "মাজহারুল ইসলাম", "রবিউল হুসাইন"], ans: 0 },
    { q: "Google-এর প্রতিষ্ঠাতা কারা?", opts: ["গেটস-অ্যালেন", "পেজ-ব্রিন", "জুকারবার্গ-সাভেরিন", "কুক-আইভ"], ans: 1 },
    { q: "কোন ভাষাকে ওয়েবের ভাষা বলা হয়?", opts: ["Python", "JavaScript", "C++", "Ruby"], ans: 1 },
    { q: "সৌরজগতের সবচেয়ে বড় গ্রহ কোনটি?", opts: ["শনি", "বৃহস্পতি", "ইউরেনাস", "নেপচুন"], ans: 1 },
    { q: "var, let, const-এর মধ্যে কোনটি ব্লক-স্কোপড?", opts: ["শুধু var", "let ও const", "শুধু const", "তিনটাই"], ans: 1 },
    { q: "IP-এর পূর্ণরূপ কী?", opts: ["Internet Protocol", "Internal Program", "Input Process", "None"], ans: 0 },
    { q: "পৃথিবীর গভীরতম স্থান কোনটি?", opts: ["ডেড সি", "মারিয়ানা ট্রেঞ্চ", "বৈকাল হ্রদ", "লোহিত সাগর"], ans: 1 }
];

let questions = [];
let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;
let answered = []; // প্রতিটি প্রশ্নের উত্তর ট্র্যাক

function shuffle(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, 10);
}

function loadBest() {
    document.getElementById("quizBest").textContent = localStorage.getItem("quizBest") || "--";
}

function startTimer() {
    stopTimer();
    timeLeft = 15;
    document.getElementById("timerText").textContent = "⏰ " + timeLeft + " সেকেন্ড";
    document.getElementById("timerBar").style.width = "100%";
    document.getElementById("timerBar").style.background = "#22c55e";

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timerText").textContent = "⏰ " + timeLeft + " সেকেন্ড";
        let p = (timeLeft / 15) * 100;
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
    document.getElementById("quizQuestion").textContent = q.q;
    document.getElementById("quizScore").textContent = score;

    let optDiv = document.getElementById("quizOptions");
    optDiv.innerHTML = "";
    q.opts.forEach(function(opt, i) {
        let btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.textContent = opt;
        if (answered[currentQ] !== undefined) {
            btn.disabled = true;
            if (i === q.ans) btn.classList.add("correct");
            if (i === answered[currentQ] && i !== q.ans) btn.classList.add("wrong");
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
    if (idx === q.ans) score++;
    document.getElementById("quizScore").textContent = score;
    loadQuestion();
}

function autoNext() {
    if (answered[currentQ] === undefined) answered[currentQ] = -1;
    loadQuestion();
}

function nextQuestion() {
    currentQ++;
    loadQuestion();
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
    document.getElementById("quizQno").textContent = "শেষ";

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

    let best = parseInt(localStorage.getItem("quizBest") || 0);
    if (score > best) { localStorage.setItem("quizBest", score); document.getElementById("quizBest").textContent = score; }
}

function restartQuiz() {
    questions = shuffle(allQuestions);
    currentQ = 0; score = 0; answered = [];
    document.getElementById("quizResult").style.display = "none";
    document.getElementById("quizScore").textContent = "0";
    loadQuestion();
}

// শুরু
questions = shuffle(allQuestions);
loadBest();
loadQuestion();