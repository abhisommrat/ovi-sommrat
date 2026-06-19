// ==================== ০. ইউজার গ্রিটিং ====================
function greetUser() {
    let userName = localStorage.getItem("oviUserName");
    if (!userName) {
        userName = prompt("স্বাগতম! তোমার নাম কী?");
        if (userName && userName.trim() !== "") {
            localStorage.setItem("oviUserName", userName);
        } else {
            userName = "অতিথি";
        }
    }
    let messageDiv = document.getElementById("welcomeMessage");
    if (messageDiv) {
        messageDiv.innerHTML = "👋 স্বাগতম, " + userName + "! তোমাকে আবার দেখে ভালো লাগছে!";
    }
}

// ==================== ১. ডার্ক মোড / লাইট মোড ====================
function loadTheme() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        let btn = document.getElementById("themeButton");
        if (btn) btn.innerHTML = "☀️ লাইট মোড";
    }
}

function toggleTheme() {
    let body = document.body;
    let button = document.getElementById("themeButton");
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        if (button) button.innerHTML = "☀️ লাইট মোড";
        localStorage.setItem("theme", "light");
    } else {
        if (button) button.innerHTML = "🌙 ডার্ক মোড";
        localStorage.setItem("theme", "dark");
    }
}

// ==================== ২. বিস্তারিত টগল ====================
function toggleDetails(id) {
    let content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

// ==================== ৩. ডায়েরি ====================
function loadNotes(filter = "") {
    let notesContainer = document.getElementById("notesContainer");
    if (!notesContainer) return;
    let notes = JSON.parse(localStorage.getItem("oviNotes")) || [];
    updateNoteCount(notes.length);
    notesContainer.innerHTML = "";
    let filteredNotes = notes.filter(note => note.text.toLowerCase().includes(filter.toLowerCase()));
    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = '<div class="empty-state">📭 ' + (filter ? "কোনো মিল পাওয়া যায়নি" : "এখনো কোনো নোট নেই। উপরে লিখে নোট যোগ করো!") + '</div>';
        return;
    }
    filteredNotes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    filteredNotes.forEach(function(note) {
        let realIndex = notes.indexOf(note);
        let noteCard = document.createElement("div");
        noteCard.className = "note-card" + (note.pinned ? " pinned" : "");
        noteCard.innerHTML =
            '<p>' + note.text.replace(/\n/g, "<br>") + '</p>' +
            '<small>' + note.date + '</small>' +
            '<div class="note-buttons">' +
                '<button class="pin-btn" onclick="togglePin(' + realIndex + ')">📌 ' + (note.pinned ? "আনপিন" : "পিন") + '</button>' +
                '<button class="edit-btn" onclick="editNote(' + realIndex + ')">✏️ এডিট</button>' +
                '<button class="delete-btn" onclick="deleteNote(' + realIndex + ')">❌ ডিলিট</button>' +
            '</div>';
        notesContainer.appendChild(noteCard);
    });
}

function updateNoteCount(count) {
    let counter = document.getElementById("noteCount");
    if (counter) counter.innerHTML = "📋 মোট নোট: " + count;
}

function updateCharCount() {
    let input = document.getElementById("noteInput");
    let counter = document.getElementById("charCount");
    if (input && counter) counter.innerHTML = input.value.length + " অক্ষর";
}

function handleEnter(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addNote();
    }
}

function searchNotes() {
    let searchValue = document.getElementById("searchInput").value;
    loadNotes(searchValue);
}

function addNote() {
    let input = document.getElementById("noteInput");
    if (!input) return;
    let text = input.value.trim();
    if (text === "") { alert("কিছু লিখো তো!"); return; }
    let notes = JSON.parse(localStorage.getItem("oviNotes")) || [];
    let now = new Date();
    let dateStr = now.toLocaleDateString("bn-BD") + " " + now.toLocaleTimeString("bn-BD");
    let editIndex = input.getAttribute("data-edit-index");
    if (editIndex !== null) {
        notes[editIndex].text = text;
        notes[editIndex].date = "🔄 আপডেট: " + dateStr;
        input.removeAttribute("data-edit-index");
        let addBtn = document.getElementById("addBtn");
        if (addBtn) addBtn.innerHTML = "➕ নোট যোগ করো";
    } else {
        notes.push({ text: text, date: dateStr, pinned: false });
    }
    localStorage.setItem("oviNotes", JSON.stringify(notes));
    input.value = "";
    updateCharCount();
    loadNotes(document.getElementById("searchInput") ? document.getElementById("searchInput").value : "");
}

