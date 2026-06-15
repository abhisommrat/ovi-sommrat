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

// ==================== ৭. পাথর কাগজ কাঁচি গেম ====================

function getScore() {
    let score = JSON.parse(localStorage.getItem("rpsScore")) || { player: 0, computer: 0, draw: 0 };
    return score;
}

function saveScore(score) {
    localStorage.setItem("rpsScore", JSON.stringify(score));
}

function updateScoreDisplay() {
    let score = getScore();
    let playerEl = document.getElementById("playerScore");
    let computerEl = document.getElementById("computerScore");
    let drawEl = document.getElementById("drawScore");
    if (playerEl) playerEl.textContent = score.player;
    if (computerEl) computerEl.textContent = score.computer;
    if (drawEl) drawEl.textContent = score.draw;
}

function resetScore() {
    if (confirm("তুমি কি নিশ্চিত স্কোর রিসেট করতে চাও?")) {
        localStorage.removeItem("rpsScore");
        updateScoreDisplay();
        document.getElementById("resultText").textContent = "খেলা শুরু করো!";
        document.getElementById("playerChoice").textContent = "";
        document.getElementById("computerChoice").textContent = "";
    }
}

function playGame(playerChoice) {
    let choices = ["rock", "paper", "scissors"];
    let computerChoice = choices[Math.floor(Math.random() * 3)];

    let emojiMap = {
        rock: "🪨",
        paper: "📄",
        scissors: "✂️"
    };

    let nameMap = {
        rock: "পাথর",
        paper: "কাগজ",
        scissors: "কাঁচি"
    };

    // UI আপডেট
    document.getElementById("playerChoice").textContent = emojiMap[playerChoice];
    document.getElementById("computerChoice").textContent = emojiMap[computerChoice];

    let resultText = "";
    let score = getScore();

    if (playerChoice === computerChoice) {
        resultText = "🤝 ড্র! দুজনেই " + nameMap[playerChoice] + " দিয়েছো!";
        score.draw++;
        document.getElementById("resultText").style.color = "#f59e0b";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        resultText = "🎉 তুমি জিতেছো! " + nameMap[playerChoice] + " হারিয়ে দেয় " + nameMap[computerChoice] + " কে!";
        score.player++;
        document.getElementById("resultText").style.color = "#22c55e";
    } else {
        resultText = "😢 তুমি হেরেছো! " + nameMap[computerChoice] + " হারিয়ে দেয় " + nameMap[playerChoice] + " কে!";
        score.computer++;
        document.getElementById("resultText").style.color = "#ef4444";
    }

    document.getElementById("resultText").textContent = resultText;
    saveScore(score);
    updateScoreDisplay();
}

// পেজ লোডে স্কোর দেখানো
document.addEventListener("DOMContentLoaded", function() {
    updateScoreDisplay();
});