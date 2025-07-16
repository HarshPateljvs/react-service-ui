import { Box, Typography } from "@mui/material";
import CommonChart from "../../../Library/Components/Charts/CommonChart";
import { AVTUseState } from "../../../Library/customHooks";
import { ChartAPI } from "../../../URLS/Masters";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Home = () => {
  const [fromDate, setFromDate] = AVTUseState<Date | null>(
    "Teacher panel from date",
    new Date()
  );
  const [toDate, setToDate] = AVTUseState<Date | null>(
    "Teacher panel To date",
    new Date()
  );

  const filter: FilterDto = {
    PageNo: 1,
    PageSize: 100,
    SearchText: "",
    SortModels: [],
    Predicates: {
      ...(fromDate ? { FromDate: fromDate.toString() } : {}),
      ...(toDate ? { ToDate: toDate.toString() } : {}),
    },
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" gap={2} p={2} alignItems="center">
          <Typography fontWeight={600}>Filter</Typography>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
          />
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
          />
        </Box>
      </LocalizationProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
  <div style={{ height: 400 }}>
    <CommonChart type="line" apiUrl={ChartAPI.LINE_CHART} filter={filter} />
  </div>
  <div style={{ height: 400 }}>
    <CommonChart type="bar" apiUrl={ChartAPI.BAR_CHART} />
  </div>
  <div style={{ height: 400 }}>
    <CommonChart type="doughnut" apiUrl={ChartAPI.DONUT_CHART}  />
  </div>
  <div style={{ height: 400 }}>
    <CommonChart type="pie" apiUrl={ChartAPI.PIE_CHART}  />
  </div>
  <div style={{ height: 400 }}>
    <CommonChart type="stackedbar" apiUrl={ChartAPI.STACKEDBAR_CHART} />
  </div>
</div>

    </>
  );
};
export default Home;
