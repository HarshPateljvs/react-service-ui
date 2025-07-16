import ReactECharts from "echarts-for-react";
import { AVTUseEffect, AVTUseState } from "../../../Library/customHooks";
import removeNulls, { API } from "../../../Library/services/API/api";
import type { ECElementEvent, EChartsOption } from "echarts";
import { Box, Skeleton, Typography } from "@mui/material";
import { ToastService } from "../../services/toastService";

const ChartLoader = ({
  type,
  apiUrl,
  title,
  filter,
  height,
  width,
}: CommonChart) => {
  const [option, setOption] = AVTUseState<EChartsOption | null>(
    "common_chart_loader_option",
    null
  );
  const [loading, setLoading] = AVTUseState<boolean>(
    "common_chart_loader_loading",
    true
  );
  const handleChartClick = (params: ECElementEvent) => {
    console.log("Clicked Data:", params);
    // 👉 Call your "secrifice" event here
    ToastService.SUCCES(`You clicked on ${params.name} with value ${params.value}`);
  };
  const onEvents = {
  click: handleChartClick
};
  const loadData = async () => {
    setLoading(true);
    try {
      const filterlocal: FilterDto = {
        PageNo: 1,
        PageSize: 100,
        Predicates: {},
        SearchText: "",
        SortModels: [],
      };
      const result = await API.POST<EChartsOption>(
        apiUrl,
        filter ?? filterlocal
      );
      const cleanResult = removeNulls<EChartsOption>(result); // Type-safe here
      setOption(cleanResult);
    } catch (error) {
      console.error("Chart API error", error);
    } finally {
      setLoading(false);
    }
  };

  AVTUseEffect(
    "common_chart_loader_api",
    () => {
      loadData();
    },
    [apiUrl, type, filter?.Predicates]
  );

  if (loading) {
    return (
      <Box
        height={height}
        width={width}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ bgcolor: "#f5f5f5", borderRadius: 2, p: 2 }}
      >
        <Skeleton variant="text" width="60%" height={30} animation="wave" />
        <Skeleton
          variant="rectangular"
          width="90%"
          height="80%"
          animation="wave"
          sx={{ my: 2 }}
        />
      </Box>
    );
  }

  if (!option) {
    return (
      <Box
        height={height}
        width={width}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body2" color="text.secondary">
          No Data Found for {type} chart
        </Typography>
      </Box>
    );
  }

  return <ReactECharts option={option} style={{ height, width }}  onEvents={onEvents}/>;
};

export default ChartLoader;
