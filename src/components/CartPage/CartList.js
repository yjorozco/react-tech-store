import React from 'react'
import { ProductConsumer } from '../../context'
import CartItem from './CartItem'
export default function CartList() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <ProductConsumer>
                        {
                            value => {
                                const { cart, increment, decrement, removeItem } = value;
                                if (cart.length === 0) {
                                    return (<h1 className="text-title text-center my-4">
                                        your cart is empty
                                    </h1>)
                                } else {
                                    return (
                                        <>
                                            {cart.map(item => {
                                                return <CartItem key={item.id} cartItem={item}
                                                    increment={increment}
                                                    decrement={decrement}
                                                    removeItem={removeItem}
                                                />

                                            })}
                                        </>
                                    )
                                }
                            }
                        }
                    </ProductConsumer>
                </div>
            </div>
           
        </div>
    )
}
