import styled from "styled-components";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import px2vwPc from "../../../Util/px2vwPc";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../../Api/User";

const AdminUserDetailContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
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
        > img {
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
  const path = useParams();
  console.log(path.id);

  const { data: detailUser } = useQuery({
    queryKey: ["detailUser"],
    queryFn: () => getUserDetail(path.id),
  });

  console.log(detailUser?.data.user[0]);

  return (
    <AdminUserDetailContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <DashboardContainer>
        <p className="dashboard-title">성도 상세 정보</p>
        <div className="userDetail-wrap">
          <div className="left-section">
            <div className="user-profile-thumbnail">
              <img src="" alt="" />
            </div>
          </div>
          <div className="right-section">
            <div>
              <p>아이디</p>
              <p>{detailUser?.data.user[0].userId}</p>
            </div>
            <div>
              <p>이름</p>
              <p>{detailUser?.data.user[0].name}</p>
            </div>
            <div>
              <p>전화번호</p>
              <p>{detailUser?.data.user[0].phoneNumber}</p>
            </div>
            <div>
              <p>가입일자</p>
              <p>{detailUser?.data.user[0].createDate}</p>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </AdminUserDetailContainer>
  );
};

export default AdminUserDetail;
