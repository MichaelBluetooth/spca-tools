export function ageInDays(value: string): number {
    let multiplier = 1;
    if (value.indexOf('mos') > -1) {
        multiplier = 7 * 4; //7 days a week x 4 weeks a month
    } else if (value.indexOf('yrs')) {
        multiplier = 7 * 4 * 12; //7 days a week x 4 weeks a month x 12 months a year
    }

    return multiplier;
}