import Loader from "@/lib/components/loader/Loader";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader />
    </div>
  );
}
