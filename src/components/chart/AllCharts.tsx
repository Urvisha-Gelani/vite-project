import BarChart from "../barChart/BarChart";
import DoughnutChart from "../barChart/DoughnutChart";
import LineChart from "../barChart/LineChart";

function AllCharts() {
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      <div className="w-100 px-2 py-3">
        <LineChart />
      </div>
      <div className="w-50 px-2 py-2">
        <BarChart />
      </div>
      <div className="w-50 px-2 py-2">
        <DoughnutChart />
      </div>
    </div>
  );
}

export default AllCharts;
