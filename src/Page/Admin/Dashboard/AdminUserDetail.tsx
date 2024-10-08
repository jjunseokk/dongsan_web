import styled from "styled-components";
import { DashboardContainer } from "../Components/DashboardStyle";

const AdminUserDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const AdminUserDetail = () => {
  return (
    <AdminUserDetailContainer>
      <DashboardContainer>
        <p className="dashboard-title">성도 상세 정보</p>
      </DashboardContainer>
    </AdminUserDetailContainer>
  );
};

export default AdminUserDetail;
