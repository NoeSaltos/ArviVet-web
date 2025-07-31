// app/dashboard/patients/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Heart, Activity } from "lucide-react";
import { authService } from "@/services/auth-service";

// Datos mock del historial médico
const mockMedicalHistory = {
  1: {
    pet: {
      name: "Kony",
      species: "Gato",
      breed: "Persa",
      age: "2 años",
      weight: "4.2 kg",
      owner: "María García",
      phone: "+593 99 123 4567",
      email: "maria.garcia@email.com",
    },
    visits: [
      {
        id: 1,
        date: "2024-01-15",
        type: "Consulta General",
        veterinarian: "Dr. Ana Veterinaria",
        diagnosis: "Chequeo rutinario",
        treatment: "Vacuna antirrábica aplicada",
        notes:
          "Mascota en excelente estado de salud. Se recomienda próxima visita en 6 meses.",
        weight: "4.2 kg",
        temperature: "38.5°C",
      },
      {
        id: 2,
        date: "2023-12-10",
        type: "Tratamiento",
        veterinarian: "Dr. Carlos Administrador",
        diagnosis: "Infección ocular leve",
        treatment: "Gotas oftálmicas - 3 veces al día por 7 días",
        notes:
          "Mejoría notable después del tratamiento. Ojos claros y sin secreción.",
        weight: "4.0 kg",
        temperature: "38.2°C",
      },
      {
        id: 3,
        date: "2023-08-22",
        type: "Cirugía",
        veterinarian: "Dr. Ana Veterinaria",
        diagnosis: "Esterilización",
        treatment: "Ovariohisterectomía exitosa",
        notes:
          "Procedimiento sin complicaciones. Recuperación excelente en 10 días.",
        weight: "3.8 kg",
        temperature: "38.0°C",
      },
    ],
  },
  // Datos para otras mascotas...
  2: {
    pet: {
      name: "Mica",
      species: "Gato",
      breed: "Maine Coon",
      age: "3 años",
      weight: "6.5 kg",
      owner: "Carlos López",
      phone: "+593 99 234 5678",
      email: "carlos.lopez@email.com",
    },
    visits: [
      {
        id: 1,
        date: "2024-01-20",
        type: "Consulta General",
        veterinarian: "Dr. Ana Veterinaria",
        diagnosis: "Control de peso",
        treatment: "Dieta especializada recomendada",
        notes: "Leve sobrepeso. Se estableció plan nutricional.",
        weight: "6.5 kg",
        temperature: "38.8°C",
      },
    ],
  },
};

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      router.push("/login");
      return;
    }

    // Cargar datos del paciente
    const petId = parseInt(params.id as string);
    const data = mockMedicalHistory[petId as keyof typeof mockMedicalHistory];

    if (data) {
      setPatientData(data);
    }
    setLoading(false);
  }, [router, params.id]);

  const handleBackToPatients = () => {
    router.push("/dashboard/patients");
  };

  if (loading) {
    return (
      <main className="patient-detail-container">
        <div className="loading-message">Cargando...</div>
      </main>
    );
  }

  if (!patientData) {
    return (
      <main className="patient-detail-container">
        <div className="error-message">
          <p>Paciente no encontrado</p>
          <button
            onClick={handleBackToPatients}
            className="back-to-patients-btn"
          >
            Volver a Pacientes
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="patient-detail-container">
      <div className="patient-detail-overlay" />

      {/* Header */}
      <header className="patient-detail-header">
        <button
          onClick={handleBackToPatients}
          className="back-button"
          title="Volver a Pacientes"
        >
          <ArrowLeft className="back-icon" />
        </button>
        <h1 className="patient-detail-title">
          Historial Médico - {patientData.pet.name}
        </h1>
      </header>

      <div className="patient-detail-content">
        {/* Información del paciente */}
        <div className="patient-info-card">
          <div className="patient-avatar">{patientData.pet.name.charAt(0)}</div>
          <div className="patient-basic-info">
            <h2 className="patient-name">{patientData.pet.name}</h2>
            <div className="patient-details-grid">
              <div className="detail-item">
                <span className="detail-label">Especie:</span>
                <span className="detail-value">{patientData.pet.species}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Raza:</span>
                <span className="detail-value">{patientData.pet.breed}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Edad:</span>
                <span className="detail-value">{patientData.pet.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Peso actual:</span>
                <span className="detail-value">{patientData.pet.weight}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del dueño */}
        <div className="owner-info-card">
          <h3 className="section-title">
            <User className="section-icon" />
            Información del Dueño
          </h3>
          <div className="owner-details">
            <p>
              <strong>Nombre:</strong> {patientData.pet.owner}
            </p>
            <p>
              <strong>Teléfono:</strong> {patientData.pet.phone}
            </p>
            <p>
              <strong>Email:</strong> {patientData.pet.email}
            </p>
          </div>
        </div>

        {/* Historial de visitas */}
        <div className="visits-section">
          <h3 className="section-title">
            <Activity className="section-icon" />
            Historial de Visitas
          </h3>

          <div className="visits-timeline">
            {patientData.visits.map((visit: any, index: number) => (
              <div key={visit.id} className="visit-card">
                <div className="visit-header">
                  <div className="visit-date">
                    <Calendar className="date-icon" />
                    {new Date(visit.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <span
                    className={`visit-type visit-type-${visit.type
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {visit.type}
                  </span>
                </div>

                <div className="visit-content">
                  <div className="visit-info-grid">
                    <div className="visit-detail">
                      <strong>Veterinario:</strong> {visit.veterinarian}
                    </div>
                    <div className="visit-detail">
                      <strong>Diagnóstico:</strong> {visit.diagnosis}
                    </div>
                    <div className="visit-detail">
                      <strong>Tratamiento:</strong> {visit.treatment}
                    </div>
                  </div>

                  <div className="vital-signs">
                    <div className="vital-sign">
                      <Heart className="vital-icon" />
                      <span>Peso: {visit.weight}</span>
                    </div>
                    <div className="vital-sign">
                      <Activity className="vital-icon" />
                      <span>Temperatura: {visit.temperature}</span>
                    </div>
                  </div>

                  <div className="visit-notes">
                    <strong>Notas:</strong>
                    <p>{visit.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
