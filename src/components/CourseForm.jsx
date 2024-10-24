import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useFormData } from '../utilities/useFormData';

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'Must be least two characters';
    case 'meets':
      return /^(M|Tu|W|Th|F|Sa|Su){1,3} \d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(val) ? '' : 'Must contain days and start-end';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const CourseForm = ({courses}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const course = courses[id];
  
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);

  const [state, change] = useFormData(validateUserData, course);

  return (
    <form onSubmit={() => {}} noValidate className={`p-3 ${state.errors ? 'was-validated' : null}`}>
        <InputField name="title" text="Title" state={state} change={change} />
        <InputField name="meets" text="Times" state={state} change={change} />
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
};

export { CourseForm };