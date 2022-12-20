/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';
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

const updateCompleteApi = (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';

  return axios.patch(`${kBaseUrl}/tasks/${id}/${endpoint}`)
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

const addNewTaskApi = (title) => {
  const currentTaskData = {
    title, 
    description: 'description of task', 
    is_complete: false
  };
  return axios.post(`${kBaseUrl}/tasks`, currentTaskData)
  .then(response => {
    return convertFromApiFormat(response.data);
  })
  .catch(err => console.log(err));
};

const App = () => {

  const [tasks, setTasks] = useState([]);

  const updateComplete = (id) => {
    const task = tasks.find(task => task.id === id);

    return updateCompleteApi(id, !task.isComplete)
    .then(taskResult => {
      setTasks(tasks => tasks.map(task => { 
        if (task.id === taskResult.id) { 
          return taskResult;
        } else {
          return task;
        }
    })
    );});
    };

  const deleteTask = (id) => {
    return deleteTaskApi(id)
    .then((() => {setTasks(tasks => tasks.filter(task => task.id !== id));}));
  };

  const getAllTasks = () => {
    return getAllTasksApi()
    .then (tasks => {
      setTasks(tasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  const handleTaskSubmit = (data) => { 
    addNewTaskApi(data)
    .then(newTask => {
      setTasks([...tasks, newTask])
    })
    .catch(err => console.log(err));
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
            onSetComplete={updateComplete}
            onDeleteTask={deleteTask}
          />
          <NewTaskForm handleTaskSubmit={handleTaskSubmit}></NewTaskForm>
        </div>
      </main>
    </div>
  );

};

export default App;
