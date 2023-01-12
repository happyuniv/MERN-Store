import { AxiosError } from "axios";
import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../api";
import { useAppDispatch } from "../redux/hooks";
import { userUpdate } from "../redux/userSlice";

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
`;

const Submit = styled.button`
  margin: 2rem 0;
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

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      setErrorMessage("username is empty");
      return;
    }
    if (password && password !== confirmPassword) {
      setErrorMessage("Password isn't concide with confirmed password ");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await publicRequest.post("/auth/register", {
        username,
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
        <Title>Create Account</Title>
        <Form onSubmit={handleRegister}>
          <Holder>Name</Holder>
          <Input
            placeholder="name"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <Holder>Confrim Password</Holder>
          <Input
            placeholder="confrim password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <Message>{errorMessage}</Message>}
          <Submit type="submit">{loading ? <Spinner /> : "Create"}</Submit>
        </Form>
      </Container>
    </>
  );
};

export default Register;
