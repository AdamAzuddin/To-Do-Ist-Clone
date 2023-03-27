import { useState } from "react";
import correctImage from "./correct.png";

const Task = ({ task, index, onDone, onDragStart, onDragOver, onDrop }) => {
  const [position] = useState({ x: 0, y: 0 });

  return (
    <div
      className="checkbox-wrapper"
      draggable
      onDragStart={(event) => onDragStart(event, index)}
      onDragOver={(event) => onDragOver(event, index)}
      onDrop={(event) => onDrop(event, index)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <label className="checkbox-label">
        {task.text}

        <button className="green-button"  onClick={
            () => onDone(task.id) 
         }>
          <img src={correctImage} alt="Correct Icon" />
        </button>
      </label>
      <label>{task.date}</label>
    </div>
  );
};

export default Task;
