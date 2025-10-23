import { useState } from "react";
import { useUser } from "../../../context/UserProvider";

type SignUpProps = {
  setActiveView: React.Dispatch<
    React.SetStateAction<
      "chat" | "signup" | "profile" | "about" | "feedback" | "map"
    >
  >;
};

export const SignUp = ({ setActiveView }: SignUpProps) => {
  const { login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    login({ name, email });

    setMessage("Account created successfully!");
    setName("");
    setEmail("");
    setPassword("");
    setActiveView("chat");
  };

  return (
    <div className="p-6 overflow-y-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
      <p className="text-gray-600">
        Get started with <strong>BÄR BUDDY</strong>.
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-gray-400 placeholder:select-none placeholder:text-gray-500"
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-gray-400 placeholder:select-none placeholder:text-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-gray-400 placeholder:select-none placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="bg-white border-2 border-gray-600 hover:bg-gray-50 font-semibold py-2 cursor-pointer"
        >
          Register
        </button>
      </form>
      {message && <p className="text-green-600 mt-2 text-center">{message}</p>}
    </div>
  );
};
