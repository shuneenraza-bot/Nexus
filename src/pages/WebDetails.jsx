import React from 'react'
import WebDetailsMain from '../components/WebDetailsMain'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavButtons from '../components/NavButtons'


const WebDetails = () => {
  return (
    <div className='bg-gray-100'>
    <Header/>
    <WebDetailsMain/>
    <Footer/>
    <NavButtons/>
    </div>
  )
}

export default WebDetails
