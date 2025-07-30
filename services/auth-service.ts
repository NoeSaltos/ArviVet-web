// Define el servicio de autenticación que simula llamadas a una API
import type { LoginFormData } from "@/lib/validations/auth" // Tipo de datos para el formulario de login

// Interfaz para la respuesta de la autenticación
interface AuthResponse {
  success: boolean // Indica si la operación fue exitosa
  data?: {
    // Datos del usuario y token si es exitosa
    user: {
      id: string
      email: string
      name: string
      userType: string
    }
    token: string
  }
  error?: string // Mensaje de error si falla
}

// Clase que encapsula la lógica de autenticación
class AuthService {
  private readonly baseUrl = "/api" // URL base para futuras llamadas a la API (actualmente no usada en el mock)

  // Método para simular el inicio de sesión
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      // Simula un retraso de red de 1.5 segundos
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Extrae email, contraseña y tipo de usuario de las credenciales
      const { email, password, userType } = credentials

      // Credenciales de prueba predefinidas para diferentes tipos de usuario
      const validCredentials = [
        { email: "admin@arvivet.com", password: "admin123", type: "administrativo", name: "Dr. Carlos Administrador" },
        { email: "vet@arvivet.com", password: "vet123", type: "veterinario", name: "Dr. María Veterinaria" },
        { email: "admin@arvi.com", password: "password123", type: "administrativo", name: "Administrador General" },
        { email: "vet@arvi.com", password: "password123", type: "veterinario", name: "Veterinario General" },
      ]

      // Busca si las credenciales proporcionadas coinciden con alguna de las válidas
      const validUser = validCredentials.find(
        (cred) => cred.email === email && cred.password === password && cred.type === userType,
      )

      if (validUser) {
        // Si las credenciales son válidas, crea un objeto de usuario mock
        const mockUser = {
          id: Date.now().toString(), // ID único basado en el tiempo
          email: email,
          name: validUser.name,
          userType: userType || "",
        }

        // Genera un token mock
        const mockToken = "arvi-jwt-token-" + Date.now()

        // Almacena el token y el tipo de usuario en localStorage (solo en el navegador)
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", mockToken)
          localStorage.setItem("user-type", userType || "")
          localStorage.setItem("user-data", JSON.stringify(mockUser)) // Guarda también los datos del usuario
        }

        // Retorna una respuesta exitosa
        return {
          success: true,
          data: {
            user: mockUser,
            token: mockToken,
          },
        }
      }

      // Si las credenciales no son válidas, retorna un error
      return {
        success: false,
        error: `Credenciales inválidas para el tipo de usuario ${userType}. Verifique su email y contraseña.`,
      }
    } catch (error) {
      // Captura cualquier error durante la simulación de la llamada
      return {
        success: false,
        error: "Error de conexión con el servidor. Intente nuevamente.",
      }
    }
  }

  // Método para simular el cierre de sesión
  async logout(): Promise<void> {
    // Elimina los datos de autenticación de localStorage (solo en el navegador)
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token")
      localStorage.removeItem("user-type")
      localStorage.removeItem("user-data")
      localStorage.removeItem("selectedUserType") // También limpia el tipo de usuario seleccionado
    }
  }

  // Método para obtener el token de autenticación
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth-token")
    }
    return null
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Método para obtener el tipo de usuario
  getUserType(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user-type")
    }
    return null
  }

  // Método para obtener los datos completos del usuario
  getUserData(): any {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user-data")
      return userData ? JSON.parse(userData) : null
    }
    return null
  }
}

// Exporta una instancia del servicio de autenticación
export const authService = new AuthService()
