import * as addresser from 'addresser';

export interface Address {
    streetNumber?: number;
    prefix?: string;
    streetName: string;
    suffix: string;
}

const addressRegex = /(\d+([aA-zZ]|)\s|)((North|South|East|West|N|S|E|W|)(\.|)([aA-zZ]*\s){1,2}(Street|Road|Lane|Avenue|Drive|St|Rd|Ln|Ave|Dr|Rt)|(State\sRoute\s\d+))/ig
const streetNumberRegex = /(\d+\s|)(.*\s)(Way|Lane|Ln|Street|St|Road|Rd|Drive|Dr)/ig

export function extractAddress(raw: string, defaultState = 'NY'): string {
    const matches: RegExpMatchArray = raw.match(addressRegex);
    if (matches && matches.length > 0) {
        return matches[0];
    } else {
        return null;
    }
    // const parsed: addresser.IParsedAddress = addresser.parseAddress(raw);
    // return parsed.addressLine1;
}

export function getAddress(raw: string): Address {
    const address: Address = {
        streetNumber: null,
        streetName: null,
        suffix: null,
        prefix: null
    };

    const parts = raw.split(' ');

    let idx = 0;

    address.streetNumber = extractStreetNumber(parts[idx]) || null;
    if (address.streetNumber) {
        idx++;
    }

    address.prefix = extractStreetPrefix(parts[idx]) || null;
    if (address.prefix) {
        idx++;
    }

    const streetNameParts = [];
    for (let i = idx; idx < parts.length - 1; idx++) {
        streetNameParts.push(parts[idx]);
    }
    address.streetName = streetNameParts.join(' ');

    address.suffix = extractStreetSuffix(parts[parts.length - 1]) || null;

    return address;
}


export function extractStreetNumber(address: string): number {
    const matches: RegExpMatchArray = address.match(/^\d+/);
    if (matches && matches.length > 0) {
        return +matches[0];
    } else {
        return null;
    }
}

export function extractStreetPrefix(address: string): string {
    const matches: RegExpMatchArray = address.toLowerCase().match(/^((west|w\.|w)|(east|e\.|e)|(north|n\.|n)|(south|s\.|s))$/i);
    if (matches && matches.length > 0) {
        return matches[0].toLowerCase()
            .replace('.', '')
            .replace('north', 'n')
            .replace('south', 's')
            .replace('east', 'e')
            .replace('west', 'w')
    } else {
        return null;
    }
}

export function extractStreetSuffix(part: string): string {
    return part.toLowerCase()
        .replace('lane', 'ln')
        .replace('street', 'st')
        .replace('avenue', 'ave')
        .replace('circle', 'cir')
        .replace('road', 'rd')
        .replace('drive', 'dr')
        .replace('place', 'pl')
        .replace('heights', 'hts')
        .replace('parkway', 'pkwy');
}