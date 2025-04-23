import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";
import  generateUUID from "../utils/generateUUID.js";

export function useBuyList() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    const storedLists = getLocalStorage("buiesList") || [];
    const storedSelected = getLocalStorage("selectedList");
    setLists(storedLists);
    setSelectedList(storedSelected);
  }, []);

  const addList = (nameList) => {
    const newList = {
      listID: generateUUID(),
      listName: nameList,
      buyList: [],
    };

    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    setLocalStorage("buiesList", updatedLists);
  };

  const selectList = (listID) => {
    const list = lists.find((l) => l.listID === listID);
    if (list) {
      setSelectedList(list);
      setLocalStorage("selectedList", list);
    }
  };

  const addToCart = (product) => {
    if (!selectedList) return;

    const updatedLists = lists.map((list) => {
      if (list.listID === selectedList.listID) {
        const index = list.buyList.findIndex((item) => item.id === product.id);

        if (index !== -1) {
          list.buyList[index].quantidade += 1;
        } else {
          list.buyList.push({ ...product, quantidade: 1 });
        }

        setSelectedList({ ...list });
        setLocalStorage("selectedList", list);
      }

      return list;
    });

    setLists(updatedLists);
    setLocalStorage("buiesList", updatedLists);
  };

  const removeList = (listID) => {
    const updatedLists = lists.filter((list) => list.listID !== listID);
    setLists(updatedLists);
    setLocalStorage("buiesList", updatedLists);

    if (selectedList?.listID === listID) {
      setSelectedList(null);
      setLocalStorage("selectedList", null);
    }
  };

  const getCartTotal = (listID) => {
    const list = lists.find((l) => l.listID === listID);
    if (!list) return 0;

    return list.buyList.reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0
    );
  };

  return {
    lists,
    selectedList,
    addList,
    selectList,
    addToCart,
    removeList,
    getCartTotal,
  };
}
