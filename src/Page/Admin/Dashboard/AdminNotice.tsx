import styled from "styled-components";
import Button from "../../../components/Button";
import px2vwPc from "../../../Util/px2vwPc";
import { useState } from "react";
import UploadNotice from "../Components/UploadNotice";
import EditNotice from "../Components/EdtiNotice";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNotice } from "../../../Api/Admin";
import { noticeType } from "../../../Type";

const AdminNoticeContainer = styled(motion.div)`
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
          &:nth-of-type(2) {
            width: ${px2vwPc(1100)};
            padding-left: ${px2vwPc(10)};
            text-align: start;
          }
          &:nth-of-type(3) {
            width: ${px2vwPc(250)};
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
  }
`;

const AdminNotice = () => {
  const [showUploadNotice, setShowUploadNotice] = useState<boolean>(false);
  const [showEditNotice, setShowEditNotice] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const { data: notice } = useQuery({
    queryKey: ["notice"],
    queryFn: () => getNotice(),
  });

  return (
    <AdminNoticeContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {showUploadNotice ? <UploadNotice setShow={setShowUploadNotice} /> : null}
      {showEditNotice ? (
        <EditNotice index={id} setShow={setShowEditNotice} />
      ) : null}
      <DashboardContainer>
        <p className="dashboard-title">공지 작성</p>
        <Button
          context="공지작성"
          color="#427D4F"
          borderColor="#427D4F"
          onClick={() => setShowUploadNotice(true)}
          width={px2vwPc(130)}
        />
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {notice?.data.notice.map((value: noticeType, index: number) => {
              return (
                <tr key={value.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => {
                      setShowEditNotice(true);
                      setId(index);
                    }}
                  >
                    {value.title}
                  </td>
                  <td>{value.createDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DashboardContainer>
    </AdminNoticeContainer>
  );
};

export default AdminNotice;
