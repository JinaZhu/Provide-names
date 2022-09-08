import React, { useState } from "react";
import "../../assets/stylesheets/board.css";

const AgentBoard = ({ boardWords }) => {
  return (
    <div class="board-container">
      {Array.from(boardWords, (e, i) => {
        return (
          <div class="board-item" key={i}>
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default AgentBoard;
