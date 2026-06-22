let swMs = 0, swInterval = null, swRunning = false;

function swUpdateDisplay() {
    let min = Math.floor(swMs / 60000);
    let sec = Math.floor((swMs % 60000) / 1000);
    let ms = Math.floor((swMs % 1000) / 10);
    document.getElementById("swMinutes").textContent = String(min).padStart(2, "0");
    document.getElementById("swSeconds").textContent = String(sec).padStart(2, "0");
    document.getElementById("swMilliseconds").textContent = String(ms).padStart(2, "0");
}

function swStart() {
    if (swRunning) return;
    swRunning = true;
    document.getElementById("swStartBtn").style.display = "none";
    document.getElementById("swPauseBtn").style.display = "inline-block";
    swInterval = setInterval(function() {
        swMs += 10;
        swUpdateDisplay();
    }, 10);
}

function swPause() {
    swRunning = false;
    clearInterval(swInterval);
    document.getElementById("swStartBtn").style.display = "inline-block";
    document.getElementById("swPauseBtn").style.display = "none";
}

function swReset() {
    swPause();
    swMs = 0;
    swUpdateDisplay();
    document.getElementById("laps").innerHTML = "";
    localStorage.removeItem("swLaps");
}

function swLap() {
    if (swMs === 0) return;
    let min = Math.floor(swMs / 60000);
    let sec = Math.floor((swMs % 60000) / 1000);
    let ms = Math.floor((swMs % 1000) / 10);
    let time = String(min).padStart(2,"0") + ":" + String(sec).padStart(2,"0") + "." + String(ms).padStart(2,"0");

    let laps = JSON.parse(localStorage.getItem("swLaps") || "[]");
    laps.unshift(time);
    if (laps.length > 10) laps.pop();
    localStorage.setItem("swLaps", JSON.stringify(laps));
    renderLaps();
}

function renderLaps() {
    let laps = JSON.parse(localStorage.getItem("swLaps") || "[]");
    let container = document.getElementById("laps");
    container.innerHTML = "";
    if (laps.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;">কোনো ল্যাপ নেই</p>';
        return;
    }
    laps.forEach(function(lap, i) {
        let div = document.createElement("div");
        div.className = "lap-item";
        div.innerHTML = '<span>🏁 ল্যাপ ' + (laps.length - i) + '</span><span>' + lap + '</span>';
        container.appendChild(div);
    });
}

// স্পেসবার
document.addEventListener("keydown", function(e) {
    if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (swRunning) swPause();
        else swStart();
    }
    if (e.key === "l" || e.key === "L") swLap();
    if (e.key === "r" || e.key === "R") swReset();
});

// শুরুতে ল্যাপ লোড
renderLaps();