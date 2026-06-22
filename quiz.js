// ==================== প্রো কুইজ ====================

const ALL = [
    { c:"🇧🇩 বাংলাদেশ", q:"বাংলাদেশের রাজধানী কোনটি?", o:["চট্টগ্রাম","ঢাকা","খুলনা","রাজশাহী"], a:1 },
    { c:"🇧🇩 বাংলাদেশ", q:"জাতীয় ফুল কোনটি?", o:["গোলাপ","শাপলা","সূর্যমুখী","জবা"], a:1 },
    { c:"🇧🇩 বাংলাদেশ", q:"জাতীয় পাখি কোনটি?", o:["কাক","দোয়েল","টিয়া","চড়ুই"], a:1 },
    { c:"🇧🇩 বাংলাদেশ", q:"মুক্তিযুদ্ধ কত সালে?", o:["১৯৫২","১৯৬৯","১৯৭১","১৯৭৫"], a:2 },
    { c:"🇧🇩 বাংলাদেশ", q:"মুদ্রার নাম কী?", o:["রুপি","টাকা","ডলার","ইউরো"], a:1 },
    { c:"🌍 বিশ্ব", q:"বৃহত্তম মহাদেশ কোনটি?", o:["আফ্রিকা","এশিয়া","ইউরোপ","অস্ট্রেলিয়া"], a:1 },
    { c:"🌍 বিশ্ব", q:"বৃহত্তম মহাসাগর কোনটি?", o:["আটলান্টিক","ভারত","প্রশান্ত","উত্তর"], a:2 },
    { c:"🌍 বিশ্ব", q:"সর্বোচ্চ পর্বত কোনটি?", o:["কিলিমাঞ্জারো","এভারেস্ট","আল্পস","ফুজি"], a:1 },
    { c:"🌍 বিশ্ব", q:"জাপানের মুদ্রা?", o:["ওয়ান","ইয়েন","রুবল","পেসো"], a:1 },
    { c:"🌍 বিশ্ব", q:"সবচেয়ে ছোট দেশ?", o:["মোনাকো","ভ্যাটিকান","সান মেরিনো","মালদ্বীপ"], a:1 },
    { c:"📜 ইতিহাস", q:"প্রথম বিশ্বযুদ্ধ শুরু?", o:["১৯১০","১৯১৪","১৯১৮","১৯৩৯"], a:1 },
    { c:"📜 ইতিহাস", q:"দ্বিতীয় বিশ্বযুদ্ধ শেষ?", o:["১৯৪২","১৯৪৩","১৯৪৫","১৯৪৭"], a:2 },
    { c:"📜 ইতিহাস", q:"ভাষা আন্দোলন কত সালে?", o:["১৯৪৭","১৯৫২","১৯৬৯","১৯৭১"], a:1 },
    { c:"🔢 গণিত", q:"২^৮ = ?", o:["১২৮","২৫৬","৫১২","১০২৪"], a:1 },
    { c:"🔢 গণিত", q:"১ কিলোবাইট = ?", o:["১০০","১০০০","১০২৪","৫১২"], a:2 },
    { c:"🔢 গণিত", q:"এক ডজন = কটি?", o:["১০","১১","১২","১৩"], a:2 },
    { c:"🔬 বিজ্ঞান", q:"পানির সংকেত?", o:["H2O","CO2","NaCl","O2"], a:0 },
    { c:"🔬 বিজ্ঞান", q:"রক্ত লাল কেন?", o:["প্লাজমা","হিমোগ্লোবিন","শ্বেতকণিকা","অণুচক্রিকা"], a:1 },
    { c:"🔬 বিজ্ঞান", q:"হার্টে চেম্বার?", o:["২","৩","৪","৫"], a:2 },
    { c:"📖 ইংরেজি", q:"Synonym: Happy?", o:["Sad","Joyful","Angry","Tired"], a:1 },
    { c:"📖 ইংরেজি", q:"Past: go?", o:["goed","went","gone","going"], a:1 },
    { c:"📖 ইংরেজি", q:"Plural: child?", o:["childs","children","childes","child"], a:1 },
    { c:"📝 বাংলা", q:"বাংলা বর্ণ সংখ্যা?", o:["৪৪","৪৮","৫০","৫২"], a:2 },
    { c:"💻 প্রযুক্তি", q:"HTML পূর্ণরূপ?", o:["HyperText Markup Language","HighText Machine","Hyper Trainer","None"], a:0 },
    { c:"💻 প্রযুক্তি", q:"CSS কাজ?", o:["লজিক","ডিজাইন","ডাটাবেস","সার্ভার"], a:1 },
    { c:"💻 প্রযুক্তি", q:"JavaScript ধরন?", o:["Compiled","Interpreted","Machine","Assembly"], a:1 },
    { c:"💻 প্রযুক্তি", q:"GitHub কী?", o:["গেম","সোশ্যাল","কোড হোস্টিং","অ্যাপ"], a:2 },
    { c:"💻 প্রযুক্তি", q:"npm পূর্ণরূপ?", o:["Node Package Manager","New Program","Network","None"], a:0 },
    { c:"🎬 বিনোদন", q:"২০২২ FIFA কে জেতে?", o:["ফ্রান্স","ব্রাজিল","আর্জেন্টিনা","জার্মানি"], a:2 },
    { c:"🎬 বিনোদন", q:"Iron Man অভিনেতা?", o:["Chris Evans","Robert Downey Jr","Mark Ruffalo","Tom Holland"], a:1 },
];

