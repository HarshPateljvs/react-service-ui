import CommonChart from "../../../Library/Components/Charts/CommonChart";
import { ChartAPI } from "../../../URLS/Masters";

const TeacherPanel = () => {
  return (
    <>
      <div className="flex space-x-6 p-4">
        <CommonChart type="line" apiUrl={ChartAPI.LINE_CHART} />
        <CommonChart type="bar" apiUrl={ChartAPI.BAR_CHART} />
        <CommonChart type="doughnut" apiUrl={ChartAPI.DONUT_CHART} />

      </div>
    </>
  );
};
export default TeacherPanel;
