import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Sidebar from '../components/dashboard/Sidebar';
import UserStats from '../components/dashboard/UserStats';
import MyServicesList from '../components/dashboard/MyServicesList';
import TradeRequestList from '../components/dashboard/TradeRequestList';

import { getTradeRequests } from '../api/tradeRequests';
import { getMyServices } from '../api/services';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, loading } = useAuth();

  const [myServices, setMyServices] = useState([]);
  const [tradeRequests, setTradeRequests] = useState([]);

  // El dashboard del usuario agrupa servicios propios y solicitudes de trueque pendientes.
  const loadDashboard = async () => {
    if (!user?.id || user?.role === 'ADMIN') return;

    try {
      const [servicesResponse, requestsResponse] = await Promise.all([
        getMyServices(),
        getTradeRequests(),
      ]);

      const services = servicesResponse.data?.data || servicesResponse.data || [];
      const requests = requestsResponse.data?.data || requestsResponse.data || [];

      setMyServices(services.slice(0, 6));
      setTradeRequests(requests);
    } catch (error) {
      console.error('Error cargando dashboard:', error);
      setMyServices([]);
      setTradeRequests([]);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [user?.id, user?.role]);

  if (loading) return null;

  // Los admins usan su panel específico, no este dashboard de usuario.
  if (user?.role === 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  const stats = {
    active: myServices.filter((service) => service.is_active).length,
    pending: myServices.filter((service) => service.moderation_status === 'PENDING').length,
    tradeRequests: tradeRequests.filter((trade) => trade.status === 'PENDING').length,
  };

  return (
    <section className="py-5 dashboard-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar />
          </div>

          <div className="col-lg-9 d-grid gap-4">
            <div className="panel-gradient rounded-4 p-4 p-lg-5 text-white">
              <p className="mb-1 text-white-50">Panel de usuario</p>
              <h2 className="fw-bold mb-0">Hola, {user?.name}</h2>
            </div>

            <UserStats stats={stats} />

            <MyServicesList services={myServices} />

            <TradeRequestList
              requests={tradeRequests}
              currentUserId={user?.id}
              onRefresh={loadDashboard}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;