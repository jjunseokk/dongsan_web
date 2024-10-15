import styled from "styled-components";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import px2vwPc from "../../../Util/px2vwPc";
import Button from "../../../components/Button";
import { useState } from "react";

const AdminUserApproveContainer = styled(motion.div)`
  width: 100%;
  height: 100%;

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
          &:nth-of-type(2) {
            width: ${px2vwPc(500)};
            padding-left: ${px2vwPc(10)};
            text-align: start;
          }
          &:nth-of-type(3) {
            width: ${px2vwPc(200)};
          }
          &:nth-of-type(4),
          &:nth-of-type(5),
          &:nth-of-type(6) {
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
          &:nth-of-type(6) {
            display: flex;
            gap: ${px2vwPc(10)};
            justify-content: center;
            align-items: center;
          }
        }
        td.active {
          color: #ff1919;
        }
      }
    }
  }
`;

const AdminUserApprove = () => {
  const [approve, setApprove] = useState("not approved");
  return (
    <AdminUserApproveContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <DashboardContainer>
        <p className="dashboard-title">가입 승인</p>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>가입일자</th>
              <th>승인상태</th>
              <th>승인</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>박준석</td>
              <td>010-2313-8636</td>
              <td>2024-10-11</td>
              <td className={approve === "not approved" ? "active" : ""}>
                {approve === "not approved" ? "미승인" : "승인"}
              </td>
              <td>
                {approve === "not approved" ? (
                  <>
                    <Button
                      context="승인"
                      color="#427d4f"
                      borderColor="#427d4f"
                      onClick={() => console.log("ss")}
                      width={px2vwPc(90)}
                    />
                    <Button
                      context="거절"
                      color="#FF1919"
                      borderColor="#FF1919"
                      onClick={() => console.log("ss")}
                      width={px2vwPc(90)}
                    />
                  </>
                ) : (
                  <Button
                    context="승인 취소"
                    color="#002fff"
                    borderColor="#002fff"
                    onClick={() => console.log("ss")}
                    width={px2vwPc(180)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </DashboardContainer>
    </AdminUserApproveContainer>
  );
};

export default AdminUserApprove;
