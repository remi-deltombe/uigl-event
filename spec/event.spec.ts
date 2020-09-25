import { Event } from '../src/event';

describe('Event', () => {
    it('should fire event', () => {
        let value = 0;
        const event = new Event();
        event.subscribe(() => value = 1);
        event.fire();
        expect(value).toEqual(1);
    });

    it('should fire event with arguments', () => {
        let value = 0;
        const event = new Event();
        event.subscribe((a, b, c) => value = a + b * c);
        event.fire(1, 2, 3);
        expect(value).toEqual(7);
    });

    it('should fire event for all registration', () => {
        let value = 0;
        const event = new Event();
        event.subscribe(() => value++);
        event.subscribe(() => value++);
        event.subscribe(() => value++);
        event.fire();
        expect(value).toEqual(3);
    });

    it('should unregister registrations', () => {
        let value1 = 0;
        let value2 = 0;
        let value3 = 0;
        const event = new Event();
        const registration1 = event.subscribe(() => value1++);
        const registration2 = event.subscribe(() => value2++);
        const registration3 = event.subscribe(() => value3++);

        event.fire();

        expect(value1).toEqual(1);
        expect(value2).toEqual(1);
        expect(value3).toEqual(1);

        registration2.cancel();
        event.fire();

        expect(value1).toEqual(2);
        expect(value2).toEqual(1);
        expect(value3).toEqual(2);

        registration1.cancel();
        event.fire();

        expect(value1).toEqual(2);
        expect(value2).toEqual(1);
        expect(value3).toEqual(3);

        registration3.cancel();
        event.fire();

        expect(value1).toEqual(2);
        expect(value2).toEqual(1);
        expect(value3).toEqual(3);
    });
});