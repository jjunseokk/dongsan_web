import styled from "styled-components";
import px2vwPc from "../../../Util/px2vwPc";
import { DashboardContainer } from "../Components/DashboardStyle";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../../Api/Admin";
import { getUser } from "../../../Type";
import CustomPagination from "../../../components/CustomPagination";
import { useState } from "react";

const AdminUserListContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;

  table {
    border-collapse: collapse;
    margin-top: ${px2vwPc(30)};
    th,
    td {
      text-align: center;
      padding: ${px2vwPc(10)} 0px;
      border: 1px solid #e0e0e0;
      &:first-of-type {
        border-left: none;
      }
      &:last-of-type {
        border-right: none;
      }
    }

    thead {
      > tr {
        border-bottom: 2px solid #707070;
        border-top: 2px solid #707070;
        th {
          &:first-of-type {
            width: ${px2vwPc(100)};
          }
          &:nth-of-type(2),
          &:nth-of-type(3) {
            width: ${px2vwPc(410)};
            text-align: start;
            padding-left: ${px2vwPc(10)};
          }
          &:nth-of-type(4),
          &:nth-of-type(5) {
            width: ${px2vwPc(240)};
          }
        }
      }
    }
    tbody {
      tr {
        td {
          font: 400 14px "Pretendard";
          &:nth-of-type(2),
          &:nth-of-type(3) {
            text-align: start;
            padding-left: ${px2vwPc(10)};
          }
          &:nth-of-type(3) {
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const AdminUserList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // 유저 목록 불러오기
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getUserList(page),
  });

  return (
    <AdminUserListContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <DashboardContainer>
        <p className="dashboard-title">성도</p>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>가입일자</th>
            </tr>
          </thead>
          <tbody>
            {userList?.data.profile
              .filter((item: getUser) => item.userApprove === true)
              .map((value: getUser, index: number) => {
                return (
                  <tr key={value.id}>
                    <td>{index + 1}</td>
                    <td>{value.userId}</td>
                    <td
                      onClick={() =>
                        navigate(`/dongsan/admin/userList/${value.id}/detail`)
                      }
                    >
                      {value.name}
                    </td>
                    <td>{value.phoneNumber}</td>
                    <td>{value.createDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <CustomPagination page={page} setPage={setPage} totalPage={userList?.data.totalCount} />
      </DashboardContainer>
    </AdminUserListContainer>
  );
};

export default AdminUserList;
