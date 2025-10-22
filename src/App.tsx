import { ChatWidget } from "./components/ChatBot/ChatWidget";

function App() {
  return (
    <div className="bg-white min-h-screen">
      <div className="min-h-screen w-full bg-[url('./assets/example_site.png')] bg-no-repeat bg-center bg-cover"></div>
      <ChatWidget />
    </div>
  );
}

export default App;
