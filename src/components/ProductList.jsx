import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContextProvider";
import graoscereais from '../assets/png-product/graos-cereais.png'
import laticinios from '../assets/png-product/laticinios.png'
import acougue from '../assets/png-product/acougue.png'
import frios from '../assets/png-product/ffrios.png'
import higiene from '../assets/png-product/higiene.png'
import limpeza from '../assets/png-product/limpeza.png'
import produtos from '../assets/png-product/produtos.png'
import hortifruti from '../assets/png-product/hortifruti.png'
import padaria from '../assets/png-product/padaria.png'

const ProductList = () => {
  const { products, addToCart, cart, removeLocalStorage } = useContext(ProductContext);
  const listImgProduct = [{
      GraosCereais: graoscereais ,
      Acougue: acougue ,
      Frios: frios,
      Higiene: higiene,
      Limpeza: limpeza,
      Laticinios: laticinios,
      Outros: produtos,
      Hortifruti:hortifruti ,
      Padaria: padaria ,
   }]

  return (
    <div className="bg-[#303f47]  flex flex-col felx-nowrap justify-around items-center w-[100%] h-full px-2">
      <aside className="w-[100%] p-1">
        <h2 className="text-xl font-semibold  text-center mb-4">Produtos</h2>
        <p className="text-sm ">
          Clique nos produtos para adicioná-los ao carrinho.
        </p>
        <p > Total de produtos {products.length}</p> <button onClick={removeLocalStorage('products')}>Atualizar dados</button>
      </aside>

      <section style={{display: "flex", flexWrap: "wrap"}}
      className="h-[85dvh] justify-between p-1 rounded-md shadow-md overflow-x-auto gap-2">
        {products.map((product) => {
          const isSelected = cart.some((item) => item.id === product.id);
          
          return (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className={` flex-shrink-0 flex flex-col items-center justify-center gap-1 p-2 rounded  shadow-md transition-colors lg:w-23 w-28  h-29 ${
                isSelected
                  ? "bg-red-400 text-white "
                  : "bg-[#c8e9e5] text-white hover:bg-[#E59E07]"
              }`}
              style={{backgroundImage: `url(${listImgProduct[0][product.setores]})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
              <span className="text-sm font-medium text-center">
                {product.descricao}
              </span>
              <span className="text-sm text-center">{product.preco}</span>
            </button>
          );
        })}
      </section>

    </div>
  );
};

export default ProductList;

