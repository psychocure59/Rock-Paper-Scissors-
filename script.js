let userScore = 0;
let botScore = 0;

// ===== Select Elements =====
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreNo = document.querySelector("#user-score");
const botScoreNo = document.querySelector("#bot-score");

// ===== Generate Bot Choice =====
const genBotChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * options.length);
    return options[randIdx];
};

// ===== Draw Game =====
const drawGame = () => {
    msg.innerText = "🤝 It's a Draw!";
    msg.className = "";
    msg.classList.add("msg-draw");
};

// ===== Show Winner =====
const showWinner = (userWin, userChoice, botChoice) => {
    msg.className = ""; // reset previous style

    if (userWin) {
        userScore++;
        userScoreNo.innerText = userScore;
        msg.innerText = `🎉 You Win! ${userChoice} beats ${botChoice}`;
        msg.classList.add("msg-win");
    } else {
        botScore++;
        botScoreNo.innerText = botScore;
        msg.innerText = `😢 You Lose! ${botChoice} beats ${userChoice}`;
        msg.classList.add("msg-lose");
    }
};

// ===== Play Game =====
const playGame = (userChoice) => {
    const botChoice = genBotChoice();

    if (userChoice === botChoice) {
        drawGame();
    } else {
        let userWin = true;

        if (userChoice === "rock") {
            userWin = botChoice !== "paper";
        } else if (userChoice === "paper") {
            userWin = botChoice !== "scissor";
        } else {
            userWin = botChoice !== "rock";
        }

        showWinner(userWin, userChoice, botChoice);
    }
};

// ===== Add Click Events =====
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const bgMusic = document.querySelector("#bg-music");
let musicStarted = false;
choices.forEach((choice) => {
    choice.addEventListener("click", () => {

        // 🎵 Start background music on first interaction
        if (!musicStarted) {
            bgMusic.volume = 0.4; // soft background sound
            bgMusic.play();
            musicStarted = true;
        }

        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
