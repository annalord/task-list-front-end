import React, { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultFormState = {
  title: '',
  description: '',
};

const NewTaskForm = (props) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleTaskSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Task title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label htmlFor="description">Task description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <input type="submit" value="Add a task"></input>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
