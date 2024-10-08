import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useState } from "react";
import { motion } from "framer-motion";

const NoticeContainer = styled.div`
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
      }
    }
  }
`;

const Notice = () => {
  const [showAccordion, setShowAccordion] = useState(false);
  return (
    <NoticeContainer>
      <BackHeader title="공지사항" />

      <div className="notice-wrap">
        <div className="notice-item">
          <div
            onClick={() => setShowAccordion(!showAccordion)}
            className="item"
          >
            <div>
              <p>앱 출시 안내</p>
              <p>2024.10.10</p>
            </div>
            <img
              src={
                showAccordion
                  ? "/assets/down_arrow.png"
                  : "/assets/right_arrow.png"
              }
              alt=""
            />
          </div>
          {showAccordion ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="notice-accordion"
            >
              <p>
                안녕하세요, 광주동산교회 어플입니다.
                <br />
                <br />
                새로 출시했습니다. 잘 부탁드리겠습니다.
              </p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </NoticeContainer>
  );
};

export default Notice;
