import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
    value: Date;
    timer: Observable<string>;

    constructor(ref: ChangeDetectorRef) {
    }

    transform(date: Date): Observable<String> {
        this.value = new Date(date);
        console.log(this.value)
        return this.getObservable()
    }

    private getObservable() {
        return interval(1000).pipe(startWith(0), map(() => {
            var result: string;
            // current time
            let now = new Date().getTime();

            // time since message was sent in seconds
            let delta = (now - this.value.getTime()) / 1000;

            // format string
            if (delta < 10) {
                result = 'Just now';
            }
            else if (delta < 60) { // sent in last minute
                result = Math.floor(delta) + ' seconds ago';
            }
            else if (delta < 3600) { // sent in last hour
                result = Math.floor(delta / 60) + ' minutes ago';
            }
            else if (delta < 86400) { // sent on last day
                result = Math.floor(delta / 3600) + ' hours ago';
            }
            else if (delta < 31536000) {  // sent more than one day ago
                result = Math.floor(delta / 86400) + ' days ago';
            }
            else { // sent more than one day ago
                result = Math.floor(delta / 31536000) + ' years ago';
            }
            return result;
        }))
    };
}