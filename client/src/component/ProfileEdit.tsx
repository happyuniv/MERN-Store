import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../api';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userUpdate } from '../redux/userSlice';
import Backdrop from './Backdrop';
import Loading from './Loading';

type props = {
  toggleEdit: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60rem;
  height: 80%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;

  @media screen and (max-width: 600px) {
    width: 90%;
    height: auto;
  }
`;

const Title = styled.h3`
  margin-top: 10vh;
  font-size: 2.5rem;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin-top: 3rem;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
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

const Close = styled(Submit)`
  position: absolute;
  bottom: 0;
  right: 2rem;
  color: black;
  background-color: white;

  @media screen and (max-width: 600px) {
    position: static;
  }
`;

const Information = styled.div<{ success: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 1rem;
  width: 100%;
  height: 3rem;
  padding: 2rem;
  border-top: 0.2rem solid gray;
  color: gray;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: ${(props) => (props.success ? '#9ee79a80' : '#fea4a480')};
  z-index: 1001;
  opacity: 1;
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

type props2 = {
  children: string;
  triggerUpdate: boolean;
  success: boolean;
};
const InformationComp = ({ children, triggerUpdate, success }: props2) => {
  return (
    <Information key={Number(triggerUpdate)} success={success}>
      {children}
    </Information>
  );
};

const ProfileEdit = ({ toggleEdit }: props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [informMessage, setInformMessage] = useState({
    message: '',
    success: false,
  });
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    setUsername(user!.username);
  }, [user]);

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriggerUpdate(!triggerUpdate);
    if (!(username.trim() || email || password)) {
      setInformMessage({
        message: 'Fill in at least one field',
        success: false,
      });
      return;
    }
    if (password && password !== confirmPassword) {
      setInformMessage({
        message: "Password isn't concide with confirmed password ",
        success: false,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await userRequest.put(`/user/${user?._id}`, {
        username,
        email,
        password,
      });
      dispatch(userUpdate(res.data));
      setInformMessage({ message: 'User Successfully Updated', success: true });
      setLoading(false);
    } catch (e) {
      if (e instanceof AxiosError)
        setInformMessage({ message: e.message, success: false });
      else setInformMessage({ message: 'Server Error', success: false });
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop onClick={toggleEdit} />
      <Container>
        {loading && <Loading />}
        {informMessage.message && (
          <InformationComp
            children={informMessage.message}
            triggerUpdate={triggerUpdate}
            success={informMessage.success}
          />
        )}
        <Title>Edit Account</Title>
        <Form onSubmit={updateProfile}>
          <Holder>Name</Holder>
          <Input
            placeholder='name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Holder>Email</Holder>
          <Input
            placeholder='e-mail'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Holder>Password</Holder>
          <Input
            placeholder='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Holder>Confirm Password</Holder>
          <Input
            placeholder='confirm password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Submit type='submit'>UPDATE</Submit>
          <Close onClick={toggleEdit}>CLOSE</Close>
        </Form>
      </Container>
    </>
  );
};

export default ProfileEdit;