let Q = [], idx = 0, score = 0, ans = [], timer, sec = 20;

function shuffle(arr, n) {
    let s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
    }
    return s.slice(0, n);
}

function startQuiz() {
    Q = shuffle(ALL, 20);
    idx = 0; score = 0; ans = [];
    document.getElementById("quizEnd").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("quizScore").textContent = "0";
    document.getElementById("quizBar").style.width = "0%";
    document.getElementById("quizBest").textContent = localStorage.getItem("quizBest") || "--";
    loadQ();
}

function loadQ() {
    if (idx >= Q.length) { endQuiz(); return; }
    let q = Q[idx];
    document.getElementById("quizQno").textContent = (idx + 1) + "/20";
    document.getElementById("quizCat").textContent = q.c;
    document.getElementById("quizQ").textContent = q.q;
    document.getElementById("quizScore").textContent = score;
    document.getElementById("quizBar").style.width = (idx / 20 * 100) + "%";

    let optDiv = document.getElementById("quizOpts");
    optDiv.innerHTML = "";
    q.o.forEach((o, i) => {
        let btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.textContent = (i + 1) + ". " + o;
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
        let p = (sec / 20) * 100;
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

function nextQ() { if (idx < 19) { idx++; loadQ(); } }
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

    let pct = Math.round((score / 20) * 100);
    let msg = pct >= 80 ? "🌟 অসাধারণ!" : pct >= 60 ? "👍 ভালো!" : pct >= 40 ? "📚 প্র্যাকটিস করো!" : "💪 চেষ্টা চালাও!";

    document.getElementById("quizEnd").style.display = "block";
    document.getElementById("quizEnd").innerHTML = '<h2>' + msg + '</h2><p>স্কোর: <strong>' + score + '/20</strong> (' + pct + '%)</p><button class="btn-primary" onclick="startQuiz()">🔄 নতুন খেলা</button>';

    let best = parseInt(localStorage.getItem("quizBest") || 0);
    if (score > best) {
        localStorage.setItem("quizBest", score);
        document.getElementById("quizBest").textContent = score;
    }
}

// কীবোর্ড
document.addEventListener("keydown", function(e) {
    if (document.getElementById("quizEnd").style.display === "block") return;
    if (!document.getElementById("quizQ").textContent) return;
    if (ans[idx] !== undefined) return;
    let key = e.key.toLowerCase();
    let map = { "1":0,"2":1,"3":2,"4":3, "a":0,"b":1,"c":2,"d":3 };
    if (map[key] !== undefined) pick(map[key]);
    if (key === "arrowright") nextQ();
    if (key === "arrowleft") prevQ();
});

startQuiz();