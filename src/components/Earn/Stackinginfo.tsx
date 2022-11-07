import { useAppContext } from "@/context/AppContextProvider"
import { AiFillBank, AiFillGift, AiFillLock, AiFillTag, AiFillUnlock, AiOutlineClose } from "react-icons/ai"

export const StackingInfo = () => {
    const { stacking, setStacking } = useAppContext()
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-secondary bg-opacity-90"
            >
                <div className="relative min-w-[70%] my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5  border-solid ">
                            <h3 className="text-3xl font-semibold">
                                Stakcing Info
                            </h3>
                            <button
                                onClick={() => {
                                    setStacking(false)
                                }}
                                className="p-1 ml-auto   float-right text-3xl leadin"
                            >
                                <AiOutlineClose size={29} />
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto  grid grid-cols-6 ">
                            <div className=" h-20 flex items-center justify-around text-xl">
                                <AiFillTag size={20} />
                                <p className="font-extrabold text-2xl">1</p>
                            </div>
                            <div className=" h-20 flex items-center justify-around text-xl">
                                <AiFillBank size={20} />
                                <p className="font-extrabold text-lg">10000</p>
                            </div>
                            <div className=" h-20 flex items-center justify-around text-xl">
                                <AiFillLock size={20} />
                                <p className="font-extrabold text-lg">12/12/2022</p>
                            </div>
                            <div className=" h-20 flex items-center justify-around text-xl">
                                <AiFillUnlock size={20} />
                                <p className="font-extrabold text-lg">12/12/2022</p>
                            </div>
                            <div className=" h-20 flex items-center justify-around text-xl">
                                <AiFillGift size={20} />
                                <p className="text-lg font-extrabold">0.000000</p>
                            </div>
                            <div className=" h-20 flex items-center justify-around text-xl">
                                <button className="text-yellowButton">LOCKED</button>
                            </div>
                        </div>
                        <div className="w-full p-8 flex justify-center space-x-12">
                            <div>
                                <p className="text-2xl font-extraBold text-yellowButton">Product(s): 12</p>
                            </div>
                            <div>
                                <p className="text-2xl font-extraBold text-yellowButton">Total Pricipal: 000 ETH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}