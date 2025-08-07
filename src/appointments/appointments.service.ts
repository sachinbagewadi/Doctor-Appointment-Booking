import { Injectable, BadRequestException } from '@nestjs/common'
import moment from 'moment'
import { appointments } from '../data/data.store'

@Injectable()
export class AppointmentsService {

  bookAppointment(payload: {
    doctor_id: number,
    patient_name: string,
    date: string,
    start_time: string,
    end_time: string
  }) {
    const { doctor_id, date, start_time, end_time } = payload

    const newStart = moment(`${date} ${start_time}`, 'YYYY-MM-DD HH:mm')
    const newEnd = moment(`${date} ${end_time}`, 'YYYY-MM-DD HH:mm')

    if (!newStart.isBefore(newEnd)) {
      throw new BadRequestException('Start time needs to be beforr end time')
    }

    const doctorAppointments = appointments.filter(appt =>
      appt.doctor_id === doctor_id && appt.date === date
    )

    for (let i = 0; i < doctorAppointments.length; i++) {
      const curr = doctorAppointments[i]

      const existStart = moment(`${curr.date} ${curr.start_time}`, 'YYYY-MM-DD HH:mm')
      const existEnd = moment(`${curr.date} ${curr.end_time}`, 'YYYY-MM-DD HH:mm')

      const isOverlapping = newStart.isBefore(existEnd) && newEnd.isAfter(existStart)

      if (isOverlapping) {
        throw new BadRequestException(`Slot is ovetlapping with existing one from ${curr.start_time} to ${curr.end_time}`)
      }
    }

    appointments.push(payload)

    return {
      message: 'Appointment has been booked'
    }
  }

}
