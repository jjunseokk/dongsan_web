import styled from "styled-components";
import Input from "../../../components/Input";
import React, { SetStateAction, useState } from "react";
import px2vwPc from "../../../Util/px2vwPc";
import { motion } from "framer-motion";
import { px2vw } from "../../../Util/px2vw";
import Button from "../../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { createNoticeType } from "../../../Type";
import { createNotice } from "../../../Api/Admin";

interface UploadNoticeStyle {
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

const UploadNoticeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  .uploadNotice-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .uploadNotice-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: ${px2vwPc(1000)};
    padding: ${px2vwPc(50)};
    border-radius: 10px;
    > .notice-content {
      margin-top: ${px2vwPc(30)};

      > p {
        color: #151515;
        font: 600 15px "Pretendard";
      }
      > textarea {
        resize: none;
        width: 100%;
        margin-top: ${px2vwPc(15)};
        border: 1px solid #d9d9d9;
        height: ${px2vwPc(400)};
        border-radius: 5px;
        padding: ${px2vw(11)} ${px2vw(12)};
        white-space: pre-wrap;
        &::placeholder {
          color: #d9d9d9;
          font: 600 15px "Pretendard";
        }
        &:focus {
          outline: none;
        }
      }
    }
    .btn-area {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: ${px2vwPc(20)};
      margin-top: ${px2vwPc(10)};
    }
  }
`;

const UploadNotice = ({ setShow }: UploadNoticeStyle) => {
  const [noticeTitle, setNoticeTitle] = useState<string>("");
  const [noticeContext, setNoticeContext] = useState<string>("");

  const createNoticeMutation = useMutation({
    mutationKey: ["createNotice"],
    mutationFn: (data: createNoticeType) => createNotice(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setShow(false);
        window.location.reload();
      }
    },
  });

  const handleNoticeSave = () => {
    createNoticeMutation.mutate({
      title: noticeTitle,
      context: noticeContext,
    });
  };

  return (
    <UploadNoticeContainer>
      <div onClick={() => setShow(false)} className="uploadNotice-bg"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="uploadNotice-wrap"
      >
        <Input
          title="공지 제목"
          placeholder="공지 제목을 입력해주세요."
          setValue={setNoticeTitle}
          value={noticeTitle}
        />
        <div className="notice-content">
          <p>공지 내용</p>
          <textarea
            onChange={(e) => setNoticeContext(e.target.value)}
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div className="btn-area">
          <Button
            context="저장"
            color="#427d4f"
            borderColor="#427d4f"
            onClick={handleNoticeSave}
            width={px2vwPc(150)}
          />
        </div>
      </motion.div>
    </UploadNoticeContainer>
  );
};

export default UploadNotice;
