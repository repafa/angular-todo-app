import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateDateFactory() {
  return (c: FormControl) => {
    const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}$/;
    return isValidDate(c.value) ? null : {
      validateDate: {
        valid: false
      }
    };
  };
}

function isValidDate(date: string): boolean {
  if (!isValidFormat(date)) {
    return false;
  }

  if (!isFutureDate(date)) {
    return false;
  }

  let dateData = date.split('-');
  let year = +dateData[0];
  let month = +dateData[1];
  let day = +dateData[2];
  let isLeapYear = checkLeapYear(year);
  let daysInMonth = 31;
  switch (month) {
    case 2: daysInMonth = 28 + +isLeapYear; break;
    case 4:
    case 6:
    case 9:
    case 11: daysInMonth = 30; break;
  }

  return day && month && year && day <= daysInMonth && month <= 12;
}

function checkLeapYear(year: number): boolean {
  return year % 400 === 0 || year % 4 === 0 && !(year % 100 === 0);
}

function isValidFormat(date: string): boolean {
  const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}$/;
  return DATE_REGEXP.test(date);
}

function isFutureDate(date: string): boolean {
  return Date.parse(date)  > Date.now();
}

@Directive({
  selector: '[validateDate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidatorDirective), multi: true }
  ]
})

export class DateValidatorDirective {

  validator: Function;

  constructor() {
    this.validator = validateDateFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
