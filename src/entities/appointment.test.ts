import { expect, test } from 'vitest';
import { Appointment } from "./appointment";

test('create an appointment', () => {
    const startDate  = new Date();
    const endDate = new Date();

    endDate.setHours(startDate.getHours() + 1);

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt: startDate,
        endsAt: endDate,
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toBe('John Doe');
});

test('cannot create an appointment with an end date before the start date', () => {
    const startDate  = new Date();
    const endDate = new Date();

    endDate.setHours(startDate.getHours() - 1);

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt: startDate,
            endsAt: endDate,
        });
    }).toThrow();
});
