'use client'
import Button from '@/app/components/Button';
import Center from '@/app/components/Center'
import Header from '@/app/components/Header'
import ProductImages from '@/app/components/ProductImages';
import Title from '@/app/components/Title';
import WhiteBox from '@/app/components/WhiteBox';
import CartIcon from '@/app/components/icons/CartIcon';
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from '@/app/store/AppStore';
import toast from 'react-hot-toast';


const ColWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
@media screen and (min-width: 768px) {
  grid-template-columns: .8fr 1.2fr;
}
gap: 40px;
margin: 40px 0;
`;
const PriceRow = styled.div`
display: flex;
gap: 20px;
align-items: center;
`;
const Price = styled.span`
font-size: 1.4rem;
`;


const page = () => {
    const { cartProducts, addProduct, removeProduct, clearCart } = useStore(state => state);

    const [product, setProduct] = useState({})
    const { id } = useParams()
    useEffect(() => {
        const getProduct = async () => {
            axios.get(`/api/products/` + id

            ).then((response) => {
                console.log(response.data);
                setProduct(response.data)

            }).catch((error) => {
                console.log(error);
            })

        }

        getProduct()
    }, [id])

    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        {product.images && <ProductImages images={product.images} />
                        }

                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>${product.price}</Price>
                            </div>
                            <div>
                                <Button primary onClick={() => {
                                    toast.success(product.title + " added successfully to your cart")
                                    addProduct(product._id)
                                }}>
                                    <CartIcon />Add to cart
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    )
}

export default page
