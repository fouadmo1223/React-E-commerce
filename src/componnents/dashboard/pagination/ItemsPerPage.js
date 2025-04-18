import { Box, InputLabel, MenuItem, Select } from "@mui/material";
export default function ItemsPerPage({
  itemsPerPage,
  setItemsPerPage,
  setPage,
}) {
  const handleChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setPage(0); // Reset to first page when changing items per page
  };
  return (
    <Box style={{ marginBottom: "35px" }} sx={{ minWidth: 150 }}>
      <InputLabel id="items-per-page-label">Items per Page</InputLabel>
      <Select
        labelId="items-per-page-label"
        id="items-per-page-select"
        value={itemsPerPage}
        label="Items per Page"
        onChange={handleChange}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </Box>
  );
}
