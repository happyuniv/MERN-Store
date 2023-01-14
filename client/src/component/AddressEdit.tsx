import { AxiosError } from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../api';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { openSnackBar } from '../redux/snackBarSlice';
import { userUpdate, UserAddress } from '../redux/userSlice';
import AddressDetailEdit from './AddressDetailEdit';
import Backdrop from './Backdrop';
import Loading from './Loading';
import SnackBar from './SnackBar';

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
  margin-top: 2rem;
  font-size: 2rem;
`;

const AddressWrapper = styled.div<{ selected?: boolean }>`
  position: relative;
  width: 90%;
  margin-top: 5rem;
  padding: 3rem;
  color: gray;
  font-size: 2.5rem;
  font-weight: 500;
  /* border: 0.1rem solid; */
  /* background-color: #b36c6c21; */
  background-color: ${(props) =>
    props.selected ? 'var(--theme-dark)' : 'var(--theme)'};

  &:nth-child(4) {
    margin-bottom: 5rem;
  }
`;
const Country = styled.span`
  display: block;
`;
const City = styled.span`
  margin-top: 1rem;
`;
const Detail = styled.span``;
const SelectAddress = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 0.3rem;
  border-color: #00000097;
  font-size: 1.5rem;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #c6c3c376;
  }

  &:disabled {
    cursor: unset;
    background-color: transparent;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    bottom: 0.5rem;
  }
`;
const EditAddress = styled(SelectAddress)`
  right: 8rem;

  @media screen and (max-width: 600px) {
    right: 7rem;
  }
`;
const AddAddress = styled.button`
  width: 50%;
  margin: 5rem 0;
  /* height: 5rem; */
  padding: 1rem;
  border-radius: 2rem;
  border-color: transparent;
  font-size: 1.6rem;
  font-weight: bold;
  color: gray;
  background-color: var(--theme);

  &:hover {
    cursor: pointer;
    background-color: var(--theme-dark);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -1.5rem;
  right: 0;
`;

const AddressEdit = ({ toggleEdit }: props) => {
  const [visible, setVisible] = useState(false);
  const [selectAdd, setSelectAdd] = useState(false);
  const [targetAddress, setTargetAddress] = useState({} as UserAddress);
  const [loading, setLoading] = useState(false);

  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    setVisible(true);
    setSelectAdd(true);
  };

  const handleEdit = (address: UserAddress) => {
    setVisible(true);
    setSelectAdd(false);
    setTargetAddress(address);
  };

  const handleSelect = async (address: UserAddress) => {
    const updatedList = user?.address.list.map((_address) => {
      const selected = _address._id === address._id ? true : false;
      return { ..._address, selected };
    });

    try {
      setLoading(true);
      const res = await userRequest.put(
        `/user/address/${user?._id}`,
        updatedList
      );
      dispatch(userUpdate(res.data));
      dispatch(openSnackBar('ADDRESS SELECTED!'));
      setLoading(false);
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
  };

  const clo = () => {
    setVisible(false);
  };
  return (
    <>
      <SnackBar />
      <Backdrop onClick={toggleEdit} />
      <Container>
        {loading && <Loading />}
        {visible ? (
          selectAdd ? (
            <AddressDetailEdit onClose={clo} />
          ) : (
            <AddressDetailEdit targetAddress={targetAddress} onClose={clo} />
          )
        ) : (
          <>
            <Title>Shipping Address</Title>
            {user?.address.list && user?.address.list.length > 0 && (
              <>
                {user?.address.list.map((address) => (
                  <AddressWrapper key={address._id} selected={address.selected}>
                    {address.selected && <Badge>SELECTED!</Badge>}
                    <Country>{address.country}</Country>
                    <City>{address.city}.</City>
                    <Detail> {address.detail} </Detail>
                    <EditAddress onClick={() => handleEdit(address)}>
                      EDIT
                    </EditAddress>
                    <SelectAddress
                      disabled={address.selected}
                      onClick={() => handleSelect(address)}
                    >
                      SELECT
                    </SelectAddress>
                  </AddressWrapper>
                ))}
              </>
            )}
            {user?.address.list && user?.address.list.length < 3 && (
              <AddAddress onClick={handleAdd}>+ ADDRESS</AddAddress>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default AddressEdit;
