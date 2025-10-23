import { useUser } from "../../../context/UserProvider";

export const Profile = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto h-full">
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="w-full bg-gray-200 rounded-xl h-auto aspect-square flex items-center justify-center text-gray-500 text-lg font-semibold">
        QR Code Placeholder
      </div>

      <div className="flex gap-4">
        <button className="flex-1 px-2 py-1 font-semibold cursor-pointer border-2 border-gray-400 bg-gray-50 hover:bg-white text-gray-700">
          Download
        </button>
        <button className="flex-1 px-2 py-1 font-semibold cursor-pointer border-2 border-gray-400 bg-gray-50 hover:bg-white text-gray-700">
          Print
        </button>
      </div>
    </div>
  );
};
