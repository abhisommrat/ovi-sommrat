// ===== ০. ইউজারের নাম জিজ্ঞেস করে ওয়েলকাম মেসেজ =====
function greetUser() {
    let userName = localStorage.getItem("oviUserName");

    // যদি নাম না থাকে, শুধু প্রথমবার জিজ্ঞেস করবে
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

// ===== ১. ডার্ক মোড / লাইট মোড টগল =====
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

// ===== ২. বিস্তারিত দেখানোর টগল =====
function toggleDetails(id) {
    let content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

// ===== ৩. পেজ লোডের সময় সব চালু =====
window.onload = function() {
    greetUser();
    loadTheme();
};

// ==================== ৪. ডায়েরি (প্রফেশনাল) ====================

function loadNotes(filter = "") {
    let notesContainer = document.getElementById("notesContainer");
    if (!notesContainer) return;

    let notes = JSON.parse(localStorage.getItem("oviNotes")) || [];
    updateNoteCount(notes.length);
    notesContainer.innerHTML = "";

    let filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(filter.toLowerCase())
    );

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
    if (input && counter) {
        counter.innerHTML = input.value.length + " অক্ষর";
    }
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
    if (text === "") {
        alert("কিছু লিখো তো!");
        return;
    }

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
    let searchValue = document.getElementById("searchInput") ? document.getElementById("searchInput").value : "";
    loadNotes(searchValue);
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
        let searchValue = document.getElementById("searchInput") ? document.getElementById("searchInput").value : "";
        loadNotes(searchValue);
    }
}

function deleteAllNotes() {
    if (confirm("তুমি কি নিশ্চিত সব নোট মুছে ফেলতে চাও? এই কাজ আর ফেরত যাবে না!")) {
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
    let searchValue = document.getElementById("searchInput") ? document.getElementById("searchInput").value : "";
    loadNotes(searchValue);
}

document.addEventListener("DOMContentLoaded", function() {
    loadNotes();
});

// ==================== ৭. পাথর কাগজ কাঁচি PRO ====================

let comboCount = 0;

function getScore() {
    return JSON.parse(localStorage.getItem("rpsScore")) || { player: 0, computer: 0, draw: 0, total: 0 };
}

function saveScore(score) {
    localStorage.setItem("rpsScore", JSON.stringify(score));
}

function getHistory() {
    return JSON.parse(localStorage.getItem("rpsHistory")) || [];
}

function saveHistory(entry) {
    let history = getHistory();
    history.unshift(entry);
    if (history.length > 5) history.pop();
    localStorage.setItem("rpsHistory", JSON.stringify(history));
}

function updateStats() {
    let score = getScore();
    let playerEl = document.getElementById("playerScore");
    let computerEl = document.getElementById("computerScore");
    let drawEl = document.getElementById("drawScore");
    let totalEl = document.getElementById("totalGames");
    let winRateEl = document.getElementById("winRate");

    if (playerEl) playerEl.textContent = score.player;
    if (computerEl) computerEl.textContent = score.computer;
    if (drawEl) drawEl.textContent = score.draw;

    let total = score.player + score.computer + score.draw;
    if (totalEl) totalEl.textContent = total;
    if (winRateEl) {
        let rate = total > 0 ? Math.round((score.player / total) * 100) : 0;
        winRateEl.textContent = rate + "%";
    }
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
    if (comboCount >= 3) {
        comboDisplay.style.display = "inline";
        comboCountEl.textContent = comboCount;
    } else {
        comboDisplay.style.display = "none";
    }
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

    setTimeout(function() {
        container.innerHTML = "";
    }, 2000);
}

function playSound(type) {
    // Web Audio API দিয়ে সাউন্ড
    try {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = audioCtx.createOscillator();
        let gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === "win") {
            oscillator.frequency.value = 800;
            oscillator.type = "triangle";
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.2);
        } else if (type === "lose") {
            oscillator.frequency.value = 200;
            oscillator.type = "sawtooth";
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        } else if (type === "draw") {
            oscillator.frequency.value = 400;
            oscillator.type = "square";
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.15);
        }
    } catch(e) {}
}

function countdown(callback) {
    let countdownEl = document.getElementById("countdown");
    let count = 3;
    countdownEl.style.display = "block";
    countdownEl.textContent = count;

    let interval = setInterval(function() {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            countdownEl.textContent = "⚡";
            setTimeout(function() {
                countdownEl.style.display = "none";
                callback();
            }, 300);
            clearInterval(interval);
        }
    }, 400);
}

