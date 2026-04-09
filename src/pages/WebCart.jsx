import React from 'react'
import Header from '../components/Header'
import WebCartMain from '../components/WebCartMain'
import Footer from '../components/Footer'
import NavButtons from '../components/NavButtons'

const WebCart = () => {
  return (
    <div className='bg-gray-100'>
      <Header/>
      <WebCartMain/>
      <Footer/>
      <NavButtons/>
    </div>
  )
}
 
export default WebCart
