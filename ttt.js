// ==================== টিক ট্যাক টো PRO ====================

let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let over = false;
let musicOn = true;
let musicInterval = null;
let audioCtx = null;

// স্কোর
function scores() {
    return {
        X: parseInt(localStorage.getItem("tttX") || 0),
        O: parseInt(localStorage.getItem("tttO") || 0),
        D: parseInt(localStorage.getItem("tttD") || 0)
    };
}

// নাম আপডেট
function updatePlayerNames() {
    let nx = document.getElementById("playerXName").value.trim() || "Player X";
    let no = document.getElementById("playerOName").value.trim() || "Player O";
    localStorage.setItem("tttNX", nx);
    localStorage.setItem("tttNO", no);
    document.getElementById("displayNameX").textContent = "❌ " + nx;
    document.getElementById("displayNameO").textContent = "⭕ " + no;
    document.getElementById("tttStatus").textContent = "❌ " + nx + "-এর পালা";
}

function loadNames() {
    let nx = localStorage.getItem("tttNX") || "Player X";
    let no = localStorage.getItem("tttNO") || "Player O";
    document.getElementById("playerXName").value = nx;
    document.getElementById("playerOName").value = no;
    document.getElementById("displayNameX").textContent = "❌ " + nx;
    document.getElementById("displayNameO").textContent = "⭕ " + no;
    document.getElementById("tttStatus").textContent = "❌ " + nx + "-এর পালা";
}

// সাউন্ড
function beep(freq, type, vol, dur) {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let o = audioCtx.createOscillator();
        let g = audioCtx.createGain();
        o.connect(g); g.connect(audioCtx.destination);
        o.frequency.value = freq;
        o.type = type;
        g.gain.value = vol;
        o.start();
        o.stop(audioCtx.currentTime + dur);
    } catch(e) {}
}

// মিউজিক
function startMusic() {
    stopMusic();
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let notes = [523, 587, 659, 698, 784, 698, 659, 587];
    let i = 0;
    musicInterval = setInterval(function() {
        if (!musicOn) return;
        try {
            let o = audioCtx.createOscillator();
            let g = audioCtx.createGain();
            o.connect(g); g.connect(audioCtx.destination);
            o.frequency.value = notes[i % notes.length];
            o.type = "sine";
            g.gain.value = 0.04;
            o.start();
            o.stop(audioCtx.currentTime + 0.3);
            i++;
        } catch(e) {}
    }, 600);
}

function stopMusic() {
    if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
}

function toggleMusic() {
    musicOn = !musicOn;
    let btn = document.getElementById("musicToggleBtn");
    if (musicOn) {
        startMusic();
        btn.textContent = "🔊 মিউজিক বন্ধ";
        btn.style.background = "#22c55e";
    } else {
        stopMusic();
        btn.textContent = "🔇 মিউজিক চালু";
        btn.style.background = "#ef4444";
    }
}

// গেম
function makeMove(idx) {
    if (board[idx] !== "" || over) return;

    board[idx] = player;
    let cell = document.querySelectorAll(".ttt-cell")[idx];
    cell.textContent = player;
    cell.className = "ttt-cell " + (player === "X" ? "x-cell" : "o-cell");

    beep(player === "X" ? 600 : 450, "sine", 0.12, 0.08);

    let w = winner();
    let nx = document.getElementById("playerXName").value || "Player X";
    let no = document.getElementById("playerOName").value || "Player O";

    if (w) {
        over = true;
        document.getElementById("tttStatus").textContent = "🎉 " + (w === "X" ? nx : no) + " জিতেছে!";
        updateScore(w);
        confetti();
        beep(660, "triangle", 0.3, 0.5);
        stopMusic();
        return;
    }

    if (!board.includes("")) {
        over = true;
        document.getElementById("tttStatus").textContent = "🤝 ড্র!";
        updateScore("D");
        beep(200, "square", 0.2, 0.4);
        stopMusic();
        return;
    }

    player = player === "X" ? "O" : "X";
    document.getElementById("tttStatus").textContent = (player === "X" ? "❌ " : "⭕ ") + (player === "X" ? nx : no) + "-এর পালা";
}

function winner() {
    let w = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let c of w) {
        let [a,b,d] = c;
        if (board[a] && board[a] === board[b] && board[a] === board[d]) {
            document.querySelectorAll(".ttt-cell")[a].classList.add("win-cell");
            document.querySelectorAll(".ttt-cell")[b].classList.add("win-cell");
            document.querySelectorAll(".ttt-cell")[d].classList.add("win-cell");
            return board[a];
        }
    }
    return null;
}

function updateScore(r) {
    let s = scores();
    if (r === "X") s.X++;
    else if (r === "O") s.O++;
    else s.D++;
    localStorage.setItem("tttX", s.X);
    localStorage.setItem("tttO", s.O);
    localStorage.setItem("tttD", s.D);
    document.getElementById("scoreX").textContent = s.X;
    document.getElementById("scoreO").textContent = s.O;
    document.getElementById("scoreDraw").textContent = s.D;
}

function refreshScores() {
    let s = scores();
    document.getElementById("scoreX").textContent = s.X;
    document.getElementById("scoreO").textContent = s.O;
    document.getElementById("scoreDraw").textContent = s.D;
}

function resetTTT() {
    board = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    over = false;
    document.getElementById("tttStatus").textContent = "❌ " + (document.getElementById("playerXName").value || "Player X") + "-এর পালা";
    document.querySelectorAll(".ttt-cell").forEach(c => { c.textContent = ""; c.className = "ttt-cell"; });
    if (!musicOn) toggleMusic();
}

function resetAllScores() {
    if (confirm("সব স্কোর রিসেট করবে?")) {
        localStorage.removeItem("tttX");
        localStorage.removeItem("tttO");
        localStorage.removeItem("tttD");
        refreshScores();
    }
}

function confetti() {
    let box = document.getElementById("confettiContainer");
    if (!box) return;
    box.innerHTML = "";
    let colors = ["#22c55e","#38bdf8","#f59e0b","#ef4444","#a855f7"];
    for (let i = 0; i < 50; i++) {
        let p = document.createElement("div");
        p.className = "confetti-piece";
        p.style.left = Math.random() * 100 + "%";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay = Math.random() * 0.5 + "s";
        box.appendChild(p);
    }
    setTimeout(() => box.innerHTML = "", 2000);
}

// স্টার্ট
loadNames();
refreshScores();
startMusic();