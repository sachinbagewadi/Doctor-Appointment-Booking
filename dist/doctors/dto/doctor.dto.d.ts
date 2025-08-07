export declare class DoctorDto {
    id: number;
    name: string;
    specialization: string;
    booked_slots: Record<string, Array<{
        patient_name: string;
        start_time: string;
        end_time: string;
    }>>;
}
