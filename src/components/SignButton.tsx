import React from "react";
import styled from "styled-components";
import { px2vw } from "../Util/px2vw";

interface SignButtonType {
  bgColor: string;
  color: string;
  context: string;
  disabled?: boolean;
  onClick: () => void;
  borderColor: string;
}

interface SignButtonStyleType {
  $bgColor: string;
  $color: string;
  $borderColor: string;
}

const SignButtonContainer = styled.button<SignButtonStyleType>`
  width: ${px2vw(380)};
  height: ${px2vw(37)};
  border-radius: 5px;
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  > p {
    color: ${({ $color }) => $color};
    font-size: 15px;
    font-weight: 600;
  }
  border: ${({ $borderColor }) =>
    $borderColor === "none" ? "none" : `1px solid ${$borderColor}`};
`;

const SignButton = ({
  bgColor,
  color,
  context,
  disabled,
  onClick,
  borderColor,
}: SignButtonType) => {
  return (
    <SignButtonContainer
      onClick={onClick}
      disabled={disabled}
      $bgColor={disabled ? "#D9D9D9" : bgColor}
      $color={disabled ? "#ffffff" : color}
      $borderColor={disabled ? "none" : borderColor}
    >
      <p>{context}</p>
    </SignButtonContainer>
  );
};

export default SignButton;
