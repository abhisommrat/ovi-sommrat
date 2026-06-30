// কুইজ API - প্রশ্ন বাংলায় অনুবাদ সহ

var Q = [];
var idx = 0;
var score = 0;
var ans = [];
var timer;
var sec = 20;
var targetLang = "bn"; // ডিফল্ট বাংলা

function setLanguage(lang) {
    targetLang = lang;
    localStorage.setItem("quizLang", lang);
    // পেজ রিলোড
    location.reload();
}

async function fetchQuiz() {
    var cat = document.getElementById("categorySelect").value;
    var diff = document.getElementById("difficultySelect").value;
    var amt = document.getElementById("amountSelect").value;

    document.getElementById("quizLoading").style.display = "block";
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("quizEnd").style.display = "none";

    var url = "https://the-trivia-api.com/api/questions?categories=" + cat + "&difficulty=" + diff + "&limit=" + amt;

    try {
        var res = await fetch(url);
        if (!res.ok) throw new Error("API error");
        var data = await res.json();

        if (!data || data.length === 0) {
            alert("প্রশ্ন পাওয়া যায়নি!");
            document.getElementById("quizLoading").style.display = "none";
            return;
        }

        // ইংরেজি থেকে বাংলায় অনুবাদ
        var translatedData = await translateQuestions(data);

        Q = translatedData.map(function(q) {
            var allAnswers = q.incorrectAnswers.concat(q.correctAnswer);
            var shuffled = shuffleArr(allAnswers);
            return {
                q: q.question,
                c: q.category,
                o: shuffled,
                a: shuffled.indexOf(q.correctAnswer)
            };
        });

        idx = 0;
        score = 0;
        ans = new Array(Q.length).fill(undefined);

        document.getElementById("quizLoading").style.display = "none";
        document.getElementById("quizContainer").style.display = "block";
        document.getElementById("quizScore").textContent = "0";
        document.getElementById("quizBar").style.width = "0%";
        document.getElementById("quizBest").textContent = localStorage.getItem("apiQuizBest") || "--";

        loadQ();
    } catch (e) {
        console.error(e);
        alert("API লোড করা যায়নি! লোকাল প্রশ্ন দেখানো হচ্ছে।");
        useLocalQuestions();
        document.getElementById("quizLoading").style.display = "none";
    }
}

// Google Translate API ব্যবহার করে প্রশ্ন অনুবাদ
async function translateQuestions(data) {
    if (targetLang === "en") return data; // ইংরেজি থাকলে অনুবাদ না

    var translated = [];
    for (var i = 0; i < data.length; i++) {
        var q = data[i];
        try {
            // প্রশ্ন অনুবাদ
            var qTrans = await translateText(q.question, targetLang);
            // উত্তর অনুবাদ
            var correctTrans = await translateText(q.correctAnswer, targetLang);
            var incorrectTrans = [];
            for (var j = 0; j < q.incorrectAnswers.length; j++) {
                var inc = await translateText(q.incorrectAnswers[j], targetLang);
                incorrectTrans.push(inc);
            }
            translated.push({
                question: qTrans,
                correctAnswer: correctTrans,
                incorrectAnswers: incorrectTrans,
                category: q.category,
                difficulty: q.difficulty
            });
        } catch(e) {
            translated.push(q); // এরর হলে ইংরেজি
        }
    }
    return translated;
}

// Google Translate API (ফ্রি, unofficial)
async function translateText(text, lang) {
    if (!text || lang === "en") return text;
    try {
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + lang + "&dt=t&q=" + encodeURIComponent(text);
        var res = await fetch(url);
        var data = await res.json();
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0][0][0];
        }
    } catch(e) {}
    return text;
}

function useLocalQuestions() {
    var LOCAL = [
        { q: "HTML পূর্ণরূপ?", o: ["HyperText Markup Language","HighText Machine","Hyper Trainer","None"], a: 0, c: "প্রযুক্তি" },
        { q: "CSS কাজ?", o: ["লজিক","ডিজাইন","ডাটাবেস","সার্ভার"], a: 1, c: "প্রযুক্তি" },
        { q: "JavaScript ধরন?", o: ["Compiled","Interpreted","Machine","Assembly"], a: 1, c: "প্রযুক্তি" },
        { q: "GitHub কী?", o: ["গেম","সোশ্যাল","কোড হোস্টিং","অ্যাপ"], a: 2, c: "প্রযুক্তি" },
        { q: "বাংলাদেশের রাজধানী?", o: ["চট্টগ্রাম","ঢাকা","খুলনা","রাজশাহী"], a: 1, c: "বাংলাদেশ" },
        { q: "মুক্তিযুদ্ধ কত সালে?", o: ["১৯৫২","১৯৬৯","১৯৭১","১৯৭৫"], a: 2, c: "বাংলাদেশ" },
        { q: "পানির সংকেত?", o: ["H2O","CO2","NaCl","O2"], a: 0, c: "বিজ্ঞান" },
        { q: "সূর্যের আলোতে ভিটামিন?", o: ["A","B","C","D"], a: 3, c: "বিজ্ঞান" },
        { q: "এক ডজন = ?", o: ["১০","১১","১২","১৩"], a: 2, c: "গণিত" },
        { q: "২^৮ = ?", o: ["১২৮","২৫৬","৫১২","১০২৪"], a: 1, c: "গণিত" }
    ];

    Q = shuffleArr(LOCAL).slice(0, 10);
    idx = 0;
    score = 0;
    ans = new Array(Q.length).fill(undefined);

    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("quizScore").textContent = "0";
    document.getElementById("quizBar").style.width = "0%";
    document.getElementById("quizBest").textContent = localStorage.getItem("apiQuizBest") || "--";

    loadQ();
}

