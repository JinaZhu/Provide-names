import React, { useState } from "react";
import "../../assets/stylesheets/board.css";

const ManagementBoard = ({ boardWords, teamWords }) => {
  function teamWord(word) {
    if (teamWords["red"].includes(word)) {
      return "red-word";
    } else if (teamWords["blue"].includes(word)) {
      return "blue-word";
    } else if (teamWords["assassin"] === word) {
      return "assassin-word";
    } else {
      return "";
    }
  }

  return (
    <div class="board-container">
      {Array.from(boardWords, (e, i) => {
        return (
          <div class={`board-item ${teamWord(e)}`} key={i}>
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default ManagementBoard;
