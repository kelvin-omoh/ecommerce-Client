'use client'
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { useStore } from "../store/AppStore";
import toast from "react-hot-toast";

// import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

export default function Featured({ product }) {
  // const { addProduct } = useContext(CartContext);
  const { addToCart, cartProducts } = useStore(state => state)
  console.log(cartProducts);
  return (
    <>
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Column>


              <div>
                <Title>{product?.title}</Title>

                <Desc>{product?.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink href={'/products/' + product?._id} outline={1} white={1}>Read more</ButtonLink>
                  <Button white onClick={() => {
                    toast.success(product.title + " added successfully to your cart")
                    addToCart(product?._id)
                  }}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </ButtonsWrapper>
              </div>

            </Column>
            <Column>
              {product ?
                <img src="http://res.cloudinary.com/dg78jueqi/image/upload/v1711382773/ecommerce/xh3io71hx73kdvb8vvyj.jpg" alt="" />
                :
                <div className=" skeleton w-32 h-32 bg-red-200"></div>}

            </Column>
          </ColumnsWrapper>
        </Center>

      </Bg>


    </>
  );
}