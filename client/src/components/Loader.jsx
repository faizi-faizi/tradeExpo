import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-index: 9999">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
}