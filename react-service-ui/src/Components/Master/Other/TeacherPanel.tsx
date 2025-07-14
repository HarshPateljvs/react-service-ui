import CommonChart from "../../../Library/Components/Charts/CommonChart";
import { ChartAPI } from "../../../URLS/Masters";

const TeacherPanel = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-3">
        <CommonChart type="line" apiUrl={ChartAPI.LINE_CHART} />
        <CommonChart type="bar" apiUrl={ChartAPI.BAR_CHART} />
        <CommonChart type="doughnut" apiUrl={ChartAPI.DONUT_CHART} />
        <CommonChart type="pie" apiUrl={ChartAPI.PIE_CHART} />
      </div>
    </>
  );
};
export default TeacherPanel;
