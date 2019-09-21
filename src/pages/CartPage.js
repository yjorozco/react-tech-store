import React from 'react'
import Hero from '../components/Hero'
import CartSection from '../components/CartPage'
import cartBcg from '../images/storeBcg.jpeg'

export default function CartPage(props) {
    return (
        <>
          <Hero img={cartBcg} />
          <CartSection history={props.history}/>
        </>
    )
}
