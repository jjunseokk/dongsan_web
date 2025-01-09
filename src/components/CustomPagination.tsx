import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import React, { Dispatch, SetStateAction } from "react";
import px2vwPc from "../Util/px2vwPc";

interface paginationType {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  totalPage: number;
}

interface paginationStyleType {
  $display: boolean;
}

const PaginationContainer = styled.div<paginationStyleType>`
  display: ${({ $display }) => ($display ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  margin-top: ${px2vwPc(50)};
`;

const CustomPagination = ({ page, setPage, totalPage }: paginationType) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <PaginationContainer $display={totalPage === 0}>
      <Pagination
        page={page}
        onChange={handleChange}
        count={totalPage ? totalPage : 1}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#427d4f", // 페이지 번호 색상
            "&.Mui-selected": {
              backgroundColor: "#427d4f", // 선택된 페이지 배경 색상
              color: "#FFFFFF", // 선택된 페이지 텍스트 색상
            },
          },
        }}
      />
    </PaginationContainer>
  );
};

export default CustomPagination;
