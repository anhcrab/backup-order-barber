import { createContext, useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import OrderPage from "./pages/OrderPage";
import ServicesPage from "./pages/ServicesPage";
import TechnicianPage from "./pages/TechnicianPage";
import BranchPage from "./pages/BranchPage";
import BranchService from "./pages/BranchService";

export const context = createContext();
function App() {
  const [page, setPage] = useState("Order");
  console.log(window.location.protocol);
  const renderPage = () => {
    if (page === "Order") {
      return <OrderPage />;
    }
    if (page === "Services") {
      return <ServicesPage />;
    }
    if (page === "Technician") {
      return <TechnicianPage />;
    }
    if (page === "Branch") {
      return <BranchPage />;
    }
    if (page === "Branch-Service"){
      return <BranchService/>
    }
  };

  return (
    <context.Provider value={{ page, setPage }}>
      <h1 className="wp-heading-inline">Order Form Plugin</h1>
      <NavigationBar />
      {renderPage()}
    </context.Provider>
  );
}

export default App;