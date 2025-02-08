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
    height: ${px2vw(45)};
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
        value={value || ""}
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
        maxLength={type === "tel" ? 13 : undefined}
        autoComplete="off" // iOS 자동완성 제거
        autoCorrect="off" // 자동수정 제거
        spellCheck="false" // 맞춤법 제거
        autoCapitalize="none"
        style={{
          WebkitAppearance: "none", // iOS 스타일 제거
        }}
      />
    </InputContainer>
  );
};

export default Input;
