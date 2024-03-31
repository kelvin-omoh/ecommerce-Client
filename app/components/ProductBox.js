import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";
import { useStore } from "../store/AppStore";
import toast from "react-hot-toast";
// import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  Image{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {

  const { addToCart, cartProducts } = useStore(state => state)
  console.log(cartProducts);
  const url = '/products/' + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div className=" bg-red-100 ">
          <Image className=" " width={100} height={100} src={images?.[0]} alt="" />

        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button block onClick={() => {
            toast.success(title + " added to cart")
            addToCart(_id)
          }} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}