import styled from "styled-components";
import { DashboardContainer } from "../Components/DashboardStyle";
import { motion } from "framer-motion";

const AdminUserDetailContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
`;
const AdminUserDetail = () => {
  return (
    <AdminUserDetailContainer
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <DashboardContainer>
        <p className="dashboard-title">성도 상세 정보</p>
      </DashboardContainer>
    </AdminUserDetailContainer>
  );
};

export default AdminUserDetail;
