import styled from "styled-components";
import Input from "../../../components/Input";
import React, { SetStateAction, useState } from "react";
import px2vwPc from "../../../Util/px2vwPc";
import { motion } from "framer-motion";
import Button from "../../../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFaqType, faqOptionType } from "../../../Type";
import { createFaq, getFaqType } from "../../../Api/Admin";

interface UploadFaqStyle {
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

const UploadFaqContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  .uploadFaq-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .uploadFaq-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: ${px2vwPc(1000)};
    padding: ${px2vwPc(50)};
    border-radius: 10px;
    .faq-option {
      margin-top: ${px2vwPc(30)};

      > p {
        color: #151515;
        font: 600 15px "Pretendard";
      }

      > .faq-select {
        width: ${px2vwPc(250)};
        height: ${px2vwPc(40)};
        margin-top: ${px2vwPc(10)};
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: ${px2vwPc(10)};

        > p {
          font-size: 12px;
        }

        > img {
          position: absolute;
          top: 50%;
          right: ${px2vwPc(10)};
          transform: translate(0%, -50%);
        }
        > .option-body {
          width: ${px2vwPc(250)};
          background: #ffffff;
          position: absolute;
          top: ${px2vwPc(40)};
          left: 0px;
          text-align: center;
          > p {
            padding: ${px2vwPc(10)};
            font-size: 13px;
            &:hover {
              background: #efefef;
            }
          }
        }
      }
    }

    > .faq-content {
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
        padding: ${px2vwPc(11)} ${px2vwPc(12)};
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

const UploadFaq = ({ setShow }: UploadFaqStyle) => {
  const [faqTitle, setFaqTitle] = useState("");
  const [faqContext, setFaqContext] = useState<string>("");
  const [type, setType] = useState<faqOptionType>({ id: 0, name: "", value: "" });
  const [showType, setShowType] = useState<boolean>(false);

  const { data: faqType } = useQuery({
    queryKey: ["faqType"],
    queryFn: () => getFaqType(),
  });

  const createFaqMutation = useMutation({
    mutationKey: ["createFaq"],
    mutationFn: (data: createFaqType) => createFaq(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setShow(false);
        window.location.reload();
      }
    },
  });

  const handleFaqSave = () => {
    createFaqMutation.mutate({
      title: faqTitle,
      context: faqContext,
      type: type.value,
    });
  };

  return (
    <UploadFaqContainer>
      <div onClick={() => setShow(false)} className="uploadFaq-bg"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="uploadFaq-wrap"
      >
        <Input
          title="FAQ 제목"
          placeholder="FAQ 제목을 입력해주세요."
          setValue={setFaqTitle}
          value={faqTitle}
        />

        <div className="faq-option">
          <p>FAQ 종류</p>

          <div onClick={() => setShowType(!showType)} className="faq-select">
            <p>{type.name}</p>
            <img src="/assets/down_arrow.png" alt="" />
            {showType && (
              <div className="option-body">
                {faqType?.data.type.map((value: faqOptionType) => {
                  return (
                    <p onClick={() => setType(value)} key={value.id}>
                      {value.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="faq-content">
          <p>FAQ 내용</p>
          <textarea
            onChange={(e) => setFaqContext(e.target.value)}
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div className="btn-area">
          <Button
            context="저장"
            color="#427d4f"
            borderColor="#427d4f"
            onClick={handleFaqSave}
            width={px2vwPc(150)}
          />
        </div>
      </motion.div>
    </UploadFaqContainer>
  );
};

export default UploadFaq;
