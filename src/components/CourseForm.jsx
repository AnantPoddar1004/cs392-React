import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const CourseForm = ({courses}) => {
  const {id} = useParams();
  const navigate = useNavigate();

  const course = courses[id];
  
  console.log(course);
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);

  return (
    <form onSubmit={() => {}} className="p-3">
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="meets" className="form-label">Meeting Times:</label>
            <input type="text" id="meets" className="form-control" value={meets} onChange={(e) => setMeets(e.target.value)} />
        </div>
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
};

export { CourseForm };