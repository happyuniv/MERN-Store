import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeSnackBar } from "../redux/snackBarSlice";

type SnackbarType = {
  ms?: number;
};

const Container = styled.div`
  position: fixed;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 2rem;
  color: black;
  background-color: #f3f3f3;
  font-size: 1.2rem;
  /* box-shadow: 0 0 1rem lightgray; */
  box-shadow: 0 0 0.5rem black;
  opacity: 1;
  z-index: 1111;
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SnackBar = ({ ms = 2000 }: SnackbarType) => {
  const isOpen = useAppSelector((state) => state.snackbar.isOpen);
  const message = useAppSelector((state) => state.snackbar.message);
  const trigger = useAppSelector((state) => state.snackbar.trigger);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(closeSnackBar());
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, ms, trigger]);

  useEffect(() => {
    return () => {
      dispatch(closeSnackBar());
    };
  }, [dispatch]);

  return (
    <>{isOpen && <Container key={Number(trigger)}>{message}</Container>}</>
  );
};

export default SnackBar;
