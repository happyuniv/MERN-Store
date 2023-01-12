import { useState } from "react";
import styled from "styled-components";
import OrderList from "../component/OrderList";
import Profile from "../component/Profile";

const Container = styled.div`
  display: flex;
  padding: 5rem 0;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  border-top: 0.3rem solid gray;

  @media screen and (max-width: 600px) {
    flex-direction: row;
    width: 100%;
  }
`;

const MenuItem = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: 5rem;
  padding: 2rem;
  border: none;
  border-bottom: 1rem solid white;
  font-size: 2rem;
  font-weight: 500;
  color: gray;
  background-color: ${(props) =>
    props.isSelected ? "var(--theme-dark)" : "var(--theme)"};

  &:hover {
    cursor: pointer;
    background-color: var(--theme-dark);
  }

  @media screen and (max-width: 600px) {
    flex: 1;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  margin: 0 5rem;
  position: relative;
  min-height: 50vh;

  @media screen and (max-width: 600px) {
    margin-top: 2rem;
  }
`;

const UserPage = () => {
  const [table, setTable] = useState([
    { id: 0, title: "Profile", isSelected: true, component: <Profile /> },
    { id: 1, title: "Order", isSelected: false, component: <OrderList /> },
  ]);
  const [currentComponent, setCurrentComponent] = useState(<Profile />);

  const handleMenu = (id: number) => {
    setTable(
      table.map((item) => {
        if (item.id === id) return { ...item, isSelected: true };
        else return { ...item, isSelected: false };
      })
    );
    setCurrentComponent(table.filter((item) => item.id === id)[0].component);
  };

  return (
    <>
      <Container>
        <MenuContainer>
          {table.map((item) => (
            <MenuItem
              key={item.id}
              isSelected={item.isSelected}
              onClick={() => handleMenu(item.id)}
            >
              {item.title}
            </MenuItem>
          ))}
        </MenuContainer>
        <ContentContainer>{currentComponent}</ContentContainer>
      </Container>
    </>
  );
};

export default UserPage;
