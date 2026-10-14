import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ url }) => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (active) setStatus("unauthenticated");
        return;
      }

      try {
        const { data } = await axios.get(`${url}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!data.user) throw new Error("Invalid session");

        localStorage.setItem("user", JSON.stringify(data.user));
        if (active) setStatus("authenticated");
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (active) setStatus("unauthenticated");
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, [url]);

  if (status === "checking")
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eaf3e3] text-green-900">
        Verifying your session...
      </div>
    );
  if (status === "unauthenticated") return <Navigate to="/auth" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
