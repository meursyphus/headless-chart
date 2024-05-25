import { LineChart } from "@meursyphus/headless-chart";

export default LineChart({
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        legend: "My First dataset",
        values: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  },
});
