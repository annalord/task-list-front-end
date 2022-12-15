import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS_DATA = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {

  const [tasks, setTasks] = useState(TASKS_DATA);

  const setComplete = (id) => {
    setTasks(tasks => tasks.map(task => { 
      if (id === task.id) { 
        return {...task, isComplete: !task.isComplete};
      } else {
        return task;
      }
  }));
  };

  const deleteTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList 
            tasks={tasks} 
            onSetComplete={setComplete}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
  
};

export default App;
