'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Center from '../components/Center'
import Title from '../components/Title'
import ProductsGrid from '../components/ProductsGrid'
import axios from 'axios'

const page = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {

        const getAllProduct = async () => {
            axios.get(`/api/products`).then((response) => {
                console.log(response.data);
                setProducts(response.data)

            }).catch((error) => {
                console.log(error);
            })

        }
        getAllProduct()




    }, [])


    return (
        <>

            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products} />
            </Center>
        </>
    )
}

export default page
