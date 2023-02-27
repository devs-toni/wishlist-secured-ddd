import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../componentes/Main'
import Page404 from '../componentes/Page404'

const Router = () => {
  return (
    <Routes>

      <Route path="/" >
        <Route index element={<Main />} />
        <Route path="filter">
          <Route path=":type" element={<Main />}/>
        </Route>
      </Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  )
}

export default Router