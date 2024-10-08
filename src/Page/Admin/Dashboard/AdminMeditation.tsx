import styled from "styled-components";
import px2vwPc from "../../../Util/px2vwPc";
import Button from "../../../components/Button";
import { useState } from "react";
import UploadMeditation from "../Components/UploadMeditation";
import EditMeditation from "../Components/EditMeditation";
import { DashboardContainer } from "../Components/DashboardStyle";

const AdminMeditationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .admin-meditation-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
            width: ${px2vwPc(950)};
            padding-left: ${px2vwPc(10)};
            text-align: start;
          }
          &:nth-of-type(3) {
            width: ${px2vwPc(120)};
          }
          &:nth-of-type(4) {
            width: ${px2vwPc(170)};
          }
          &:nth-of-type(5) {
            width: ${px2vwPc(100)};
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

const AdminMeditation = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteMeditation = () => {};

  return (
    <AdminMeditationContainer>
      {showUpload ? <UploadMeditation setShow={setShowUpload} /> : null}
      {showEdit ? <EditMeditation setShow={setShowEdit} /> : null}
      <DashboardContainer>
        <p className="dashboard-title">묵상/추가/삭제 관리</p>
        <div className="admin-meditation-btn">
          <Button
            context="묵상 추가"
            color="#427D4F"
            borderColor="#427D4F"
            onClick={() => setShowUpload(true)}
            width={px2vwPc(130)}
          />
          <Button
            context="선택 삭제"
            color="#427D4F"
            borderColor="#427D4F"
            onClick={handleDeleteMeditation}
            width={px2vwPc(130)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>묵상말씀</th>
              <th>작성일자</th>
              <th>
                <input type="checkbox" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td onClick={() => setShowEdit(true)}>묵상 제목</td>
              <td>잠언 1:1</td>
              <td>2024-09-10</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </DashboardContainer>
    </AdminMeditationContainer>
  );
};

export default AdminMeditation;
