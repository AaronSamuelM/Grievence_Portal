import { useState } from "react";

const Header1 = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-screen flex-1 flex flex-col fixed pl-16">
        {/* Header */}
        <header className="bg-[#22406d] text-white p-2 pl-5 shadow-md">
          <p className="text-5xl font-bold  text-[#E5E7EB]">
            Government of Jharkhand <br></br>
          </p>
          <p className="text-3xl font-normal text-[#E5E7EB]">
            Grievance Portal
          </p>
        </header>
        </div>
    )
}
export default Header1;