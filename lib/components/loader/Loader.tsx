interface PropsType {
  height?: number;
  width?: number;
}

const Loader = ({ height = 40, width = 40 }: PropsType) => {
  return (
    <div className="flex h-auto items-center justify-center bg-transparent">
      <div
        style={{ height, width }}
        className="animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
      ></div>
    </div>
  );
};

export default Loader;
