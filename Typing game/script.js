const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "tenant",
  "player",
  "depressed",
  "stress",
  "leg",
  "management",
  "symptom",
  "shift",
  "rider",
  "wedding",
  "exclusive",
  "color",
  "deteriorate",
  "depart",
  "latest",
  "exploration",
  "progressive",
  "lose",
  "workshop",
  "kettle",
  "accountant",
  "side",
  "technique",
  "conceive",
  "thank",
  "counter",
  "average",
  "ghostwriter",
  "lamb",
  "dirty",
  "instrument",
  "giant",
  "earthquake",
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Count time
const timeInterval = setInterval(updateTime, 1000);

// Generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//console.log(getRandomWord());

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

// Update score
function updateScore() {
  score = score + 1;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time = time - 1;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // End game
    gameOver();
  }
}

// Game over show
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Game Over</h1>
  <p>Your final score is ${score}</p>
  <button onclick = "location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

// Event listners
// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  // console.log(insertedText);

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear text
    e.target.value = "";

    // Difficulty time setting
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
