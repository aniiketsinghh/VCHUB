import React from 'react'
import Navbar from '../../NavbarFun'
import Section from './Section'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex align-center mx-auto">
        <Section/>
      </div>
    </div>
  )
}

export default Dashboard
