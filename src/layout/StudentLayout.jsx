import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavBar from '../components/StudentNavBar'

export default function AdminLayout() {
  return (<>
  <StudentNavBar/>
  <div>
  <Outlet/>
  </div>
  </>)
}
