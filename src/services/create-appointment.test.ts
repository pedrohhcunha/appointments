import { describe, expect, it } from "vitest";
import { createAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import {getFutureDate} from "../utils/get-future-date";

describe("create-appointment - service", () => {
    it('should be able to create an appointment', () => {
        const sut = new createAppointment();

        const startsAt = getFutureDate('2021-01-02');
        const endsAt = getFutureDate('2021-01-04');

        expect(sut.execute({
            customer: 'John Doe',
            startsAt: startsAt,
            endsAt: endsAt,
        })).resolves.toBeInstanceOf(Appointment);
    });
});
