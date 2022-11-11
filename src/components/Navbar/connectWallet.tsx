import { useAppContext } from "@/context/AppContextProvider";
import { useEffect, useState } from "react";

export const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { setAddress, address } = useAppContext()
  const [haveMetamask, sethaveMetamask] = useState(true);
  const connectWallet = async () => {
    const { ethereum } = window as any;
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {

  });

  return (
    <button
      onClick={() => {
        connectWallet();
      }}
      className="connectWallet text-text px-6 py-1"
    >
      {haveMetamask
        ? isConnected
          ? address.slice(0, 8) + "..."
          : "connect wallet"
        : "install metamask"}
    </button>
  );
};
