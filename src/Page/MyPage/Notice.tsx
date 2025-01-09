import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
    .notice-no-data {
      font: 600 20px "Pretendard";
      color: #ababab;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Notice = () => {
  // 공지사항 펼치기
  const [showAccordion, setShowAccordion] = useState<number | null>(null);
  const noticeRef = useRef<any>(null);

  // 공지사항 불러오기
  const {
    data: notice,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["meditationList"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getNotice(pageParam),
    getNextPageParam: (_: any, allPages) => {
      // 다음 페이지 번호를 반환하거나 없으면 undefined를 반환
      // 예: lastPage가 데이터가 비어있지 않다면 다음 페이지로 넘어감
      const totalCount = Math.ceil(allPages[0].data.totalCount / 10);

      return allPages.length < totalCount ? allPages.length + 1 : undefined;
    },
  });

  const handleNotice = (index: number) => {
    if (showAccordion === index) {
      setShowAccordion(null);
    } else {
      setShowAccordion(index);
    }
  };

  useEffect(() => {
    const currentElement = noticeRef.current;

    const handleScroll = () => {
      const scrollTop = noticeRef.current?.scrollTop;
      const scrollHeight = noticeRef.current?.scrollHeight;
      const clientHeight = noticeRef.current?.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // 여유값을 조금 주어서 끝에 도달하기 전에 로딩
        fetchNextPage(); // 추가 데이터를 불러오는 함수 호출
      }
    };

    if (currentElement) {
      currentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [status]);

  return (
    <NoticeContainer>
      <BackHeader title="공지사항" backHandle={false} />

      <div ref={noticeRef} className="notice-wrap">
        {notice &&
          notice?.pages.map((allValue) =>
            allValue?.data?.notice?.map((value: noticeType, index: number) => {
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
            })
          )}
        {notice?.pages[0]?.data?.notice?.length === 0 && (
          <p className="notice-no-data">공지사항이 없습니다.</p>
        )}
      </div>
      <BottomMenu />
    </NoticeContainer>
  );
};

export default Notice;
