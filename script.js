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

// ==================== ১০. পোর্টফোলিও অ্যানিমেশন ====================

// টাইপিং ইফেক্ট
function typeWriter(elementId, text, speed) {
    let element = document.getElementById(elementId);
    if (!element) return;
    let i = 0;
    element.textContent = "";
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// স্ক্রল অ্যানিমেশন (Intersection Observer)
function setupScrollAnimation() {
    let elements = document.querySelectorAll(".scroll-animate");
    if (elements.length === 0) return;

    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(function(el) {
        observer.observe(el);
    });
}

// স্ক্রল-টু-টপ বাটন
function createScrollTopButton() {
    // বাটন থাকলে আর তৈরি করবে না
    if (document.getElementById("scrollTopBtn")) return;

    let btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.innerHTML = "⬆️";
    btn.title = "উপরে যাও";
    btn.style.cssText = "position:fixed;bottom:25px;right:25px;z-index:999;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#38bdf8);color:white;border:none;font-size:22px;cursor:pointer;box-shadow:0 5px 20px rgba(0,0,0,0.4);transition:all 0.3s;display:none;";
    btn.onclick = function() { window.scrollTo({ top: 0, behavior: "smooth" }); };
    btn.onmouseover = function() { btn.style.transform = "scale(1.1)"; };
    btn.onmouseout = function() { btn.style.transform = "scale(1)"; };
    document.body.appendChild(btn);

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });
}

// স্কিল বার কাউন্ট-আপ
function animateSkillBars() {
    let progressBars = document.querySelectorAll(".progress");
    if (progressBars.length === 0) return;

    let observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                let bar = entry.target;
                let targetWidth = bar.style.getPropertyValue("--progress-width") || bar.style.width;
                bar.style.width = "0%";
                setTimeout(function() {
                    bar.style.width = targetWidth;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

// পেজ লোডে সব চালু
document.addEventListener("DOMContentLoaded", function() {
    // টাইপিং ইফেক্ট (যদি typingText এলিমেন্ট থাকে)
    let typingEl = document.getElementById("typingText");
    if (typingEl) {
        let text = typingEl.getAttribute("data-text") || "সফটওয়্যার ইঞ্জিনিয়ার | ওয়েব ডেভেলপার";
        typeWriter("typingText", text, 80);
    }

    setupScrollAnimation();
    createScrollTopButton();
    animateSkillBars();
});

// ==================== ১৪. নাম্বার গেসিং গেম ====================

let secretNumber = 0;
let chances = 0;
let guesses = [];

function startNewGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    chances = 0;
    guesses = [];
    
    let input = document.getElementById("guessInput");
    if (input) {
        input.value = "";
        input.disabled = false;
        input.focus();
    }
    
    let statusEl = document.getElementById("gameStatus");
    if (statusEl) {
        statusEl.textContent = "নতুন খেলা শুরু! ১-১০০ এর মধ্যে guess করো";
        statusEl.style.color = "#38bdf8";
    }
    
    let chanceEl = document.getElementById("chanceCount");
    if (chanceEl) chanceEl.textContent = "0";
    
    let resultEl = document.getElementById("resultMessage");
    if (resultEl) {
        resultEl.textContent = "";
        resultEl.className = "result-message";
    }
    
    let guessListEl = document.getElementById("guessList");
    if (guessListEl) guessListEl.innerHTML = "";
    
    updateBestScore();
}

function updateBestScore() {
    let best = localStorage.getItem("numberGameBest");
    let bestEl = document.getElementById("bestScore");
    if (bestEl) {
        bestEl.textContent = best ? best : "--";
    }
}

function makeGuess() {
    let input = document.getElementById("guessInput");
    let guess = parseInt(input.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("অনুগ্রহ করে ১ থেকে ১০০ এর মধ্যে একটি সংখ্যা লিখো!");
        input.value = "";
        return;
    }

    chances++;
    guesses.push(guess);
    document.getElementById("chanceCount").textContent = chances;

    let resultEl = document.getElementById("resultMessage");
    let statusEl = document.getElementById("gameStatus");

    if (guess === secretNumber) {
        // জিতেছে!
        resultEl.textContent = "🎉 অভিনন্দন! তুমি " + chances + " চান্সে ধরেছো!";
        resultEl.className = "result-message correct";
        statusEl.textContent = "তুমি জিতেছো! 🔄 নতুন খেলার জন্য বাটনে ক্লিক করো";
        statusEl.style.color = "#22c55e";

        // বেস্ট স্কোর চেক
        let best = localStorage.getItem("numberGameBest");
        if (!best || chances < parseInt(best)) {
            localStorage.setItem("numberGameBest", chances);
            updateBestScore();
        }

        // কনফেট্টি
        spawnNumberConfetti();
        input.disabled = true;
    } else if (guess > secretNumber) {
        resultEl.textContent = "📉 আরও ছোট সংখ্যা!";
        resultEl.className = "result-message high";
    } else {
        resultEl.textContent = "📈 আরও বড় সংখ্যা!";
        resultEl.className = "result-message low";
    }

    // আগের guesses দেখানো
    let guessListEl = document.getElementById("guessList");
    guessListEl.innerHTML = "";
    guesses.forEach(function(g) {
        let badge = document.createElement("span");
        badge.className = "guess-badge";
        if (g > secretNumber) badge.classList.add("high-badge");
        else if (g < secretNumber) badge.classList.add("low-badge");
        badge.textContent = g;
        guessListEl.appendChild(badge);
    });

    input.value = "";
    input.focus();
}

function spawnNumberConfetti() {
    let container = document.getElementById("confettiContainer");
    if (!container) return;
    container.innerHTML = "";
    let colors = ["#22c55e", "#38bdf8", "#f59e0b", "#ef4444", "#a855f7", "#ec4899"];
    for (let i = 0; i < 60; i++) {
        let piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.8 + "s";
        piece.style.animationDuration = (1 + Math.random() * 2) + "s";
        container.appendChild(piece);
    }
    setTimeout(function() { container.innerHTML = ""; }, 3000);
}

// পেজ লোডে গেম শুরু
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("number-game-container") || document.querySelector(".number-game-container")) {
        startNewGame();
    }
});

