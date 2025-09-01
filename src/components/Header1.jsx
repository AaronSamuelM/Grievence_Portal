import { useState } from "react";

const Header1 = () => {
    return (
        <div className="w-full">
        {/* Header */}
        <header className="bg-[#ffffff] shrink-0 w-full border-t-2 border-b-2 z-10 border-[#228B22] text-black p-2 pl-4 md:pl-10 lg:pl-18 shadow-md flex items-start gap-4">
          <img src="./jhlogo55.png" className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain justify-center flex-shrink-0"></img>
          <div className="pt-1">
            <p className="text-lg md:text-xl lg:text-2xl font-bold  text-[#000000]">
              Government of Jharkhand <br></br>
            </p>
            <p className="text-sm md:text-lg lg:text-xl  font-normal text-[#000000]">
              Grievance Portal
            </p>
          </div>
        </header>
        </div>
    )
}
export default Header1;