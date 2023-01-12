import styled from "styled-components";

type props = {
  current: number;
  setCurrent: (page: number) => void;
  total: number;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const PageButton = styled.button<{ active?: Boolean }>`
  margin: 0 1rem;
  border: none;
  border-bottom: ${(props) => (props.active ? "0.2rem solid black" : "none")};
  background-color: transparent;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
  }
`;

const Pagination = ({ current, setCurrent, total }: props) => {
  const handlePage = (page: number) => {
    setCurrent(page);
    window.scrollTo(0, 0);
  };
  return (
    <Container>
      <PageButton
        disabled={current === 1 ? true : false}
        onClick={() => handlePage(current - 1)}
      >
        &lt;
      </PageButton>

      {Array(total)
        .fill(0)
        .map((item, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handlePage(index + 1)}
            active={current === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}

      <PageButton
        disabled={current === total ? true : false}
        onClick={() => handlePage(current + 1)}
      >
        &gt;
      </PageButton>
    </Container>
  );
};

export default Pagination;
