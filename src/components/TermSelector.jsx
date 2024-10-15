import React, { useState } from 'react';
import { Course } from './Course';
import './TermSelector.css';

const TermSelector = ({ term, setTerm }) => {
  const terms = ["Fall", "Winter", "Spring"];
  return (
    <div>
      {terms.map(value => (
        <button key={value} className={`${value === term ? "button-selected" : "button-general"}`} onClick={() => setTerm(value)}>
          {value}
        </button>
      ))}
    </div>
  );
}

const CourseList = ({courses, term, selected, toggleSelected}) => {
  const filtered_courses_array = Object.entries(courses).filter(([course, details]) => details.term === term);

  const filtered_courses = Object.fromEntries(filtered_courses_array);

  return(
    <div className="course-list">
      {Object.entries(filtered_courses).map(([course, details]) => (
        <Course course={course} details={details} selected={selected} toggleSelected={toggleSelected} coursedata={courses}/>
      ))}
    </div>
  );
};



export { TermSelector, CourseList };
