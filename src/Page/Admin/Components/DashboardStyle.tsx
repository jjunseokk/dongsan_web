import styled from "styled-components";
import px2vwPc from "../../../Util/px2vwPc";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin-top: ${px2vwPc(10)};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: ${px2vwPc(50)};

  .dashboard-title {
    font: 500 20px "Pretendard";
    margin-bottom: ${px2vwPc(30)};
  }
`;
