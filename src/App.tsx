import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { BearBuddy } from "./pages/BearBuddy";
import { QrCode } from "./pages/QrCode";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<BearBuddy />} />
        <Route path="qrcode" element={<QrCode />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