function shuffleArr(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}

function loadQ() {
    if (idx >= Q.length) { endQuiz(); return; }
    var q = Q[idx];
    document.getElementById("quizQno").textContent = (idx + 1) + "/" + Q.length;
    document.getElementById("quizCat").textContent = q.c || "সাধারণ";
    document.getElementById("quizQ").textContent = q.q;
    document.getElementById("quizScore").textContent = score;
    document.getElementById("quizBar").style.width = (idx / Q.length * 100) + "%";

    var optDiv = document.getElementById("quizOpts");
    optDiv.innerHTML = "";
    q.o.forEach(function(o, i) {
        var btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.innerHTML = '<span class="opt-key">' + (i + 1) + '</span> ' + o;
        if (ans[idx] !== undefined) {
            btn.disabled = true;
            if (i === q.a) btn.classList.add("correct");
            if (i === ans[idx] && i !== q.a) btn.classList.add("wrong");
        } else {
            btn.onclick = function() { pick(i); };
        }
        optDiv.appendChild(btn);
    });

    document.getElementById("prevBtn").style.display = idx > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display = ans[idx] !== undefined ? "inline-block" : "none";

    if (ans[idx] === undefined) timerStart();
    else stopTimer();
}

function timerStart() {
    stopTimer();
    sec = 20;
    document.getElementById("timerText").textContent = "⏰ " + sec + " সে.";
    document.getElementById("timerBar").style.width = "100%";
    document.getElementById("timerBar").style.background = "#22c55e";
    timer = setInterval(function() {
        sec--;
        document.getElementById("timerText").textContent = "⏰ " + sec + " সে.";
        var p = (sec / 20) * 100;
        document.getElementById("timerBar").style.width = p + "%";
        if (sec <= 5) document.getElementById("timerBar").style.background = "#ef4444";
        else if (sec <= 10) document.getElementById("timerBar").style.background = "#f59e0b";
        if (sec <= 0) { stopTimer(); ans[idx] = -1; loadQ(); }
    }, 1000);
}

function stopTimer() { clearInterval(timer); }

function pick(i) {
    stopTimer();
    ans[idx] = i;
    if (i === Q[idx].a) score++;
    document.getElementById("quizScore").textContent = score;
    loadQ();
}

function nextQ() { if (idx < Q.length - 1) { idx++; loadQ(); } }
function prevQ() { if (idx > 0) { idx--; loadQ(); } }

function endQuiz() {
    stopTimer();
    document.getElementById("quizQ").textContent = "";
    document.getElementById("quizOpts").innerHTML = "";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("timerText").textContent = "";
    document.getElementById("timerBar").style.width = "0%";
    document.getElementById("quizBar").style.width = "100%";
    document.getElementById("quizQno").textContent = "শেষ";
    document.getElementById("quizCat").textContent = "";

    var total = Q.length;
    var pct = Math.round((score / total) * 100);
    var grade, emoji;
    if (pct >= 90) { grade = "A+"; emoji = "🌟"; }
    else if (pct >= 80) { grade = "A"; emoji = "🎉"; }
    else if (pct >= 70) { grade = "B"; emoji = "👍"; }
    else if (pct >= 60) { grade = "C"; emoji = "📚"; }
    else if (pct >= 50) { grade = "D"; emoji = "💪"; }
    else { grade = "F"; emoji = "😢"; }

    document.getElementById("quizEnd").style.display = "block";
    document.getElementById("quizEnd").innerHTML =
        '<div class="grade">' + emoji + '</div>' +
        '<h2>গ্রেড: ' + grade + '</h2>' +
        '<p>স্কোর: <strong>' + score + '/' + total + '</strong> (' + pct + '%)</p>' +
        '<button class="quiz-refresh-btn" onclick="location.reload()">🔄 নতুন খেলা</button>';

    var best = parseInt(localStorage.getItem("apiQuizBest") || 0);
    if (score > best) {
        localStorage.setItem("apiQuizBest", score);
        document.getElementById("quizBest").textContent = score;
    }
}

document.addEventListener("keydown", function(e) {
    if (document.getElementById("quizEnd") && document.getElementById("quizEnd").style.display === "block") return;
    if (!document.getElementById("quizQ").textContent) return;
    if (ans[idx] !== undefined) return;
    var key = e.key.toLowerCase();
    var map = { "1": 0, "2": 1, "3": 2, "4": 3, "a": 0, "b": 1, "c": 2, "d": 3 };
    if (map[key] !== undefined) pick(map[key]);
    if (key === "arrowright") nextQ();
    if (key === "arrowleft") prevQ();
});

// সংরক্ষিত ভাষা লোড
(function() {
    var saved = localStorage.getItem("quizLang");
    if (saved) targetLang = saved;
})();