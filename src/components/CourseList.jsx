          
const CourseList = ({details}) => (
  <div className = "card m-1 p-2 bg-white">
    <h5 className="card-title">{details.term} CS {details.number}</h5>
    <p className="card-text">{details.title}</p>
    <div className="card-footer bg-white">
      <p>{details.meets}</p>
    </div>
  </div>
);

export default CourseList;