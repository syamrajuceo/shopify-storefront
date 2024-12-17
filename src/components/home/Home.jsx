import React from 'react'
import { ProductCard } from '../productCard/ProductCard'
import Carousel from './Carousel'
import ShapeSelector from './ShapeSelector'
import ProductCategories from './ProductCategories'
import Brand from './Brand'
import Banner from './Banner'
import BannerImage1 from '../../assets/banner1.png'
import BannerImage2 from '../../assets/banner2.png'
import BannerImage3 from '../../assets/banner3.png'
import { ProductCarousel } from './ProductCarousel'
import { ProductCarousel2 } from './ProductCarousel2'
import bannerMobile from '../../assets/bannerMobile.png'
import bannerMobile2 from '../../assets/bannerMobile2.png'
import bannerMobile3 from '../../assets/bannerMobile3.png'
import Promo2 from '../../assets/promo3.png'
export const Home = () => {
  return (
    <>
    
      <Carousel/>
      <ShapeSelector/>
      <div className='flex flex-col gap-6'>
      <ProductCategories/>
      <Banner image={BannerImage1} mobile={bannerMobile} />
      </div>
      <ProductCarousel/>
      <ProductCarousel Promoimage={Promo2}/>
      <div className='flex flex-col gap-5'>
      <Banner image={BannerImage2} mobile={bannerMobile2} />
      <Banner image={BannerImage3} mobile={bannerMobile3} />
      </div>
      <Brand/>
      <ProductCarousel2/> 
      
    </>
  )
}
