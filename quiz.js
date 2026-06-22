// ==================== প্রফেশনাল কুইজ (৫০ প্রশ্ন, র‌্যান্ডম, বাটন) ====================

const ALL = [
    { c:"🇧🇩 বাংলাদেশ", q:"বাংলাদেশের রাজধানী ঢাকা কোন নদীর তীরে অবস্থিত?", o:["বুড়িগঙ্গা","কর্ণফুলী","পদ্মা","মেঘনা"], a:0 },
    { c:"🇧🇩 বাংলাদেশ", q:"জাতীয় সংসদ ভবনের স্থপতি কে?", o:["এফ আর খান","লুই আই কান","মাজহারুল ইসলাম","রবিউল হুসাইন"], a:1 },
    { c:"🇧🇩 বাংলাদেশ", q:"বাংলাদেশের জাতীয় ফল কোনটি?", o:["আম","কাঁঠাল","কলা","লিচু"], a:1 },
    { c:"🇧🇩 বাংলাদেশ", q:"মুক্তিযুদ্ধ কত মাস স্থায়ী ছিল?", o:["৬ মাস","৭ মাস","৮ মাস","৯ মাস"], a:3 },
    { c:"🇧🇩 বাংলাদেশ", q:"বাংলাদেশের জাতীয় পতাকার ডিজাইনার কে?", o:["কামরুল হাসান","জয়নুল আবেদিন","এস এম সুলতান","কাইয়ুম চৌধুরী"], a:0 },
    { c:"🌍 বিশ্ব", q:"পৃথিবীর সবচেয়ে বড় দেশ (আয়তনে) কোনটি?", o:["কানাডা","যুক্তরাষ্ট্র","চীন","রাশিয়া"], a:3 },
    { c:"🌍 বিশ্ব", q:"পৃথিবীর সবচেয়ে ছোট দেশ কোনটি?", o:["মোনাকো","ভ্যাটিকান সিটি","সান মেরিনো","মালদ্বীপ"], a:1 },
    { c:"🌍 বিশ্ব", q:"জাপানের মুদ্রার নাম কী?", o:["ওয়ান","ইয়েন","রুবল","পেসো"], a:1 },
    { c:"🌍 বিশ্ব", q:"আমাজন নদী কোন মহাদেশে অবস্থিত?", o:["আফ্রিকা","এশিয়া","দক্ষিণ আমেরিকা","ইউরোপ"], a:2 },
    { c:"🌍 বিশ্ব", q:"সবচেয়ে বেশি জনসংখ্যার দেশ কোনটি?", o:["চীন","ভারত","যুক্তরাষ্ট্র","ইন্দোনেশিয়া"], a:1 },
    { c:"📜 ইতিহাস", q:"প্রথম বিশ্বযুদ্ধ কত সালে শেষ হয়?", o:["১৯১৪","১৯১৬","১৯১৮","১৯২০"], a:2 },
    { c:"📜 ইতিহাস", q:"মুক্তিযুদ্ধে বাংলাদেশের সেক্টর কতটি ছিল?", o:["৯","১০","১১","১২"], a:2 },
    { c:"📜 ইতিহাস", q:"আমেরিকা কবে স্বাধীনতা লাভ করে?", o:["১৭৭৬","১৭৮৯","১৮০০","১৮১২"], a:0 },
    { c:"📜 ইতিহাস", q:"বাংলা ভাষা আন্দোলন কত সালে হয়?", o:["১৯৪৭","১৯৫২","১৯৬৯","১৯৭১"], a:1 },
    { c:"📜 ইতিহাস", q:"প্রাচীন মিশরের বিখ্যাত নদী কোনটি?", o:["টাইগ্রিস","ইউফ্রেটিস","নীল নদ","গঙ্গা"], a:2 },
    { c:"🔢 গণিত", q:"এক ডজন = কটি?", o:["১০","১১","১২","১৩"], a:2 },
    { c:"🔢 গণিত", q:"π (পাই)-এর মান কত (প্রায়)?", o:["২.১৪","৩.১৪","৪.১৪","৫.১৪"], a:1 },
    { c:"🔢 গণিত", q:"এক সমকোণ = কত ডিগ্রি?", o:["৪৫°","৬০°","৯০°","১৮০°"], a:2 },
    { c:"🔢 গণিত", q:"লসাগু (LCM) এর পূর্ণরূপ কী?", o:["Least Common Multiple","Long Common Multiple","Lowest Common Mark","Least Constant Multiple"], a:0 },
    { c:"🔢 গণিত", q:"৫-এর বর্গমূল কত (প্রায়)?", o:["২.১২","২.২৪","২.৫০","২.৭৫"], a:1 },
    { c:"🔬 বিজ্ঞান", q:"সবচেয়ে হালকা গ্যাস কোনটি?", o:["অক্সিজেন","নাইট্রোজেন","হাইড্রোজেন","হিলিয়াম"], a:2 },
    { c:"🔬 বিজ্ঞান", q:"উদ্ভিদের খাদ্য তৈরির প্রক্রিয়াকে কী বলে?", o:["শ্বসন","সালোকসংশ্লেষণ","পরাগায়ন","অঙ্কুরোদগম"], a:1 },
    { c:"🔬 বিজ্ঞান", q:"ধ্বনি তরঙ্গ কী ধরনের তরঙ্গ?", o:["আড় তরঙ্গ","লম্বিক তরঙ্গ","তাড়িতচৌম্বক তরঙ্গ","মহাকর্ষীয় তরঙ্গ"], a:1 },
    { c:"🔬 বিজ্ঞান", q:"মৌমাছির কামড়ের এসিড কোনটি?", o:["সাইট্রিক এসিড","ফরমিক এসিড","এসিটিক এসিড","সালফিউরিক এসিড"], a:1 },
    { c:"🔬 বিজ্ঞান", q:"কম্পিউটারের মস্তিষ্ক বলা হয় কাকে?", o:["RAM","ROM","CPU","Hard Disk"], a:2 },
    { c:"📖 ইংরেজি", q:"What is the synonym of 'Brave'?", o:["Cowardly","Courageous","Weak","Timid"], a:1 },
    { c:"📖 ইংরেজি", q:"Past tense of 'eat' is...", o:["eated","ate","eaten","eating"], a:1 },
    { c:"📖 ইংরেজি", q:"Which is a preposition?", o:["run","under","happy","she"], a:1 },
    { c:"📖 ইংরেজি", q:"Plural of 'mouse' is...", o:["mouses","mice","mouse","mices"], a:1 },
    { c:"📖 ইংরেজি", q:"'Fast' means...", o:["slow","quick","big","small"], a:1 },
    { c:"📝 বাংলা", q:"বাংলা ভাষার উৎপত্তি কোন ভাষা থেকে?", o:["সংস্কৃত","পালি","প্রাকৃত","মাগধী"], a:2 },
    { c:"📝 বাংলা", q:"'রোদ' শব্দের বিপরীত শব্দ কী?", o:["আলো","অন্ধকার","ছায়া","বৃষ্টি"], a:2 },
    { c:"📝 বাংলা", q:"'অমর' শব্দের অর্থ কী?", o:["মরণশীল","মৃত্যুহীন","অস্থায়ী","সাধারণ"], a:1 },
    { c:"📝 বাংলা", q:"কারক কত প্রকার?", o:["৫","৬","৭","৮"], a:1 },
    { c:"📝 বাংলা", q:"'একুশে ফেব্রুয়ারি' কী?", o:["বিজয় দিবস","স্বাধীনতা দিবস","শহীদ দিবস","পহেলা বৈশাখ"], a:2 },
    { c:"💻 প্রযুক্তি", q:"Wi-Fi-এর পূর্ণরূপ কী?", o:["Wireless Fidelity","Wireless Field","Wired Fiber","Wireless Finder"], a:0 },
    { c:"💻 প্রযুক্তি", q:"URL-এর পূর্ণরূপ কী?", o:["Uniform Resource Locator","Universal Read Locator","United Resource Link","Uniform Read Link"], a:0 },
    { c:"💻 প্রযুক্তি", q:"API দিয়ে কী করা হয়?", o:["ডাটাবেস তৈরি","দুটি সফটওয়্যারের মধ্যে যোগাযোগ","ওয়েবসাইট ডিজাইন","কিছুই না"], a:1 },
    { c:"💻 প্রযুক্তি", q:"সার্চ ইঞ্জিন অপটিমাইজেশন-এর সংক্ষিপ্ত রূপ?", o:["SEM","SEO","SMM","SERP"], a:1 },
    { c:"💻 প্রযুক্তি", q:"Python কে তৈরি করেন?", o:["Guido van Rossum","Dennis Ritchie","James Gosling","Bjarne Stroustrup"], a:0 },
    { c:"🎬 বিনোদন", q:"ভারতীয় ক্রিকেট দলের বর্তমান অধিনায়ক (ODI) কে?", o:["রোহিত শর্মা","বিরাট কোহলি","জাসপ্রিত বুমরাহ","লোকেশ রাহুল"], a:0 },
    { c:"🎬 বিনোদন", q:"২০২২ ফিফা বিশ্বকাপ কোন দেশ জেতে?", o:["ফ্রান্স","ব্রাজিল","আর্জেন্টিনা","জার্মানি"], a:2 },
    { c:"🎬 বিনোদন", q:"মার্ভেল সিনেমার 'আয়রন ম্যান' চরিত্রে কে অভিনয় করেন?", o:["ক্রিস ইভান্স","রবার্ট ডাউনি জুনিয়র","মার্ক রাফালো","টম হল্যান্ড"], a:1 },
    { c:"🎬 বিনোদন", q:"সবচেয়ে বেশি অস্কারজয়ী সিনেমা কোনটি (যৌথভাবে)?", o:["টাইটানিক","বেন-হার","দ্য লর্ড অফ দ্য রিংস","অ্যাভাটার"], a:2 },
    { c:"🎬 বিনোদন", q:"বাংলাদেশের সবচেয়ে জনপ্রিয় খেলা কোনটি?", o:["ফুটবল","ক্রিকেট","হকি","ভলিবল"], a:1 },
    { c:"📚 সাধারণ জ্ঞান", q:"জাতিসংঘের বর্তমান মহাসচিব কে?", o:["বান কি-মুন","আন্তোনিও গুতেরেস","কফি আনান","বুট্রোস ঘালি"], a:1 },
    { c:"📚 সাধারণ জ্ঞান", q:"বিশ্ব স্বাস্থ্য সংস্থার (WHO) সদর দপ্তর কোথায়?", o:["নিউ ইয়র্ক","লন্ডন","জেনেভা","প্যারিস"], a:2 },
    { c:"📚 সাধারণ জ্ঞান", q:"কোন গ্রহকে 'লাল গ্রহ' বলা হয়?", o:["শুক্র","বৃহস্পতি","মঙ্গল","শনি"], a:2 },
    { c:"📚 সাধারণ জ্ঞান", q:"বাংলাদেশের সবচেয়ে বড় জেলা কোনটি?", o:["ঢাকা","রাঙামাটি","খুলনা","সিলেট"], a:1 },
    { c:"📚 সাধারণ জ্ঞান", q:"পৃথিবী সূর্যের চারদিকে একবার ঘুরতে কতদিন লাগে?", o:["২৮ দিন","৩০ দিন","৩৬৫ দিন","৩৬৬ দিন"], a:2 },
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

function start() {
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
        btn.innerHTML = <span class="opt-key">${i + 1}</span>
        if (ans[idx] !== undefined) {
            btn.disabled = true;
            if (i === q.a) btn.classList.add("correct");
            if (i === ans[idx] && i !== q.a) btn.classList.add("wrong");
        } else {
            btn.onclick = () => pick(i);
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
    timer = setInterval(() => {
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
    document.getElementById("quizEnd").innerHTML = `
        <h2>${msg}</h2>
        <p>স্কোর: <strong>${score}/20</strong> (${pct}%)</p>
        <button class="btn-primary" onclick="start()">🔄 নতুন খেলা</button>
    `;

    let best = parseInt(localStorage.getItem("quizBest") || 0);
    if (score > best) {
        localStorage.setItem("quizBest", score);
        document.getElementById("quizBest").textContent = score;
    }
}

// কীবোর্ড
document.addEventListener("keydown", function(e) {
    if (!document.getElementById("quizQ").textContent) return;
    if (ans[idx] !== undefined) return;
    let key = e.key.toLowerCase();
    let map = { "1":0,"2":1,"3":2,"4":3, "a":0,"b":1,"c":2,"d":3 };
    if (map[key] !== undefined) pick(map[key]);
    if (key === "arrowright") nextQ();
    if (key === "arrowleft") prevQ();
    if (key === "enter" && ans[idx] !== undefined) nextQ();
});

start();