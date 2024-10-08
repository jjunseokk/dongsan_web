import styled from "styled-components";
import px2vwPc from "../../../Util/px2vwPc";
import { DashboardContainer } from "../Components/DashboardStyle";
import { useNavigate } from "react-router-dom";

const AdminUserListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  table {
    border-collapse: collapse;
    margin-top: ${px2vwPc(30)};
    th,
    td {
      text-align: center;
      padding: ${px2vwPc(15)} 0px;
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
          &:nth-of-type(2) {
            width: ${px2vwPc(700)};
            padding-left: ${px2vwPc(10)};
            text-align: start;
          }
          &:nth-of-type(3) {
            width: ${px2vwPc(200)};
          }
          &:nth-of-type(4) {
            width: ${px2vwPc(200)};
          }
          &:nth-of-type(5) {
            width: ${px2vwPc(200)};
          }
        }
      }
    }
    tbody {
      tr {
        td {
          font: 400 14px "Pretendard";
          &:nth-of-type(2) {
            text-align: start;
            padding-left: ${px2vwPc(10)};
            cursor: pointer;
          }
        }
      }
    }

    input {
      width: ${px2vwPc(25)};
      height: ${px2vwPc(25)};
      accent-color: #427d4f;
      border-radius: 5px;
      &:checked {
        border-radius: 5px;
      }
    }
  }
`;

const AdminUserList = () => {
  const navigate = useNavigate();
  return (
    <AdminUserListContainer>
      <DashboardContainer>
        <p className="dashboard-title">성도</p>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>직분</th>
              <th>가입일자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td
                onClick={() => navigate(`/dongsan/admin/userList/${1}/detail`)}
              >
                박준석
              </td>
              <td>010-2313-8636</td>
              <td>청년</td>
              <td>2024-10-11</td>
            </tr>
          </tbody>
        </table>
      </DashboardContainer>
    </AdminUserListContainer>
  );
};

export default AdminUserList;
