import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../api";
import CustomError from "../component/CustomError";
import Loading from "../component/Loading";
import { ProductType } from "../component/PrdouctList";
import Ratings from "../component/Ratings";
import SnackBar from "../component/SnackBar";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { openSnackBar } from "../redux/snackBarSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5rem 10rem;

  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
    padding: 2rem 2rem;
  }
`;

const LoadingContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40rem;

  @media screen and (max-width: 800px) {
    flex: 1;
    order: 1;
    margin-top: 5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
`;

const Price = styled.span`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 400;
`;

const Rating = styled.div``;

const Description = styled.p`
  margin: 2rem 0;
  font-size: 1.5rem;
`;

const AddContainer = styled.div``;
const AmountContainer = styled.div``;
const Plus = styled.button`
  font-size: 2rem;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const Minus = styled(Plus)``;
const Amount = styled.span`
  margin: 0 1rem;
  font-size: 2rem;
`;
const AddToCart = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.5rem;
  color: white;
  background-color: black;
  border: 1px solid;

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: gray;
  }
`;

const ImgContainer = styled.div`
  width: 40rem;
  height: 40rem;

  @media screen and (max-width: 800px) {
    width: 100%;
    /* height: 100%; */
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;

  /* width: 40rem;
  height: 40rem; */
`;

const ProductDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({} as ProductType);
  const [amount, setAmount] = useState(0);
  const cartProducts = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await publicRequest(`/product/find/${id}`);
        const data = res.data;
        setProduct(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAmount = (type: string) => {
    type === "plus" && setAmount((amount) => amount + 1);
    type === "minus" && setAmount((amount) => amount - 1);
  };

  const handleCart = () => {
    if (cartProducts.find((item) => item._id === product._id)) {
      dispatch(openSnackBar("Product Already Exist in Cart"));
      return;
    }
    dispatch(openSnackBar("Product added to the Cart"));
    dispatch(
      addToCart({
        product: { ...product, amount },
        price: product.price * amount,
      })
    );
  };

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : error ? (
        <CustomError />
      ) : (
        <Container>
          <SnackBar />
          <Detail>
            <Title>{product.title}</Title>
            <Price>${product.price}</Price>
            <Rating>{Ratings(product.rating.rate)}</Rating>
            <Description>{product.description}</Description>
            <AddContainer>
              <AmountContainer>
                <Plus onClick={() => handleAmount("plus")}>+</Plus>
                <Amount>{amount}</Amount>
                <Minus
                  onClick={() => handleAmount("minus")}
                  disabled={amount === 0}
                >
                  -
                </Minus>
              </AmountContainer>
              <AddToCart onClick={handleCart} disabled={amount === 0}>
                Add to Cart
              </AddToCart>
            </AddContainer>
          </Detail>
          <ImgContainer>
            <ProductImg src={product.image} alt="" />
          </ImgContainer>
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
