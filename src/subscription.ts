import { Event } from "./event";

export class Subscription {
    public prev?: Subscription;
    public next?: Subscription;

    private readonly event: Event;
    private readonly callback: (...args: any[]) => void;


    public constructor(event: Event, callback: (...args: any[]) => void) {
        this.event = event;
        this.callback = callback;
    }

    public call(...args: any[]): void {
        this.callback.apply(null, args);
    }

    public cancel(): void {
        this.event.unsubscribe(this);
    }
} 