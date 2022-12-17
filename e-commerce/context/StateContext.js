import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        //item already present in the cart beahviour,{

        //check if the item already present in the cart
        const checkProductInCart = cartItems.find((item) => item._id == product._id);
        //updating total price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        //updating total qty
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id == product._id)
                    return {
                        ...cartProduct,
                        //updating quantity
                        quantity: cartProduct.quantity + quantity,
                    }
            });

            setCartItems(updatedCartItems);
        }
        //item already present in the cart beahviour, end}
        else {
            //not already present in the cart then :-
            //update the qty
            product.quantity = quantity;
            // spread all of the existing items and spred new items
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`);
    }

    const onRemove = (product) => {
        //search for the product, return first value
        foundProduct = cartItems.find((item) => item._id === product._id)
        let newCartItems = cartItems.filter((item) => item._id !== product._id);

        //update the total price
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        //update total qty
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);

    }

    const toggleCartItemQuantity = (id, value) => {
        //search for the product, return first value
        foundProduct = cartItems.find((item) => item._id === id)
        //get the position of the first value that matched
        index = cartItems.findIndex((product) => product._id === id);

        //filtering out the 'cartItems' to include all of the items but
        //keep items which are == to 'id' and filter out those are not
        //by doing this we're not mutating original state
        let newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            //update cart items
            //spreading the product increasing the qty by 1
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);

            //update the total price
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)

            //update total qty
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                //update cart items
                //spreading the product increasing the qty by 1
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);

                //update the total price
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)

                //update total qty
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalQuantities,
            qty,
            totalPrice,
            incQty,
            decQty, onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);