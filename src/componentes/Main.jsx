import React, { useEffect } from 'react'
import WishList from './WishList';
import Form from './Form';
import { useWishes } from '../context/WishContext';
import { useParams, useNavigate } from 'react-router-dom';
const Main = () => {

  const { type } = useParams();
  const navigate = useNavigate();

  const { variables, functions, filters } = useWishes();
  const { addTask, completeTask, deleteTask, updateTask, recoverTask } = functions;
  const { allTasks, trashTasks } = variables;
  const { setFilter, filteredTasks, setFilteredTasks, isFilter, setIsFilter } = filters;

  useEffect(() => {

    if (typeof (type) !== "undefined") {
      switch (type) {
        case "active":
          setFilter("active");
          setIsFilter(true);
          const activeTasks = allTasks.filter(t => !t.isCompleted);
          setFilteredTasks([...activeTasks]);
          break;

        case "completed":
          setFilter("completed");
          setIsFilter(true);
          setFilteredTasks([...allTasks.filter(t => t.isCompleted)])
          break;

        case "trash":
          setFilter("trash");
          setIsFilter(true);
          setFilteredTasks([...trashTasks])
          break;

        default:
          navigate("*");
          break;
      }
    } else {
      setIsFilter(false);
      setFilter("all");
      setFilteredTasks([...allTasks]);
    }
  }, [type, allTasks, trashTasks]);

  return (
    <>
      {
        allTasks && filteredTasks
        &&
        (
          <div className="wish-list">
            <h1 className='wish-list__title'>WISHLIST</h1>
            <Form onSubmit={addTask} />
            <div className='wish-list__main'>
              <WishList 
              tasks={isFilter ? filteredTasks : allTasks} 
              completeTask={completeTask} 
              deleteTask={deleteTask} 
              updateTask={updateTask} 
              recoverTask={recoverTask}/>
            </div>
          </div>
        )
      }
    </>

  )
}

export default Main