import './Course.css';
import { time_conflict } from '../utilities/time_conflict';

const Course = ({course, details, selected, toggleSelected, coursedata}) => (
    <div className = {`card ${selected.includes(course) ? 'selected' : time_conflict(course, selected, coursedata)? 'unselectable' : 'selectable'} m-1 p-2`} onClick={() => toggleSelected(course)}>
        <div className={"card-body"}>
            <h5 className="card-title">{details.term} CS {details.number}</h5>
            <p className="card-text">{details.title}</p>
        </div>
        <div className={`card-footer`}>
            <p>{details.meets}</p>
        </div>
    </div>
  );

export { Course };