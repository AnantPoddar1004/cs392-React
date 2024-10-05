          
const CourseList = ({courses}) => (
  <div>
    { Object.entries(courses).map(([course, details]) => <p>{details.term} CS {details.number}: {details.title}</p>)}
  </div>
);

export default CourseList;