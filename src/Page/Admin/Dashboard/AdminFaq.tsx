import styled from "styled-components";
import Button from "../../../components/Button";
import px2vwPc from "../../../Util/px2vwPc";
import { useState } from "react";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { faqType } from "../../../Type";
import CustomPagination from "../../../components/CustomPagination";
import { getFaq } from "../../../Api/Admin";
import EditFaq from "../Components/EditFaq";
import UploadFaq from "../Components/UploadFaq";

const AdminFaqContainer = styled(motion.div)`
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
            width: ${px2vwPc(950)};
            padding-left: ${px2vwPc(10)};
            text-align: start;
          }
          &:nth-of-type(3) {
            width: ${px2vwPc(250)};
          }
          &:nth-of-type(4) {
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

const AdminFaq = () => {
  // 업로드 팝업 창
  const [showUploadFaq, setShowUploadFaq] = useState<boolean>(false);
  // 수정 팝업 창
  const [showEditFaq, setShowEditFaq] = useState<boolean>(false);
  // 공지사항 선택 아이디
  const [faqId, setFaqId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const { data: faq } = useQuery({
    queryKey: ["faq", page],
    queryFn: () => getFaq(page),
  });

  return (
    <AdminFaqContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {showUploadFaq ? <UploadFaq setShow={setShowUploadFaq} /> : null}
      {showEditFaq ? <EditFaq id={faqId} setShow={setShowEditFaq} /> : null}
      <DashboardContainer>
        <p className="dashboard-title">FAQ 작성</p>
        <Button
          context="FAQ작성"
          color="#427D4F"
          borderColor="#427D4F"
          onClick={() => setShowUploadFaq(true)}
          width={px2vwPc(130)}
        />
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>타입</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {faq?.data.faq.map((value: faqType, index: number) => {
              return (
                <tr key={value.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => {
                      setShowEditFaq(true);
                      setFaqId(value.id);
                    }}
                  >
                    {value.title}
                  </td>
                  <td>
                    {value.type === "use"
                      ? "이용 문의"
                      : value.type === "sign"
                      ? "회원가입/로그인"
                      : "기타"}
                  </td>
                  <td>{value.createDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <CustomPagination
          page={page}
          setPage={setPage}
          totalPage={faq?.data.totalCount}
        />
      </DashboardContainer>
    </AdminFaqContainer>
  );
};

export default AdminFaq;
