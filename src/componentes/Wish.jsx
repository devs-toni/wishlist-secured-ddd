import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import { useWishes } from "../context/WishContext";

export default function Wish({ id, text, isCompleted, completeTask, deleteTask, updateTask, recoverTask }) {

  const { filters } = useWishes();
  const { filter } = filters;
  const inTrash = (filter == "trash") ? true : false;
  const inCompleted = (filter == "completed") ? true : false;

  return (
    <div className={`task-container ${inTrash ? "no-hover" : ""}`}>
      <div className={`task-container__task-text ${inTrash ? "no-cursor" : ""}`} onClick={!inTrash ? () => completeTask(id) : () => { }}>

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
        {
          !inCompleted && !inTrash && !isCompleted
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