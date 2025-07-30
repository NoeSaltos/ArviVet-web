"use client" // Marca este hook como un Client Component de React

import { useState } from "react" // Hook de React para estado
import { useRouter } from "next/navigation" // Hook de Next.js para navegación

import { authService } from "@/services/auth-service" // Servicio de autenticación
import type { LoginFormData } from "@/lib/validations/auth" // Tipo de datos para el formulario de login

// Hook personalizado para manejar la lógica de autenticación
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false) // Estado para indicar si la autenticación está en progreso
  const router = useRouter() // Inicializa el router para redirecciones

  // Función para iniciar sesión
  const login = async (credentials: LoginFormData) => {
    setIsLoading(true) // Activa el estado de carga

    try {
      const result = await authService.login(credentials) // Llama al servicio de autenticación

      if (result.success) {
        // Muestra un mensaje de bienvenida personalizado según el tipo de usuario
        const userTypeText = credentials.userType === "administrativo" ? "Administrador" : "Veterinario"
        alert(`¡Bienvenido ${userTypeText}! Acceso concedido al sistema ARVI VET.`)

        // Limpia el tipo de usuario seleccionado del localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("selectedUserType")
        }

        // Redirige al dashboard correspondiente (comentado para simulación)
        if (credentials.userType === "administrativo") {
          // router.push("/admin/dashboard")
          console.log("Redirigiendo a dashboard administrativo...")
        } else if (credentials.userType === "veterinario") {
          // router.push("/vet/dashboard")
          console.log("Redirigiendo a dashboard veterinario...")
        }
      } else {
        // Muestra un mensaje de error si la autenticación falla
        alert(result.error || "Error al iniciar sesión")
      }
    } catch (error) {
      // Maneja errores de conexión o inesperados
      alert("Error de conexión. Intente nuevamente.")
      throw error // Propaga el error para que pueda ser manejado externamente si es necesario
    } finally {
      setIsLoading(false) // Desactiva el estado de carga al finalizar
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await authService.logout() // Llama al servicio para cerrar sesión
      alert("Sesión cerrada correctamente")
      router.push("/") // Redirige a la página principal después de cerrar sesión
    } catch (error) {
      alert("Error al cerrar sesión")
    }
  }

  return {
    login, // Función para iniciar sesión
    logout, // Función para cerrar sesión
    isLoading, // Estado de carga
  }
}
