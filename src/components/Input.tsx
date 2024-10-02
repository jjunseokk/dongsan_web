import React, { SetStateAction } from "react";
import styled from "styled-components";
import { px2vw } from "../Util/px2vw";

interface InputType {
  title: string;
  placeholder: string;
  type?: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
}

const InputContainer = styled.div`
  > p {
    font-size: 15px;
    color: #151515;
    font-weight: 600;
  }
  > input {
    border: 1px solid;
    border: 1px solid #d9d9d9;
    height: ${px2vw(40)};
    width: 100%;
    padding: ${px2vw(11)} ${px2vw(12)};
    border-radius: 5px;
    margin-top: ${px2vw(10)};
    &::placeholder {
      color: #d9d9d9;
      font-size: 15px;
      font-weight: 600;
    }
  }
`;

const Input = ({ title, placeholder, type, value, setValue }: InputType) => {
  return (
    <InputContainer>
      <p>{title}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};

export default Input;
