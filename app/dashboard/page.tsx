"use client"; // Este es un Client Component porque usa hooks de React y localStorage

import { useEffect, useState } from "react";
import Image from "next/image"; // Usamos el componente Image de Next.js para optimización [^2]
import { useRouter } from "next/navigation"; // Para redireccionar
import { authService } from "@/services/auth-service"; // Nuestro servicio de autenticación

export default function DashboardPage() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  // const [userName, setUserName] = useState("Usuario") // Eliminado, no se muestra en la imagen
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Asegurarse de que el código se ejecute solo en el cliente
    if (typeof window !== "undefined") {
      // Verificar si el usuario está autenticado
      if (!authService.isAuthenticated()) {
        router.push("/login"); // Redirigir al login si no está autenticado
        return;
      }

      // Obtener datos del usuario
      // const userData = authService.getUserData() // Eliminado, no se usa el nombre
      const userType = authService.getUserType();

      // if (userData) {
      //   setUserName(userData.name || "Usuario") // Eliminado
      // }
      if (userType) {
        setUserRole(
          userType === "administrativo" ? "Administrador" : "Veterinario"
        );
      }

      // Determinar el saludo según la hora del día
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Buenos días!");
      } else if (currentHour >= 12 && currentHour < 19) {
        setGreeting("Buenas tardes!");
      } else {
        setGreeting("Buenas noches!");
      }
    }
  }, [router]); // Dependencia del router para evitar warnings

  const handleLogout = async () => {
    await authService.logout();
    router.push("/"); // Redirigir a la página de selección de usuario o login
  };

  // Botones de navegación condicionales
  const adminButtons = [
    { label: "Calendario de consultas", href: "/dashboard/calendar" },
    { label: "Historial de pacientes", href: "/dashboard/patients" },
    { label: "Personal medico", href: "/dashboard/staff" },
    { label: "Pagos registrados", href: "/dashboard/payments" },
  ];

  const vetButtons = [
    { label: "Calendario de consultas", href: "/dashboard/calendar" },
    { label: "Historial de pacientes", href: "/dashboard/patients" },
    { label: "Personal medico", href: "/dashboard/staff" },
  ];

  const buttonsToShow =
    userRole === "Administrador" ? adminButtons : vetButtons;

  return (
    <main className="dashboard-container">
      <div className="dashboard-overlay" />{" "}
      {/* Capa de superposición para el fondo */}
      {/* Header con el logo y botón de cerrar sesión */}
      <header className="dashboard-header">
        <Image
          src="/images/logo_home.png"
          alt="Arvivet Clínica Veterinaria Logo"
          width={200} // Ancho de la imagen
          height={40} // Alto de la imagen
          className="dashboard-logo"
          priority // Carga la imagen con alta prioridad [^2]
        />
        <button onClick={handleLogout} className="dashboard-logout-button">
          Cerrar Sesión
        </button>
      </header>
      {/* Contenido principal de bienvenida */}
      <section className="dashboard-content">
        <div className="dashboard-welcome-text">
          <h1>BIENVENIDO AL SISTEMA ARVISOFT</h1>
          <div className="greeting-and-role">
            {" "}
            {/* Nuevo contenedor para el saludo y el rol */}
            <p>{greeting}</p>
            <p>{userRole}</p>
          </div>
        </div>
      </section>
      {/* Botones de navegación */}
      <nav className="dashboard-buttons">
        {buttonsToShow.map((button) => (
          <a key={button.label} href={button.href} className="dashboard-button">
            {button.label}
          </a>
        ))}
      </nav>
    </main>
  );
}
