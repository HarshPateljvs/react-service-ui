// src/Library/Components/Common/RouteLoader.tsx
import LinearProgress from "@mui/material/LinearProgress";

const RouteLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <LinearProgress color="primary" />
    </div>
  );
};

export default RouteLoader;
