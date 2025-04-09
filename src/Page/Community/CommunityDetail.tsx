import styled from "styled-components";
import BackHeader from "../../components/BackHeader";
import { px2vw } from "../../Util/px2vw";
import { useQuery } from "@tanstack/react-query";
import { getCommunityDetail } from "../../Api/Client";
import { useParams } from "react-router-dom";
import userProfileStore from "../../Store/userProfile";

const CommunityDetail = () => {
    const { id } = useParams();
    const { profile } = userProfileStore(); // 프로필 상태 관리 불러오기

    const { data } = useQuery({
        queryKey: ["Community Detail", id],
        queryFn: () => getCommunityDetail(Number(id)),
    });

    return (
        <CommunityContainer>
            <BackHeader backHandle={true} title="" />
            <div className="community-wrap">
                <div className="user-profile">
                    <div className="user-thumbnail">
                        <img src="/assets/tree.png" alt="" />
                    </div>
                    <div className="user-info">
                        <p>{data?.data?.communityDetail?.nickname}</p>
                    </div>
                </div>
                <div className="community-content-detail">
                    <p>{data?.data?.communityDetail?.content}</p>

                    <p className="community-createAt">{data?.data?.communityDetail?.createDate}</p>
                </div>

                <div className="community-event">
                    <div>
                        <img src={ data?.data.heart.some(
                    (item: any) => item.userId === profile.userId
                  )
                    ? "/assets/heart-active.png"
                    : "/assets/heart.png"} alt="" />
                        <p>{data?.data.heart.length}</p>
                    </div>
                </div>
                {/* <div className="community-comment">
                    <div className="comment-user">
                        <div className="user-thumbnail">
                            <img src="/assets/tree.png" alt="" />
                        </div>
                        <div className="user-info">
                            <p>아무개</p>
                            <p>2025년 3월 17일</p>
                        </div>
                    </div>
                    <div className="comment">
                        <p>정말 좋은 글인 것 같아요!!</p>
                    </div>
                </div>
                <div className="community-comment">
                    <div className="comment-user">
                        <div className="user-thumbnail">
                            <img src="/assets/tree.png" alt="" />
                        </div>
                        <div className="user-info">
                            <p>아무개</p>
                            <p>2025년 3월 17일</p>
                        </div>
                    </div>
                    <div className="comment">
                        <p>정말 좋은 글인 것 같아요!!</p>
                    </div>
                </div> */}
            </div>
        </CommunityContainer>
    );
};

export default CommunityDetail;

const CommunityContainer = styled.div`
    width: ${px2vw(430)};
    height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #ffffff;
    .community-wrap {
        height: 95%;
        overflow: scroll;
        padding: ${px2vw(10)};
        &::-webkit-scrollbar {
            display: none;
          }
        .user-profile {
            display: flex;
            align-items: center;
            gap: ${px2vw(10)};
            > .user-thumbnail {
                width: ${px2vw(50)};
                height: ${px2vw(50)};
                border-radius: 50%;
                overflow: hidden;
                > img {
                    width: 100%;
                    height: 100%;
                }
            }
            .user-info {
                > p {
                    font-size: 16px;
                    font-weight: 700;
                    color: #151515;
                }
            }
        }

        .community-content-detail {
            margin-top: ${px2vw(20)};

            > p {
                white-space: pre-wrap;
            }
            .community-createAt {
                color: #9a9999;
                font-size: 13px;
                margin-top: ${px2vw(50)};
            }
        }

        .community-event {
            width: 100%;
            height: ${px2vw(50)};
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: ${px2vw(20)};
            margin-top: ${px2vw(30)};
            position: relative;
            border-top: 1px solid #d9d9d9;

            > div {
                display: flex;
                align-items: center;
                gap: ${px2vw(10)};

                > img {
                    width: ${px2vw(20)};
                    height: ${px2vw(20)};
                }
                > p {
                    color: #427d4f;
                }
            }
        }

        .community-comment {
            margin-top: ${px2vw(20)};
            .comment-user {
                display: flex;
                align-items: center;
                gap: ${px2vw(10)};

                .user-thumbnail {
                    width: ${px2vw(40)};
                    height: ${px2vw(40)};
                    border-radius: 50%;
                    overflow: hidden;
                    > img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .user-info {
                    > p {
                        color: #151515;
                        font-size: 15px;
                        font-weight: 600;
                        &:last-of-type {
                            font-size: 11px;
                            margin-top: ${px2vw(5)};
                            color: #8f8f8f;
                        }
                    }
                }
            }
            .comment {
                > p {
                    padding-left: ${px2vw(10)};
                    margin: ${px2vw(10)} 0;
                    color: #151515;
                    font-size: 15px;
                }
            }
        }
    }
`;
