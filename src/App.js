import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const convertFromApiFormat = (apiTask) => {
  const { is_complete:isComplete , id, description, title } = apiTask;
  const newTask = { isComplete, id, description, title }; 
  return newTask;
};

const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
  .then(response => {
    return response.data.map(convertFromApiFormat);
  })
  .catch(err => console.log(err));
};

const markCompleteApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
  .then (response => {
    return convertFromApiFormat(response.data);
  })
  .catch (err => console.log(err));
};

const markIncompleteApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
  .then (response => {
    return convertFromApiFormat(response.data);
  })
  .catch (err => console.log(err));
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
  .then (response => {
    return convertFromApiFormat(response.data);
  })
  .catch (err => console.log(err));
};

const App = () => {

  const [tasks, setTasks] = useState([]);

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
