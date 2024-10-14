import { useState } from 'react';
import { CourseList } from "./TermSelector";

const CoursePage = ({courses, term, selected, setSelected}) => {

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  return (
    <CourseList courses={courses} term={term} selected={selected} toggleSelected={toggleSelected} />
  );
};

export { CoursePage };