import React from "react";
import styled from "styled-components";

const StyedImg = styled.img`
  max-width: 100vw;
  max-height: 100vh;
  object-fit: contain;
`;

const Image = ({ src, alt }) => {
  return (
    <>
      <StyedImg src={src} alt={alt} />
    </>
  );
};

export default Image;
