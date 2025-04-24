import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";
import  generateUUID from "../utils/generateUUID.js";
import Notie from "../service/notieService.js";

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

  const decrementCart = (product) => {
    if (!selectedList) return;
  
    const updatedLists = lists.map((list) => {
      if (list.listID === selectedList.listID) {
        const index = list.buyList.findIndex((item) => item.id === product.id);
  
        if (index !== -1) {
          list.buyList[index].quantidade -= 1;
  
          if (list.buyList[index].quantidade <= 0) {
            list.buyList.splice(index, 1); // remove do array
          }
  
          setSelectedList({ ...list });
          setLocalStorage("selectedList", list);
        }
      }
  
      return list;
    });
  
    setLists(updatedLists);
    setLocalStorage("buiesList", updatedLists);
  };  

  const removeList = (listID) => {
    const listToRemove = lists.find((list) => list.listID === listID);
    if (!listToRemove) return;
  
    const proceedWithRemoval = () => {
      const updatedLists = lists.filter((list) => list.listID !== listID);
  
      // Atualiza as listas no estado e localStorage
      setLists(updatedLists);
      setLocalStorage("buiesList", updatedLists);
  
      // Se a lista removida for a selecionada, zera tudo
      if (selectedList?.listID === listID) {
        const newSelected = updatedLists.length > 0 ? updatedLists[0] : null;
        setSelectedList(newSelected);
        setLocalStorage("selectedList", newSelected);
      }
  
      Notie.success("Lista removida com sucesso!");
      window.location.reload(); // Atualiza a página para refletir as mudanças
    };
  
    if (listToRemove.buyList.length > 0) {
      Notie.confirm(
        "Essa lista contém produtos. Deseja realmente excluir?",
        proceedWithRemoval,
        () => {
          Notie.info("Ação cancelada.");
        }
      );
    } else {
      proceedWithRemoval();
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
    decrementCart,
    removeList,
    getCartTotal,
  };
}
