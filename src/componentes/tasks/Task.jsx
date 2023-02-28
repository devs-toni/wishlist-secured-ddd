import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "../../context/TaskContext";
import { PropTypes } from 'prop-types';

export default function Task({ id, text, isCompleted, completeTask, deleteTask, updateTask, recoverTask }) {

  const { filters } = useTasks();
  const { filter } = filters;

  const inTrash = (filter === "trash") ? true : false;

  return (
    <div className={`task-container ${inTrash ? "no-hover" : ""}`}>
      <div className={`task-container__task-text ${inTrash ? "no-cursor" : ""}`} onClick={() => !inTrash ? completeTask(id) : {}}>
        <div className={`mark ${isCompleted ? "completed" : ""}`}>
          {
            isCompleted
            &&
            (
              <FontAwesomeIcon
                className='mark__completed'
                icon={faCheck}
              />
            )
          }
        </div>
        <p className={`${isCompleted ? "completed" : ""}`}>{text}</p>
      </div>
      <div className='task-container__icons-container'>
        {
          !inTrash && !isCompleted
          &&
          (
            <FontAwesomeIcon
              className='task-container__icons-container--task-icon'
              icon={faPencil}
              onClick={() => updateTask(id)}
            />
          )
        }
        {
          !inTrash ?
            (
              <FontAwesomeIcon
                className='task-container__icons-container--task-icon'
                icon={faClose}
                onClick={() => deleteTask(id)}
              />
            )
            :
            (
              <FontAwesomeIcon
                className='task-container__icons-container--task-icon'
                icon={faSave}
                onClick={() => recoverTask(id)}
              />
            )
        }
      </div>
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  recoverTask: PropTypes.func.isRequired
}