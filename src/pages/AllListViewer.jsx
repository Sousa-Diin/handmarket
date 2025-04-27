import React, { useEffect, useState } from "react";
import { useBuyList } from "../hooks/useBuyList";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa"; // Importando ícones

const STORAGE_KEY = "checkedItemsByList";

const AllListsViewer = () => {
  const { lists } = useBuyList();
  const [activeListID, setActiveListID] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  // Carrega os itens marcados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Atualiza o localStorage sempre que checkedItems mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleSelectList = (listID) => {
    setActiveListID((prevID) => (prevID === listID ? null : listID));
  };

  const toggleItem = (listID, itemID) => {
    setCheckedItems((prev) => {
      const currentChecked = prev[listID] || [];
      const isChecked = currentChecked.includes(itemID);

      const updated = isChecked
        ? currentChecked.filter((id) => id !== itemID)
        : [...currentChecked, itemID];

      return { ...prev, [listID]: updated };
    });
  };

  const toggleAllItems = (listID, items, shouldCheckAll) => {
    setCheckedItems((prev) => ({
      ...prev,
      [listID]: shouldCheckAll ? items.map((item) => item.id) : [],
    }));
  };

  const calculateTotals = (list) => {
    let totalValue = 0;
    let totalQuantity = 0;

    list.buyList.forEach((item) => {
      totalValue += item.preco * item.quantidade;
      totalQuantity += item.quantidade;
    });

    return { totalValue, totalQuantity };
  };

  const calculateRemaining = (list) => {
    const checked = checkedItems[list.listID] || [];
    return list.buyList.reduce((remaining, item) => {
      if (!checked.includes(item.id)) {
        return remaining + item.preco * item.quantidade;
      }
      return remaining;
    }, 0);
  };

  return (
    <div className="flex flex-col gap-4 w-full p-1">
      <h2 className="text-xl font-bold mb-4">Minhas Listas de Compras</h2>

      {lists.map((list) => {
        const { totalValue, totalQuantity } = calculateTotals(list);
        const remainingValue = calculateRemaining(list);
        const checkedCount = checkedItems[list.listID]?.length || 0;
        const allChecked = checkedCount === list.buyList.length && list.buyList.length > 0;

        return (
          <div key={list.listID} className="border rounded-lg shadow-sm p-4 bg-white">
            <aside>
              <button
                onClick={() => handleSelectList(list.listID)}
                className="w-full text-left text-lg font-semibold text-[#15696F] hover:underline"
              >
                {list.listName}
              </button>
            </aside>

            {activeListID === list.listID && (
              <div className="flex flex-col mt-3 space-y-2">
                <aside style={{display: "flex", flexDirection: "row"}} className="flex flex-row justify-between">
                  <div className="w-[70%] flex flex-col gap-1">
                    <p className="text-sm text-gray-600">
                      Quantidade total: <strong>{totalQuantity}</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Valor total: <strong>R$ {totalValue.toFixed(2)}</strong>
                    </p>
                    <p className="text-sm text-[#15696F]">
                      Restante: <strong>R$ {remainingValue.toFixed(2)}</strong>
                    </p>
                  </div>

                  <div className="w-[25%] flex h-5 gap-3 justify-end space-x-2 text-sm text-gray-500">
                    <label>Selecionar todos</label>
                    <button
                      onClick={() => toggleAllItems(list.listID, list.buyList, !allChecked)}
                      className="flex items-center justify-center p-2 border rounded-md text-[#15696F] hover:text-white hover:bg-[#15696F] transition-colors"
                    >
                      {allChecked ? <FaCheckSquare /> : <FaRegCheckSquare />}
                    </button>
                  </div>
                </aside>

                {list.buyList.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhum produto nesta lista.</p>
                ) : (
                  <div className="flex flex-col mt-2 space-y-1">
                    {list.buyList.map((item) => {
                      const isChecked = checkedItems[list.listID]?.includes(item.id);

                      return (
                        <div
                          key={item.id}
                          className={`flex w-full items-center justify-between px-2 py-1 border-b text-shadow-md transition-colors ${
                            isChecked ? "bg-green-100 line-through" : ""
                          }`}
                        >
                          <label className="flex items-center gap-2 w-[80%] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItem(list.listID, item.id)}
                            />
                            <span className="ml-2 text-gray-800">{item.descricao}</span>
                          </label>
                          <span className="w-[5%] text-gray-600 font-semibold">
                            x{item.quantidade}
                          </span>
                          <span className="w-[6%] text-gray-500 text-xs ml-4">
                            R$ {(item.preco * item.quantidade).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllListsViewer;

