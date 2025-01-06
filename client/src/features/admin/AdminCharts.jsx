import { BarChart, PieChart } from "@mui/x-charts";
import styles from "./AdminCharts.module.css";
import {
  useGetStatsOrderInDayQuery,
  useGetStatsOrdersByMethodQuery,
} from "../../services/orders";
import Spinner from "../../ui/Spinner";

function AdminCharts() {
  const { data: orderStatsByMethodRes, isLoading: isLoadingByMethod } =
    useGetStatsOrdersByMethodQuery();

  const { data: orderStatsInDayRes, isLoading: isLoadingInDay } =
    useGetStatsOrderInDayQuery();

  if (isLoadingByMethod || isLoadingInDay) return <Spinner />;
  const orderStatsByMethod = orderStatsByMethodRes.data;
  const initDatasetOrdersInDays = orderStatsInDayRes.data;

  const datasetOrdersInDays = [
    {
      weekday: "Pn",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 2)?.numOrderInDay || 0,
    },
    {
      weekday: "Wt",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 3)?.numOrderInDay || 0,
    },
    {
      weekday: "Śr",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 4)?.numOrderInDay || 0,
    },
    {
      weekday: "Czw",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 5)?.numOrderInDay || 0,
    },
    {
      weekday: "Pt",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 6)?.numOrderInDay || 0,
    },
    {
      weekday: "Sb",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 7)?.numOrderInDay || 0,
    },
    {
      weekday: "Nd",
      numOrderInDay:
        initDatasetOrdersInDays.find((el) => el._id === 1)?.numOrderInDay || 0,
    },
  ];

  const seriesMethod = [
    {
      data: orderStatsByMethod.map((item, i) => ({
        id: i,
        value: item.numOrderMethod,
        label: item.method,
      })),
    },
  ];

  return (
    <div>
      <div className={styles.chart}>
        <h2>Metoda zamówień (ostatnie 30 dni)</h2>
        <PieChart
          colors={["#ffc700", "#219c90", "#ee4e4e"]}
          series={seriesMethod}
          width={500}
          height={400}
        />
      </div>
      <div className={styles.chart}>
        <h2>Zamówienia/dzień tygodnia (ostatnie 30 dni)</h2>
        <BarChart
          dataset={datasetOrdersInDays}
          xAxis={[
            { scaleType: "band", dataKey: "weekday", label: "Dzień tygodnia" },
          ]}
          yAxis={[{ label: "Liczba zamówień" }]}
          series={[{ dataKey: "numOrderInDay" }]}
          grid={{ horizontal: true }}
          width={700}
          height={500}
          sx={{
            "& .MuiBarLabel-root": {
              fontSize: "30px",
            },
          }}
        />
      </div>
    </div>
  );
}

export default AdminCharts;
