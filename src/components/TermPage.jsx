import React, { useState } from 'react';
import './TermPage.css';

const TermSelector = ({ term, setTerm }) => {
  const terms = ["Fall", "Winter", "Spring"];
  return (
    <div>
      {terms.map(value => (
        <button key={value} className={`button-general ${value === term ? "button-selected" : "button-passive"}`} onClick={() => setTerm(value)}>
          {value}
        </button>
      ))}
    </div>
  );
}

const CourseList = ({courses, term}) => {
  const term_courses = Object.values(courses).filter(course => course.term === term);
  return(
    <div className="course-list">
      {term_courses.map((details) => (
        <div className = "card m-1 p-2 bg-white">
          <h5 className="card-title">{details.term} CS {details.number}</h5>
          <p className="card-text">{details.title}</p>
          <div className="card-footer bg-white">
            <p>{details.meets}</p>
          </div>
        </div>
      ))}
    </div>
  );
};



export { TermSelector, CourseList };
