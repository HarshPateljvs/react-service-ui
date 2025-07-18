import { Box, Grid } from "@mui/material";

const ImageUploadGrid = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 8 }}>
            <Box>12</Box>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
            <Box>12</Box>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
            <Box>12</Box>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
            <Box>12</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageUploadGrid;
