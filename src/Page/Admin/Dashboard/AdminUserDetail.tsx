import styled from "styled-components";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import px2vwPc from "../../../Util/px2vwPc";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../../Api/Admin";

const AdminUserDetailContainer = styled(motion.div)`
  width: 100%;
  position: relative;
  .back-btn {
    margin-bottom: ${px2vwPc(10)};
    cursor: pointer;
  }
  .userDetail-wrap {
    display: flex;
    gap: ${px2vwPc(10)};
    margin-top: ${px2vwPc(50)};

    > .left-section {
      width: ${px2vwPc(400)};
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      > .user-profile-thumbnail {
        width: ${px2vwPc(300)};
        height: ${px2vwPc(300)};
        background: #bbbbbb;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        > img {
          width: ${px2vwPc(29 * 4)};
          height: ${px2vwPc(33 * 4)};
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        > img.thumbnail {
          width: 100%;
          height: 100%;
        }
      }
    }
    > .right-section {
      width: ${px2vwPc(1000)};
      > div {
        display: flex;
        align-items: center;
        height: ${px2vwPc(60)};
        gap: ${px2vwPc(15)};
        margin-bottom: ${px2vwPc(20)};

        > p {
          font: 700 15px "Pretendard";
          &:first-of-type {
            width: ${px2vwPc(150)};
            font: 700 15px "Pretendard";
          }
          &:nth-of-type(2) {
            font-weight: 400;
            color: #757575;
          }
        }
      }
    }
  }
`;
const AdminUserDetail = () => {
  // path 값 가져오기
  const path = useParams();

  // 유저 상세보기
  const { data: detailUser } = useQuery({
    queryKey: ["detailUser"],
    queryFn: () => getUserDetail(path.id),
  });

  return (
    <AdminUserDetailContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <DashboardContainer>
        <img
          className="back-btn"
          onClick={() => history.back()}
          src="/assets/arrow_back.png"
          alt=""
        />
        <p className="dashboard-title">성도 상세 정보</p>
        <div className="userDetail-wrap">
          <div className="left-section">
            <div className="user-profile-thumbnail">
              {detailUser?.data.user.thumbnail === null ? (
                <img src="/assets/non-thumbnail.png" alt="thumbnail" />
              ) : (
                <img
                  className="thumbnail"
                  src={detailUser?.data.user.thumbnail}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="right-section">
            <div>
              <p>아이디</p>
              <p>{detailUser?.data.user.userId}</p>
            </div>
            <div>
              <p>이름</p>
              <p>{detailUser?.data.user.name}</p>
            </div>
            <div>
              <p>가입일자</p>
              <p>{detailUser?.data.user.createDate}</p>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </AdminUserDetailContainer>
  );
};

export default AdminUserDetail;
