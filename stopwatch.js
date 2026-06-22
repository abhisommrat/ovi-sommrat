// ==================== স্টপওয়াচ PRO ====================

let swMs = 0, swInterval = null, swRunning = false;

function fmt(ms) {
    let m = Math.floor(ms / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    let c = Math.floor((ms % 1000) / 10);
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0") + "." + String(c).padStart(2,"0");
}

function updateDisplay() {
    document.getElementById("swMin").textContent = String(Math.floor(swMs / 60000)).padStart(2,"0");
    document.getElementById("swSec").textContent = String(Math.floor((swMs % 60000) / 1000)).padStart(2,"0");
    document.getElementById("swMs").textContent = String(Math.floor((swMs % 1000) / 10)).padStart(2,"0");
}

function beep(freq, dur) {
    try {
        let ctx = new (window.AudioContext || window.webkitAudioContext)();
        let o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = freq; o.type = "sine"; g.gain.value = 0.1;
        o.start(); o.stop(ctx.currentTime + dur);
    } catch(e) {}
}

function swStart() {
    if (swRunning) return;
    swRunning = true;
    document.getElementById("swStart").style.display = "none";
    document.getElementById("swPause").style.display = "inline-block";
    document.getElementById("swStatus").textContent = "🔴 চলছে...";
    beep(800, 0.1);
    swInterval = setInterval(() => { swMs += 10; updateDisplay(); }, 10);
}

function swPause() {
    swRunning = false;
    clearInterval(swInterval);
    document.getElementById("swStart").style.display = "inline-block";
    document.getElementById("swPause").style.display = "none";
    document.getElementById("swStatus").textContent = "🟡 পজ";
    beep(400, 0.1);
}

function swReset() {
    swPause();
    swMs = 0;
    updateDisplay();
    document.getElementById("swStatus").textContent = "🟢 প্রস্তুত";
    localStorage.removeItem("swLaps");
    renderAll();
}

function swLap() {
    if (swMs === 0) return;
    let laps = JSON.parse(localStorage.getItem("swLaps") || "[]");
    laps.unshift(swMs);
    if (laps.length > 20) laps.pop();
    localStorage.setItem("swLaps", JSON.stringify(laps));
    beep(600, 0.08);
    renderAll();
}

function renderAll() {
    let laps = JSON.parse(localStorage.getItem("swLaps") || "[]");
    let container = document.getElementById("swLaps");
    let statsDiv = document.getElementById("swStats");

    // স্ট্যাট
    if (laps.length > 0) {
        statsDiv.style.display = "flex";
        let best = Math.min(...laps), worst = Math.max(...laps);
        let avg = Math.floor(laps.reduce((a,b) => a+b, 0) / laps.length);
        document.getElementById("swLapCount").textContent = laps.length;
        document.getElementById("swBest").textContent = fmt(best);
        document.getElementById("swWorst").textContent = fmt(worst);
        document.getElementById("swAvg").textContent = fmt(avg);
    } else {
        statsDiv.style.display = "none";
    }

    // লিস্ট
    container.innerHTML = "";
    if (laps.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;text-align:center;">কোনো ল্যাপ নেই</p>';
        return;
    }
    laps.forEach((lap, i) => {
        let div = document.createElement("div");
        div.className = "sw-lap-item";
        let best = Math.min(...laps);
        if (lap === best) div.classList.add("best-lap");
        div.innerHTML = '<span>🏁 ল্যাপ ' + (laps.length - i) + '</span><span>' + fmt(lap) + '</span>';
        container.appendChild(div);
    });
}

// কীবোর্ড
document.addEventListener("keydown", function(e) {
    if (e.key === " " || e.code === "Space") { e.preventDefault(); swRunning ? swPause() : swStart(); }
    if (e.key === "l" || e.key === "L") swLap();
    if (e.key === "r" || e.key === "R") swReset();
});

renderAll();