import './Course.css';

const Course = ({course, details, selected, toggleSelected}) => (
    <div className = {`card ${selected.includes(course) ? 'selected' : 'not-selected'} m-1 p-2`} onClick={() => toggleSelected(course)}>
        <div className={"card-body"}>
            <h5 className="card-title">{details.term} CS {details.number}</h5>
            <p className="card-text">{details.title}</p>
        </div>
        <div className={`card-footer ${selected.includes(course) ? 'selected' : 'not-selected'}`}>
            <p>{details.meets}</p>
        </div>
    </div>
  );

export { Course };