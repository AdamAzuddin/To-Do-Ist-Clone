import { useState } from "react";

const BottomForm = ({ onSubmit, onClose }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please enter a task.");
      return;
    }
    onSubmit({ text, date });
    setText("");
    setDate("");
  };

  const handleCancel = () => {
    onClose();
    setText("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bottom-form">
      <input
        type="text"
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="date"
        placeholder="Add date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="bottom-form-buttons">
        <button type="submit">Add</button>
        <button type="button" onClick={handleCancel}>Close</button>
      </div>
    </form>
  );
};

export default BottomForm;
