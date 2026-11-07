import styled from "styled-components";
import { motion } from "framer-motion";
import px2vwPc from "../../../Util/px2vwPc";
import Input from "../../../components/Input";
import React, { SetStateAction, useRef, useState } from "react";
import Button from "../../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { createMeditation } from "../../../Api/Admin";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

interface UploadMeditationStyle {
  setShow: React.Dispatch<SetStateAction<boolean>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

const UploadMeditationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
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
        overflow: hidden;
        > img {
          width: 100%;
          height: 100%;
        }
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
      .upload-datePicker {
        margin-top: ${px2vwPc(30)};
        > p {
          color: #151515;
          font: 600 15px "Pretendard";
        }
        .date-wrap {
          display: flex;
          justify-content: space-around;
          align-items: center;
          > button {
            background: none;
            border: none;
            font: 600 20px "Pretendard";
            cursor: pointer;
          }
          > p {
            font: 600 15px "Pretendard";
          }
        }

        .react-datepicker-wrapper {
          margin-top: ${px2vwPc(10)};
          .react-datepicker__input-container {
            > input {
              width: 100% !important;
              height: ${px2vwPc(40)};
              padding: ${px2vwPc(10)};
              border: 1px solid #d9d9d9;
              border-radius: 5px;
              &:focus {
                outline: none;
              }
            }
          }
        }
        .react-datepicker__day--selected {
          background-color: #427d4f !important;
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

const UploadMeditation = ({ setShow, setLoading }: UploadMeditationStyle) => {
  const thumbnailRef = useRef<any>(null);
  const [meditationTitle, setMeditationTitle] = useState("");
  const [meditationBible, setMeditationBible] = useState("");
  const [thumbnail, setThumbnail] = useState<any>("/assets/demo-cover.svg");
  const [music, setMusic] = useState<any>("/assets/demo-audio.wav");
  const [still, setStill] = useState<any>("/assets/demo-cover.svg");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const createMeditationMutation = useMutation({
    mutationKey: ["createMeditation"],
    mutationFn: (data: any) => createMeditation(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        setLoading(false);
        window.location.reload();
      }
    },
  });

  const handleImg = (e: any) => {
    const file = e.target.files[0];
    setThumbnail(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setStill(reader.result);
    };
  };

  const handleGetMusic = (e: any) => {
    const file = e.target.files[0];
    setMusic(file);
  };

  const handleUploadMeditation = () => {
    if (!meditationTitle.trim() || !meditationBible.trim()) return;
    const formData = new FormData();
    setLoading(true);
    formData.append("title", meditationTitle);
    formData.append("word", meditationBible);
    formData.append("thumbnail", thumbnail);
    formData.append("music", music);
    formData.append("date", startDate?.toISOString()?.split("T")[0] as any);

    createMeditationMutation.mutate(formData);
  };

  const canRegister = meditationTitle && meditationBible && thumbnail && music;

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
            {still ? <img src={still} /> : <p>추가</p>}

            <input
              onChange={handleImg}
              ref={thumbnailRef}
              type="file"
              accept=".jpg,.png,.jpeg"
            />
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
          <div className="upload-datePicker">
            <p>날짜 선택</p>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                prevMonthButtonDisabled,
                increaseMonth,
                nextMonthButtonDisabled,
              }) => (
                <div className="date-wrap">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <p>
                    {monthDate.toLocaleString("ko-Kr", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>

          <div className="upload-mp3"><small>파일을 선택하지 않으면 데모 음원이 사용됩니다.</small>
            <p>음원 파일</p>
            <input onChange={handleGetMusic} type="file" accept="audio/*" />
          </div>
        </div>
        <Button
          context="저장"
          color="#427d4f"
          borderColor="#427d4f"
          onClick={handleUploadMeditation}
          width={px2vwPc(200)}
          disabled={!canRegister}
        />
      </motion.div>
    </UploadMeditationContainer>
  );
};

export default UploadMeditation;
