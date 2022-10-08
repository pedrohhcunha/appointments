import { describe, expect, it } from "vitest";
import { createAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("create-appointment - service", () => {
    it('should be able to create an appointment', () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const sut = new createAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2021-01-02');
        const endsAt = getFutureDate('2021-01-04');

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: startsAt,
            endsAt: endsAt,
        })).resolves.toBeInstanceOf(Appointment);
    });
    it('should not be able to create an appointment that overlaps with another appointment', async () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const sut = new createAppointment(appointmentsRepository);

        const startsAt = getFutureDate('2021-01-02');
        const endsAt = getFutureDate('2021-01-05');

        await sut.execute({
            customer: 'John Doe',
            startsAt: startsAt,
            endsAt: endsAt,
        });

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2021-01-03'),
            endsAt: getFutureDate('2021-01-06'),
        })).rejects.toThrowError('This appointment overlaps with another appointment');

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2021-01-01'),
            endsAt: getFutureDate('2021-01-03'),
        })).rejects.toThrowError('This appointment overlaps with another appointment');

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2021-01-01'),
            endsAt: getFutureDate('2021-01-06'),
        })).rejects.toThrowError('This appointment overlaps with another appointment');

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2021-01-03'),
            endsAt: getFutureDate('2021-01-04'),
        })).rejects.toThrowError('This appointment overlaps with another appointment');
    });
});
