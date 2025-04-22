/* 
import { useProduct } from "../context/ProductContextProvider";
import Product from "./Product";

const SelectSetor = ({selectedSector, setSelectedSector, page, setPage}) => {
  const { products, setor, listImgProduct } = useProduct();
  return(
      <div className="flex w-full p-1 flex flex-col items-start gap-1 text-[#c8e9e5] rounded">      
        {setor.map((item) => {
          return (            
            <button
              key={item.setor}
              onClick={() => {
                setSelectedSector(item.setor);
                setPage(!page);
              }}
              className={`flex items-center gap-2 p-2 rounded-md shadow transition-colors w-full text-left ${
                selectedSector === item.setor
                  ? "bg-[#303f47] text-white"
                  : "bg-[#c8e9e5] text-black hover:bg-[#303f47] hover:text-white"
              }`}
            >
              <span className="text-sm font-medium">{item.describe}</span>
            </button>
           
          );
        })}
        {(true ? (
          <Product products={products} img={listImgProduct} selectedSetor={selectedSector} setor={setor} setPage={setPage}/>
          ) : null)}
      </div>
  );
}

export default SelectSetor; */

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
        const isExpanded = expandedSector === item.setor;

        return (
          <div key={item.setor} className="w-full">
            <button
              onClick={() => toggleSector(item.setor)}
              className={`flex items-center gap-2 p-2 rounded-md shadow transition-colors w-full text-left ${
                isExpanded
                  ? "bg-[#303f47] text-white"
                  : "bg-[#c8e9e5] text-black hover:bg-[#303f47] hover:text-white"
              }`}
            >
              <span className="text-sm font-medium">{item.describe}</span>
            </button>

            {isExpanded && (
              <div className="pl-4 pt-2">
                <Product
                  products={products}
                  img={listImgProduct}
                  selectedSector={item.setor}
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
