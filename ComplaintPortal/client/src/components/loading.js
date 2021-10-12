import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = ({ size = 100 }) => {
  return (
    <div
      style={{
        display: "flex",
        justtifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box style={{ marginLeft: "auto" }} sx={{ pt: 12, pr: 50 }}>
      <CircularProgress
        style={{
          width: size,
          height: size,
          display: "flex",
        }}
        animation="border"
      />
      </Box>
    </div>
  );
};

export default Loading;
