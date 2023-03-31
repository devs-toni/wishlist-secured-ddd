import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Main, Page404 } from '../componentes/index';
import Register from '../componentes/page/Register';

const Router = () => {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="list" element={<Main />}>
          <Route path="filter">
            <Route path=":type" element={<Main />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Route>
    </Routes>
  )
}

export default Router;