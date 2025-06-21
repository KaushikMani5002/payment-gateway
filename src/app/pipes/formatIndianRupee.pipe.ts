import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatIndianRupee'
})

export class FormatIndianRupee implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return `₹ ${Number(value).toLocaleString('en-IN')}`
    }
}