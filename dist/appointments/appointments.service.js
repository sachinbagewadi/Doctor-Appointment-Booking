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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const data_store_1 = require("../data/data.store");
let AppointmentsService = class AppointmentsService {
    bookAppointment(payload) {
        const { doctor_id, date, start_time, end_time } = payload;
        const newStart = (0, moment_1.default)(`${date} ${start_time}`, 'YYYY-MM-DD HH:mm');
        const newEnd = (0, moment_1.default)(`${date} ${end_time}`, 'YYYY-MM-DD HH:mm');
        if (!newStart.isBefore(newEnd)) {
            throw new common_1.BadRequestException('Start time needs to be beforr end time');
        }
        const doctorAppointments = data_store_1.appointments.filter(appt => appt.doctor_id === doctor_id && appt.date === date);
        for (let i = 0; i < doctorAppointments.length; i++) {
            const curr = doctorAppointments[i];
            const existStart = (0, moment_1.default)(`${curr.date} ${curr.start_time}`, 'YYYY-MM-DD HH:mm');
            const existEnd = (0, moment_1.default)(`${curr.date} ${curr.end_time}`, 'YYYY-MM-DD HH:mm');
            const isOverlapping = newStart.isBefore(existEnd) && newEnd.isAfter(existStart);
            if (isOverlapping) {
                throw new common_1.BadRequestException(`Slot is ovetlapping with existing one from ${curr.start_time} to ${curr.end_time}`);
            }
        }
        data_store_1.appointments.push(payload);
        return {
            message: 'Appointment has been booked'
        };
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)()
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map