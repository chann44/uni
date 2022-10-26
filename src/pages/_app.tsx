import "../styles/globals.css";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import type { AppProps } from "next/app";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-primary text-white">
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
