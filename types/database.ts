export interface Pet {
  id: number;
  pic?: string;
  name: string;
  birth_date: string;
  breed: string;
  sex: string;
  weigth: number;
  country_origin: string;
  sterilization_date?: string;
  owner_id: number;
}

export interface MedicalVisit {
  id: number;
  pet_id: number;
  date: string;
  type: string;
  veterinarian: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  weight?: string;
  temperature?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol_id?: number;
  telefono: string;
  direccion: string;
  creado_en?: string;
}

export interface Vet {
  id: number;
  name: string;
  email?: string;
  telephone?: string;
}

export interface Branch {
  id: number;
  direction?: string;
  telephone?: string;
}

export interface Speciality {
  id: number;
  name: string;
  description?: string;
}

export interface Appointment {
  id: number;
  date: string;
  status: string;
  speciality_id?: number;
  user_id: number;
  pet_id: number;
  hour: string;
  branch_id: number;
  vet_id: number;
  duration_minutes?: number;
  // Relations
  vet?: Vet;
  branch?: Branch;
  speciality?: Speciality;
}

export interface PetWithOwner extends Pet {
  users?: User;
}

export interface PatientHistory {
  pet: PetWithOwner;
  appointments: Appointment[];
}
