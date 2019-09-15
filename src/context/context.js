import React, { Component } from 'react'
import {linkData} from './linkData';
import {socialData} from './socialData';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 101,
        links: linkData,
        socialIcons: socialData,
        cart: []
    }
    handleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }
    handleCart = () =>{
        this.setState({
            cartOpen:!this.state.sidebarOpen
        });
    }
    closeCart = () => {
        this.setState({
            cartOpen: false
        })
    }
    openCart = () => {
        this.setState({
            cartOpen: true
        });
    }

    render(){
        return(
        <ProductContext.Provider 
        value={{
            ...this.state,
            handleSidebar: this.handleSidebar,
            handleCart: this.handleCart,
            closeCart: this.closeCart,
            openCart: this.openCart
        }} >
            {this.props.children}
        </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}