function playGame(playerChoice) {
    // বাটন ডিজেবল
    let buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach(function(btn) { btn.disabled = true; });

    countdown(function() {
        let choices = ["rock", "paper", "scissors"];
        let computerChoice = choices[Math.floor(Math.random() * 3)];

        let emojiMap = { rock: "🪨", paper: "📄", scissors: "✂️" };
        let nameMap = { rock: "পাথর", paper: "কাগজ", scissors: "কাঁচি" };

        document.getElementById("playerChoice").textContent = emojiMap[playerChoice];
        document.getElementById("computerChoice").textContent = emojiMap[computerChoice];

        let resultText = "";
        let score = getScore();
        let resultType = "";

        if (playerChoice === computerChoice) {
            resultText = "🤝 ড্র! দুজনেই " + nameMap[playerChoice];
            resultType = "draw";
            score.draw++;
            comboCount = 0;
            document.getElementById("resultText").style.color = "#f59e0b";
            playSound("draw");
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            resultText = "🎉 তুমি জিতেছো! " + nameMap[playerChoice] + " > " + nameMap[computerChoice];
            resultType = "win";
            score.player++;
            comboCount++;
            document.getElementById("resultText").style.color = "#22c55e";
            playSound("win");
            if (comboCount >= 3) spawnConfetti();
        } else {
            resultText = "😢 তুমি হেরেছো! " + nameMap[computerChoice] + " > " + nameMap[playerChoice];
            resultType = "lose";
            score.computer++;
            comboCount = 0;
            document.getElementById("resultText").style.color = "#ef4444";
            playSound("lose");
        }

        score.total = score.player + score.computer + score.draw;
        document.getElementById("resultText").textContent = resultText;
        saveScore(score);
        saveHistory({ text: resultText, result: resultType });
        updateStats();
        updateHistoryUI();
        showCombo();

        // এনিমেশন
        let playerEl = document.getElementById("playerChoice");
        let computerEl = document.getElementById("computerChoice");
        playerEl.className = "battle-choice " + resultType;
        computerEl.className = "battle-choice " + (resultType === "win" ? "lose" : resultType === "lose" ? "win" : "draw");

        // বাটন এনাবল
        setTimeout(function() {
            buttons.forEach(function(btn) { btn.disabled = false; });
        }, 500);
    });
}

function resetScore() {
    if (confirm("তুমি কি নিশ্চিত স্কোর রিসেট করতে চাও?")) {
        localStorage.removeItem("rpsScore");
        comboCount = 0;
        updateStats();
        showCombo();
        document.getElementById("resultText").textContent = "খেলা শুরু করো!";
        document.getElementById("playerChoice").textContent = "";
        document.getElementById("computerChoice").textContent = "";
    }
}

function clearHistory() {
    localStorage.removeItem("rpsHistory");
    updateHistoryUI();
}

// কীবোর্ড সাপোর্ট
document.addEventListener("keydown", function(e) {
    let key = e.key.toLowerCase();
    if (key === "r") playGame("rock");
    if (key === "p") playGame("paper");
    if (key === "s") playGame("scissors");
});

document.addEventListener("DOMContentLoaded", function() {
    updateStats();
    updateHistoryUI();
    showCombo();
});

// ===== ৮. কাস্টম ল্যাঙ্গুয়েজ চেঞ্জ =====
function changeLanguage(lang) {
    // গুগল ট্রান্সলেটের সিলেক্ট বক্স খুঁজে বের করে চেঞ্জ করা
    let googleSelect = document.querySelector(".goog-te-combo");
    if (googleSelect) {
        googleSelect.value = lang;
        googleSelect.dispatchEvent(new Event("change"));
    }

    // কারেন্ট ল্যাঙ্গুয়েজ আপডেট
    let langNames = {
        bn: "বাংলা",
        en: "English",
        hi: "हिन्दी",
        ar: "العربية",
        ur: "اردو",
        es: "Español",
        fr: "Français",
        de: "Deutsch",
        ja: "日本語",
        ko: "한국어",
        "zh-CN": "中文"
    };

    let currentLangEl = document.querySelector(".current-lang");
    if (currentLangEl && langNames[lang]) {
        currentLangEl.textContent = langNames[lang];
    }

    // localStorage-এ সেইভ
    localStorage.setItem("selectedLanguage", lang);
}

