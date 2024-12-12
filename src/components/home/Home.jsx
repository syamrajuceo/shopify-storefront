import React from 'react'
import { ProductCard } from '../productCard/ProductCard'
import Carousel from './Carousel'
import ShapeSelector from './ShapeSelector'
import ProductCategories from './ProductCategories'
export const Home = () => {
  return (
    <>
      <Carousel/>
      <ShapeSelector/>
      <ProductCategories/>
    </>
  )
}
