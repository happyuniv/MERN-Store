import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../api";
import { OrderType } from "../page/OrderDetail";
import { useAppSelector } from "../redux/hooks";
import CustomError from "./CustomError";
import Loading from "./Loading";
import { ReactComponent as EmptyOrderIcon } from "../asset/emptyorder.svg";

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
const Container = styled.div``;
const OrderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5rem 0;

  @media screen and (max-width: 900px) {
    padding-bottom: 0;
  }
`;
const OrderDate = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-weight: 500;
`;
const OrderItem = styled.div`
  flex: 4;
  margin: 0 2rem;
  font-size: 1.2rem;
`;
const ExtraItem = styled.span`
  font-size: 1.5rem;
`;

const OrderPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1.6rem;
  font-weight: 500;

  @media screen and (max-width: 900px) {
    flex-basis: 100%;
    order: 2;
    margin: 2rem 0;
  }
`;
const ShippingStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 2rem;
  font-size: 1.4rem;
  font-weight: 500;
`;
const StatusBox = styled.span`
  /* display: inline-block; */
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
  border-radius: 1rem;
  background-color: orange;
`;
const Detail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1.4rem;

  @media screen and (max-width: 900px) {
    flex-basis: 100%;
    order: 3;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.4rem;
`;

const Hr = styled.hr`
  margin: 1rem 0;
  border: none;
  border-top: 1px solid var(--theme-dark);
`;

const OrderList = () => {
  const [orderList, setOrderList] = useState([] as OrderType[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        setLoading(true);
        const res = await userRequest(`/order/user/${user?._id}`);
        setOrderList(res.data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    getUserOrder();
  }, [user?._id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <CustomError />
      ) : (
        <Container>
          <Hr />
          {!orderList.length ? (
            <EmptyContainer>
              <EmptyOrderIcon width={120} height={120} fill={"gray"} />
              EMPTY ORDER LIST
            </EmptyContainer>
          ) : (
            [...orderList].reverse().map((order) => (
              <Fragment key={order._id}>
                <OrderContainer>
                  <OrderDate>{`${
                    new Date(order.createdAt).getMonth() + 1
                  }/${new Date(order.createdAt).getDate()}`}</OrderDate>
                  <OrderItem>
                    {order.products[0].title.length > 50
                      ? order.products[0].title.slice(0, 50) + "..."
                      : order.products[0].title}
                    {order.products.length > 1 ? (
                      <ExtraItem>
                        {" "}
                        extra {order.products.length - 1} ITEM{" "}
                      </ExtraItem>
                    ) : null}
                  </OrderItem>
                  <OrderPrice>${order.total_price}</OrderPrice>

                  <ShippingStatus>
                    <StatusBox />
                    {order.status}
                  </ShippingStatus>
                  <Detail>
                    <StyledLink to={`../order/${order._id}`}>
                      View Detail
                    </StyledLink>
                  </Detail>
                </OrderContainer>
                <Hr />
              </Fragment>
            ))
          )}
        </Container>
      )}
    </>
  );
};

export default OrderList;
