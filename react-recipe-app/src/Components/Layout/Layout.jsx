import React from 'react'
import Nav from '../Navbar/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
    <Nav />
    <Outlet />
    <Footer />
    </>
  )
}
