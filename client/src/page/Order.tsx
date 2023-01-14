import { AxiosError } from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../api';
import Address from '../component/Address';
import Loading from '../component/Loading';
import SnackBar from '../component/SnackBar';
import { CartProduct } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { openSnackBar } from '../redux/snackBarSlice';
import { logout } from '../redux/userSlice';

const Container = styled.div`
  display: flex;
  position: relative;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;
const OrderContainer = styled.div`
  flex: 3;
  padding: 3rem;
`;

const SectionTitle = styled.h3`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 500;
`;

const UserInfoContainer = styled.div`
  margin: 2rem 0;
  font-size: 1.6rem;
  font-weight: 300;
  white-space: pre-line;
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  /* padding: 1rem 0; */
`;
const ItemImg = styled.img`
  min-width: 8rem;
  width: 8rem;
  height: 8rem;
`;
const ItemTitle = styled.h5`
  margin-left: 2rem;
  font-size: 1.2rem;
  font-weight: 400;
`;
const ItemAmount = styled.span`
  margin-left: auto;
  font-size: 1.6rem;
`;
const ItemPrice = styled.span`
  margin-left: 0.5rem;
  font-size: 1.6rem;
`;
const Hr = styled.hr`
  margin: 1rem 0;
  border: none;
  border-top: 1px solid var(--theme-dark);
`;
const SummaryContainer = styled.div`
  flex: 1;
  padding: 5rem 3rem;
`;
const Summary = styled.fieldset`
  display: flex;
  /* position: fixed; */
  flex-direction: column;
  padding: 3rem;
  border-radius: 1rem;
  border-color: rgba(230, 218, 218, 0.3);
`;

const SummaryTitle = styled.legend`
  /* margin: auto; */
  font-size: 2rem;
  color: #df8484;
`;

const SummaryList = styled.div<{ content?: string }>`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  font-size: ${(props) => (props.content === 'total' ? '3.5rem' : '2.5rem')};
  font-weight: ${(props) => (props.content === 'total' ? '500' : '300')};
`;
const SummaryContent = styled.span``;
const SummaryPrice = styled.span``;
const CheckOut = styled.button`
  margin-top: 5rem;
  padding: 1rem;
  font-size: 1.6rem;
  color: white;
  background-color: black;

  &:hover {
    cursor: pointer;
  }
`;

const CardContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 0.5rem solid;
  border-radius: 1rem;
  border-color: rgba(230, 218, 218, 0.3);
  font-size: 1.4rem;
  text-align: center;
`;
const CardList = styled.div`
  font-size: 1.2rem;

  &:first-child {
    margin-top: 1rem;
  }
`;

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);
  const cartItems = location.state as CartProduct[];
  const selectedAddress = user?.address.list.filter(
    (address) => address.selected === true
  )[0];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) dispatch(logout());
  }, [dispatch, user]);

  const handleCheckout = async () => {
    if (!user) {
      navigate('../login', { replace: true });
      return;
    }
    if (!selectedAddress) {
      dispatch(openSnackBar('Select Address'));
      return;
    }
    try {
      setLoading(true);
      const res = await userRequest.post(`/stripe/payment/${user._id}`, {
        user,
        selectedAddress,
        cartItems,
      });
      setLoading(false);
      window.location.href = res.data.session_url;
    } catch (e) {
      if (e instanceof AxiosError) dispatch(openSnackBar(e.response?.data));
      else dispatch(openSnackBar('Server Error'));
      setLoading(false);
    }
  };
  const sum = cartItems.reduce((acc, cur) => acc + cur.amount * cur.price, 0);

  return (
    <>
      <SnackBar />
      <Container>
        {loading && <Loading />}
        <OrderContainer>
          <SectionTitle>USER INFORMATION</SectionTitle>
          <UserInfoContainer>
            {user?.username}
            {'\n'}
            {user?.email}
          </UserInfoContainer>
          <Hr />
          <SectionTitle>SHIPPING ADDRESS</SectionTitle>
          <Address page='order' />
          <Hr />
          <SectionTitle>ORDER ITEMS</SectionTitle>
          {cartItems.map((item) => (
            <Fragment key={item._id}>
              <ItemContainer>
                <ItemImg src={item.image} />
                <ItemTitle>{item.title}</ItemTitle>
                <ItemAmount>{item.amount} x</ItemAmount>
                <ItemPrice>${item.price}</ItemPrice>
              </ItemContainer>
              <Hr />
            </Fragment>
          ))}
          <Hr />
        </OrderContainer>
        <SummaryContainer>
          <Summary>
            <SummaryTitle>Summary</SummaryTitle>
            <SummaryList>
              <SummaryContent>Product Price:</SummaryContent>
              <SummaryPrice>${+sum.toFixed(2)}</SummaryPrice>
            </SummaryList>
            <hr />
            <SummaryList>
              <SummaryContent>Tax:</SummaryContent>
              <SummaryPrice>$22</SummaryPrice>
            </SummaryList>
            <hr />

            <SummaryList>
              <SummaryContent>Discount:</SummaryContent>
              <SummaryPrice>-$22</SummaryPrice>
            </SummaryList>
            <hr />

            <SummaryList content='total'>
              <SummaryContent>Total</SummaryContent>
              <SummaryPrice>${+sum.toFixed(2)}</SummaryPrice>
            </SummaryList>
            <CheckOut onClick={() => handleCheckout()}>Check Out</CheckOut>
          </Summary>
          <CardContainer>
            TEST CARD NUMBER
            <CardList>Successful payment : 4242 4242 4242 4242</CardList>
            <CardList>Failed payment : 4000 0000 0000 9995</CardList>
            <CardList>Requires authentication : 4000 0025 0000 3155</CardList>
          </CardContainer>
        </SummaryContainer>
      </Container>
    </>
  );
};

export default Order;
