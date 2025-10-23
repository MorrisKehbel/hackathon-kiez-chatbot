import { useUser } from "../../../context/UserProvider";
import QrCode from "../../../assets/qrcode.png";

export const Profile = () => {
  const { user } = useUser();

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto h-full">
      <div className="bg-white p-4 border border-gray-300 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="w-full bg-gray-200 h-auto aspect-square flex items-center justify-center">
        <img src={QrCode} className="h-full w-full mx-auto" alt="qr code" />
      </div>

      <div className="flex gap-4">
        <button className="flex-1 px-2 py-1 font-semibold cursor-pointer border-2 border-gray-600 bg-white hover:bg-gray-50 text-gray-700">
          Download
        </button>
        <button className="flex-1 px-2 py-1 font-semibold cursor-pointer border-2 border-gray-600 bg-white hover:bg-gray-50 text-gray-700">
          Print
        </button>
      </div>
    </div>
  );
};
