import { validateAnimalIntakeExtended, validateAnimalName, validateLocationFound, validateSpyNeuterStatus } from "./validate-animal-intake-extended";

describe('Validators', () => {
    describe('validateLocationFound', () => {
        it('Returns an error if the type is stray and the locationFound field is blank', () => {
            const result = validateLocationFound({locationFound: null, operationType: 'stray'});
            expect(result).not.toBeNull();
        });


        it('Returns no error if the type is stray and the locationFound field is populated', () => {
            const result = validateLocationFound({locationFound: "East Ithaca", operationType: 'stray'});
            expect(result).toBeNull();
        });
    });

    describe('validateSpyNeuterStatus', () => {
        it('Returns an error when the type is stray and no value is set', () => {
            const result = validateSpyNeuterStatus({operationType: 'stray', spayNeutered: null});
            expect(result).not.toBeNull();
        });

        it('Returns no error when the type is stray and the value is set to "N"', () => {
            const result = validateSpyNeuterStatus({operationType: 'stray', spayNeutered: "N"});
            expect(result).toBeNull();
        });

        it('Returns no error when the type is stray and the value is set to "Y"', () => {
            const result = validateSpyNeuterStatus({operationType: 'stray', spayNeutered: "Y"});
            expect(result).toBeNull();
        });

        it('Returns no error when the type is not stray', () => {
            const result = validateSpyNeuterStatus({operationType: 'other', spayNeutered: null});
            expect(result).toBeNull();
        });
    });

    describe('validateAnimalName', () => {
        it('Returns no error when the cats name ends with "-c"', () => {
            const result = validateAnimalName({species: 'cat', animalName: 'blahblah-c'});
            expect(result).toBeNull();
        });

        it('Returns an error when the cats name does not end with "-c"', () => {
            const result = validateAnimalName({species: 'cat', animalName: 'blahblah-d'});
            expect(result).not.toBeNull();
        });

        it('Returns no error when the dogs name ends with "-d"', () => {
            const result = validateAnimalName({species: 'dog', animalName: 'blahblah-d'});
            expect(result).toBeNull();
        });

        it('Returns an error when the dogs name does not end with "-d"', () => {
            const result = validateAnimalName({species: 'dog', animalName: 'blahblah-c'});
            expect(result).not.toBeNull();
        });

        it('Returns an error when the species is not "cat" or "dog" and the animal name does not end with "-m"', () => {
            const result = validateAnimalName({species: 'racoon', animalName: 'blahblah-d'});
            expect(result).not.toBeNull();
        });

        it('Returns bo error when the species is not "cat" or "dog" and the animal name ends with "-m"', () => {
            const result = validateAnimalName({species: 'racoon', animalName: 'blahblah-m'});
            expect(result).toBeNull();
        });
    });
});