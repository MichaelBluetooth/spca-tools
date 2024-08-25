import { Address, extractAddress, extractStreetNumber, getAddress } from "./address-utils";

describe('address utils', () => {
    [
        {
            raw: '123 W Awesome Street',
            expected: {
                streetNumber: 123,
                streetName: 'Awesome',
                suffix: 'st',
                prefix: 'w'
            }
        },
        {
            raw: '123 Main Lane',
            expected: {
                streetNumber: 123,
                streetName: 'Main',
                suffix: 'ln',
                prefix: null
            }
        },
        {
            raw: '123 Special Place Circle',
            expected: {
                streetNumber: 123,
                streetName: 'Special Place',
                suffix: 'cir',
                prefix: null
            }
        },
        {
            raw: 'Extra Special Address With No Number heights',
            expected: {
                streetNumber: null,
                streetName: 'Extra Special Address With No Number',
                suffix: 'hts',
                prefix: null
            }
        },
        {
            raw: '3 N. Main Street',
            expected: {
                streetNumber: 3,
                streetName: 'Main',
                suffix: 'st',
                prefix: 'n'
            }
        },
        {
            raw: '80 Old Peruville Rd',
            expected: {
                streetNumber: 80,
                streetName: 'Old Peruville',
                suffix: 'rd',
                prefix: null
            }
        },
        {
            raw: '24 South Danby Road',
            expected: {
                streetNumber: 24,
                streetName: 'Danby',
                suffix: 'rd',
                prefix: 's'
            }
        },
        {
            raw: '500 S Meadow Street Wegmans',
            expected: {
                streetNumber: 500,
                streetName: 'Meadow',
                suffix: 'st',
                prefix: 's'
            }
        }
    ].forEach(testCase => {
        it(`Gets the address parts for "${testCase.raw}"`, () => {
            const address: Address = getAddress(testCase.raw);
            expect(address).toEqual(testCase.expected);
        });
    });

    [
        {
            address: '3427 Slaterville Road',
            expectedStreetNumber: 3427
        },
        {
            address: '2189 State Route 90',
            expectedStreetNumber: 2189
        },
        {
            address: 'Perry City Road',
            expectedStreetNumber: null
        },
        {
            address: '205A W Court Street',
            expectedStreetNumber: 205
        },
        {
            address: 'Hancock Street Ithaca',
            expectedStreetNumber: null
        },
        {
            address: '2185 Hanshaw Road',
            expectedStreetNumber: 2185
        },
        {
            address: '500 South Meadow St',
            expectedStreetNumber: 500
        }
    ].forEach(testCase => {
        it(`extracts the street number from address: '${testCase.address}'`, () => {
            const value = extractStreetNumber(testCase.address);
            expect(value).toEqual(testCase.expectedStreetNumber);
        });
    });
});