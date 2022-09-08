import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/board.css";
import AgentBoard from "./agentBoard";
import ManagementBoard from "./managementBoard";
import words from "./words";

function setWords() {
  const boardWords = [];

  while (boardWords.length < 25) {
    const word = words[Math.floor(Math.random() * words.length)];
    if (!boardWords.includes(word)) {
      boardWords.push(word);
    }
  }

  localStorage.setItem("words", JSON.stringify(boardWords));

  return boardWords;
}

function setTeamWords(boardWords, firstMover) {
  const redWords = [];
  const blueWords = [];
  const assassin = boardWords[Math.floor(Math.random() * boardWords.length)];

  while (redWords.length < (firstMover === "red" ? 9 : 8)) {
    const word = boardWords[Math.floor(Math.random() * boardWords.length)];
    if (!redWords.includes(word) && word !== assassin) {
      redWords.push(word);
    }
  }

  while (blueWords.length < (firstMover === "blue" ? 9 : 8)) {
    const word = boardWords[Math.floor(Math.random() * boardWords.length)];
    if (
      !redWords.includes(word) &&
      !blueWords.includes(word) &&
      word !== assassin
    ) {
      blueWords.push(word);
    }
  }

  const teamWords = {
    red: redWords,
    blue: blueWords,
    assassin: assassin,
  };

  localStorage.setItem("teamWords", JSON.stringify(teamWords));

  return teamWords;
}

const Board = () => {
  const [view, setView] = useState("agent");
  const [boardWords] = useState(
    JSON.parse(localStorage.getItem("words")) || setWords()
  );

  const [teamWords] = useState(
    JSON.parse(localStorage.getItem("teamWords")) ||
      setTeamWords(boardWords, "red")
  );

  function currentRoleClass(role) {
    return role === view ? "current-role" : "";
  }

  function changeView(view) {
    setView(view);
  }

  const redTeamPlayers = localStorage.getItem("redTeam") ? JSON.parse(localStorage.getItem("redTeam")).map((player, i) => {
    return (
      <li key={`${player}-${i}`}><span>{player}</span></li>
    )
  }) : ''

  const blueTeamPlayers = localStorage.getItem("blueTeam") ? JSON.parse(localStorage.getItem("blueTeam")).map((player, i) => {
    return (
      <li key={`${player}-${i}`}><span>{player}</span></li>
    )
  }) : ''

  return (
    <div>
      <Link to='/' className="teams-link">Back to Teams Creation</Link>
      <div>
        <div class="team-cards">
          <div class="board-item red-card">
            <div>
              Red Team
              {redTeamPlayers}
            </div>
          </div>
          <div class="board-item">Cards Remaining</div>
          <div class="board-item blue-card">
          <div>
              Blue Team
              {blueTeamPlayers}
            </div>
          </div>
        </div>
      </div>
      <button
        class={`role-button ${currentRoleClass("agent")}`}
        onClick={() => changeView("agent")}
      >
        Agent
      </button>
      <button
        class={`role-button ${currentRoleClass("management")}`}
        onClick={() => changeView("management")}
      >
        Management
      </button>
      {view === "agent" && <AgentBoard boardWords={boardWords} />}
      {view === "management" && (
        <ManagementBoard boardWords={boardWords} teamWords={teamWords} />
      )}
    </div>
  );
};

export default Board;
