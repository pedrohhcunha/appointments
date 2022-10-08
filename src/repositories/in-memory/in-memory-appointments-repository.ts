import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
    private appointments: Appointment[] = [];

    async create(appointment: Appointment): Promise<void> {
        this.appointments.push(appointment);
    }

    async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.appointments.find((appointment) => {
            return areIntervalsOverlapping(
                { start: startsAt, end: endsAt },
                { start: appointment.startsAt, end: appointment.endsAt },
                { inclusive: true },
            );
        });

        return overlappingAppointment || null;
    }
}
