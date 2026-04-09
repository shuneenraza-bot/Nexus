import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WeblistviewMain from '../components/WeblistviewMain'
import NavButtons from '../components/NavButtons'

const Weblistview = () => {
  return (
    <div className='bg-gray-100' >
    <Header/>
    <WeblistviewMain/>
    <Footer/>
    <NavButtons/>
    </div>
  )
}

export default Weblistview
