import React from "react";
import styled from "styled-components";
import spinner from "../../public/assets/spinner.gif";
const Loader = () => {
  return (
    <StyledLoaderContainer>
      <StyledLoader src={spinner} />
    </StyledLoaderContainer>
  );
};

const StyledLoaderContainer = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 15vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 80px;
`;

const StyledLoader = styled.img`
  width: 80px;
  height: 80px;
`;
export default Loader;
