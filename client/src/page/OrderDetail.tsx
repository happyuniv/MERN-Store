import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../api";
import CustomError from "../component/CustomError";
import Loading from "../component/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/userSlice";

export type OrderType = {
  _id: string;
  useremail: string;
  username: string;
  products: [
    {
      _id: string;
      title: string;
      price: number;
      quantity: number;
      image: string;
    }
  ];
  address: {
    country: string;
    city: string;
    detail: string;
  };
  total_price: number;
  status: string;
  createdAt: string;
};

const Container = styled.div`
  display: flex;
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
  font-size: 2.2rem;
  font-weight: 500;
`;

const UserInfoContainer = styled.div`
  margin: 2rem 0;
  font-size: 1.4rem;
  font-weight: 300;
  white-space: pre-line;
`;
const AddressContainer = styled.div`
  margin: 2rem 0;
  font-size: 1.4rem;
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
  font-weight: 300;
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
  font-size: ${(props) => (props.content === "total" ? "3.5rem" : "2.5rem")};
  font-weight: ${(props) => (props.content === "total" ? "500" : "300")};
`;
const SummaryContent = styled.span``;
const SummaryPrice = styled.span``;

const OrderDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState({} as OrderType);
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) dispatch(logout());
    const getOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await userRequest(`/order/find/${user?._id}/${id}`);
        setOrder(res.data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    getOrderDetail();
  }, [dispatch, id, user]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <CustomError />
      ) : (
        <Container>
          <OrderContainer>
            <SectionTitle>USER INFORMATION</SectionTitle>
            <UserInfoContainer>
              {order.username}
              {"\n"}
              {order.useremail}
            </UserInfoContainer>
            <Hr />
            <SectionTitle>SHIPPING ADDRESS</SectionTitle>
            <AddressContainer>
              {order.address.country} {"\n"}
              {order.address.city}, {order.address.detail}
            </AddressContainer>
            <Hr />
            <SectionTitle>ORDER ITEMS</SectionTitle>
            {order.products.map((item) => (
              <Fragment key={item._id}>
                <ItemContainer>
                  <ItemImg src={item.image} />
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemAmount>{item.quantity} x</ItemAmount>
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
                <SummaryPrice>${order.total_price}</SummaryPrice>
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

              <SummaryList content="total">
                <SummaryContent>Total</SummaryContent>
                <SummaryPrice>${order.total_price}</SummaryPrice>
              </SummaryList>
            </Summary>
          </SummaryContainer>
        </Container>
      )}
    </>
  );
};

export default OrderDetail;