// পেজ লোডে আগের ভাষা রিস্টোর
function restoreLanguage() {
    let savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang && savedLang !== "bn") {
        setTimeout(function() {
            let googleSelect = document.querySelector(".goog-te-combo");
            if (googleSelect) {
                googleSelect.value = savedLang;
                googleSelect.dispatchEvent(new Event("change"));

                let langNames = {
                    bn: "বাংলা", en: "English", hi: "हिन्दी", ar: "العربية",
                    ur: "اردو", es: "Español", fr: "Français", de: "Deutsch",
                    ja: "日本語", ko: "한국어", "zh-CN": "中文"
                };
                let currentLangEl = document.querySelector(".current-lang");
                if (currentLangEl && langNames[savedLang]) {
                    currentLangEl.textContent = langNames[savedLang];
                }
            }
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    restoreLanguage();
});

// ==================== ৯. ক্যালকুলেটর ====================

let calcExpression = "";

function updateDisplay() {
    let display = document.getElementById("calcDisplay");
    if (display) {
        display.textContent = calcExpression || "0";
    }
}

function appendNumber(num) {
    calcExpression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (calcExpression === "" && op !== "-") return;
    let lastChar = calcExpression.slice(-1);
    if (["+", "-", "*", "/", "%", "."].includes(lastChar)) {
        calcExpression = calcExpression.slice(0, -1);
    }
    calcExpression += op;
    updateDisplay();
}

function appendDot() {
    let parts = calcExpression.split(/[\+\-\*\/\%]/);
    let lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
        calcExpression += ".";
        updateDisplay();
    }
}

function deleteLast() {
    calcExpression = calcExpression.slice(0, -1);
    updateDisplay();
}

function clearCalc() {
    calcExpression = "";
    updateDisplay();
    let history = document.getElementById("calcHistory");
    if (history) history.textContent = "";
}

function calculate() {
    if (calcExpression === "") return;

    let historyEl = document.getElementById("calcHistory");
    try {
        let result = eval(calcExpression);
        if (historyEl) historyEl.textContent = calcExpression + " =";
        calcExpression = String(result);
    } catch (e) {
        if (historyEl) historyEl.textContent = "ভুল ইনপুট";
        calcExpression = "";
    }
    updateDisplay();
}

// কীবোর্ড সাপোর্ট
document.addEventListener("keydown", function(e) {
    let key = e.key;

    if (key >= "0" && key <= "9") {
        appendNumber(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        appendOperator(key);
    } else if (key === ".") {
        appendDot();
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape" || key === "c" || key === "C") {
        clearCalc();
    }
});

// ==================== ১০. টু-ডু লিস্ট ====================

let currentFilter = "all";
let draggedItem = null;

function getTodos() {
    return JSON.parse(localStorage.getItem("oviTodos")) || [];
}

function saveTodos(todos) {
    localStorage.setItem("oviTodos", JSON.stringify(todos));
}

function addTodo() {
    let input = document.getElementById("todoInput");
    if (!input) return;
    let text = input.value.trim();
    if (text === "") return;

    let todos = getTodos();
    todos.push({ id: Date.now(), text: text, completed: false });
    saveTodos(todos);
    input.value = "";
    renderTodos();
}

function toggleTodo(id) {
    let todos = getTodos();
    let todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    let todos = getTodos();
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    renderTodos();
}

function editTodo(id) {
    let todos = getTodos();
    let todo = todos.find(t => t.id === id);
    if (!todo) return;

    let newText = prompt("টাস্ক এডিট করো:", todo.text);
    if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        saveTodos(todos);
        renderTodos();
    }
}

function clearAllTodos() {
    if (confirm("তুমি কি নিশ্চিত সব টাস্ক মুছে ফেলতে চাও?")) {
        localStorage.removeItem("oviTodos");
        renderTodos();
    }
}

function filterTodos(filter) {
    currentFilter = filter;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    renderTodos();
}

