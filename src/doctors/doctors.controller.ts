import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  getAllDoctorsWithAppointments() {
    return this.doctorsService.getAllDoctorsWithAppointments();
  }

  @Get(':id')
  getDoctorById(@Param('id') id: string) {
    return this.doctorsService.getDoctorById(Number(id));
  }

  @Get(':id/available-slots/:date')
  getAvailableSlots(
    @Param('id') id: string,
    @Param('date') date: string
  ) {
  return this.doctorsService.getAvailableSlotsByDoctorId(Number(id), date);
  }
}