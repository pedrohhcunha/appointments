import { describe, expect, it } from "vitest";
import { createAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";

describe("create-appointment - service", () => {
    it('should be able to create an appointment', () => {
        const sut = new createAppointment();

        const starsAt = new Date();
        const endsAt = new Date();

        endsAt.setHours(starsAt.getHours() + 1);

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: starsAt,
            endsAt: endsAt,
        })).resolves.toBeInstanceOf(Appointment);
    });
});
