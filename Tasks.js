import Task from "./Task";
import { useMemo } from "react";

const Tasks = ({ tasks, onDone, onDrop, setTasks,index }) => {

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event, index) => {
    const sourceIndex = event.dataTransfer.getData("index");
    let newTasks;
    try {
      const parsedIndex = parseInt(index);
      const parsedSourceIndex = parseInt(sourceIndex);
      newTasks = [...tasks];
      const [removed] = newTasks.splice(parsedSourceIndex, 1);
      newTasks.splice(parsedIndex, 0, removed);
      setTasks(newTasks);
    } catch (error) {
      console.error(error);
      console.log("sourceIndex:", sourceIndex, "index:", index);
      console.log("parsed sourceIndex:", parseInt(sourceIndex), "parsed index:", parseInt(index));
      console.log("newTasks:", newTasks);
    }
  };
  
  

  const taskComponents = useMemo(() => {
    return tasks.map((task, index) => (
      <Task
        key={index}
        task={task}
        index={index}
        onDone={() => onDone(task.id)}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        position={task.position}
      />
    ));
  }, [tasks, onDone, handleDragStart, handleDragOver, handleDrop]);
  

  return <>{taskComponents}</>;
}
;

export default Tasks;
