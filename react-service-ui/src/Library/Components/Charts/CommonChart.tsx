import React from "react";
import ChartLoader from "./ChartLoader";

const CommonChart: React.FC<CommonChart> = ({ type, apiUrl, title, height = "400px",width="423px" }) => {
  return (
    <div style={{ height,width }}>
      <ChartLoader type={type} apiUrl={apiUrl} title={title} height={height} width={width} />
    </div>
  );
};

export default CommonChart;
