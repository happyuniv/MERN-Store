import { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import AddressEdit from "./AddressEdit";

type props = {
  page?: string;
};

const Container = styled.div<{ page?: string }>`
  margin-top: ${(props) => (props.page === "order" ? "1rem" : "2rem")};
`;
const AddressContainer = styled.div`
  padding: 3rem;
  background-color: var(--theme);
  color: gray;
  font-size: 2.5rem;

  &:hover {
    background-color: var(--theme-dark);
  }
`;

const Country = styled.span`
  display: block;
`;
const City = styled.span`
  margin-top: 1rem;
`;
const Detail = styled.span``;
const Register = styled.span``;
const Address = ({ page }: props) => {
  const [visible, setVisible] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);
  const selectedAddress = user?.address.list.filter(
    (address) => address.selected === true
  );

  const toggleEdit = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Container page={page}>
        <AddressContainer onClick={toggleEdit}>
          {selectedAddress && selectedAddress?.length > 0 ? (
            <>
              <Country>{selectedAddress[0].country}</Country>
              <City>{selectedAddress[0].city}.</City>
              <Detail> {selectedAddress[0].detail}</Detail>
            </>
          ) : (
            <Register>Register Address</Register>
          )}
        </AddressContainer>
        {visible && <AddressEdit toggleEdit={toggleEdit} />}
      </Container>
    </>
  );
};

export default Address;
