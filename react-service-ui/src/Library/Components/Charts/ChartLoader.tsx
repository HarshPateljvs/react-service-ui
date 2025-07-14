import ReactECharts from "echarts-for-react";
import { AVTUseEffect, AVTUseState } from "../../../Library/customHooks";
import removeNulls, { API } from "../../../Library/services/API/api";
import type { EChartsOption } from "echarts";
import { Box, Skeleton, Typography } from "@mui/material";

const ChartLoader = ({ type, apiUrl, title, height, width }: CommonChart) => {
  const [option, setOption] = AVTUseState<EChartsOption | null>(
    "common_chart_loader_option",
    null
  );
  const [loading, setLoading] = AVTUseState<boolean>(
    "common_chart_loader_loading",
    true
  );

  const staticOption = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)",
          position: "inside",
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  const loadData = async () => {
    setLoading(true);
    try {
      const filter: FilterDto = {
        PageNo: 1,
        PageSize: 100,
        Predicates: {},
        SearchText: "",
        SortModels: [],
      };
      const result = await API.POST<EChartsOption>(apiUrl, filter);
      setOption(result);
      const cleanResult = removeNulls<EChartsOption>(result); // Type-safe here
      console.log(result);
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
    [apiUrl, type]
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

  return <ReactECharts option={option} style={{ height, width }} />;
};

export default ChartLoader;
