'use client'
import Header from "../components/Header";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";
import { useStore } from "../store/AppStore";
import clsx from "clsx"
import { PaystackButton } from "react-paystack"
import { usePaystackPayment } from 'react-paystack';
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';
import Loader from "../components/loader";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

export default function page() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useStore(state => state);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [transactionReference, setTransactionReference] = useState('')
    const [TransactionLoading, setTransactionLoading] = useState(false)
    const { transactionRef, addTransactionReference } = useStore(state => state)


    const navigate = useRouter()



    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    console.log(response);
                    setProducts(response.data);
                }).catch(error => {
                    console.log(error)
                })

        } else {
            setProducts([]);
        }
    }, [cartProducts]);
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    function lessOfThisProduct(id) {
        // const indexToRemove = cartProducts.indexOf(id)
        // if (indexToRemove !== -1) {
        //     const newCart = [...cart];
        //     newCart.splice(indexToRemove, 1);

        // }
        // console.log(id);
        removeProduct(cartProducts.indexOf(id));
    }

    const verifyTransaction = async () => {
        try {
            if (transactionRef !== null) {

                const response = await axios.get(`/api/transaction/verify/${transactionRef}`)


                console.log(response.data);
                setTransactionLoading(false);
                if (response.data.data.status === "success") {
                    const transactionResponseStatus = await axios.post(`/api/transaction/verify/${transactionRef}`, {
                        order_id: response.data.data.metadata.order_id
                    })
                    console.log("transactionResponseStatus");
                    console.log(transactionResponseStatus);
                    clearCart()
                    toast.success('Your product has been order successfully!')

                    setTimeout(async () => {

                        console.log("verify response");
                        console.log(response);
                        addTransactionReference(null)

                    }, 3000);
                }
                console.log(response);
            }


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        verifyTransaction()
    }, [transactionRef])

    async function goToPayment() {
        try {
            setTransactionLoading(true);
            const response = await axios.post('/api/checkout', {
                name, email, city, postalCode, streetAddress, country,
                cartProducts,
            });
            console.log(response.data.data);
            addTransactionReference(response.data.data.reference)


            if (response.data.data.authorization_url) {
                window.location = response.data.data.authorization_url;

            }
            // Add event listener to check if the window is left

            // navigate.push(response.data.data.authorization_url)
        } catch (error) {
            console.log(error);
        }


    }






    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if (isSuccess) {
        return (
            <>

                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you when your order will be sent.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        );
    }





    return (
        <>

            {TransactionLoading &&
                <Loader />
            }

            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length && (
                            <div>Your cart is empty</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price -{transactionRef}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt="" />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button
                                                    onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button
                                                    onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                            </td>
                                            <td>
                                                ${cartProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order information</h2>
                            <Input type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <CityHolder>
                                <Input type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)} />
                                <Input type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)} />
                            </CityHolder>
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <Input type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)} />
                            <Button black block
                                // onClick={() => initializePayment(onSuccess, onClose)}>
                                onClick={goToPayment}>

                                Continue to payment
                            </Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
