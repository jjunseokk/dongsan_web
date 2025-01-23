import styled from "styled-components";
import BottomMenu from "../../components/BottomMenu";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMeditation } from "../../Api/Admin";
import { meditation } from "../../Type";
import { useEffect, useRef } from "react";

const MeditationContainer = styled.div`
  width: ${px2vw(430)};
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  .meditation-wrap {
    overflow: scroll;
    height: 89%;
    margin-bottom: ${px2vw(55)};

    &::-webkit-scrollbar {
      display: none;
    }
    .meditation-item {
      padding: ${px2vw(25)};
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ababab;
      > div {
        > p {
          font: 600 20px "Pretendard";
          &:last-of-type {
            font-size: 15px;
            color: #427d4f;
            margin-top: ${px2vw(5)};
          }
        }
      }
    }
    .meditation-no-data {
      font: 600 20px "Pretendard";
      color: #ababab;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media screen and (max-width: 375px) {
    .meditation-wrap {
      height: 84%;
    }
  }
`;

const Meditation = () => {
  const navigate = useNavigate();
  const meditationRef = useRef<any>(null);

  // 묵상리스트 조회 ----- 무한 스크롤 구현해야함
  const {
    data: meditationList,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["meditationList"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getMeditation(pageParam),
    getNextPageParam: (_: any, allPages) => {
      // 다음 페이지 번호를 반환하거나 없으면 undefined를 반환
      // 예: lastPage가 데이터가 비어있지 않다면 다음 페이지로 넘어감
      const totalCount = Math.ceil(allPages[0].data.totalCount / 10);

      return allPages.length < totalCount ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    const currentElement = meditationRef.current;

    const handleScroll = () => {
      const scrollTop = meditationRef.current?.scrollTop;
      const scrollHeight = meditationRef.current?.scrollHeight;
      const clientHeight = meditationRef.current?.clientHeight;

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
    <MeditationContainer>
      <BackHeader backHandle={false} title="묵상" />
      <div ref={meditationRef} className="meditation-wrap">
        {meditationList &&
          meditationList?.pages.map((allValue) =>
            allValue?.data?.meditationList?.map((value: meditation) => {
              return (
                <div
                  key={value.id}
                  onClick={() => navigate(`/meditation/${value.id}`)}
                  className="meditation-item"
                >
                  <div>
                    <p>{value.createDate}</p>
                    <p>{value.word}</p>
                  </div>
                  <img src="/assets/right_arrow.png" alt="" />
                </div>
              );
            })
          )}
        {meditationList?.pages[0]?.data?.meditationList?.length === 0 && (
          <p className="meditation-no-data">묵상이 없습니다.</p>
        )}
      </div>
      <BottomMenu />
    </MeditationContainer>
  );
};

export default Meditation;
