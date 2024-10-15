import styled from "styled-components";
import px2vwPc from "../../../Util/px2vwPc";
import Button from "../../../components/Button";
import { useState } from "react";
import UploadMeditation from "../Components/UploadMeditation";
import EditMeditation from "../Components/EditMeditation";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteMeditation, getMeditation } from "../../../Api/User";
import { meditation } from "../../../Type";

const AdminMeditationContainer = styled(motion.div)`
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
  const [selectedItems, setSelectedItems] = useState([]); // New state to track selected items
  const [id, setId] = useState<number>(0);

  const { data: meditationList } = useQuery({
    queryKey: ["getMeditation"],
    queryFn: () => getMeditation(),
  });

  const deleteMeditationMutation = useMutation({
    mutationKey: ["deleteMeditation"],
    mutationFn: (ids: number[]) => deleteMeditation(ids),
    onSuccess: (res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    },
  });

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(
      (prevSelectedItems: any) =>
        prevSelectedItems.includes(id)
          ? prevSelectedItems.filter((item: any) => item !== id) // 체크해제
          : [...prevSelectedItems, id] // 체크
    );
  };

  const handleDeleteMeditation = () => {
    deleteMeditationMutation.mutate(selectedItems);
  };

  return (
    <AdminMeditationContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {showUpload ? <UploadMeditation setShow={setShowUpload} /> : null}
      {showEdit ? <EditMeditation id={id} setShow={setShowEdit} /> : null}
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
            {meditationList?.data.meditationList.map(
              (value: meditation, index: number) => (
                <tr key={value.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => {
                      setShowEdit(true);
                      setId(value.id);
                    }}
                  >
                    {value.title}
                  </td>
                  <td>{value.word}</td>
                  <td>{value.createDate}</td>
                  <td>
                    <input
                      onChange={() => handleCheckboxChange(value.id)}
                      type="checkbox"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </DashboardContainer>
    </AdminMeditationContainer>
  );
};

export default AdminMeditation;