function renderTodos() {
    let todos = getTodos();
    let list = document.getElementById("todoList");
    if (!list) return;

    // ফিল্টার
    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);

    // প্রোগ্রেস
    let completedCount = todos.filter(t => t.completed).length;
    let totalCount = todos.length;
    let progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    let progressBar = document.getElementById("todoProgressBar");
    let stats = document.getElementById("todoStats");
    if (progressBar) progressBar.style.width = progress + "%";
    if (stats) stats.textContent = completedCount + "/" + totalCount + " সম্পন্ন";

    // রেন্ডার
    list.innerHTML = "";
    if (filteredTodos.length === 0) {
        list.innerHTML = '<div class="empty-todo">📭 কোনও টাস্ক নেই!</div>';
        return;
    }

    filteredTodos.forEach(todo => {
        let li = document.createElement("li");
        li.className = "todo-item" + (todo.completed ? " completed" : "");
        li.draggable = true;
        li.setAttribute("data-id", todo.id);

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="todo-edit-btn" onclick="editTodo(${todo.id})">✏️</button>
                <button class="todo-delete-btn" onclick="deleteTodo(${todo.id})">❌</button>
            </div>
        `;

        // ড্র্যাগ ইভেন্ট
        li.addEventListener("dragstart", function() {
            draggedItem = this;
            this.classList.add("dragging");
        });
        li.addEventListener("dragend", function() {
            this.classList.remove("dragging");
            draggedItem = null;
        });
        li.addEventListener("dragover", function(e) {
            e.preventDefault();
        });
        li.addEventListener("drop", function() {
            if (draggedItem && draggedItem !== this) {
                let allItems = [...list.children];
                let fromIndex = allItems.indexOf(draggedItem);
                let toIndex = allItems.indexOf(this);
                let todos = getTodos();
                let [moved] = todos.splice(fromIndex, 1);
                todos.splice(toIndex, 0, moved);
                saveTodos(todos);
                renderTodos();
            }
        });

        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderTodos();
});

// ==================== ১১. ওয়েদার অ্যাপ ====================

const API_KEY = "a1945044175fc575c56e84f77b89c1b7"; // এখানে তোর নতুন API Key

async function getWeather() {
    let cityInput = document.getElementById("cityInput");
    if (!cityInput) return;
    let city = cityInput.value.trim();
    if (!city) {
        alert("শহরের নাম লিখো!");
        return;
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=metric&lang=bn";

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {
            alert("শহর খুঁজে পাওয়া যায়নি! ইংরেজিতে লিখে দেখো (Dhaka, London)");
            return;
        }

        let tempEl = document.getElementById("weatherTemp");
        let cityEl = document.getElementById("weatherCity");
        let descEl = document.getElementById("weatherDesc");
        let iconEl = document.getElementById("weatherIcon");
        let detailsEl = document.getElementById("weatherDetails");

        if (tempEl) tempEl.textContent = Math.round(data.main.temp) + "°C";
        if (cityEl) cityEl.textContent = data.name + ", " + data.sys.country;
        if (descEl) descEl.textContent = data.weather[0].description;

        let iconMap = {
            "Clear": "☀️", "Clouds": "☁️", "Rain": "🌧️",
            "Drizzle": "🌦️", "Thunderstorm": "⛈️", "Snow": "❄️",
            "Mist": "🌫️", "Haze": "🌫️", "Fog": "🌫️"
        };
        let weatherMain = data.weather[0].main;
        if (iconEl) iconEl.textContent = iconMap[weatherMain] || "🌍";

        if (detailsEl) {
            detailsEl.innerHTML = 
                '<div class="weather-detail-item">💧 আর্দ্রতা<br><strong>' + data.main.humidity + '%</strong></div>' +
                '<div class="weather-detail-item">💨 বাতাস<br><strong>' + data.wind.speed + ' m/s</strong></div>' +
                '<div class="weather-detail-item">🌡️ অনুভূত<br><strong>' + Math.round(data.main.feels_like) + '°C</strong></div>';
        }

        localStorage.setItem("lastCity", city);

    } catch (error) {
        alert("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করো।");
    }
}

function loadLastCity() {
    let lastCity = localStorage.getItem("lastCity");
    let cityInput = document.getElementById("cityInput");
    if (lastCity && cityInput) {
        cityInput.value = lastCity;
        getWeather();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("weatherContainer")) {
        loadLastCity();
    }
});

// ==================== ১২. কন্টাক্ট ফর্ম ====================

function handleFormSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("অনুগ্রহ করে সবগুলো ঘর পূরণ করো!");
        return;
    }

    https://formspree.io/f/mwvjzkpy// Formspree-তে সাবমিট (এখানে তোর Form ID বসাবি)
    let form = document.getElementById("contactForm");
    let formData = new FormData(form);

    fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function(response) {
        if (response.ok) {
            document.getElementById("contactForm").style.display = "none";
            document.getElementById("formSuccess").style.display = "block";
        } else {
            alert("কিছু সমস্যা হয়েছে! আবার চেষ্টা করো।");
        }
    })
    .catch(function() {
        alert("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করো।");
    });
}