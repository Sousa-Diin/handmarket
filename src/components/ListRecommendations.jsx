import { useProduct } from "../context/ProductContextProvider";

const ListRecommendations = ({ recommendations }) => {
  const { pageColor } = useProduct();
  return (
    <div style={{display:"flex", flexDirection: "row"}} className="w-full flex  overflow-x-auto">
      {recommendations.map((rec, index) => (
        <div key={index} style={{backgroundColor: pageColor.primary}} className={`min-w-[10rem] p-2 h-[15rem] flex flex-col items-center justify-between  rounded m-1`}>
          <p className="text-[1.3rem] text-justify text-xs">{rec.title}</p>
          <button style={{backgroundColor: pageColor.accent}} className={`w-15 h-[30px] rounded mt-1`}>+</button>
        </div>
      ))}
    </div>
  );
}

export default ListRecommendations;
// Compare this snippet from src/components/ListRecommendations.jsx: