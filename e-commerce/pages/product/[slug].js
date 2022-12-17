import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';


const ProductDetails = ({ products, product }) => {
    const [index, setIndex] = useState(0);
    // destructuring the values from product 
    const { image, name, details, price } = product;
    const {decQty, incQty, qty, onAdd} = useStateContext();

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])} className="product-detail-image" />
                    </div>
                    <div className='small-image-container'>
                        {image?.map((item, i) => (
                            // 'onmouseEnter' callbck func. will change the index 
                            <img src={urlFor(item)} className={i == index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)} />
                        ))}
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p>₹{price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={()=> onAdd(product, qty)}>Add to Cart</button>
                        <button type='button' className='buy-now'>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also need</h2>
                <div className='marquee'>
                    {/* "track" className is for moving around animation */}
                    <div className='maylike-products-container track'>
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

//(Static Site Generation)
// '*' this star means to get everything

// we've to tell nextJs the list of paths to be statically generated. 
// Next.js will statically pre-render all the paths specified by getStaticPaths 
export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
    // sanity: give me all the product but don't return all of the data
    // just return the current slug property
    slug{
        current
    }
}`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        //getStaticProps runs in the background when using fallback: true
        //getStaticProps is called before initial render when using fallback: blocking
        paths,
        fallback: 'blocking'
    }
}

//nextJs will pre-render this page at build time using props returned
export const getStaticProps = async ({ params: { slug } }) => {

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    // fetching first product that matches the query
    const product = await client.fetch(query);

    //fetch all the products
    const products = await client.fetch(productsQuery);

    console.log(products, 'products');
    return {
        props: { products, product }
    }
}
//(Static Site Generation) ends

export default ProductDetails