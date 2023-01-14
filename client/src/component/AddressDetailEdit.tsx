import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as RemoveIcon } from '../asset/remove.svg';
import { userRequest } from '../api';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userUpdate, UserAddress } from '../redux/userSlice';
import { openSnackBar } from '../redux/snackBarSlice';
import Loading from './Loading';
import { AxiosError } from 'axios';

type props = {
  onClose: () => void;
  targetAddress?: UserAddress;
};

const Title1 = styled.h3`
  margin-top: 10rem;
  font-size: 2.5rem;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
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
`;
const Submit = styled.button`
  margin: 1rem 0;
  padding: 1rem;
  /* border: none; */
  font-size: 1.6rem;
  color: white;
  background-color: black;
  &:hover {
    cursor: pointer;
  }
`;
const RemoveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RemoveBtn = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Back = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: none;
  background-color: white;
  color: black;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
  }
`;

const AddressDetailEdit = ({ targetAddress, onClose }: props) => {
  const [currentAddress, setCurrentAddress] = useState({
    country: '',
    city: '',
    detail: '',
  } as UserAddress);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (targetAddress) setCurrentAddress(targetAddress);
  }, [targetAddress]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        currentAddress.country.trim() &&
        currentAddress.city.trim() &&
        currentAddress.detail.trim()
      )
    ) {
      dispatch(openSnackBar('Fill in the blnak'));
      return;
    }

    try {
      setLoading(true);
      let res;

      // UPDATE ADDRESS
      if (targetAddress) {
        const updatedList = user?.address.list.map((_address) => {
          if (_address._id === currentAddress._id) return currentAddress;
          return _address;
        });
        res = await userRequest.put(`/user/address/${user?._id}`, updatedList);
        dispatch(userUpdate(res.data));
      }

      // ADD ADDRESS
      else {
        res = await userRequest.post(
          `/user/address/${user?._id}`,
          currentAddress
        );
        dispatch(userUpdate(res.data));
      }

      setLoading(false);
      dispatch(openSnackBar('ADDRESS SUCCESSFULLY UPDATED'));
    } catch (e) {
      if (e instanceof AxiosError)
        dispatch(
          openSnackBar(
            e.response && e.response.data ? e.response.data : e.message
          )
        );
      else dispatch(openSnackBar('Server Error'));
      setLoading(false);
    }
    onClose();
  };

  const handleRemove = async (address: UserAddress) => {
    if (targetAddress) {
      const updatedList = user?.address.list.filter((_address) => {
        return _address._id !== address._id;
      });
      try {
        setLoading(true);
        const res = await userRequest.put(
          `/user/address/${user?._id}`,
          updatedList
        );

        dispatch(userUpdate(res.data));
        setLoading(false);
        dispatch(openSnackBar('ADDRESS SUCCESSFULLY REMOVED'));
      } catch (e) {
        if (e instanceof AxiosError) dispatch(openSnackBar(e.response?.data));
        else dispatch(openSnackBar('Server Error'));
        setLoading(false);
      }
    }
    onClose();
  };

  return (
    <>
      {loading && <Loading />}
      <Title1>Address</Title1>
      <Form onSubmit={handleSubmit}>
        <Holder>Country</Holder>
        <Input
          placeholder='country'
          value={currentAddress.country}
          required
          onChange={(e) =>
            setCurrentAddress({ ...currentAddress, country: e.target.value })
          }
        />
        <Holder>City</Holder>
        <Input
          placeholder='city'
          value={currentAddress.city}
          required
          onChange={(e) =>
            setCurrentAddress({ ...currentAddress, city: e.target.value })
          }
        />
        <Holder>Detail</Holder>
        <Input
          placeholder='detail'
          value={currentAddress.detail}
          required
          onChange={(e) =>
            setCurrentAddress({ ...currentAddress, detail: e.target.value })
          }
        />
        <Submit type='submit'>SAVE</Submit>
        {targetAddress && !currentAddress.selected && (
          <RemoveContainer>
            <RemoveBtn
              type='button'
              onClick={() => handleRemove(currentAddress)}
            >
              <RemoveIcon width={36} height={36} fill='#e85252f6' />
            </RemoveBtn>
          </RemoveContainer>
        )}
      </Form>
      <Back onClick={onClose}>BACK</Back>
    </>
  );
};

export default AddressDetailEdit;
