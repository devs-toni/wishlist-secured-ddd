import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWishes } from '../../context/WishContext';
import { Wish } from '../index';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

export default function WishList({ wishes, completeWish, deleteWish, updateWish, recoverWish }) {

  const { pluralFunctions, wishState } = useWishes();
  const { getTotalLeftWishes, deleteAllWishes, deleteCompletedWishes, deleteTrash, recoverAllWishes } = pluralFunctions;

  const inTrash = (wishState.filter === "trash") ? true : false;
  const leftItems = getTotalLeftWishes();

  const isActive = (state) => (wishState.filter === state) ? "show" : "";
  const hasItems = (wishState.trashWishes.length > 0) ? "not-empty" : "";

  return (
    <>
      <div className='filter'>
        <div className="filter__items">{leftItems} items left</div>
        <nav className="filter__type">
          <NavLink to="/list" className={isActive("all")}>All</NavLink>
          <NavLink to="/list/filter/active" className={isActive("active")}>Active</NavLink>
          <NavLink to="/list/filter/completed" className={isActive("completed")}>Completed</NavLink>
          <NavLink to="/list/filter/trash" className={`${isActive("trash")} ${hasItems}`}>Trash</NavLink>
        </nav>
        <div className="filter__clear">
          {
            !inTrash ?
              (
                <>
                  <p style={{ marginBottom: 0 }} onClick={deleteCompletedWishes}>Clear Completed</p>
                  <FontAwesomeIcon onClick={deleteAllWishes} icon={faEraser} />
                </>
              )
              :
              (
                <>
                  <p style={{ marginBottom: 0 }} onClick={recoverAllWishes}>Recover All</p>
                  <FontAwesomeIcon onClick={deleteTrash} icon={faEraser} />
                </>
              )
          }
        </div>
      </div>
      <article className='wish-list__main--container'>
        {
          wishes.map((wish) =>
            <Wish
              key={uuid()}
              _id={wish._id}
              text={wish.text}
              isCompleted={wish.isCompleted}
              completeWish={completeWish}
              deleteWish={deleteWish}
              updateWish={updateWish}
              recoverWish={recoverWish}
            />
          )
        }
      </article>
    </>
  );
}

WishList.propTypes = {
  wishes: PropTypes.array.isRequired,
  completeWish: PropTypes.func.isRequired,
  deleteWish: PropTypes.func.isRequired,
  updateWish: PropTypes.func.isRequired,
  recoverWish: PropTypes.func.isRequired
}