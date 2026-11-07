import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFaq } from "../../Api/Client";
import { motion } from "framer-motion";
import { faqType } from "../../Type";

const FaQContainer = styled.div`
  width: ${px2vw(430)};
  height: calc(100dvh - 56px);
  margin: 0 auto;
  .faq-wrap {
    height: 89%;
    margin-bottom: ${px2vw(55)};
    margin-top: ${px2vw(20)};
    padding: 0 ${px2vw(20)};
    .faq-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > input {
        border: 1px solid #dddddd;
        width: ${px2vw(280)};
        height: ${px2vw(30)};
        border-radius: 5px;
        padding-left: ${px2vw(5)};
        font-size: 12px;
        &:focus {
          outline: none;
        }
      }
      > button {
        width: ${px2vw(100)};
        height: ${px2vw(30)};
        border: none;
        border-radius: 5px;
        color: #ffffff;
        background: #427d4f;
      }
    }

    .faq-tap {
      display: flex;
      align-content: center;
      margin-top: ${px2vw(20)};

      > p {
        border: 1px solid #dddddd;
        width: 25%;
        height: ${px2vw(30)};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #151515;
        cursor: pointer;
        &:first-of-type {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        &:last-of-type {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
      > p.active {
        background: #427d4f;
        color: #ffffff;
      }
    }

    .faq-faqList {
      margin-top: ${px2vw(30)};
      height: 80vh;
      margin-bottom: ${px2vw(55)};

      overflow: auto;
      > .faq-title {
        height: ${px2vw(50)};
        border-bottom: 1px solid #dddddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 ${px2vw(10)};

        > p {
          font-size: 14px;
        }
      }
      > .faq-body {
        padding: ${px2vw(15)};
        background: #eaeaea;

        > p {
          font-size: 12px;
          font-weight: 400;
          white-space: pre-wrap;
        }
      }
    }
  }

  @media screen and (max-width: 320px) {
    .faq-wrap {
      .faq-tap {
        > p {
          font-size: 9px;
        }
      }

      .faq-faqList {
        > .faq-title {
          > p {
            font-size: 11px;
          }
          > img {
            scale: 0.7;
          }
        }
        > .faq-body {
          padding: ${px2vw(15)};
          background: #eaeaea;

          > p {
            font-size: 10px;
            font-weight: 400;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
`;

const FaQ = () => {
  const [search, setSearch] = useState<string>("");
  const [tap, setTap] = useState<string>("all");
  const [showAccordion, setShowAccordion] = useState<number | null>(null);
  const [filteredFaqs, setFilteredFaqs] = useState<faqType[] | null>(null); // 필터된 FAQ 목록
  const faqRef = useRef<any>(null);

  // 공지사항 불러오기
  const { data, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["faqList", tap],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getFaq(pageParam, tap),
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
  const handleSearch = () => {
    // 모든 페이지에서 FAQ 데이터를 가져와서 검색
    const allFaqs = data?.pages.flatMap((page) => page.data.faq) || [];

    // 검색어를 기준으로 FAQ 필터링
    const filtered = allFaqs.filter((faq: faqType) =>
      faq.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredFaqs(filtered);
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setShowAccordion(null);
  }, [tap]);

  useEffect(() => {
    const currentElement = faqRef.current;

    const handleScroll = () => {
      const scrollTop = faqRef.current?.scrollTop;
      const scrollHeight = faqRef.current?.scrollHeight;
      const clientHeight = faqRef.current?.clientHeight;

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
    <FaQContainer>
      <BackHeader title="FAQ" />
      <div className="faq-wrap">
        <div className="faq-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleInput}
            type="text"
            placeholder="무엇을 도와드릴까요?"
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        <div className="faq-tap">
          <p
            className={tap === "all" ? "active" : ""}
            onClick={() => setTap("all")}
          >
            전체
          </p>
          <p
            className={tap === "sign" ? "active" : ""}
            onClick={() => setTap("sign")}
          >
            회원가입/로그인
          </p>
          <p
            className={tap === "use" ? "active" : ""}
            onClick={() => setTap("use")}
          >
            이용문의
          </p>
          <p
            className={tap === "other" ? "active" : ""}
            onClick={() => setTap("other")}
          >
            기타
          </p>
        </div>

        <div ref={faqRef} className="faq-faqList">
          {data?.pages.map((allValue) =>
            (filteredFaqs !== null ? filteredFaqs : allValue?.data.faq)?.map(
              (value: faqType, index: number) => {
                return (
                  <React.Fragment key={value.id}>
                    <div
                      onClick={() => handleNotice(index)}
                      className="faq-title"
                    >
                      <p>{value.title}</p>
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
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="faq-body"
                      >
                        <p>{value.context}</p>
                      </motion.div>
                    ) : null}
                  </React.Fragment>
                );
              }
            )
          )}
        </div>
      </div>
    </FaQContainer>
  );
};

export default FaQ;
