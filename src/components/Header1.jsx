import { useState } from "react";

const Header1 = () => {
    return (
        <div className="w-screen">
        {/* Header */}
        <header className="bg-[#ffffff] shrink-0 w-screen border-t-2 border-b-2 z-10 border-[#228B22] text-black p-2 pl-21 shadow-md flex items-start gap-4">
          <img src="./jhlogo55.png" className="w-18 h-18 object-contain flex-shrink-0"></img>
          <div className="pt-1">
            <p className="text-2xl font-bold  text-[#000000]">
              Government of Jharkhand <br></br>
            </p>
            <p className="text-xl font-normal text-[#000000]">
              Grievance Portal
            </p>
          </div>
        </header>
        </div>
    )
}
export default Header1;