function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("oviNotes")) || [];
    let note = notes[index];
    let input = document.getElementById("noteInput");
    if (!input) return;
    input.value = note.text;
    input.setAttribute("data-edit-index", index);
    let addBtn = document.getElementById("addBtn");
    if (addBtn) addBtn.innerHTML = "💾 আপডেট করো";
    input.scrollIntoView({ behavior: "smooth" });
    input.focus();
    updateCharCount();
}

function deleteNote(index) {
    if (confirm("তুমি কি নিশ্চিত এই নোট মুছে ফেলতে চাও?")) {
        let notes = JSON.parse(localStorage.getItem("oviNotes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("oviNotes", JSON.stringify(notes));
        loadNotes(document.getElementById("searchInput") ? document.getElementById("searchInput").value : "");
    }
}

function deleteAllNotes() {
    if (confirm("সব নোট মুছে ফেলতে চাও? এটা ফেরত যাবে না!")) {
        localStorage.removeItem("oviNotes");
        let searchInput = document.getElementById("searchInput");
        if (searchInput) searchInput.value = "";
        loadNotes();
    }
}

function togglePin(index) {
    let notes = JSON.parse(localStorage.getItem("oviNotes")) || [];
    notes[index].pinned = !notes[index].pinned;
    localStorage.setItem("oviNotes", JSON.stringify(notes));
    loadNotes(document.getElementById("searchInput") ? document.getElementById("searchInput").value : "");
}

// ==================== ৪. পাথর কাগজ কাঁচি PRO ====================
let comboCount = 0;

function getScore() {
    return JSON.parse(localStorage.getItem("rpsScore")) || { player: 0, computer: 0, draw: 0, total: 0 };
}
function saveScore(score) { localStorage.setItem("rpsScore", JSON.stringify(score)); }
function getHistory() { return JSON.parse(localStorage.getItem("rpsHistory")) || []; }
function saveHistory(entry) {
    let history = getHistory();
    history.unshift(entry);
    if (history.length > 5) history.pop();
    localStorage.setItem("rpsHistory", JSON.stringify(history));
}

function updateStats() {
    let score = getScore();
    let pEl = document.getElementById("playerScore"), cEl = document.getElementById("computerScore");
    let dEl = document.getElementById("drawScore"), tEl = document.getElementById("totalGames");
    let wEl = document.getElementById("winRate");
    if (pEl) pEl.textContent = score.player;
    if (cEl) cEl.textContent = score.computer;
    if (dEl) dEl.textContent = score.draw;
    let total = score.player + score.computer + score.draw;
    if (tEl) tEl.textContent = total;
    if (wEl) wEl.textContent = total > 0 ? Math.round((score.player / total) * 100) + "%" : "0%";
}

function updateHistoryUI() {
    let history = getHistory();
    let container = document.getElementById("roundHistory");
    if (!container) return;
    container.innerHTML = "";
    history.forEach(function(item) {
        let div = document.createElement("span");
        div.className = "history-item " + item.result + "-item";
        div.textContent = item.text;
        container.appendChild(div);
    });
}

function showCombo() {
    let comboDisplay = document.getElementById("comboDisplay");
    let comboCountEl = document.getElementById("comboCount");
    if (comboCount >= 3) { comboDisplay.style.display = "inline"; comboCountEl.textContent = comboCount; }
    else { comboDisplay.style.display = "none"; }
}

function spawnConfetti() {
    let container = document.getElementById("confettiContainer");
    if (!container) return;
    container.innerHTML = "";
    let colors = ["#22c55e", "#38bdf8", "#f59e0b", "#ef4444", "#a855f7", "#ec4899"];
    for (let i = 0; i < 50; i++) {
        let piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + "s";
        piece.style.animationDuration = (1 + Math.random() * 1.5) + "s";
        container.appendChild(piece);
    }
    setTimeout(function() { container.innerHTML = ""; }, 2000);
}

function playSound(type) {
    try {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        if (type === "win") { osc.frequency.value = 800; osc.type = "triangle"; gain.gain.value = 0.3; osc.start(); osc.stop(audioCtx.currentTime + 0.2); }
        else if (type === "lose") { osc.frequency.value = 200; osc.type = "sawtooth"; gain.gain.value = 0.3; osc.start(); osc.stop(audioCtx.currentTime + 0.3); }
        else if (type === "draw") { osc.frequency.value = 400; osc.type = "square"; gain.gain.value = 0.2; osc.start(); osc.stop(audioCtx.currentTime + 0.15); }
    } catch(e) {}
}

function countdown(callback) {
    let cdEl = document.getElementById("countdown");
    let count = 3;
    cdEl.style.display = "block";
    cdEl.textContent = count;
    let interval = setInterval(function() {
        count--;
        if (count > 0) { cdEl.textContent = count; }
        else { cdEl.textContent = "⚡"; setTimeout(function() { cdEl.style.display = "none"; callback(); }, 300); clearInterval(interval); }
    }, 400);
}

function playGame(playerChoice) {
    let buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach(function(btn) { btn.disabled = true; });
    countdown(function() {
        let choices = ["rock", "paper", "scissors"];
        let computerChoice = choices[Math.floor(Math.random() * 3)];
        let emojiMap = { rock: "🪨", paper: "📄", scissors: "✂️" };
        let nameMap = { rock: "পাথর", paper: "কাগজ", scissors: "কাঁচি" };
        document.getElementById("playerChoice").textContent = emojiMap[playerChoice];
        document.getElementById("computerChoice").textContent = emojiMap[computerChoice];
        let resultText = "", resultType = "", score = getScore();
        if (playerChoice === computerChoice) {
            resultText = "🤝 ড্র! দুজনেই " + nameMap[playerChoice]; resultType = "draw"; score.draw++; comboCount = 0;
            document.getElementById("resultText").style.color = "#f59e0b"; playSound("draw");
        } else if ((playerChoice === "rock" && computerChoice === "scissors") || (playerChoice === "paper" && computerChoice === "rock") || (playerChoice === "scissors" && computerChoice === "paper")) {
            resultText = "🎉 জিতেছো! " + nameMap[playerChoice] + " > " + nameMap[computerChoice]; resultType = "win"; score.player++; comboCount++;
            document.getElementById("resultText").style.color = "#22c55e"; playSound("win"); if (comboCount >= 3) spawnConfetti();
        } else {
            resultText = "😢 হেরেছো! " + nameMap[computerChoice] + " > " + nameMap[playerChoice]; resultType = "lose"; score.computer++; comboCount = 0;
            document.getElementById("resultText").style.color = "#ef4444"; playSound("lose");
        }
        score.total = score.player + score.computer + score.draw;
        document.getElementById("resultText").textContent = resultText;
        saveScore(score); saveHistory({ text: resultText, result: resultType });
        updateStats(); updateHistoryUI(); showCombo();
        let pEl = document.getElementById("playerChoice"), cEl = document.getElementById("computerChoice");
        pEl.className = "battle-choice " + resultType;
        cEl.className = "battle-choice " + (resultType === "win" ? "lose" : resultType === "lose" ? "win" : "draw");
        setTimeout(function() { buttons.forEach(function(btn) { btn.disabled = false; }); }, 500);
    });
}

function resetScore() {
    if (confirm("স্কোর রিসেট করতে চাও?")) { localStorage.removeItem("rpsScore"); comboCount = 0; updateStats(); showCombo();
        document.getElementById("resultText").textContent = "খেলা শুরু করো!"; document.getElementById("playerChoice").textContent = ""; document.getElementById("computerChoice").textContent = ""; }
}
function clearHistory() { localStorage.removeItem("rpsHistory"); updateHistoryUI(); }

document.addEventListener("keydown", function(e) {
    if (document.getElementById("countdown")) {
        let key = e.key.toLowerCase();
        if (key === "r") playGame("rock"); if (key === "p") playGame("paper"); if (key === "s") playGame("scissors");
    }
});

// ==================== ৫. কাস্টম ল্যাঙ্গুয়েজ ====================
function changeLanguage(lang) {
    let googleSelect = document.querySelector(".goog-te-combo");
    if (googleSelect) { googleSelect.value = lang; googleSelect.dispatchEvent(new Event("change")); }
    let langNames = { bn: "বাংলা", en: "English", hi: "हिन्दी", ar: "العربية", ur: "اردو", es: "Español", fr: "Français", de: "Deutsch", ja: "日本語", ko: "한국어", "zh-CN": "中文" };
    let currentLangEl = document.querySelector(".current-lang");
    if (currentLangEl && langNames[lang]) { currentLangEl.textContent = langNames[lang]; }
    localStorage.setItem("selectedLanguage", lang);
}

function restoreLanguage() {
    let savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang && savedLang !== "bn") {
        setTimeout(function() {
            let googleSelect = document.querySelector(".goog-te-combo");
            if (googleSelect) { googleSelect.value = savedLang; googleSelect.dispatchEvent(new Event("change")); }
            let langNames = { bn: "বাংলা", en: "English", hi: "हिन्दी", ar: "العربية", ur: "اردو", es: "Español", fr: "Français", de: "Deutsch", ja: "日本語", ko: "한국어", "zh-CN": "中文" };
            let currentLangEl = document.querySelector(".current-lang");
            if (currentLangEl && langNames[savedLang]) { currentLangEl.textContent = langNames[savedLang]; }
        }, 1000);
    }
}

// ==================== ৬. টু-ডু লিস্ট ====================
let currentFilter = "all";
function getTodos() { return JSON.parse(localStorage.getItem("oviTodos")) || []; }
function saveTodos(todos) { localStorage.setItem("oviTodos", JSON.stringify(todos)); }

function addTodo() {
    let input = document.getElementById("todoInput"); if (!input) return;
    let text = input.value.trim(); if (text === "") return;
    let todos = getTodos(); todos.push({ id: Date.now(), text: text, completed: false });
    saveTodos(todos); input.value = ""; renderTodos();
}
function toggleTodo(id) {
    let todos = getTodos(); let todo = todos.find(t => t.id === id);
    if (todo) { todo.completed = !todo.completed; saveTodos(todos); renderTodos(); }
}
function deleteTodo(id) { let todos = getTodos(); todos = todos.filter(t => t.id !== id); saveTodos(todos); renderTodos(); }
function editTodo(id) {
    let todos = getTodos(); let todo = todos.find(t => t.id === id); if (!todo) return;
    let newText = prompt("টাস্ক এডিট করো:", todo.text);
    if (newText !== null && newText.trim() !== "") { todo.text = newText.trim(); saveTodos(todos); renderTodos(); }
}
function clearAllTodos() { if (confirm("সব টাস্ক মুছে ফেলতে চাও?")) { localStorage.removeItem("oviTodos"); renderTodos(); } }
function filterTodos(filter) {
    currentFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active"); renderTodos();
}

function renderTodos() {
    let todos = getTodos(); let list = document.getElementById("todoList"); if (!list) return;
    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);
    let completedCount = todos.filter(t => t.completed).length;
    let totalCount = todos.length;
    let progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    let progressBar = document.getElementById("todoProgressBar"), stats = document.getElementById("todoStats");
    if (progressBar) progressBar.style.width = progress + "%";
    if (stats) stats.textContent = completedCount + "/" + totalCount + " সম্পন্ন";
    list.innerHTML = "";
    if (filteredTodos.length === 0) { list.innerHTML = '<div class="empty-todo">📭 কোনও টাস্ক নেই!</div>'; return; }
    filteredTodos.forEach(todo => {
        let li = document.createElement("li"); li.className = "todo-item" + (todo.completed ? " completed" : "");
        li.draggable = true; li.setAttribute("data-id", todo.id);
        li.innerHTML = '<input type="checkbox" class="todo-checkbox" ' + (todo.completed ? "checked" : "") + ' onchange="toggleTodo(' + todo.id + ')">' +
            '<span class="todo-text">' + todo.text + '</span>' +
            '<div class="todo-actions"><button class="todo-edit-btn" onclick="editTodo(' + todo.id + ')">✏️</button>' +
            '<button class="todo-delete-btn" onclick="deleteTodo(' + todo.id + ')">❌</button></div>';
        list.appendChild(li);
    });
}

