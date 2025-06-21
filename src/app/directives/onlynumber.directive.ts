import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})

export class OnlyNumberDirective {
    el: ElementRef = inject(ElementRef);

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const key = event.key;
        const isSpecialKey =
            event.ctrlKey ||
            ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight'].includes(key);
        const isCopyPasteKey = (event.ctrlKey || event.metaKey) && ['a', 'c', 'v'].includes(key);
        const isNumberKey = /^\d+$/.test(key);
        const isDecimalPoint = key === '.';

        if (isSpecialKey || isCopyPasteKey || (isNumberKey && !isDecimalPoint)) {
            return;
        }
        if(isDecimalPoint ){
            return;
        }
        event.preventDefault();
    }
}