import { useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import px2vwPc from "../../Util/px2vwPc";
import { useQuery } from "@tanstack/react-query";
import { getFaq } from "../../Api/Admin";

const FaQContainer = styled(motion.div)`
  border: 1px solid red;
  .faq-title {
    width: ${px2vwPc(1200)};
    margin: 0 auto;
    margin-top: ${px2vwPc(100)};
    text-align: center;

    > p {
      margin-top: ${px2vwPc(20)};
    }
  }
  .faq-search-container {
    height: 200px;
    background: #f5f5f5;
    margin-top: ${px2vwPc(100)};
    display: flex;
    justify-content: center;
    align-items: center;

    .faq-search-wrap {
      width: ${px2vwPc(1200)};
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: ${px2vwPc(20)};
      input {
        width: ${px2vwPc(980)};
        height: 50px;
        border: 1px solid #707070;
        border-radius: 5px;
        padding: 0 ${px2vwPc(10)};
        border: 1px solid #a7a7a7;
        font-size: 15px;
        &:focus {
          outline: none;
        }
      }
      button {
        width: ${px2vwPc(200)};
        height: 50px;
        background: #427d4f;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 800;
      }
    }
  }

  .faq-tap-container {
    width: ${px2vwPc(1200)};
    margin: 0 auto;
    margin-top: ${px2vwPc(50)};
    display: flex;
    align-items: center;
    .faq-tap-wrap {
      button {
        width: ${px2vwPc(300)};
        height: 50px;
        background: none;
        border: 1px solid #707070;
        cursor: pointer;
        font-size: 15px;
        &:first-of-type {
          border-radius: 5px 0 0 5px;
        }
        &:last-of-type {
          border-radius: 0 5px 5px 0;
        }
      }
      button.active {
        background: #427d4f;
        color: white;
        font-weight: 700;
      }
    }
  }
`;

const typeButton = [
  { id: 1, name: "전체" },
  { id: 2, name: "회원가입/로그인" },
  { id: 3, name: "이용안내" },
  { id: 4, name: "기타" },
];

const FaQ = () => {
  const [fqaType, setFqaType] = useState<string>("all");
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["Faq"],
    queryFn: () => getFaq(page),
  });

  return (
    <FaQContainer
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="faq-title">
        <h1>시심 FAQ</h1>
        <p>시심 FAQ로 궁금증을 해결해 보세요!</p>
      </div>

      <div className="faq-search-container">
        <div className="faq-search-wrap">
          <input type="text" placeholder="검색어를 입력해주세요." />
          <button>검색</button>
        </div>
      </div>
      <div className="faq-tap-container">
        <div className="faq-tap-wrap">
          {typeButton.map((item) => {
            return (
              <button
                className={fqaType === item.name ? "active" : ""}
                key={item.id}
                onClick={() => setFqaType(item.name)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </FaQContainer>
  );
};

export default FaQ;
