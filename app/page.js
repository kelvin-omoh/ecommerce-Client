'use client'
import Image from "next/image";
import Featured from "./components/Featured";
import { useEffect, useState } from "react";
import axios from "axios";
import NewProducts from "./components/NewProducts";
import Header from "./components/Header";
import { Button } from "@nextui-org/button";
import Footer from "./components/Footer";

export default function Home() {
  const [featuredProduct, setFeaturedProduct] = useState({})
  const [Products, setProducts] = useState({})
  useEffect(() => {
    const getFeaturedProduct = async () => {
      axios.get(`/api/products`, {
        params: {
          id: '65f63a83b2c4b9d7d8e26c9b'
        }
      }).then((response) => {
        console.log(response);
        setFeaturedProduct(response.data)

      }).catch((error) => {
        console.log(error);
      })

    }

    const getAllProducts = async () => {
      try {
        const response = await axios.get(`/api/products`, {
          params: {
            limit: 10 // Specify limit of 10 products
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }


    }

    getAllProducts()
    getFeaturedProduct()



  }, [])

  return (
    <div>

      <Featured product={featuredProduct} />
      <NewProducts products={Products} />



    </div>
  );
}
