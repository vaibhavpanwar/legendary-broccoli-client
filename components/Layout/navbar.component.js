import React from "react";
import styled from "styled-components";
import { sizes, spacing } from "../../styles/style.vars";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth.actions";
import Router from "next/router";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const AuthLinks = (
    <>
      <a href="/" onClick={(e) => e.preventDefault()} disabled>
        {userInfo?.name}
      </a>
      <Link href="/forums">Forums</Link>

      <a href="/" onClick={(e) => handleLogout(e)}>
        Logout
      </a>
    </>
  );

  const GuestLinks = (
    <>
      <Link href="/forums">Forums</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </>
  );

  return (
    <NavbarWrapper>
      <NavbarBrand>
        <Link href="/">Home</Link>
      </NavbarBrand>
      <NavbarLinks>{userInfo?.name ? AuthLinks : GuestLinks}</NavbarLinks>
    </NavbarWrapper>
  );
};
//styled

const NavbarWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  padding: ${spacing.m};
  background-color: transparent;
  max-width: 95rem;
  box-sizing: border-box;
  justify-content: space-between;
  @media (max-width: 568px) {
    padding: ${spacing.s};
  }
`;

const NavbarBrand = styled.div``;

const NavbarLinks = styled.div`
  display: flex;
  gap: ${sizes.m};
  @media (max-width: 568px) {
    gap: ${sizes.m};
  }
`;

export default Navbar;
