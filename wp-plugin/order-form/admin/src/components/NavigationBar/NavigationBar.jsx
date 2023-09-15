import { useContext } from "react";
import "./NavigationBar.scss";
import { context } from "../../App";

export default function NavigationBar() {
  const { page, setPage } = useContext(context);

  return (
    <div className="navContainer" >
      <button
        className="navButton"
        onClick={() => {
          setPage("Order");
        }}
      >
        Order
      </button>
      <button
        className="navButton"
        onClick={() => {
          setPage("Branch");
        }}
      >
        Branch
      </button>
      <button
        className="navButton"
        onClick={() => {
          setPage("Services");
        }}
      >
        Services
      </button>
      <button
        className="navButton"
        onClick={() => {
          setPage("Technician");
        }}
      >
        Technician
      </button>
      <button
        className="navButton"
        onClick={() => {
          setPage("Branch-Service");
        }}
      >
        Branch-Service
      </button>

    </div>
  );
}
