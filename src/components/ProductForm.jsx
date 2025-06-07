// src/pages/ProductForm.jsx
import Form from "../components/forms/Form";
import { useProduct } from "../context/ProductContextProvider"; // seu hook personalizado
import { createProduct } from "../service/productsService"; // serviço para criar produto


export default function ProductForm() {
  const { setor, products, setProducts, pageColor } = useProduct();

  const formList = [
    { id: "cod", required:false, description: "Código (opcional)", placeholder: "Digite o código item/nota", type: "number" },
    { id: "description", required:true, description: "Nome do Produto", placeholder: "Digite o nome", type: "text" },
    { id: "un", required:true, description: "Unidade", placeholder: "Selecione a unidade", type: "select", options: ["UN", "KG"] },
    { id: "price", required:true, description: "Preço", placeholder: "0.00", type: "number" },
    {
      id: "sector", 
      required:true,
      description: "Setor",
      placeholder: "Selecione o setor",
      type: "select",
      options: setor,
      key: "sector", // chave usada para o value
      describe: "describe", // campo usado para exibir
    },
  ];

    const handleCreateProduct = async (formData) => {
      const generatedCod = formData.cod === "" 
      ? "111" + (products.length+2) // Gera um código padrão se não for fornecido
      : formData.cod;

    const fullProduct = {
      ...formData,
      cod: generatedCod,
      description: formData.description.toUpperCase(),
      descriptionNfce: formData.description.toUpperCase(),
      count: 1,
      price: parseFloat(formData.price),
    };
    localStorage.removeItem("products");
    return await createProduct(fullProduct);
  };

  return (
    <div 
    style={{
      backgroundColor: pageColor.secondary,
      color: pageColor.light,
    }}
    className="max-w-md p-5 shadow rounded">
      <p className="text-xl font-bold text-gray-800">Cadastrar Produto</p>
      <Form
        list={formList}
        onSubmit={handleCreateProduct}
        pageColor={pageColor}
        submitText="Cadastrar Produto"
      />
    </div>
  );
}

