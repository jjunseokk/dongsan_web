import styled from "styled-components";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";
import px2vwPc from "../../../Util/px2vwPc";
import Button from "../../../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserList } from "../../../Api/User";
import { getUser, updateApprove } from "../../../Type";
import { showApprove } from "../../../Api/Admin";

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
            width: ${px2vwPc(300)};
            padding-left: ${px2vwPc(10)};
          }
          &:nth-of-type(3) {
            width: ${px2vwPc(300)};
            padding-left: ${px2vwPc(10)};
          }
          &:nth-of-type(4) {
            width: ${px2vwPc(300)};
          }
          &:nth-of-type(5),
          &:nth-of-type(6),
          &:nth-of-type(7) {
            width: ${px2vwPc(300)};
          }
        }
      }
    }
    tbody {
      tr {
        td {
          font: 400 14px "Pretendard";
          &:nth-of-type(3) {
            padding-left: ${px2vwPc(10)};
            cursor: pointer;
          }
          &:nth-of-type(7) {
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
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getUserList(),
  });

  const approveMutation = useMutation({
    mutationKey: ["approve"],
    mutationFn: (data: updateApprove) => showApprove(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    },
  });

  const handleApprove = (value: boolean, id: number) => {
    approveMutation.mutate({ id: id, approve: value });
  };
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
              <th>아이디</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>가입일자</th>
              <th>승인상태</th>
              <th>승인</th>
            </tr>
          </thead>
          <tbody>
            {userList?.data.profile.map((value: getUser, index: number) => {
              return (
                <tr key={value.id}>
                  <td>{index + 1}</td>
                  <td>{value.userId}</td>
                  <td>{value.name}</td>
                  <td>{value.phoneNumber}</td>
                  <td>{value.createDate}</td>
                  <td className={value.userApprove === false ? "active" : ""}>
                    {value.userApprove === false ? "미승인" : "승인"}
                  </td>
                  <td>
                    {value.userApprove === false ? (
                      <>
                        <Button
                          context="승인"
                          color="#427d4f"
                          borderColor="#427d4f"
                          onClick={() => handleApprove(true, value.id)}
                          width={px2vwPc(90)}
                        />
                        <Button
                          context="거절"
                          color="#FF1919"
                          borderColor="#FF1919"
                          onClick={() => handleApprove(false, value.id)}
                          width={px2vwPc(90)}
                        />
                      </>
                    ) : (
                      <Button
                        context="승인 취소"
                        color="#002fff"
                        borderColor="#002fff"
                        onClick={() => handleApprove(false, value.id)}
                        width={px2vwPc(180)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DashboardContainer>
    </AdminUserApproveContainer>
  );
};

export default AdminUserApprove;
