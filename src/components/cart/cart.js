import { MyProduct } from "../../App";
import "./cart.css"
import { useContext, useState, useEffect } from "react";

const Cart = () =>{
    const {products, removeProduct} = useContext(MyProduct);
    const [quantity, setQuantity] = useState([])
    const[total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0)
    useEffect(()=>{
        if(quantity.length !== 0){
            let overAll = 0
            products.forEach((product,index)=>(
                overAll += quantity[index].count * product.price
            ))
            setSubTotal(overAll)
        }
    },[quantity])

    useEffect(()=>{
        const tot = []
        products.forEach((value)=>{
            const id = value.id
            tot.push({id: id,count: 0})
        })
        setQuantity(tot)
    },[])

    const handleDecrement = (id) =>{
        setTotal(total - 1)
        const array = []
        
        quantity.forEach((products) => {
            if (products.id === id && products.count !== 0) {
           
                array.push({id: products.id, count: products.count - 1})
            }
            else{
                array.push({id: products.id, count: products.count})
            }
          })
          setQuantity(array)
    }
    const handleIncrement = (id) =>{
        setTotal(total + 1)
        const array = []
        
        quantity.forEach((products) => {
            if (products.id === id) {
           
                array.push({id: products.id, count: products.count + 1})
            }
            else{
                array.push({id: products.id, count: products.count})
            }
          })
          setQuantity(array)
   
    }
    const handleReomve = (id)=>{
        removeProduct(id);
        let remove = quantity.filter(product => product.id !== id)
        
        setQuantity(remove)
    }
    

    return(
        <div className="cart-wrapper">
            <div className="title">
                <h1>My Cart</h1>
            </div>
            {products.map((product,index)=>(
            <>
            <div className="cart-container">
            <div className="img-container">
                <img className="product-image" src={product.thumbnail} alt="product" />
            </div>
            <div className="detail-container">
                <div className="title-container">
                    <h1 className="inline-block">{product.title}</h1>
                </div>
                <div className="description-container">
                    <p className="inline-blocks">{product.description}</p>
                </div>
            </div>
            <div className="price-quantity-container">
                <div className="price-container">
                  <div>
                    <button className="decrement-btn" onClick={()=>handleDecrement(product.id)}>-</button>
                    <span>{quantity[index]?.count}</span>
                    <button className="increment-btn" onClick={()=>handleIncrement(product.id)}>+</button>
                  </div>
                  <div>
                    <strong className="price">
                        Price: {product.price * quantity[index]?.count}
                    </strong>
                  </div>
                </div>
                <div className="btn-container">
                    <button className="remove-btn" onClick={()=>handleReomve(product.id)}>
                        REMOVE
                    </button>
                </div>
                </div>
                </div>
                <div className="sub-total">
                    <h3>Subtotal</h3>
                    <h3>${product.price * quantity[index]?.count}</h3>
                </div>
                <hr className="line"></hr>
            </>
            ))}
            <div className='bottom-container'>
            <div className='last-line'>
                <h3>Shipping</h3>
                <h5>FREE</h5>
            </div>
            <div className='last-line'>
                <h3>Total</h3>
                <h3>${subTotal}</h3>
            </div>
        </div>
        </div>
    )
}

export default Cart;