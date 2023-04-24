import { useEffect } from 'react'
import { WishList, Form, Cover } from '../../index';
import { useWishes } from '../../../context/WishContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Main = () => {

  const { type } = useParams();
  const navigate = useNavigate();

  const { wishState, singularFunctions, setFilteredWishes, setFilter, setIsFilter } = useWishes();
  const { allWishes, trashWishes, filteredWishes, isFilter } = wishState;
  const { addWish, completeWish, deleteWish, updateWish, recoverWish } = singularFunctions;
  const { authState, logout } = useAuth();


  useEffect(() => {

    if (typeof (type) !== "undefined") {

      setIsFilter(true);
      setFilter(type);
      switch (type) {
        case "active":
          setFilteredWishes([...allWishes.filter(w => !w.isCompleted)]);
          break;

        case "completed":
          setFilteredWishes([...allWishes.filter(w => w.isCompleted)])
          break;

        case "trash":
          setFilteredWishes([...trashWishes])
          break;

        default:
          setFilter("all");
          setIsFilter(false);
          navigate("*");
          break;
      }
    } else {
      setIsFilter(false);
      setFilter("all");
    }
  }, [type, allWishes, trashWishes]);


  return (
    <>
      <main className='main'>
        <Cover />
        <div className="wish-list">
          <h1 className='wish-list__title'>TODO LIST</h1>
          <Form onSubmit={addWish} />
          <section className='wish-list__main'>
            <WishList
              wishes={isFilter ? filteredWishes : allWishes}
              completeWish={completeWish}
              deleteWish={deleteWish}
              updateWish={updateWish}
              recoverWish={recoverWish}
            />
          </section>
        </div>
      </main>
      <div className='user-container'>
        <p className='user-container__name'>Hi <span>{authState.name}</span> !</p>
        <p className='user-container__logout' onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></p>
      </div>
    </>
  )
}

export default Main;