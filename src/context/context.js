import React, { Component } from 'react'
import {linkData} from './linkData';
import {socialData} from './socialData';
import { items } from './productData';


const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 101,
        links: linkData,
        socialIcons: socialData,
        cart: [],
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal:0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: true,
        search:'',
        price:0,
        min:0,
        max:0,
        company:'all',
        shipping: false
    }

    componentDidMount(){
        this.setProducts(items);
    }

    setProducts = (products) => {
        let storeProducts = products.map(item => {
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            const product = { id, ...item.fields, image };
            return product;
        } )

        let featuredProducts = storeProducts.filter(item => 
            item.featured === true
        )
        let maxPrice = Math.max(...storeProducts.map(item => item.price));
        this.setState({
            storeProducts,
            filteredProducts: storeProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false,
            price: maxPrice,
            max: maxPrice
        }, () => {
                this.addTotals();
        })
        
    }

    getStorageCart = () => {
        let cart;
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        else{
            cart = [];
        }
        return cart;
    }

    getStorageProduct = () => {
        return localStorage.getItem('singleProduct')? 
        JSON.parse(localStorage.getItem('singleProduct'))
        : {};
    }

    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total;
            cartItems += item.count;
        })
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax =  subTotal * 0.2;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        return {
            cartItems,
            subTotal,
            tax,
            total
        }
    }

    syncStorage = () => {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }

    addToCart = id => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if(!tempItem){
            tempItem = tempProducts.find(item => item.id === id);
            let total = tempItem.price;
            let cartItem = {...tempItem, count:1, total};
            tempCart = [...tempCart, cartItem];
        } 
        else {
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat((tempItem.price * tempItem.count).toFixed(2));
        }
        this.setState(()=>{
            return {cart:tempCart}
        }, ()=>{
            this.addTotals();
            this.syncStorage();
            this.openCart();
        });

    }

    addTotals = () =>{
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        })
    } 
    setSingleProduct = id =>{
        let product = this.state.storeProducts.find(item => item.id === id);
        localStorage.setItem('singleProduct', JSON.stringify(product));
        this.setState({
            singleProduct:{...product},
            loading: false
        })
    }

    handleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }
    handleCart = () =>{
        this.setState({
            cartOpen:!this.state.cartOpen
        });
    }
    closeCart = () => {
        this.setState({
            cartOpen: false
        })
    }
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count++;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        }, ()=>{
            this.addTotals();
            this.syncStorage()
        })
    }
    decrement = (id) =>{
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count = cartItem.count - 1;
        if(cartItem.count === 0){
            this.removeItem(id);
        }   
        else
        {
            cartItem.total = cartItem.count * cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));
            this.setState(()=>{
                return {
                    cart: [...tempCart]
                }
            }, ()=>{
                this.addTotals();
                this.syncStorage()
            })                
        }    
    }

    removeItem = (id) => {
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState({
            cart:[...tempCart]
        }, ()=>{
            this.addTotals();
            this.syncStorage()
        })
    }

    clearCart = () => {
        this.setState({
            cart:[]
        }, ()=>{
            this.addTotals();
            this.syncStorage()
        })
    }
    
    openCart = () => {
        this.setState({
            cartOpen: true
        });
    }

    handleChange = (event) =>{
        const name=event.target.name;
        const value = event.target.type === "checkbox"? event.target.checked: event.target.value;
        console.log(event.target.name);
        this.setState({
            [name]: value
        }, () => {
        this.sortData()});       
    }

    sortData = () => {
       
        
        const { shipping, storeProducts, price, company, search} = this.state;

        let tempProducts = [...storeProducts];
        let tempPrice =  parseInt(price);

        if(shipping)
            tempProducts = tempProducts.filter(item => item.freeShipping === true);
        

        tempProducts = tempProducts.filter(
            item => item.price <= tempPrice
        );
        if(company!="all"){
            tempProducts = tempProducts.filter(item => item.company === company);
        }

        console.log(tempProducts);
        if(search.length>0){
            tempProducts = tempProducts.filter(item => {
                let tempSearch = search.toLowerCase();
                let tempTitle = item.title.toLowerCase().slice(0, search.length);
                if(tempSearch === tempTitle){
                    return item;
                }
            })
        }

        this.setState({
            filteredProducts: tempProducts
        })
    }

    render(){
        return(
        <ProductContext.Provider 
        value={{
            ...this.state,
            handleSidebar: this.handleSidebar,
            handleCart: this.handleCart,
            closeCart: this.closeCart,
            openCart: this.openCart,
            addToCart: this.addToCart,
            setSingleProduct: this.setSingleProduct,
            increment: this.increment,
            decrement: this.decrement,
            clearCart: this.clearCart,
            removeItem: this.removeItem,
            handleChange: this.handleChange
        }} >
            {this.props.children}
        </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer}