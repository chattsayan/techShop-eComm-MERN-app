import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="py-3 px-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
