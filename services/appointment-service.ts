import type { Appointment, AppointmentFormData } from "@/types/appointment"
import { format, addDays, startOfWeek } from "date-fns"

class AppointmentService {
  private generateCurrentWeekAppointments(): Appointment[] {
    const today = new Date()
    const monday = startOfWeek(today, { weekStartsOn: 1 })
    
    const appointments: Appointment[] = []
    const owners = [
      "Ronald Sánchez", "Luis Rivera", "Cristina Aguilar", "Alejandra Díaz",
      "Ricardo Macías", "Mario Flores", "Robert Fox", "Darrell Stewart"
    ]
    const pets = [
      { name: "Max", type: "perro" as const }, 
      { name: "Luna", type: "gato" as const },
      { name: "Thor", type: "perro" as const }, 
      { name: "Mia", type: "gato" as const },
      { name: "Rex", type: "perro" as const }, 
      { name: "Bella", type: "gato" as const },
      { name: "Charlie", type: "perro" as const }, 
      { name: "Nala", type: "gato" as const }
    ]
    const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    const statuses = ["programada", "en_curso", "completada", "no_asistio"] as const
    const types = ["consulta_general", "vacunacion", "cirugia", "revision", "emergencia", "control"] as const
    const reasons = [
      "Consulta general", "Vacunación anual", "Cirugía menor", "Control post-operatorio",
      "Revisión rutinaria", "Emergencia", "Control de peso", "Chequeo rutinario"
    ]

    let appointmentId = 1

    // Generar citas para la semana actual
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const currentDate = addDays(monday, dayOffset)
      const dateString = format(currentDate, "yyyy-MM-dd")
      
      // Generar entre 2-4 citas por día
      const appointmentsPerDay = Math.floor(Math.random() * 3) + 2
      
      for (let i = 0; i < appointmentsPerDay; i++) {
        const randomTime = times[Math.floor(Math.random() * times.length)]
        const randomOwner = owners[Math.floor(Math.random() * owners.length)]
        const randomPet = pets[Math.floor(Math.random() * pets.length)]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        const randomType = types[Math.floor(Math.random() * types.length)]
        const randomReason = reasons[Math.floor(Math.random() * reasons.length)]

        // Evitar duplicados de hora en el mismo día
        const existingAppointment = appointments.find(apt => 
          apt.date === dateString && apt.time === randomTime
        )
        
        if (!existingAppointment) {
          appointments.push({
            id: appointmentId.toString(),
            date: dateString,
            time: randomTime,
            duration: 60,
            status: randomStatus,
            type: randomType,
            reason: randomReason,
            notes: `Cita generada automáticamente para ${randomOwner}`,
            owner: {
              id: `owner${appointmentId}`,
              name: randomOwner,
              phone: `+34 666 ${String(Math.floor(Math.random() * 900) + 100)} ${String(Math.floor(Math.random() * 900) + 100)}`,
              email: `${randomOwner.toLowerCase().replace(' ', '.')}@email.com`
            },
            pet: {
              id: `pet${appointmentId}`,
              name: randomPet.name,
              type: randomPet.type,
              breed: randomPet.type === "perro" ? "Mestizo" : "Doméstico",
              age: Math.floor(Math.random() * 10) + 1,
              weight: randomPet.type === "perro" ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 8) + 2
            },
            veterinarian: {
              id: Math.random() > 0.5 ? "vet1" : "vet2",
              name: Math.random() > 0.5 ? "Dr. García" : "Dra. López"
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          appointmentId++
        }
      }
    }

    // Agregar algunas citas específicas para hoy si es día laboral
    const todayString = format(today, "yyyy-MM-dd")
    const todayDay = today.getDay()
    
    if (todayDay >= 1 && todayDay <= 5) { // Lunes a Viernes
      // Cita en curso ahora (si estamos en horario de oficina)
      const currentHour = today.getHours()
      if (currentHour >= 9 && currentHour <= 17) {
        const currentTimeSlot = `${currentHour.toString().padStart(2, '0')}:00`
        
        // Verificar si ya hay una cita a esta hora
        const existingNow = appointments.find(apt => 
          apt.date === todayString && apt.time === currentTimeSlot
        )
        
        if (!existingNow) {
          appointments.push({
            id: "current",
            date: todayString,
            time: currentTimeSlot,
            duration: 60,
            status: "en_curso",
            type: "consulta_general",
            reason: "Consulta en curso",
            notes: "Cita actualmente en progreso",
            owner: {
              id: "currentOwner",
              name: "María González",
              phone: "+34 666 000 111",
              email: "maria.gonzalez@email.com"
            },
            pet: {
              id: "currentPet",
              name: "Firulais",
              type: "perro",
              breed: "Labrador",
              age: 5,
              weight: 25
            },
            veterinarian: {
              id: "vet1",
              name: "Dr. García"
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }
      }
    }

    return appointments.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.time.localeCompare(b.time)
    })
  }

  async getAppointments(): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return this.generateCurrentWeekAppointments()
  }

  async getAppointmentById(id: string): Promise<Appointment | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const appointments = this.generateCurrentWeekAppointments()
    return appointments.find(apt => apt.id === id) || null
  }

  async createAppointment(data: AppointmentFormData): Promise<Appointment> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: data.date,
      time: data.time,
      duration: data.duration,
      status: "programada",
      type: data.type,
      reason: data.reason,
      notes: data.notes,
      owner: {
        id: Date.now().toString() + "_owner",
        name: data.owner.name,
        phone: data.owner.phone,
        email: data.owner.email
      },
      pet: {
        id: Date.now().toString() + "_pet",
        name: data.pet.name,
        type: data.pet.type,
        breed: data.pet.breed,
        age: data.pet.age,
        weight: data.pet.weight
      },
      veterinarian: data.veterinarianId ? {
        id: data.veterinarianId,
        name: data.veterinarianId === "vet1" ? "Dr. García" : "Dra. López"
      } : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return newAppointment
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const appointments = this.generateCurrentWeekAppointments()
    const appointment = appointments.find(apt => apt.id === id)
    
    if (!appointment) return null

    const updatedAppointment = {
      ...appointment,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return updatedAppointment
  }

  async deleteAppointment(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return true // Simulamos que siempre se puede eliminar
  }

  async getAppointmentsByDateRange(startDate: string, endDate: string): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const appointments = this.generateCurrentWeekAppointments()
    return appointments.filter(apt => 
      apt.date >= startDate && apt.date <= endDate
    )
  }

  async getAppointmentsByStatus(status: string): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const appointments = this.generateCurrentWeekAppointments()
    return appointments.filter(apt => apt.status === status)
  }

  async searchAppointments(query: string): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const appointments = this.generateCurrentWeekAppointments()
    const queryLower = query.toLowerCase()
    return appointments.filter(apt =>
      apt.owner.name.toLowerCase().includes(queryLower) ||
      apt.pet.name.toLowerCase().includes(queryLower) ||
      apt.reason.toLowerCase().includes(queryLower) ||
      apt.notes?.toLowerCase().includes(queryLower)
    )
  }
}

export const appointmentService = new AppointmentService()