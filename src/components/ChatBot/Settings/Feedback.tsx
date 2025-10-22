import { useState } from "react";

export const Feedback = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setFeedback("");

    setMessage("Feedback submitted successfully!");
  };

  return (
    <div className="p-6 overflow-y-auto flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-gray-800">
        We value your feedback
      </h2>
      <p className="text-gray-600">
        Let us know what you think about <strong>BÄR BUDDY</strong>.
      </p>
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-gray-400 placeholder:select-none placeholder:text-gray-400"
        />
        <textarea
          placeholder="Your feedback"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          maxLength={500}
          rows={8}
          className="p-2 border border-gray-300 rounded focus:outline-gray-400 resize-none placeholder:select-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-emerald-500 border-2 border-emerald-400 text-white font-semibold py-2 rounded hover:bg-emerald-400 cursor-pointer"
        >
          Send
        </button>
      </form>
      {message && <p className="text-green-600 mt-2 text-center">{message}</p>}
    </div>
  );
};
