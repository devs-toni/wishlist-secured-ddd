import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Main, Page404, Register, PrivateRoute } from '../componentes/index';

const Router = () => {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="list" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }>
          <Route path="filter" >
            <Route path=":type" element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            } />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Route>
    </Routes >
  )
}

export default Router;