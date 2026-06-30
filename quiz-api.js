// ==================== কুইজ API (Open Trivia DB) ====================

let Q = [], idx = 0, score = 0, ans = [], timer, sec = 20;

async function fetchQuiz() {
    let cat = document.getElementById("categorySelect").value;
    let diff = document.getElementById("difficultySelect").value;
    let amt = document.getElementById("amountSelect").value;

    document.getElementById("quizLoading").style.display = "block";
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("quizEnd").style.display = "none";

    let url = https//opentdb.com/api.php?amount=${amt}&category=${cat}&difficulty=${diff}&type=multiple;

    try {
        let res = await fetch(url);
        let data = await res.json();

        if (data.response_code !== 0) {
            alert("প্রশ্ন লোড করা যায়নি! আবার চেষ্টা করো।");
            document.getElementById("quizLoading").style.display = "none";
            return;
        }

        Q = data.results.map(q => ({
            q: decodeHTML(q.question),
            o: shuffleArr([...q.incorrect_answers, q.correct_answer].map(decodeHTML)),
            a: q.incorrect_answers.length // correct answer index after shuffle (will set below)
        }));

        // সঠিক উত্তরের ইনডেক্স ঠিক করা
        Q.forEach((q, i) => {
            let correct = decodeHTML(data.results[i].correct_answer);
            q.a = q.o.indexOf(correct);
        });

        idx = 0; score = 0; ans = new Array(Q.length).fill(undefined);

        document.getElementById("quizLoading").style.display = "none";
        document.getElementById("quizContainer").style.display = "block";
        document.getElementById("quizScore").textContent = "0";
        document.getElementById("quizBar").style.width = "0%";
        document.getElementById("quizBest").textContent = localStorage.getItem("apiQuizBest") || "--";

        loadQ();
    } catch (e) {
        alert("নেটওয়ার্ক সমস্যা! ইন্টারনেট চেক করো।");
        document.getElementById("quizLoading").style.display = "none";
    }
}

function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function shuffleArr(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function loadQ() {
    if (idx >= Q.length) { endQuiz(); return; }
    let q = Q[idx];
    document.getElementById("quizQno").textContent = (idx+1)+"/"+Q.length;
    document.getElementById("quizCat").textContent = "API Trivia";
    document.getElementById("quizQ").textContent = q.q;
    document.getElementById("quizScore").textContent = score;
    document.getElementById("quizBar").style.width = (idx/Q.length*100)+"%";

    let optDiv = document.getElementById("quizOpts");
    optDiv.innerHTML = "";
    q.o.forEach((o, i) => {
        let btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.innerHTML = '<span class="opt-key">'+(i+1)+'</span> '+o;
        if (ans[idx] !== undefined) {
            btn.disabled = true;
            if (i === q.a) btn.classList.add("correct");
            if (i === ans[idx] && i !== q.a) btn.classList.add("wrong");
        } else {
            btn.onclick = () => pick(i);
        }
        optDiv.appendChild(btn);
    });

    document.getElementById("prevBtn").style.display = idx > 0 ? "inline-block":"none";
    document.getElementById("nextBtn").style.display = ans[idx] !== undefined ? "inline-block":"none";

    if (ans[idx] === undefined) timerStart();
    else stopTimer();
}

function timerStart() {
    stopTimer();
    sec = 20;
    document.getElementById("timerText").textContent = "⏰ "+sec+" সে.";
    document.getElementById("timerBar").style.width = "100%";
    document.getElementById("timerBar").style.background = "#22c55e";
    timer = setInterval(() => {
        sec--;
        document.getElementById("timerText").textContent = "⏰ "+sec+" সে.";
        let p = (sec/20)*100;
        document.getElementById("timerBar").style.width = p+"%";
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

function nextQ() { if (idx < Q.length-1) { idx++; loadQ(); } }
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

    let total = Q.length;
    let pct = Math.round((score/total)*100);
    let grade, emoji;
    if (pct >= 90) { grade = "A+"; emoji = "🌟"; }
    else if (pct >= 80) { grade = "A"; emoji = "🎉"; }
    else if (pct >= 70) { grade = "B"; emoji = "👍"; }
    else if (pct >= 60) { grade = "C"; emoji = "📚"; }
    else if (pct >= 50) { grade = "D"; emoji = "💪"; }
    else { grade = "F"; emoji = "😢"; }

    document.getElementById("quizEnd").style.display = "block";
    document.getElementById("quizEnd").innerHTML = `
        <div class="grade">${emoji}</div>
        <h2>গ্রেড: ${grade}</h2>
        <p>স্কোর: <strong>${score}/${total}</strong> (${pct}%)</p>
        <button class="quiz-refresh-btn" onclick="location.reload()">🔄 নতুন খেলা</button>
    `;

    let best = parseInt(localStorage.getItem("apiQuizBest")||0);
    if (score > best) {
        localStorage.setItem("apiQuizBest", score);
        document.getElementById("quizBest").textContent = score;
    }
}

document.addEventListener("keydown", function(e) {
    if (document.getElementById("quizEnd").style.display === "block") return;
    if (!document.getElementById("quizQ").textContent) return;
    if (ans[idx] !== undefined) return;
    let key = e.key.toLowerCase();
    let map = {"1":0,"2":1,"3":2,"4":3,"a":0,"b":1,"c":2,"d":3};
    if (map[key] !== undefined) pick(map[key]);
    if (key === "arrowright") nextQ();
    if (key === "arrowleft") prevQ();
});