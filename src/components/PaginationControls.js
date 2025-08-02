import React from "react";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PaginationControls = ({ page, setPage, totalPages }) => {
  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationControls;