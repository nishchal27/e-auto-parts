import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

//here destructing all of the properties from product
const FooterBanner = ({FooterBanner:{discount,smallText, largeText1, largeText2, desc, saleTime, midText, buttonText, product, image}}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} alt="" className='footer-banner-image' width={350} height={350}  />
      </div>
    </div>
  )
}

export default FooterBanner