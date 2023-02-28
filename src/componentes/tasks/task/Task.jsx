import { faClose, faCheck, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "../../../context/TaskContext";
import { PropTypes } from 'prop-types';
import { ActionIcon } from "../../index";

export default function Task({ id, text, isCompleted, completeTask, deleteTask, updateTask, recoverTask }) {

  const { filters } = useTasks();
  const { filter } = filters;
  const iconClas = "task-container__icons-container--task-icon";

  const inTrash = (filter === "trash") ? true : false;
  const isTrashStyle = (property) => inTrash ? `no-${property}` : "";
  const isCompletedStyle = isCompleted ? "completed" : "";
  
  const updateIcon = <ActionIcon icon={faPencil} clas={`${iconClas} ${!inTrash && !isCompleted ? '' : 'no-visible'}`} func={updateTask} id={id} />
  const stateIcon = isCompleted ?  <ActionIcon icon={faCheck} clas="mark__completed" /> : <></>;
  const mainIcons = !inTrash
    ?
    <ActionIcon icon={faClose} clas={iconClas} func={deleteTask} id={id} />
    :
    <ActionIcon icon={faSave} clas={iconClas} func={recoverTask} id={id} />


  return (
    <div className={`task-container ${isTrashStyle("hover")}`}>
      <div className={`task-container__task-text ${isTrashStyle("cursor")}`} onClick={() => !inTrash ? completeTask(id) : {}}>
        <div className={`mark ${isCompletedStyle}`}>{stateIcon}</div>
        <p className={isCompletedStyle}>{text}</p>
      </div>
      <div className='task-container__icons-container'>{updateIcon}{mainIcons}</div>
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