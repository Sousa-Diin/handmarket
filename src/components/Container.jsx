const Container = ({ children }) => {
  return (
    <div className="w-[100%] py-1 h-full flex flex-col ">
      {children}
    </div>
  );
}

export default Container;