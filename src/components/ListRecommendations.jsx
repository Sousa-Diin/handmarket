const ListRecommendations = ({ recommendations }) => {
  return (
    <div style={{display:"flex", flexDirection: "row"}} className="w-full flex  overflow-x-auto">
      {recommendations.map((rec, index) => (
        <div key={index}className="min-w-[10rem] p-2 h-[10rem] bg-[#72b8ad] flex flex-col items-center justify-between  rounded m-1">
          <p className="text-[1rem] text-justify text-xs">{rec.title}</p>
          <button className="w-15 h-[30px] bg-[#eb6d73] rounded mt-1">+</button>
        </div>
      ))}
    </div>
  );
}

export default ListRecommendations;
// Compare this snippet from src/components/ListRecommendations.jsx: