import { expect, test } from 'vitest';
import { Appointment } from "./appointment";
import {getFutureDate} from "../utils/get-future-date";

test('create an appointment', () => {
    const startsAt = getFutureDate('2021-01-02');
    const endsAt = getFutureDate('2021-01-04');

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt: startsAt,
        endsAt: endsAt,
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toBe('John Doe');
});

test('cannot create an appointment with an end date before the start date', () => {
    const startsAt = getFutureDate('2021-01-02');
    const endsAt = getFutureDate('2021-01-01');

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt: startsAt,
            endsAt: endsAt,
        });
    }).toThrow();
});

test('cannot create an appointment in the past', () => {
    const startsAt = new Date('1979-01-01');
    const endsAt = getFutureDate('2021-01-01');

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt: startsAt,
            endsAt: endsAt,
        });
    }).toThrow();
});
