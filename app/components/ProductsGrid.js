import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;

  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>

      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}