import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { userUpdate } from "../redux/userSlice";
import { AxiosError } from "axios";
import { publicRequest } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem auto;
  max-width: 35rem;
`;

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const Holder = styled.label`
  margin-top: 1rem;
  font-size: 1.3rem;
`;
const Input = styled.input`
  margin: 0.5rem 0;
  padding: 1rem;
  font-size: 1.6rem;

  /* &:focus {
    outline: none;
    border-color: blue;
  } */
`;

const Submit = styled.button`
  margin: 1rem 0;
  padding: 1rem;
  border: none;
  font-size: 1.6rem;
  color: white;
  background-color: black;
  &:hover {
    cursor: pointer;
  }
`;

const Message = styled.span`
  color: red;
  font-size: 1.2rem;
`;

const RegisterWrapper = styled.div`
  margin: 1rem 0;
`;
const Register = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border-color: black;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Spinner = styled.div`
  margin: 0 auto;
  width: 1rem;
  height: 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://localhost:5000/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });
      // const data = await res.json();
      // if (res.status === 401) {
      //   setErrorMessage(data);
      //   return;
      // }
      setLoading(true);
      setErrorMessage("");
      const res = await publicRequest.post("/auth/login", {
        email,
        password,
      });
      const { accessToken, ...user } = res.data;
      dispatch(userUpdate(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      window.location.reload();
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) setErrorMessage(err.response?.data);
      else setErrorMessage("server error");
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        <Title>Login Account</Title>
        <Form onSubmit={handleLogin}>
          <Holder>Email</Holder>
          <Input
            placeholder="e-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Holder>Password</Holder>
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Submit type="submit">{loading ? <Spinner /> : "Submit"}</Submit>

          {errorMessage && <Message>{errorMessage}</Message>}
        </Form>
        <hr />
        <RegisterWrapper>
          <Link to="/register">
            <Register>Register</Register>
          </Link>
        </RegisterWrapper>
      </Container>
    </>
  );
};

export default Login;
