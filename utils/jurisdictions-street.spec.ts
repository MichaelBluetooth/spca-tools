import { getAddress } from "./address-utils";
import { Street } from "./jurisdictions";
import { Logger } from "./logger";

describe('Jurisdictions - Street', () => {
    [
        {
            street: new Street(1, 300, 'Both', 'OLD PERUVILLE', 'RD'),
            testValue: '80 Old Peruville Rd',
            expectedMatch: true
        },
        {
            street: new Street(100, 775, 'Both', 'MEADOW', 'ST', 'S'),
            testValue: '500 South Meadow St',
            expectedMatch: true
        },
        {
            street: new Street(100, 775, 'Both', 'MEADOW', 'ST', 'S'),
            testValue: '164 E. Main St', 
            expectedMatch: false
        },
        {
            street: new Street(100, 775, 'Both', 'MEADOW', 'ST', 'S'),
            testValue: '22 South Main St', 
            expectedMatch: false
        },
        {
            street: new Street(100, 775, 'Even', 'Main', 'ST', 'S'),
            testValue: '122 South Main St', 
            expectedMatch: true
        },
        {
            street: new Street(100, 775, 'Even', 'Main', 'ST', 'S'),
            testValue: '133 South Main St', 
            expectedMatch: false
        },
        {
            street: new Street(100, 775, 'Odd', 'Main', 'ST', 'S'),
            testValue: '133 South Main Circle', 
            expectedMatch: false
        },
        {
            street: new Street(100, 775, 'Odd', 'Main', 'ST', 'S'),
            testValue: '133 South Main Circle', 
            expectedMatch: false
        },
        {
            street: new Street(1, 1000, 'Both', 'Danby', 'RD', 'S'),
            testValue: '24 South Danby Road', 
            expectedMatch: true
        }
    ].forEach(testCase => {
        it(`Matches for "${testCase.testValue}"`, () => {
            Logger.enableDebug();
            const address = getAddress(testCase.testValue);
            const isMatch = testCase.street.isMatch(address.streetNumber, address.streetName, address.suffix, address.prefix);
            expect(isMatch).toBe(testCase.expectedMatch);
        });
    })

    it('Matches streets', () => {
        
    });
});