// ==================== ৭. ওয়েদার ====================
const API_KEY = "881f19afb1e5cc0f02084b304edd81c";

async function getWeather() {
    let cityInput = document.getElementById("cityInput"); if (!cityInput) return;
    let city = cityInput.value.trim(); if (!city) { alert("শহরের নাম লিখো!"); return; }
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=metric&lang=bn";
    try {
        let response = await fetch(url); let data = await response.json();
        if (data.cod !== 200) { alert("শহর খুঁজে পাওয়া যায়নি!"); return; }
        let tempEl = document.getElementById("weatherTemp"), cityEl = document.getElementById("weatherCity");
        let descEl = document.getElementById("weatherDesc"), iconEl = document.getElementById("weatherIcon");
        let detailsEl = document.getElementById("weatherDetails");
        if (tempEl) tempEl.textContent = Math.round(data.main.temp) + "°C";
        if (cityEl) cityEl.textContent = data.name + ", " + data.sys.country;
        if (descEl) descEl.textContent = data.weather[0].description;
        let iconMap = { "Clear": "☀️", "Clouds": "☁️", "Rain": "🌧️", "Drizzle": "🌦️", "Thunderstorm": "⛈️", "Snow": "❄️", "Mist": "🌫️", "Haze": "🌫️", "Fog": "🌫️" };
        if (iconEl) iconEl.textContent = iconMap[data.weather[0].main] || "🌍";
        if (detailsEl) detailsEl.innerHTML = '<div class="weather-detail-item">💧 আর্দ্রতা<br><strong>' + data.main.humidity + '%</strong></div>' +
            '<div class="weather-detail-item">💨 বাতাস<br><strong>' + data.wind.speed + ' m/s</strong></div>' +
            '<div class="weather-detail-item">🌡️ অনুভূত<br><strong>' + Math.round(data.main.feels_like) + '°C</strong></div>';
        localStorage.setItem("lastCity", city);
    } catch (error) { alert("নেটওয়ার্ক সমস্যা!"); }
}

