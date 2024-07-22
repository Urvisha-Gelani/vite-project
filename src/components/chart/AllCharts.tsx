import BarChart from "../barChart/BarChart";
import DoughnutChart from "../barChart/DoughnutChart";
import LineChart from "../barChart/LineChart";
// import RadarChart from "../barChart/RadarChart";

function AllCharts() {
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap ">
      <div className="w-75 px-2 py-3 box-shadow mx-auto">
        <LineChart />
      </div>
      <div className=" px-2 py-2 box-shadow mt-3" style={{width:"45%"}}>
        <BarChart />
      </div>
      <div className="w-50 px-2 py-2 box-shadow mt-3" >
        <DoughnutChart />
      </div>
      {/* <div className="w-75 px-2 py-2 box-shadow mt-3" >
        <RadarChart />
      </div> */}
    </div>
  );
}

export default AllCharts;
