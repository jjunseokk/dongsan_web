import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNotice } from "../../Api/Admin";
import { noticeType } from "../../Type";
import BottomMenu from "../../components/BottomMenu";

const NoticeContainer = styled.div`
  width: ${px2vw(430)};
  margin: 0 auto;
  .notice-wrap {
    .notice-item {
      > .item {
        padding: ${px2vw(22)} ${px2vw(25)};
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
          > p {
            font: 400 18px "Pretendard";
            &:last-of-type {
              font-size: 13px;
              color: #bbbbbb;
              margin-top: ${px2vw(5)};
            }
          }
        }
      }
      .notice-accordion {
        background: #e7e7e7;
        padding: ${px2vw(30)} ${px2vw(25)};
        height: auto;
        > p {
          white-space: pre-wrap;
        }
      }
    }
  }
`;

const Notice = () => {
  // 공지사항 펼치기
  const [showAccordion, setShowAccordion] = useState<number | null>(null);
  // 공지사항 불러오기
  const { data: notice } = useQuery({
    queryKey: ["getNotice"],
    queryFn: () => getNotice(),
  });

  const handleNotice = (index: number) => {
    if (showAccordion === index) {
      setShowAccordion(null);
    } else {
      setShowAccordion(index);
    }
  };

  return (
    <NoticeContainer>
      <BackHeader title="공지사항" backHandle={false} />

      <div className="notice-wrap">
        {notice?.data.notice.map((value: noticeType, index: number) => {
          return (
            <div key={value.id} className="notice-item">
              <div onClick={() => handleNotice(index)} className="item">
                <div>
                  <p>{value.title}</p>
                  <p>{value.createDate}</p>
                </div>
                <img
                  src={
                    showAccordion === index
                      ? "/assets/down_arrow.png"
                      : "/assets/right_arrow.png"
                  }
                  alt=""
                />
              </div>
              {showAccordion === index ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="notice-accordion"
                >
                  <p>{value.context}</p>
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </div>
      <BottomMenu />
    </NoticeContainer>
  );
};

export default Notice;
