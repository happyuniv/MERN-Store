import styled from "styled-components";
import { ProductType } from "./PrdouctList";
import Ratings from "./Ratings";
import { ReactComponent as AddCartIcon } from "../asset/addcart.svg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";
import { openSnackBar } from "../redux/snackBarSlice";

type props = {
  product: ProductType;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 20%;
  padding: 1.5rem;

  @media screen and (max-width: 1200px) {
    width: 25%;
  }

  @media screen and (max-width: 900px) {
    width: 33%;
  }
  @media screen and (max-width: 600px) {
    width: 50%;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
const ProductImg = styled.img`
  width: 100%;
  height: 28rem;
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(122, 122, 122, 0.1);
  opacity: 0;
`;
const ImgContainer = styled.div`
  position: relative;
  /* width: 100%; */
  /* height: 28rem; */

  &:hover ${Info} {
    opacity: 1;
  }
`;

const InfoContainer = styled.div`
  position: relative;
`;
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`;

const Price = styled.div`
  margin: 0.6rem 0;
  font-size: 1.45rem;
  font-weight: 300;
`;
const Rating = styled.div`
  font-size: 0.9rem;
`;

const AddCartButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const ProductListItem = ({ product }: props) => {
  const cartProducts = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();
  const handleCart = () => {
    if (cartProducts.find((item) => item._id === product._id)) {
      dispatch(openSnackBar("Product Already Exist in Cart"));
      return;
    }
    dispatch(openSnackBar("Product added to the Cart"));
    dispatch(
      addToCart({
        product: { ...product, amount: 1 },
        price: product.price,
      })
    );
  };
  return (
    <>
      <Container>
        <ImgContainer>
          <Link to={`/product/${product._id}`}>
            <ProductImg src={product.image} alt="" />
            <Info />
          </Link>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Price>${product.price}</Price>
          <Rating>{Ratings(product.rating.rate)}</Rating>
          <AddCartButton onClick={() => handleCart()}>
            <AddCartIcon width="24" height="24" />
          </AddCartButton>
        </InfoContainer>
      </Container>
    </>
  );
};

export default ProductListItem;
