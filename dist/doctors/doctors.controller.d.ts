import { DoctorsService } from './doctors.service';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    getAllDoctorsWithAppointments(): any;
    getDoctorById(id: string): any;
    getAvailableSlots(id: string, date: string): {
        message: string;
        doctor_id?: undefined;
        date?: undefined;
        available_slots?: undefined;
    } | {
        doctor_id: number;
        date: string;
        available_slots: any;
        message?: undefined;
    };
}
