import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (<>
  <AdminNavBar/>
  <div>
  <Outlet/>
  </div>
  </>)
}
