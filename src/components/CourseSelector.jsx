import { useState } from 'react';
import { CourseList } from "./TermSelector";
import { time_conflict } from '../utilities/time_conflict';

const CoursePage = ({courses, term, selected, setSelected}) => {

  const toggleSelected = (item) => 
    time_conflict(item, selected, courses) ? null : setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  return (
    <CourseList courses={courses} term={term} selected={selected} toggleSelected={toggleSelected} />
  );
};

export { CoursePage };