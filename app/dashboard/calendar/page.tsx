'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth-service';
import { NewWeeklyCalendar } from '@/components/calendar/new-weekly-calendar';
import { EditAppointmentModal } from '@/components/calendar/edit-appointment-modal';
import type { Appointment } from '@/types/appointment';

export default function CalendarPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState('');
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }

      const userType = authService.getUserType();
      if (userType) {
        setUserRole(
          userType === 'administrativo' ? 'Administrador' : 'Veterinario'
        );
      }
    }
  }, [router]);

  const handleAppointmentClick = (appointment: Appointment) => {
    // El modal se maneja internamente en el nuevo componente
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingAppointment(null);
  };

  const handleSaveAppointment = (updatedAppointment: Appointment) => {
    // Aquí se podría actualizar el estado global o hacer una llamada a la API
    setIsEditModalOpen(false);
    setEditingAppointment(null);
  };

  return (
    <>
      <NewWeeklyCalendar
        onAppointmentClick={handleAppointmentClick}
        userRole={userRole}
        onEditAppointment={handleEditAppointment}
      />

      {editingAppointment && (
        <EditAppointmentModal
          appointment={editingAppointment}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveAppointment}
        />
      )}
    </>
  );
}
