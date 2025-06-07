// src/components/Form.jsx
import { useState } from "react";
import Notie from "../../service/notieService"; // Certifique-se de que o caminho está correto

export default function Form({ list, onSubmit, pageColor, submitText = "Salvar" }) {
  const initialFormData = list.reduce((acc, item) => {
    acc[item.id] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, id) => {
    const value = id === "description" ? e.target.value.toUpperCase() : e.target.value;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const filled = Object.values(formData).every(
      ({ value, required }) => !required || value !== ""
    );

    if (!filled) {
      Notie.warning("Preencha todos os campos obrigatórios.");
      return;
    }


    setLoading(true);
    const result = await onSubmit(formData);
    console.log('Result.: ', result);

    try {
      if (!result || result.status ==! 200) {
        throw new Error(result.message || "Erro ao salvar");
      }
      Notie.success(`${result.message}`);
      setFormData(initialFormData);
    } catch (err) {
      console.error("Erro ao enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
    style={{backgroundColor: pageColor.secondary, color: pageColor.light}}
    onSubmit={handleSubmit} className="h-[80%] flex flex-col gap-4 p-4 rounded shadow-md">
      {list.map((item) => (
        <div key={item.id} className="flex flex-col">
          <label htmlFor={item.id} className="font-semibold text-sm text-gray-700">
            {item.description}
            {item.required ? " *" : ""}
          </label>

          {item.type === "select" ? (
            <select
              id={item.id}
              value={formData[item.id]}
              onChange={(e) => handleChange(e, item.id)}
              className="border rounded px-3 py-2"
            >
              <option value="" disabled>
                {item.placeholder}
              </option>
              {item.options.map((opt, index) =>
                typeof opt === "string" ? (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ) : (
                  <option key={index} value={opt[item.key || "sector"]}>
                    {opt[item.describe || "describe"]}
                  </option>
                )
              )}
            </select>
          ) : (
            <input
              id={item.id}
              type={item.type}
              placeholder={item.placeholder}
              value={(formData[item.id])}
              onChange={(e) => handleChange(e, item.id)}
              className="border rounded px-4 py-2"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        style={{ backgroundColor: pageColor.accent, color: pageColor.light }}
        className="text-white py-2 m-2 px-4 rounded hover:opacity-90 transition-all"
      >
        {loading ? "Salvando..." : submitText}
      </button>
    </form>
  );
}


