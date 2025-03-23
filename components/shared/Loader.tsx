import { RiLoaderLine } from "react-icons/ri";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-96">
      <RiLoaderLine className="animate-spin text-xl text-zinc-400" />
    </div>
  );
}
