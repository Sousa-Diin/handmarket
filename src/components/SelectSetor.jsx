import { useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import Product from "./Product";

const SelectSetor = () => {
  const { products, setor, listImgProduct } = useProduct();
  const [expandedSector, setExpandedSector] = useState(null);

  const toggleSector = (sector) => {
    setExpandedSector(prev => prev === sector ? null : sector);
  };

  return (
    <div className="flex w-full p-1 flex-col items-start gap-1 text-[#c8e9e5] rounded">
      {setor.map((item) => {
        const isExpanded = expandedSector === item.sector;

        return (
          <div key={item.sector} className="w-full">
            <button
              onClick={() => toggleSector(item.sector)}
              className={`flex items-center gap-2 p-2 rounded-md shadow transition-colors w-full text-left ${
                isExpanded
                  ? "bg-[#303f47] text-white"
                  : "bg-[#c8e9e5] text-black hover:bg-[#303f47] hover:text-white"
              }`}
            >
              <span className="text-[1.2rem]">{item.describe}</span>
            </button>

            {isExpanded && (
              <div className=" pt-2">
                <Product
                  products={products}
                  img={listImgProduct}
                  selectedSector={item.sector}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SelectSetor;
