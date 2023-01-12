import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../asset/logo.svg";
import { ReactComponent as CartIcon } from "../asset/cart.svg";
import { ReactComponent as LoginIcon } from "../asset/login.svg";
import { ReactComponent as SearchIcon } from "../asset/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/userSlice";

const Container = styled.header``;

const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2rem 4rem 2rem;
`;

const LogoIconWrapper = styled.div`
  @media screen and (max-width: 650px) {
    margin-right: auto;
  }
`;

const SearchContainer = styled.form`
  /* display: flex; */
  width: 30rem;
  position: relative;
  align-items: center;
  margin-left: 5rem;
  margin-right: auto;

  @media screen and (max-width: 650px) {
    order: 3;
    width: 100%;
    margin: 1rem auto;
  }
`;
const SearchBar = styled.input`
  /* flex: 1; */
  width: 100%;
  height: 4rem;
  padding-left: 2rem;
  padding-right: 5rem;
  font-size: 1.5rem;
  background-color: #f3f3f3e2;
  border: none;
  outline: none;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
`;
const CartIconWrapper = styled.button`
  margin-right: 1rem;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: var(--theme-dark);
  }
`;
const LoginIconWrapper = styled.div`
  position: relative;
`;

const LoginButton = styled.button`
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: var(--theme-dark);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const DropDownMenu = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 4rem;
  right: 1rem;
  /* padding: 0rem 3rem; */
  background-color: #f5eaea51;
  white-space: nowrap;
`;

const DropDownProfile = styled.div`
  padding: 0.5rem 2rem;
  color: gray;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;

const DropDownItem = styled(DropDownProfile)`
  font-size: 1.3rem;
  &:hover {
    background-color: var(--theme-dark);
  }
`;
const Hr = styled.hr`
  border: none;
  border-top: 1px solid var(--theme-dark);
`;

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = ({ target }: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(target as Node)) {
        setMenuVisible(!menuVisible);
      }
    };

    if (menuVisible) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [menuVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword) {
      keyword.trim();
      navigate(`/search/${keyword}`);
      setKeyword("");
    }
  };

  return (
    <>
      <Container>
        <NavContainer>
          <LogoIconWrapper>
            <Link to={"/"} reloadDocument>
              <LogoIcon width={64} height={64} />
            </Link>
          </LogoIconWrapper>
          <SearchContainer onSubmit={handleSubmit}>
            <SearchBar
              placeholder="Search"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </SearchContainer>
          <CartIconWrapper>
            <Link to={"/cart"}>
              <CartIcon width={30} height={30} />
            </Link>
          </CartIconWrapper>

          <LoginIconWrapper>
            <LoginButton
              ref={menuRef}
              onClick={() => setMenuVisible(!menuVisible)}
            >
              <LoginIcon width={30} height={30} />
            </LoginButton>
            <DropDownMenu isVisible={menuVisible}>
              {user ? (
                <>
                  <DropDownProfile>Hello {user.username} ! </DropDownProfile>
                  <Hr />
                  <StyledLink to={"/mypage"}>
                    <DropDownItem>My Page</DropDownItem>
                  </StyledLink>
                  <StyledLink to={"/login"}>
                    <DropDownItem onClick={() => dispatch(logout())}>
                      Sign Out
                    </DropDownItem>
                  </StyledLink>
                </>
              ) : (
                <>
                  <StyledLink to={"/login"}>
                    <DropDownItem>Sign In</DropDownItem>
                  </StyledLink>
                  <StyledLink to={"/register"}>
                    <DropDownItem>Register</DropDownItem>
                  </StyledLink>
                </>
              )}
            </DropDownMenu>
          </LoginIconWrapper>
        </NavContainer>
      </Container>
    </>
  );
};

export default Navbar;