// ==================== ১৫. টিক ট্যাক টো PRO (অটো মিউজিক + সাউন্ড) ====================

let tttBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let tttGameOver = false;
let tttMusicOn = false;
let tttMusicInterval = null;

function getTTTScores() {
    return {
        X: parseInt(localStorage.getItem("tttScoreX") || 0),
        O: parseInt(localStorage.getItem("tttScoreO") || 0),
        draw: parseInt(localStorage.getItem("tttScoreDraw") || 0)
    };
}

function updatePlayerNames() {
    let nameX = document.getElementById("playerXName").value.trim() || "Player X";
    let nameO = document.getElementById("playerOName").value.trim() || "Player O";
    localStorage.setItem("tttNameX", nameX);
    localStorage.setItem("tttNameO", nameO);
    document.getElementById("displayNameX").textContent = "❌ " + nameX;
    document.getElementById("displayNameO").textContent = "⭕ " + nameO;
    document.getElementById("tttStatus").textContent = "❌ " + nameX + "-এর পালা";
}

function loadPlayerNames() {
    let nameX = localStorage.getItem("tttNameX") || "Player X";
    let nameO = localStorage.getItem("tttNameO") || "Player O";
    document.getElementById("playerXName").value = nameX;
    document.getElementById("playerOName").value = nameO;
    document.getElementById("displayNameX").textContent = "❌ " + nameX;
    document.getElementById("displayNameO").textContent = "⭕ " + nameO;
    document.getElementById("tttStatus").textContent = "❌ " + nameX + "-এর পালা";
}

function makeMove(index) {
    if (tttBoard[index] !== "" || tttGameOver) return;

    tttBoard[index] = currentPlayer;
    let cell = document.querySelectorAll(".ttt-cell")[index];
    cell.textContent = currentPlayer;
    cell.className = "ttt-cell " + (currentPlayer === "X" ? "x-cell" : "o-cell");

    // ক্লিক সাউন্ড
    playTTTSound("click");

    let winner = checkTTTWinner();
    let nameX = document.getElementById("playerXName").value || "Player X";
    let nameO = document.getElementById("playerOName").value || "Player O";

    if (winner) {
        tttGameOver = true;
        let winnerName = winner === "X" ? nameX : nameO;
        document.getElementById("tttStatus").textContent = "🎉 " + winnerName + " জিতেছে!";
        updateTTTScore(winner);
        spawnTTTConfetti();
        playTTTSound("win");
        stopTTTMusic();
        return;
    }

    if (!tttBoard.includes("")) {
        tttGameOver = true;
        document.getElementById("tttStatus").textContent = "🤝 ড্র!";
        updateTTTScore("draw");
        playTTTSound("draw");
        stopTTTMusic();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    let nextName = currentPlayer === "X" ? nameX : nameO;
    let symbol = currentPlayer === "X" ? "❌" : "⭕";
    document.getElementById("tttStatus").textContent = symbol + " " + nextName + "-এর পালা";
}

function checkTTTWinner() {
    let wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let combo of wins) {
        let [a,b,c] = combo;
        if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) {
            document.querySelectorAll(".ttt-cell")[a].classList.add("win-cell");
            document.querySelectorAll(".ttt-cell")[b].classList.add("win-cell");
            document.querySelectorAll(".ttt-cell")[c].classList.add("win-cell");
            return tttBoard[a];
        }
    }
    return null;
}

