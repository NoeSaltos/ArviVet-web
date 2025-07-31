// app/dashboard/patients/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { authService } from "@/services/auth-service";

// Datos mock de las mascotas
const mockPets = [
  {
    id: 1,
    name: "Kony",
    image: "/images/pets/kony.jpg",
    status: "Tratamiento",
    owner: "María García",
    species: "Gato",
    breed: "Persa",
    age: "2 años",
  },
  {
    id: 2,
    name: "Mica",
    image: "/images/pets/mica.jpg",
    status: "Tratamiento",
    owner: "Carlos López",
    species: "Gato",
    breed: "Maine Coon",
    age: "3 años",
  },
  {
    id: 3,
    name: "Perla",
    image: "/images/pets/perla.jpg",
    status: "Tratamiento",
    owner: "Ana Martínez",
    species: "Perro",
    breed: "Golden Retriever",
    age: "5 años",
  },
  {
    id: 4,
    name: "Teo",
    image: "/images/pets/teo.jpg",
    status: "Tratamiento",
    owner: "Luis Rodríguez",
    species: "Perro",
    breed: "Pug",
    age: "4 años",
  },
  {
    id: 5,
    name: "Oso",
    image: "/images/pets/oso.jpg",
    status: "Tratamiento",
    owner: "Patricia Silva",
    species: "Perro",
    breed: "Golden Retriever",
    age: "1 año",
  },
  {
    id: 6,
    name: "Chiqui",
    image: "/images/pets/chiqui.jpg",
    status: "Tratamiento",
    owner: "Roberto Díaz",
    species: "Gato",
    breed: "Británico",
    age: "6 años",
  },
  {
    id: 7,
    name: "Firu",
    image: "/images/pets/firu.jpg",
    status: "Tratamiento",
    owner: "Carmen Ruiz",
    species: "Perro",
    breed: "Mastín",
    age: "8 meses",
  },
  {
    id: 8,
    name: "Luna",
    image: "/images/pets/luna.jpg",
    status: "Tratamiento",
    owner: "Miguel Torres",
    species: "Gato",
    breed: "Siamés",
    age: "4 años",
  },
  {
    id: 9,
    name: "Koty",
    image: "/images/pets/koty.jpg",
    status: "Tratamiento",
    owner: "Elena Vásquez",
    species: "Gato",
    breed: "Ragdoll",
    age: "3 años",
  },
];

export default function PatientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPets, setFilteredPets] = useState(mockPets);

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      router.push("/login");
      return;
    }
  }, [router]);

  // Filtrar mascotas por término de búsqueda
  useEffect(() => {
    const filtered = mockPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPets(filtered);
  }, [searchTerm]);

  const handlePetClick = (petId: number) => {
    router.push(`/dashboard/patients/${petId}`);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <main className="patients-container">
      <div className="patients-overlay" />

      {/* Header */}
      <header className="patients-header">
        <button
          onClick={handleBackToDashboard}
          className="back-button"
          title="Volver al Dashboard"
        >
          <ArrowLeft className="back-icon" />
        </button>
        <h1 className="patients-title">Historial de Pacientes</h1>
      </header>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, dueño, especie o raza..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Grid de mascotas */}
      <div className="pets-grid">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="pet-card"
            onClick={() => handlePetClick(pet.id)}
          >
            <div className="pet-image-container">
              <div className="pet-image-placeholder">
                {/* Placeholder para la imagen */}
                <div className="pet-avatar">{pet.name.charAt(0)}</div>
              </div>
              <span className="pet-status">{pet.status}</span>
            </div>
            <div className="pet-info">
              <h3 className="pet-name">{pet.name}</h3>
              <p className="pet-details">
                {pet.species} • {pet.breed}
              </p>
              <p className="pet-owner">Dueño: {pet.owner}</p>
              <p className="pet-age">Edad: {pet.age}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="no-results">
          <p>No se encontraron mascotas que coincidan con tu búsqueda.</p>
        </div>
      )}
    </main>
  );
}
