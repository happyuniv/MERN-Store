import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BrokenLinkIcon } from "../asset/brokenlink.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
`;
const IconWrapper = styled.div`
  margin: 2rem 5rem;
`;
const DescribeContainer = styled.div`
  margin: 2rem 5rem;
  color: gray;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 300;
`;
const Describe = styled.p`
  margin-top: 3rem;
  color: black;
  font-size: 1.6rem;
  font-weight: 400;
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

const PageNotFound = () => {
  return (
    <>
      <Container>
        <IconWrapper>
          <BrokenLinkIcon width={480} height={480} fill="var(--theme-dark)" />
        </IconWrapper>
        <DescribeContainer>
          <Title>404 PAGE NOT FOUND</Title>
          <Describe>The page you're looking for no longer exists.</Describe>
          <Link to={"/"}>
            <Button>BACK TO HOME</Button>
          </Link>
        </DescribeContainer>
      </Container>
    </>
  );
};

export default PageNotFound;
