import { useState } from "react";
import { OrdersAdminPage } from "./features/orders-admin/pages/OrdersAdminPage";
import { RoutePlannerPage } from "./features/route-planner/pages/RoutePlannerPage";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("planner");
  const [adminRefreshKey, setAdminRefreshKey] = useState(0);

  function openOrdersAdmin() {
    setActiveTab("admin");
    setAdminRefreshKey((current) => current + 1);
  }

  return (
    <main className="page">
      <header className="header">
        <h1>Delivery Route Planner</h1>
        <p>Planejamento de rota e gestao administrativa de pedidos via BFF.</p>
        <div className="tabs">
          <button
            className={activeTab === "planner" ? "tab active" : "tab"}
            onClick={() => setActiveTab("planner")}
          >
            Planejador de rota
          </button>
          <button
            className={activeTab === "admin" ? "tab active" : "tab"}
            onClick={openOrdersAdmin}
          >
            Admin pedidos
          </button>
        </div>
      </header>

      {activeTab === "planner" && <RoutePlannerPage />}
      {activeTab === "admin" && <OrdersAdminPage refreshKey={adminRefreshKey} />}
    </main>
  );
}
