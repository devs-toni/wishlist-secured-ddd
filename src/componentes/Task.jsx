import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Task({ id, text, isCompleted, completeTask, deleteTask }) {
  return (
    <div className="task-container">
      <div className='task-container__task-text' onClick={() => completeTask(id)}>
        <div className={`mark ${isCompleted ? "completed" : ""}`}>
          {
            isCompleted
              ?
              (
                <FontAwesomeIcon
                  className='mark__completed'
                  icon={faCheck}
                />
              )
              :
              ""
          }
        </div>
        <p className={`${isCompleted ? "completed" : ""}`}>{text}</p>
      </div>
      <div className='task-container__icons-container'>
        <FontAwesomeIcon
          className='task-container__icons-container--task-icon'
          icon={faClose}
          onClick={() => deleteTask(id)}
        />
      </div>
    </div>
  );
}