function updateTTTScore(result) {
    let scores = getTTTScores();
    if (result === "X") scores.X++;
    else if (result === "O") scores.O++;
    else scores.draw++;
    localStorage.setItem("tttScoreX", scores.X);
    localStorage.setItem("tttScoreO", scores.O);
    localStorage.setItem("tttScoreDraw", scores.draw);
    refreshTTTScoreDisplay(scores);
}

function refreshTTTScoreDisplay(scores) {
    if (!scores) scores = getTTTScores();
    let sx = document.getElementById("scoreX"), so = document.getElementById("scoreO"), sd = document.getElementById("scoreDraw");
    if (sx) sx.textContent = scores.X;
    if (so) so.textContent = scores.O;
    if (sd) sd.textContent = scores.draw;
}

function resetTTT() {
    tttBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    tttGameOver = false;
    let nameX = document.getElementById("playerXName").value || "Player X";
    document.getElementById("tttStatus").textContent = "❌ " + nameX + "-এর পালা";
    document.querySelectorAll(".ttt-cell").forEach(c => { c.textContent = ""; c.className = "ttt-cell"; });
    // নতুন খেলায় আবার মিউজিক চালু
    if (!tttMusicOn) toggleTTTMusic();
}

function resetAllScores() {
    if (confirm("সব স্কোর রিসেট করতে চাও?")) {
        localStorage.removeItem("tttScoreX");
        localStorage.removeItem("tttScoreO");
        localStorage.removeItem("tttScoreDraw");
        refreshTTTScoreDisplay({ X: 0, O: 0, draw: 0 });
    }
}

// ===== সাউন্ড সিস্টেম =====
function playTTTSound(type) {
    try {
        let ctx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "click") {
            osc.frequency.value = currentPlayer === "X" ? 500 : 400;
            osc.type = "sine";
            gain.gain.value = 0.15;
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } else if (type === "win") {
            [523, 659, 784].forEach((freq, i) => {
                let o = ctx.createOscillator();
                let g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.frequency.value = freq;
                o.type = "triangle";
                g.gain.value = 0.3;
                o.start(ctx.currentTime + i * 0.2);
                o.stop(ctx.currentTime + i * 0.2 + 0.2);
            });
        } else if (type === "draw") {
            osc.frequency.value = 250;
            osc.type = "square";
            gain.gain.value = 0.2;
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        }
    } catch(e) {}
}

// ===== ব্যাকগ্রাউন্ড মিউজিক =====
function toggleTTTMusic() {
    tttMusicOn = !tttMusicOn;
    let btn = document.getElementById("musicToggleBtn");
    if (tttMusicOn) {
        startTTTMusic();
        if (btn) btn.textContent = "🔊 মিউজিক বন্ধ";
        if (btn) btn.style.background = "#22c55e";
    } else {
        stopTTTMusic();
        if (btn) btn.textContent = "🔇 মিউজিক চালু";
        if (btn) btn.style.background = "#ef4444";
    }
}

function startTTTMusic() {
    stopTTTMusic();
    let ctx;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return; }

    let notes = [262, 294, 330, 349, 392, 349, 330, 294];
    let noteIndex = 0;

    tttMusicInterval = setInterval(() => {
        if (!tttMusicOn) return;
        try {
            let osc = ctx.createOscillator();
            let gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = notes[noteIndex % notes.length];
            osc.type = "sine";
            gain.gain.value = 0.06;
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
            noteIndex++;
        } catch(e) {}
    }, 500);
}

