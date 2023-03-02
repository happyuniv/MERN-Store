import styled from "styled-components";
import { ReactComponent as TwitterIcon } from "../asset/twitter.svg";
import { ReactComponent as FacebookIcon } from "../asset/facebook.svg";
import { ReactComponent as InstaIcon } from "../asset/instagram.svg";
import { Link } from "react-router-dom";

const Container = styled.footer`
  margin-top: 10rem;
`;

const GroupContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 10rem;

  @media screen and (max-width: 1200px) {
    padding: 3rem 6rem;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 1rem 2rem;
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
`;
const List = styled.ul`
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 300;
`;

const Contact = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Twitter = styled(TwitterIcon)`
  &:hover {
    fill: gray;
  }
`;

const Facebook = styled(FacebookIcon)`
  &:hover {
    fill: gray;
  }
`;

const Instagram = styled(InstaIcon)`
  &:hover {
    fill: gray;
  }
`;
const CopyRight = styled.div`
  padding: 1.5rem 5rem;
  font-size: 1.3rem;
  font-weight: 300;
  @media screen and (max-width: 800px) {
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <>
      <Container>
        <GroupContainer>
          <Group>
            <Title>Information</Title>
            <List>
              <ListItem>Terms and conditions</ListItem>
              <ListItem>Privacy policy</ListItem>
              <ListItem>Report</ListItem>
            </List>
          </Group>
          <Group>
            <Title>Help</Title>
            <List>
              <ListItem>FAQ</ListItem>
              <ListItem>Return & Exchange</ListItem>
              <ListItem>Products</ListItem>
              <ListItem>Feedback</ListItem>
            </List>
          </Group>
          <Group>
            <Title>About</Title>
            <List>
              <ListItem>Blog</ListItem>
              <ListItem>Carrer</ListItem>
            </List>
          </Group>
          <Group>
            <Title>Contact</Title>
            <Contact>
              <a
                href={"http://www.twitter.com"}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter width={24} height={24} fill={"lightgray"} />
              </a>
              <a
                href={"http://www.facebook.com"}
                target="_blank"
                rel="noreferrer"
              >
                <Facebook width={24} height={24} fill={"lightgray"} />
              </a>

              <a
                href={"http://www.instagram.com"}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram width={24} height={24} fill={"lightgray"} />
              </a>
            </Contact>
          </Group>
        </GroupContainer>
        <hr />
        <CopyRight> &copy; 2023 All rights reserved.</CopyRight>
      </Container>
    </>
  );
};

export default Footer;
