import { Subscription } from './subscription'

export class Event {

    public head?: Subscription;

    public subscribe(callback: (...args: any[]) => void): Subscription {
        const subscription = new Subscription(this, callback);
        if (this.head) {
            this.head.prev = subscription;
            subscription.next = this.head;
        }
        this.head = subscription;
        return subscription;
    }

    public fire(...args: any[]): void {
        let current = this.head
        while (current) {
            console.log(current)
            current.call(...args);
            current = current.next;
        }
    }

    public unsubscribe(subscription: Subscription): void {
        if (subscription.next) {
            subscription.next.prev = subscription.prev;
        }
        if (subscription.prev) {
            subscription.prev.next = subscription.next;
        }
        if (subscription === this.head) {
            this.head = subscription.next;
        }
    }
}