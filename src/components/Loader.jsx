const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 border-4
                     border-green-200
                     border-t-green-700
                     rounded-full animate-spin"
        />

        <p className="text-sm opacity-60">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
