import styled from "styled-components";
import { px2vw } from "../Util/px2vw";

interface SignButtonType {
  color: string;
  context: string;
  disabled?: boolean;
  onClick: () => void;
  borderColor: string;
  width?: number | string;
}

interface SignButtonStyleType {
  $bgColor: string;
  $color: string;
  $borderColor: string;
  $width?: number | string;
}

const SignButtonContainer = styled.button<SignButtonStyleType>`
  width: ${({ $width }) => ($width ? $width : px2vw(380))};
  height: ${px2vw(50)};
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

const Button = ({
  color,
  context,
  disabled,
  onClick,
  borderColor,
  width,
}: SignButtonType) => {
  return (
    <SignButtonContainer
      onClick={onClick}
      disabled={disabled}
      $bgColor={disabled ? "#D9D9D9" : "#ffffff"}
      $color={disabled ? "#ffffff" : color}
      $borderColor={disabled ? "none" : borderColor}
      $width={width}
    >
      <p>{context}</p>
    </SignButtonContainer>
  );
};

export default Button;
