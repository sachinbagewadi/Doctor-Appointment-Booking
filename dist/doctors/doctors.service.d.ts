export declare class DoctorsService {
    getAllDoctorsWithAppointments(): any;
    getDoctorById(id: number): any;
    getAvailableSlotsByDoctorId(id: number, date: string): {
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
