"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const data_store_1 = require("../data/data.store");
const moment_1 = __importDefault(require("moment"));
let DoctorsService = class DoctorsService {
    getAllDoctorsWithAppointments() {
        const today = (0, moment_1.default)().startOf('day');
        return data_store_1.doctors.map((doctor) => {
            const upcomingAppointments = data_store_1.appointments
                .filter((aptmnt) => aptmnt.doctor_id === doctor.id &&
                (0, moment_1.default)(aptmnt.date).isSameOrAfter(today))
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
            }, {});
            return {
                ...doctor,
                booked_slots: appointmentsGrouped,
            };
        });
    }
    getDoctorById(id) {
        const foundDoctor = data_store_1.doctors.find((doc) => doc.id === id);
        if (!foundDoctor)
            return null;
        const today = (0, moment_1.default)().startOf('day');
        const futureAppts = data_store_1.appointments
            .filter((apt) => apt.doctor_id === foundDoctor.id &&
            (0, moment_1.default)(apt.date).isSameOrAfter(today))
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
        }, {});
        return {
            ...foundDoctor,
            booked_slots: grouped,
        };
    }
    getAvailableSlotsByDoctorId(id, date) {
        const doc = data_store_1.doctors.find((d) => d.id === id);
        if (!doc) {
            return { message: 'Doctor not found' };
        }
        const hours = {
            start: (0, moment_1.default)('10:00', 'HH:mm'),
            end: (0, moment_1.default)('17:00', 'HH:mm'),
        };
        const timeSlots = [];
        let curr = hours.start.clone();
        while (curr.isBefore(hours.end)) {
            const endSlot = curr.clone().add(30, 'minutes');
            timeSlots.push({
                start_time: curr.format('HH:mm'),
                end_time: endSlot.format('HH:mm'),
            });
            curr = endSlot;
        }
        const takenSlots = data_store_1.appointments
            .filter((apt) => apt.doctor_id === id && apt.date === date)
            .map((apt) => `${apt.start_time}-${apt.end_time}`);
        const available = timeSlots.filter((slot) => !takenSlots.includes(`${slot.start_time}-${slot.end_time}`));
        return {
            doctor_id: id,
            date: date,
            available_slots: available,
        };
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)()
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map