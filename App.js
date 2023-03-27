import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import BottomForm from "./components/BottomForm";

function App() {

  // set tasks and setTasks var to none
  const [tasks, setTasks] = useState([]);

  // fetch data from API/db
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch task from db
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");

    const data = await res.json();

    return data;
  };


  const [showForm, setShowForm] = useState(false);

  // when done button is clicked
  const onDone = async (id) => {
    // delete task from db
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    // update ui to filter remaining task only
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // when task is drop after rearranged
  const onDrop = (sourceTask, targetTask) => {
    const newTasks = tasks.map((task) => {
      if (task.id === sourceTask.id) {
        return { ...sourceTask, id: targetTask.id };
      } else if (task.id === targetTask.id) {
        return { ...targetTask, id: sourceTask.id };
      } else {
        return task;
      }
    });

    setTasks(newTasks);
  };

  // when add button in clicked
  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  // when submit button is clicked
  const onSubmit = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <div className="container">
      <header>To Do Ist</header>
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDone={onDone}
          onDrop={onDrop}
          setTasks={setTasks}
        />
      ) : (
        "No Task"
      )}
      <Footer className="footer" onFormOpen={handleFormOpen} />
      {showForm && <BottomForm onClose={handleFormClose} onSubmit={onSubmit} />}
    </div>
  );
}

export default App;
