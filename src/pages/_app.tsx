import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import { trpc } from '../utils/trpc';
import type { AppProps } from "next/app";
import "../styles/globals.css"
import { AppContextProvider,  } from "@/context/AppContextProvider";
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <div className="bg-primary text-white">
        <Component {...pageProps} />;
      </div>
    </AppContextProvider>
  );
}
export default trpc.withTRPC( MyApp);
  