import { useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../redux/hooks";

import Address from "./Address";
import ProfileEdit from "./ProfileEdit";

const Container = styled.div``;
const UserContainer = styled.div`
  position: relative;
  padding: 5rem;
  font-size: 3rem;
  background-color: var(--theme);

  @media screen and (max-width: 600px) {
    padding: 3rem;
  }
`;

const Name = styled.div`
  font-weight: 500;
`;
const Email = styled.div`
  font-weight: 300;
  color: gray;
`;

const Edit = styled.button`
  position: absolute;
  right: 5rem;
  padding: 0.5rem;
  border-color: #00000097;
  font-size: 1.7rem;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #c6c3c376;
  }

  @media screen and (max-width: 600px) {
    position: static;
  }
`;

const AddressContainer = styled.div``;
const Title = styled.h5`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  margin-left: 1rem;
  font-size: 1.6rem;
`;
const Divider = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
  border-top: 1px solid var(--theme-dark);
`;

const Profile = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const [visible, setVisible] = useState(false);

  const toggleEdit = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Container>
        <UserContainer>
          <Name>{user?.username}</Name>
          <Email>{user?.email}</Email>
          <Edit onClick={toggleEdit}>EDIT</Edit>
          {visible && <ProfileEdit toggleEdit={toggleEdit} />}
        </UserContainer>
        <AddressContainer>
          <Title>
            Shipping Address
            <Divider />
          </Title>
          <Address />
        </AddressContainer>
      </Container>
    </>
  );
};

export default Profile;
