import React from 'react'
import Hero from '../components/Hero'
import CartSection from '../components/CartPage'
import cartBcg from '../images/storeBcg.jpeg'

export default function CartPage() {
    return (
        <>
          <Hero img={cartBcg} />
          <CartSection />
        </>
    )
}
