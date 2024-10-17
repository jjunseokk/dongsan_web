import React, { SetStateAction } from "react";
import styled from "styled-components";
import { px2vw } from "../Util/px2vw";

interface InputType {
  title: string;
  placeholder: string;
  type?: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
  width?: number | string;
}

type InputContainerStyle = {
  $width: string | undefined | number;
};

const InputContainer = styled.div<InputContainerStyle>`
  width: ${({ $width }) => ($width ? $width : "100%")};
  > p {
    color: #151515;
    font: 600 15px "Pretendard";
  }
  > input {
    border: 1px solid #d9d9d9;
    height: ${px2vw(40)};
    width: 100%;
    padding: ${px2vw(11)} ${px2vw(12)};
    border-radius: 5px;
    margin-top: ${px2vw(10)};
    font: 600 15px "Pretendard";

    &::placeholder {
      color: #d9d9d9;
      font: 600 15px "Pretendard";
    }
    &:focus {
      outline: none;
    }
  }
`;

const Input = ({
  width,
  title,
  placeholder,
  type,
  value,
  setValue,
}: InputType) => {
  return (
    <InputContainer $width={width}>
      {title === "none" ? null : <p>{title}</p>}
      <input
        value={value}
        onChange={
          type === "tel"
            ? (e) =>
                setValue(
                  e.target.value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
                )
            : (e) => setValue(e.target.value)
        }
        type={type}
        placeholder={placeholder}
        maxLength={type === "tel" ? 12 : undefined}
      />
    </InputContainer>
  );
};

export default Input;
