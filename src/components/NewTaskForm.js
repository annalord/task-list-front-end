import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const [title, setTitle] = useState('');

  const handleTaskTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleTaskSubmit(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Task title:</label>
      <input type='text' id='title' name='title' value={title} onChange={handleTaskTitle}></input>
      <div><input type = 'submit' value='Add a task'></input></div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleTaskSubmit: PropTypes.func.isRequired
};

export default NewTaskForm;

