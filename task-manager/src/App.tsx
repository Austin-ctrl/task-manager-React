import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 

// 1. Define the structure of our data using an interface

interface Task{
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  // date: string; do a date picker and also count down based on imported date and time
  // severity
}


  // tasks is the actual aray
  // setTasks is a function, not an array. Its only job is to change the data inside task
  // useState always returns an array containing exactly two items" [theData, theFunction] kind of like unpacking in python

function App(){
  // local
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [newTaskDate, setNewTaskDate] = useState<Date | null>(new Date());
  // local

  // new Task Function
  function newTask(){
    if (title.trim() === "") return;
    const task: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      dueDate: newTaskDate,
    };
    setTasks(previousTasks => [...previousTasks, task]);
    setTitle("")
    setNewTaskDate(new Date());
  }

  // delete Task Function
  function deleteTask(id: number){
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id));
  }
  
  // update Task Date Funciton
  function updateTaskDate(id: number, date: Date | null){
    setTasks(previousTasks => 
      previousTasks.map(task => (task.id === id ? { ...task, dueDate: date } : task))
    );
  }

  return (
    <main>
      <h1>Task Manger</h1>
      

      <label htmlFor = "task-title">Task name</label>
      <input
        id = "task-title"
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder = "Enter a task"
      />
      <button onClick={newTask}>add Task</button>
      
      <ul>
        {tasks.map(task => (  // .map turns every task object into an <li> element
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <DatePicker
              selected = {task.dueDate}
              onChange = {(date: Date | null) => updateTaskDate(task.id, date)}
              dateFormat = "yyyy-MM-dd"
            />
            

          </li>

        ))}
      </ul>
    </main>
  )
}
export default App
