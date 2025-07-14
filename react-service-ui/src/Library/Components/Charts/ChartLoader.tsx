import ReactECharts from "echarts-for-react";
import { AVTUseEffect, AVTUseState } from "../../../Library/customHooks";
import { API } from "../../../Library/services/API/api";
import type { EChartsOption } from "echarts";

const ChartLoader = ({ type, apiUrl, title, height, width }: CommonChart) => {
  const [option, setOption] = AVTUseState<EChartsOption | null>(
    "common_chart_loader_option",
    null
  );
  const [loading, setLoading] = AVTUseState<boolean>(
    "common_chart_loader_loading",
    true
  );

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
      console.log(result);
      setOption(result);
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
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width,
        }}
      >
        {title} Loading {type} chart...
      </div>
    );
  }

  if (!option) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width
        }}
      >
        No Data Found for {type} chart
      </div>
    );
  }

  return <ReactECharts option={option} style={{ height, width }} />;
};

export default ChartLoader;
