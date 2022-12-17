import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, Footer } from '../components';

const Home = ({products, bannerData}) => (
    <div>
    <HeroBanner HeroBanner={bannerData.length && bannerData[0]} />
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Auto parts of all vehicles</p>
    </div>
    <div className='products-container'>
      {
        products?.map((product)=><Product key={product._id} product={product} />)
      }
    </div>
    <FooterBanner FooterBanner={bannerData && bannerData[0]} />
    </div>
);

//using serever side rendering
//whatever getServerSideProps returns it get populated in 'Home' function
export const getServerSideProps = async () => {

  // take all products from sanity dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // take all banners from sanity dashboard
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props:{products, bannerData}
  }
}
//server side rendering ends

export default Home;