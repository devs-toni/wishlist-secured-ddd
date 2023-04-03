import { faClose, faCheck, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import { useWishes } from "../../../context/WishContext";
import { PropTypes } from 'prop-types';
import { ActionIcon } from "../../index";

export default function Wish({ _id, text, isCompleted, completeWish, deleteWish, updateWish, recoverWish }) {

  const { wishState } = useWishes();
  const iconClas = "task-container__icons-container--task-icon";

  const inTrash = (wishState.filter === "trash") ? true : false;
  const isTrashStyle = (property) => inTrash ? `no-${property}` : "";
  const isCompletedStyle = isCompleted ? "completed" : "";
  
  const updateIcon = <ActionIcon icon={faPencil} clas={`${iconClas} ${!inTrash && !isCompleted ? '' : 'no-visible'}`} func={updateWish} id={_id} />
  const stateIcon = isCompleted ?  <ActionIcon icon={faCheck} clas="mark__completed" /> : <></>;
  const mainIcons = !inTrash
    ?
    <ActionIcon icon={faClose} clas={iconClas} func={deleteWish} id={_id} />
    :
    <ActionIcon icon={faSave} clas={iconClas} func={recoverWish} id={_id} />


  return (
    <div className={`task-container ${isTrashStyle("hover")}`}>
      <div className={`task-container__task-text ${isTrashStyle("cursor")}`} onClick={() => !inTrash ? completeWish(_id) : {}}>
        <div className={`mark ${isCompletedStyle}`}>{stateIcon}</div>
        <p className={isCompletedStyle}>{text}</p>
      </div>
      <div className='task-container__icons-container'>{updateIcon}{mainIcons}</div>
    </div>
  );
}

Wish.propTypes = {
  _id: PropTypes.string,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  completeWish: PropTypes.func.isRequired,
  deleteWish: PropTypes.func.isRequired,
  updateWish: PropTypes.func.isRequired,
  recoverWish: PropTypes.func.isRequired
}