function stopTTTMusic() {
    if (tttMusicInterval) {
        clearInterval(tttMusicInterval);
        tttMusicInterval = null;
    }
    tttMusicOn = false;
}

function spawnTTTConfetti() {
    let container = document.getElementById("confettiContainer");
    if (!container) return;
    container.innerHTML = "";
    let colors = ["#22c55e", "#38bdf8", "#f59e0b", "#ef4444", "#a855f7"];
    for (let i = 0; i < 50; i++) {
        let piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + "s";
        container.appendChild(piece);
    }
    setTimeout(() => container.innerHTML = "", 2000);
}

// পেজ লোডেই ব্যাকগ্রাউন্ড মিউজিক অটো চালু
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("tttBoard")) {
        loadPlayerNames();
        refreshTTTScoreDisplay();
        // অটো মিউজিক চালু
        tttMusicOn = false;
        toggleTTTMusic();
    }
});

// ==================== থিম কাস্টমাইজার ====================

function toggleThemePanel() {
    let panel = document.getElementById("themePanel");
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

function setThemeColor(color) {
    // CSS ভেরিয়েবল সেট
    document.documentElement.style.setProperty("--accent-color", color);
    document.documentElement.style.setProperty("--accent-color-light", color + "cc");
    localStorage.setItem("accentColor", color);
    applyAccentColor(color);
}

function resetThemeColor() {
    localStorage.removeItem("accentColor");
    document.documentElement.style.removeProperty("--accent-color");
    document.documentElement.style.removeProperty("--accent-color-light");
    let defaultColor = "#3b82f6";
    applyAccentColor(defaultColor);
}

function applyAccentColor(color) {
    // h1
    let h1s = document.querySelectorAll("h1");
    h1s.forEach(function(el) {
        if (!el.querySelector("span")) {
            el.style.color = color;
        }
    });

    // btn-primary
    let primaryBtns = document.querySelectorAll(".btn-primary");
    primaryBtns.forEach(function(el) {
        el.style.background = color;
    });

    // progress bar
    let progressBars = document.querySelectorAll(".progress");
    progressBars.forEach(function(el) {
        el.style.background = color;
    });

    // nav a:hover
    let navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function(el) {
        el.onmouseover = function() {
            el.style.background = color;
        };
    });

    // project-card h3
    let cardTitles = document.querySelectorAll(".project-card h3");
    cardTitles.forEach(function(el) {
        el.style.color = color;
    });

    // section-title
    let sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach(function(el) {
        el.style.color = color;
    });

    // hero span
    let heroSpan = document.querySelector(".hero h1 span");
    if (heroSpan) heroSpan.style.color = color;

    // typing-cursor
    let cursor = document.querySelector(".typing-cursor");
    if (cursor) cursor.style.color = color;

    // score numbers
    let scoreNums = document.querySelectorAll(".score-number");
    scoreNums.forEach(function(el) {
        el.style.color = color;
    });
}

function loadAccent() {
    let saved = localStorage.getItem("accentColor");
    if (saved) {
        document.documentElement.style.setProperty("--accent-color", saved);
        applyAccentColor(saved);
    }
}

// পেজ লোডে অ্যাকসেন্ট লোড
document.addEventListener("DOMContentLoaded", function() {
    loadAccent();
});

// ==================== ইমেজ স্লাইডার ====================
let currentSlide = 0;
const slides = document.querySelectorAll(".slider-slide");
const dotsContainer = document.getElementById("sliderDots");

if (slides.length > 0 && dotsContainer) {
    // ডট তৈরি
    slides.forEach((_, i) => {
        let dot = document.createElement("span");
        dot.className = "slider-dot";
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });
    updateSlider();
    // অটো স্লাইড (৫ সেকেন্ড)
    setInterval(() => changeSlide(1), 5000);
}

function changeSlide(dir) {
    currentSlide += dir;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
    let dots = document.querySelectorAll(".slider-dot");
    dots.forEach((d, i) => d.classList.toggle("active-dot", i === currentSlide));
}

// ==================== ভিজিটর কাউন্টার ====================
function updateVisitorCount() {
    let count = parseInt(localStorage.getItem("visitorCount") || 0);
    count++;
    localStorage.setItem("visitorCount", count);
    let el = document.getElementById("visitorCount");
    if (el) el.textContent = count;
}
updateVisitorCount();