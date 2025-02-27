import React from 'react'
import { Home } from '../components/home/Home'
import ScrollToTop from '../utils/ScrollToTop'

export const HomePage = () => {
  ScrollToTop()
  return (
    <>
       <Home/> 
    </>
  )
}
