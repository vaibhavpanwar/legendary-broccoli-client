import React from "react";
import styled from "styled-components";

import { colors, sizes, spacing } from "../../styles/style.vars";
import Router from "next/router";

const NotLoggedIn = () => {
  return (
    <NotLoggedInContainer>
      <NotLoggedInHeader>Please Login to continue....</NotLoggedInHeader>
      <NotLoggedInFooter>
        <BlogButton primary onClick={() => Router.push("/login")}>
          Login
        </BlogButton>
        <BlogButton onClick={() => Router.push("/forums")}>Forums</BlogButton>
      </NotLoggedInFooter>
    </NotLoggedInContainer>
  );
};

//styles

const NotLoggedInContainer = styled.div`
  width: 80%;
  margin: ${spacing.l} auto;
  padding: ${spacing.s};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${colors.secondary};
  border-radius: 6px;
`;
const NotLoggedInHeader = styled.h1`
  text-align: justify;
  color: ${colors.text};
  font-size: ${sizes.l};
  text-align: center;
  width: 100%;
  margin: ${spacing.l} auto;
`;

const NotLoggedInFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const BlogButton = styled.button`
  cursor: pointer;
  border: none;
  min-width: 2.5rem;
  height: 35px;
  padding: 1px 20px;
  background: ${(props) =>
    props.primary ? `${colors.secondary}` : `${colors.button}`};
  color: ${(props) => (props.primary ? `${colors.text}` : `${colors.primary}`)};
`;

export default NotLoggedIn;
