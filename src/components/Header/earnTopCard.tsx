export const EarnTopCard = () => {
  return (
    <div className="hidden  col-start-1 col-span-6 sm:flex flex-col items-center sm:col-start-4 sm:col-span-3 space-y-4">
      <h1 className="text-center lg:text-right w-full  py-2 font-extrabold lg:px-8 lg:py-3 text-lg sm:text-xl lg:text-2xl">
        Earn
      </h1>
      <div className="flex flex-col items-center  w-full  max-w-[240px] ">
        <div className="grid grid-cols-6 items-center w-full space-y-4">
          <div className="col-start-1 col-end-7 flex flex-col items-center">
            <img src="/eu.png" className="w-16  " alt="" />
            <p className="text-sm text-text">Earn With ETH</p>
          </div>
          <div className="col-start-1 col-span-6 grid grid-cols-6 items-center ">
            <div className="col-start-1 col-span-6 bg-white rounded-full flex items-center px-3 space-x-1 ">
              <div className="w-4 ">
                <img className="object-cover" src="/eth.png" alt="" />
              </div>
              <input
                placeholder="0.0"
                type="text"
                className="w-full text-black py-1 border-none focus:outline-none focus:border-none rounded-full  placeholder:text-gray-800 "
              />
            </div>
          </div>
          <div className="col-start-1 col-span-6">
            <div className="w-full text-center p-1 bg-transparent border rounded-full">
              <select className="rounded-full bg-transparent text-center w-[80%]  ">
                <option className="w-full text-center " value="uAzuki">
                  1 week
                </option>
              </select>
            </div>
          </div>
          <div className="col-start-1  col-span-6">
            <div className="flex justify-between">
              <p className="text-sm">Estimated APY:</p>
              <p className="text-sm">0.003%</p>
            </div>
            <div className="flex  justify-between">
              <p className="text-sm">Unlock Date: </p>
              <p className="text-sm">10/26/2022</p>
            </div>
          </div>
          <button className="col-start-1 col-end-7 text-lg  sm:text-2xl text-[#B78E3E] ">
            STAKE
          </button>
        </div>
      </div>
    </div>
  );
};
