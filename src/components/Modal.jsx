import './Modal.css';
import React, { useState } from 'react';

const CoursePlan = ({ coursedata, selected }) => {
    if (selected.length === 0){
        console.log("No courses selected!")
        return <p>No courses selected! Click on a course to select it.</p>;
    }
    else {
        console.log("Courses selected!")
        return(
            <div>
                <ul>
                    {selected.map((course) => (
                        <li><p><b>{coursedata[course].term} CS {coursedata[course].number} : </b> {coursedata[course].title} ({coursedata[course].meets})</p></li>
                    ))}
                </ul>
            </div>
        );
    }
}

const Modal = ({ coursedata, selected, open, close }) => (
  <div
    className={`modal ${open ? 'modal-show' : 'modal'}`}
    tabIndex="-1"
    role="dialog"
    onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
            <h3>Course Plan</h3>
            <button type="button" className="btn-close" aria-label="Close" onClick={close}/>
        </div>
        <div className="modal-body">
            <CoursePlan coursedata={coursedata} selected={selected}/>
        </div>
      </div>
    </div>
  </div>
);

export { Modal };