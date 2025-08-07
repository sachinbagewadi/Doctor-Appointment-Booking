export declare class AppointmentsService {
    bookAppointment(payload: {
        doctor_id: number;
        patient_name: string;
        date: string;
        start_time: string;
        end_time: string;
    }): {
        message: string;
    };
}
