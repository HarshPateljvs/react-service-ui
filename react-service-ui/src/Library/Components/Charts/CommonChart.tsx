import React from "react";
import ChartLoader from "./ChartLoader";

const CommonChartComponent: React.FC<CommonChart> = ({
  type,
  apiUrl,
  title,
  filter,
  height = "100%",
  width = "100%",
}) => {
  return (
    <div style={{ height, width }}>
      <ChartLoader
        type={type}
        apiUrl={apiUrl}
        title={title}
        filter={filter}
        height={height}
        width={width}
      />
    </div>
  );
};

export default React.memo(CommonChartComponent);
