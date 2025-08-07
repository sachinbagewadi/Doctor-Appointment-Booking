import { Injectable } from '@nestjs/common';
import { doctors, appointments } from '../data/data.store';
import moment from 'moment';

@Injectable()
export class DoctorsService {

  getAllDoctorsWithAppointments() {
    const today = moment().startOf('day');

    return doctors.map((doctor) => {
      const upcomingAppointments = appointments
        .filter((aptmnt) => 
          aptmnt.doctor_id === doctor.id &&
          moment(aptmnt.date).isSameOrAfter(today)
        )
        .sort((a, b) => a.date.localeCompare(b.date));

      const appointmentsGrouped = upcomingAppointments.reduce((result, aptmnt) => {
        if (!result[aptmnt.date]) {
          result[aptmnt.date] = [];
        }
        result[aptmnt.date].push({
          patient_name: aptmnt.patient_name,
          start_time: aptmnt.start_time,
          end_time: aptmnt.end_time,
        });
        return result;
      }, {} as Record<string, any[]>);

      return {
        ...doctor,
        booked_slots: appointmentsGrouped,
      };
    });
  }

  getDoctorById(id: number) {
    const foundDoctor = doctors.find((doc) => doc.id === id);
    if (!foundDoctor) return null;

    const today = moment().startOf('day');

    const futureAppts = appointments
      .filter((apt) =>
        apt.doctor_id === foundDoctor.id &&
        moment(apt.date).isSameOrAfter(today)
      )
      .sort((a, b) => a.date.localeCompare(b.date));

    const grouped = futureAppts.reduce((acc, apt) => {
      if (!acc[apt.date]) {
        acc[apt.date] = [];
      }
      acc[apt.date].push({
        patient_name: apt.patient_name,
        start_time: apt.start_time,
        end_time: apt.end_time,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return {
      ...foundDoctor,
      booked_slots: grouped,
    };
  }

  getAvailableSlotsByDoctorId(id: number, date: string) {
    const doc = doctors.find((d) => d.id === id);
    if (!doc) {
      return { message: 'Doctor not found' };
    }

    const hours = {
      start: moment('10:00', 'HH:mm'),
      end: moment('17:00', 'HH:mm'),
    };

    const timeSlots: { start_time: string; end_time: string }[] = [];

    let curr = hours.start.clone();
    while (curr.isBefore(hours.end)) {
      const endSlot = curr.clone().add(30, 'minutes');
      timeSlots.push({
        start_time: curr.format('HH:mm'),
        end_time: endSlot.format('HH:mm'),
      });
      curr = endSlot;
    }

    const takenSlots = appointments
      .filter((apt) => apt.doctor_id === id && apt.date === date)
      .map((apt) => `${apt.start_time}-${apt.end_time}`);

    const available = timeSlots.filter(
      (slot) => !takenSlots.includes(`${slot.start_time}-${slot.end_time}`)
    );

    return {
      doctor_id: id,
      date: date,
      available_slots: available,
    };
  }

}