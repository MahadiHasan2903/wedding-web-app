interface PropsType {
  height?: number;
  width?: number;
}

const Loader = ({ height = 16, width = 16 }: PropsType) => {
  return (
    <div className="flex h-auto items-center justify-center bg-transparent">
      <div
        className={`h-${height} w-${width} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
