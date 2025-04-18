import { Pagination, PaginationItem, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: "4px",
    margin: "0 2px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "& .MuiPaginationItem-previousNext": {
    fontWeight: "bold",
  },
}));

export default function RoundedPagination({
  count,
  page,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
}) {
  return (
    <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
      <StyledPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: () => <span>Previous</span>,
              next: () => <span>Next</span>,
            }}
          />
        )}
      />
    </Stack>
  );
}
