import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller()
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}
  @Post('book-appointment')
  bookAppointment(
    @Body()
    payload: {
      doctor_id: number;
      patient_name: string;
      date: string;
      start_time: string;
      end_time: string;
    },
  ) {
    return this.service.bookAppointment(payload);
  }
}
