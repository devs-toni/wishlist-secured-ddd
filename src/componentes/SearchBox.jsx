import uuid from 'react-uuid';

const SearchBox = ({ results, click }) => {

  return (
    <ul className='search__results'>
      {
        (results.length > 0) && results.map((res, ind) => {
          return (
            <li key={uuid()} className="search__results--result">
              <p onClick={click}>{res.text}</p>
            </li>
          )
        })
      }
    </ul>
  )
}

export default SearchBox;