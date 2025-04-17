const ListRecommendations = ({ recommendations }) => {
  return (
    <div style={{display:"flex", flexDirection: "row"}} className="w-full flex bg-[#67918f]  overflow-x-auto">
      {recommendations.map((rec, index) => (
        <div key={index}className="min-w-[5rem] p-2 h-[85%] bg-[#3b473e] flex flex-col items-center  rounded m-1">
          <p className="text-[1rem] text-justify text-xs">{rec.title}</p>
          <button className=" h-[2rem] bg-[#3b473e] rounded mt-1">+</button>
        </div>
      ))}
    </div>
  );
}

export default ListRecommendations;
// Compare this snippet from src/components/ListRecommendations.jsx: