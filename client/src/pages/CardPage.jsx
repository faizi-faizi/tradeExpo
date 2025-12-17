import { useParams } from "react-router-dom";

export default function CardPage() {
  const { id } = useParams();

  const imageUrl = `${import.meta.env.VITE_BASE_URL}/api/card/image/${id}`;

  const downloadImage = async () => {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "card.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <button
        onClick={downloadImage}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800"
      >
        Download Card
      </button>

      <img
        src={imageUrl}
        alt="Card"
        className="w-[280px] sm:w-[360px] md:w-[420px] shadow-xl rounded"
      />
    </div>
  );
}