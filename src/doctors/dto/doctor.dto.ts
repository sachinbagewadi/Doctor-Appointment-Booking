import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  specialization: string;

  @ApiProperty({ type: 'object', additionalProperties: true })
  booked_slots: Record<string, Array<{
    patient_name: string;
    start_time: string;
    end_time: string;
  }>>;
}