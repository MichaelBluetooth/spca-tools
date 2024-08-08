import { Logger } from "./logger";

function normalizeStreetName(streetName: string): string {
    return streetName.toLowerCase()
        .replace('north', 'n')
        .replace('south', 's')
        .replace('west', 'w')
        .replace('south', 'e')
        .replace('lane', 'ln')
        .replace('street', 'st')
        .replace('avenue', 'ave')
        .replace('circle', 'cir')
        .replace('road', 'rd')
        .replace('drive', 'dr')
        .replace('place', 'pl')
        .replace('heights', 'hts')
}

export class Street {
    constructor(
        private low: number,
        private high: number,
        private side: 'Both' | 'Even' | 'Odd',
        private streetName: string,
        private streetSuffix: string,
        private streetPrefix?: string) {
    }

    isMatch(streetNumber: number, streetName: string, streetSuffix: string, streetPrefix?: string) {
        const streetNameMatches = streetName.toLowerCase() === this.streetName.toLowerCase();
        const streetPrefixMatches = streetPrefix?.toLowerCase() === this.streetPrefix?.toLowerCase();
        const streetSuffixMatches = streetSuffix?.toLowerCase() === this.streetSuffix?.toLowerCase();
        const numberMatches = streetNumber >= this.low && streetNumber <= this.high;

        let sideMatches = true;
        if (this.side === 'Odd') {
            sideMatches = streetNumber % 2 === 1;
        } else if (this.side === 'Even') {
            sideMatches = streetNumber % 2 === 0;
        }

        Logger.LogDebug(`Validate: Prefix=${streetPrefix} Number=${streetNumber} Name=${streetName} Suffix=${streetSuffix}`);
        Logger.LogDebug('  against  ');
        Logger.LogDebug(`Prefix=${this.streetPrefix} Name=${this.streetName} Low=${this.low} High=${this.high} Side=${this.side} Suffix=${this.streetSuffix}`);
        Logger.LogDebug(`streetNameMatches=${streetNameMatches} && streetPrefixMatches=${streetPrefixMatches} && streetSuffixMatches=${streetSuffixMatches} && numberMatches=${numberMatches} && sideMatches=${sideMatches}`);
        Logger.LogDebug('\n');

        return streetNameMatches && streetPrefixMatches && streetSuffixMatches && numberMatches && sideMatches;
    }
}