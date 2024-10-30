import './Course.css';
import { time_conflict } from '../utilities/time_conflict';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { useAuthState, useProfile } from '../utilities/firebase';

const Course = ({course, details, selected, toggleSelected, coursedata}) => {
    const [user] = useAuthState();
    const [profile, profileError] = useProfile();
    
    return (
    <div className = {`card ${selected.includes(course) ? 'selected' : time_conflict(course, selected, coursedata)? 'unselectable' : 'selectable'} m-1 p-2`} onClick={() => toggleSelected(course)}>
        <div className={"card-body"}>
            <h5 className="card-title">{details.term} CS {details.number}</h5>
            <p className="card-text">{details.title}</p>
        </div>
        <div className={`card-footer d-flex justify-content-between align-items-center`}>
            <p className="mb-0">{details.meets}</p>
            {profile?.isAdmin &&
            <Link to={`/course/${course}`} onClick={(event) => event.stopPropagation()} className="ml-auto">
                <i className={`bi bi-pen ${selected.includes(course) ? 'selected' : time_conflict(course, selected, coursedata)? 'unselectable' : 'selectable'} m-1 p-2`}></i>
            </Link>
    }
        </div>
    </div>
    );
};

export { Course };