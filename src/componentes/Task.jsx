import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function Task({ id, text, isCompleted, completeTask }) {
  return (
    <div className={`tasks-container ${isCompleted ? 'completed' : ''}`}>
      <div className='tasks-container__task-text' onClick={() => completeTask(id)}>{text}</div>
      <div className='tasks-container__icons-container' onClick={() => completeTask(id)}>
        <AiOutlineCloseCircle className='tasks-container__icons-container--task-icon' />
      </div>
    </div>
  );
}