function loadLastCity() {
    let lastCity = localStorage.getItem("lastCity"), cityInput = document.getElementById("cityInput");
    if (lastCity && cityInput) { cityInput.value = lastCity; getWeather(); }
}

// ==================== ৮. কপি টু ক্লিপবোর্ড ====================
function copyInfo(event, elementId) {
    event.preventDefault(); event.stopPropagation();
    let element = document.getElementById(elementId); if (!element) return;
    let text = element.textContent;
    navigator.clipboard.writeText(text).then(function() {
        let btn = event.target, originalText = btn.textContent;
        btn.textContent = "✅ কপি হয়েছে!"; btn.classList.add("copy-success");
        setTimeout(function() { btn.textContent = originalText; btn.classList.remove("copy-success"); }, 2000);
    }).catch(function() { alert("কপি করা যায়নি!"); });
}

// ==================== ৯. পেজ লোড ====================
window.onload = function() {
    greetUser();
    loadTheme();
};

document.addEventListener("DOMContentLoaded", function() {
    restoreLanguage();
    if (document.getElementById("notesContainer")) loadNotes();
    if (document.getElementById("scoreboard") || document.getElementById("confettiContainer")) { updateStats(); updateHistoryUI(); showCombo(); }
    if (document.getElementById("todoList")) renderTodos();
    if (document.getElementById("weatherContainer")) loadLastCity();
});