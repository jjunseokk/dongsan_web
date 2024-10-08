import styled from "styled-components";
import { motion } from "framer-motion";
import px2vwPc from "../../../Util/px2vwPc";
import Input from "../../../components/Input";
import React, { SetStateAction, useRef, useState } from "react";
import Button from "../../../components/Button";

interface UploadMeditationStyle {
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

const UploadMeditationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .upload-meditation-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .upload-meditation-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: ${px2vwPc(1000)};
    height: ${px2vwPc(600)};
    padding: ${px2vwPc(50)};
    border-radius: 10px;
    display: flex;
    gap: ${px2vwPc(20)};
    .left-section {
      .upload-meditation-thumbnail {
        width: ${px2vwPc(400)};
        height: ${px2vwPc(400)};
        background-color: #bebebe;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        > p {
          font: 700 18px "Pretendard";
          color: #ffffff;
        }
        > input {
          display: none;
        }
      }
      > p {
        font: 500 15px "Pretendard";
        color: #427d4f;
        margin-top: ${px2vwPc(10)};
      }
    }
    .right-section {
      width: 50%;
      > div {
        &:nth-of-type(2) {
          margin-top: ${px2vwPc(30)};
        }
      }
      .upload-mp3 {
        margin-top: ${px2vwPc(30)};

        > p {
          color: #151515;
          font: 600 15px "Pretendard";
        }
        > input {
          margin-top: ${px2vwPc(10)};
        }
      }
    }
    > button {
      position: absolute;
      bottom: ${px2vwPc(50)};
      right: ${px2vwPc(50)};
    }
  }
`;

const UploadMeditation = ({ setShow }: UploadMeditationStyle) => {
  const thumbnailRef = useRef<any>(null);
  const [meditationTitle, setMeditationTitle] = useState("");
  const [meditationBible, setMeditationBible] = useState("");

  const handleUploadMeditation = () => {};
  return (
    <UploadMeditationContainer>
      <div
        onClick={() => setShow(false)}
        className="upload-meditation-bg"
      ></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="upload-meditation-wrap"
      >
        <div className="left-section">
          <div
            onClick={() => thumbnailRef.current.click()}
            className="upload-meditation-thumbnail"
          >
            <p>추가</p>
            <input ref={thumbnailRef} type="file" accept=".jpg,.png,.jpeg" />
          </div>
          <p>* 정사각형의 이미지를 넣어주세요.</p>
        </div>
        <div className="right-section">
          <Input
            title="묵상 제목"
            placeholder="묵상 제목을 입력해주세요."
            setValue={setMeditationTitle}
            value={meditationTitle}
          />
          <Input
            title="묵상 말씀"
            placeholder="묵상 말씀을 입력해주세요."
            setValue={setMeditationBible}
            value={meditationBible}
          />
          <div className="upload-mp3">
            <p>음원 파일</p>
            <input type="file" accept="audio/*" />
          </div>
        </div>
        <Button
          context="저장"
          color="#427d4f"
          borderColor="#427d4f"
          onClick={handleUploadMeditation}
          width={px2vwPc(200)}
          disabled={true}
        />
      </motion.div>
    </UploadMeditationContainer>
  );
};

export default UploadMeditation;
