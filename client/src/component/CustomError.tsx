import styled from "styled-components";
import { ReactComponent as OopsIcon } from "../asset/oops.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem;
`;

const Describe = styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  text-align: center;
  white-space: pre-line;
`;

const CustomError = () => {
  return (
    <>
      <Container>
        <OopsIcon width={160} height={160} />
        <Describe>
          Oops, there's a problem in server
          {"\n"}
          try later or refresh it
        </Describe>
      </Container>
    </>
  );
};

export default CustomError;
