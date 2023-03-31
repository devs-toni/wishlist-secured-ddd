import { Link } from 'react-router-dom';

const Page404 = () => {

  return (

    <div id="notfound">
      <div className="notfound">
        <div className="notfound__notfound-404">
          <h1>Ooops!</h1>
        </div>
        <div className="notfound__content">
          <h2>404 - Página no encontrada</h2>
          <p>La página que estás buscando no existe</p>
          <Link to='/'>Volver</Link>
        </div>
      </div>
    </div>
  )
}

export default Page404;