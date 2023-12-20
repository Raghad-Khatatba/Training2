import React from 'react'
import Home from './Pages/Home'
import Search from './Pages/SearchPage'
import Favorite from './Pages/Favorite'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import NotFound from './Components/NotFound/NotFound'
import Details from './Components/Details/Details'

let routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'favorite', element: <Favorite /> },
      { path: 'details/:id', element: <Details /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={routers}></RouterProvider>
  )
}
