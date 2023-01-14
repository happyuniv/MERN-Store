import styled from 'styled-components';
import { CartProduct, RemoveFromCart, setAmount } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ReactComponent as RemoveIcon } from '../asset/remove.svg';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as EmptyCartIcon } from '../asset/emptycart.svg';
import { openSnackBar } from '../redux/snackBarSlice';
import SnackBar from '../component/SnackBar';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem;
  color: gray;
  font-size: 1.6rem;
  font-weight: 500;
`;
const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  border: 0.1rem solid lightgray;
  color: black;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  display: flex;
  min-height: 50vh;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;
const ProductContainer = styled.div`
  flex: 3;
  padding: 3rem;

  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 2rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const ItemCheckBox = styled.input`
  width: 2rem;
`;
const ProductDetail = styled.div`
  display: flex;
  flex: 2;
  /* height: 15rem; */
`;

const ProductImgWrapper = styled.div`
  /* width: 15rem; */
  /* height:15rem; */
`;
const ProductImg = styled.img`
  min-width: 15rem;
  max-width: 15rem;
  width: 15rem;
  height: 15rem;
`;

const ProductDescription = styled.div`
  display: flex;
  align-items: center;
  padding: 0 3rem;

  @media screen and (max-width: 600px) {
    padding: 0 1rem;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const AmountContainer = styled.div`
  font-size: 3rem;
`;
const Plus = styled.button`
  font-size: 2rem;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const Minus = styled(Plus)``;
const Amount = styled.span``;
const Price = styled.span`
  margin-top: 3rem;
  font-size: 1.8rem;
  font-weight: 300;

  @media screen and (max-width: 600px) {
    margin-top: 0;
  }
`;

const RemoveContainer = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RemoveBtn = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5rem 3rem;
`;

const SelectBox = styled.div``;
const AllCheckBox = styled.input`
  width: 2rem;
`;
const SelectText = styled.span`
  font-size: 1.4rem;
`;
const Summation = styled.div`
  margin: 2rem 0;
  font-size: 1.8rem;
  font-weight: 500;
`;
const Submit = styled.button`
  padding: 1rem;
  font-size: 1.6rem;
  color: white;
  background-color: black;

  &:hover {
    cursor: pointer;
  }
`;

const Cart = () => {
  const cartProducts = useAppSelector((state) => state.cart.products);
  const [selectedProducts, setSelectedProducts] = useState([] as CartProduct[]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedProducts(cartProducts);
  }, [cartProducts]);

  const handleAmount = (type: string, product: CartProduct) => {
    dispatch(setAmount({ type, product }));
    setSelectedProducts(
      selectedProducts.map((_product) => {
        if (_product._id === product._id) {
          if (type === 'plus')
            return { ...product, amount: product.amount + 1 };
          else return { ...product, amount: product.amount - 1 };
        } else return _product;
      })
    );
  };

  const handleRemove = (product: CartProduct) => {
    dispatch(RemoveFromCart({ product }));
    setSelectedProducts(
      selectedProducts.filter((_producct) => _producct._id !== product._id)
    );
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: CartProduct
  ) => {
    if (e.target.checked) setSelectedProducts([...selectedProducts, product]);
    else
      setSelectedProducts(
        selectedProducts.filter((_producct) => _producct._id !== product._id)
      );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedProducts(cartProducts);
    else setSelectedProducts([]);
  };

  const handleSubmit = () => {
    if (sum) navigate('../placeorder', { state: selectedProducts });
    else dispatch(openSnackBar('check at lease one product'));
  };

  const isProductChecked = (product: CartProduct) => {
    const check = selectedProducts.some(
      (_product) => _product._id === product._id
    );
    return check;
  };
  const isProductAllChecked =
    selectedProducts.length === cartProducts.length ? true : false;

  const sum = selectedProducts.reduce(
    (acc, cur) => acc + cur.amount * cur.price,
    0
  );

  return (
    <>
      <SnackBar />
      {!cartProducts.length ? (
        <EmptyContainer>
          <EmptyCartIcon width={280} height={280} fill={'gray'} />
          CART IS EMPTY
          <Link to={'/'}>
            <Button>BACK TO HOME</Button>
          </Link>
        </EmptyContainer>
      ) : (
        <Container>
          <ProductContainer>
            {cartProducts.map((product) => (
              <Fragment key={product._id}>
                <ItemContainer>
                  <ItemCheckBox
                    type={'checkbox'}
                    checked={isProductChecked(product)}
                    onChange={(e) => handleCheck(e, product)}
                  />
                  <ProductWrapper>
                    <ProductDetail>
                      {/* <ProductImgWrapper> */}
                      <ProductImg src={product.image} alt='' />
                      {/* </ProductImgWrapper> */}
                      <ProductDescription>
                        <ProductTitle>{product.title}</ProductTitle>
                      </ProductDescription>
                    </ProductDetail>
                    <PriceDetail>
                      <AmountContainer>
                        <Plus onClick={() => handleAmount('plus', product)}>
                          +
                        </Plus>
                        <Amount>{product.amount}</Amount>
                        <Minus
                          onClick={() => handleAmount('minus', product)}
                          disabled={product.amount === 1}
                        >
                          -
                        </Minus>
                      </AmountContainer>
                      <Price>
                        ${+(product.price * product.amount).toFixed(2)}
                      </Price>
                    </PriceDetail>
                    <RemoveContainer>
                      <RemoveBtn onClick={() => handleRemove(product)}>
                        <RemoveIcon width={36} height={36} fill='#e85252f6' />
                      </RemoveBtn>
                    </RemoveContainer>
                  </ProductWrapper>
                </ItemContainer>
                <hr />
              </Fragment>
            ))}
          </ProductContainer>

          <SummaryContainer>
            <SelectBox>
              <AllCheckBox
                type='checkbox'
                checked={isProductAllChecked}
                onChange={handleSelectAll}
              />
              <SelectText>select all</SelectText>
            </SelectBox>
            <Summation>SUM ${+sum.toFixed(2)}</Summation>
            <Submit onClick={handleSubmit}>Place Order</Submit>
          </SummaryContainer>
        </Container>
      )}
    </>
  );
};

export default Cart;
