import { useWarning } from "../context/WarningContext";

const GlobalWarning = () => {
  const { warning } = useWarning();

  if (!warning) return null;

  return (
    <div
    className={`fixed left-1/2 transform -translate-x-1/2 bg-[#810707] text-white px-6 py-2 rounded-lg shadow-md z-50 
        ${warning ? "top-4" : "top-24"} transition-all duration-500 ease-in-out`}
    >
    {warning}
    </div>
  );
};

export default GlobalWarning;
