import { AnimalIntakeExtended } from "../models/animal-intake-extended";
import { extractAddress, extractStreetNumber, getAddress } from "./address-utils";
import { Logger } from "./logger";
import { Jurisdictions, readJurisdictions } from "./read-jurisdictions";

export function validateAnimalIntakeExtended(intake: AnimalIntakeExtended, jurisdictions: Jurisdictions): string[] {
    const errors: string[] = [];

    const validators = [
        validateLocationFound,
        validateAnimalName,
        validateGender,
        validateSpyNeuterStatus,
        validateAge,
        validateSex,
        validateJurisdiction(jurisdictions)
    ];

    validators.forEach(validate => {
        const error = validate(intake);
        if (error) {
            errors.push(error);
        }
    });

    return errors;
}

//assert 'age' has a value
// note: in the future we need to validate that 'age' falls within 'ageGroup'
// however, we can't right now because the AnimalIntakeExtended report rounds ages :()
export function validateAge(intake: AnimalIntakeExtended): string {
    if (!intake.age) {
        return 'Age is empty'
    }
    return null;
}

//Sex cannot be 'unknown' if it's a cat or dog
export function validateSex(intake: AnimalIntakeExtended): string {
    const isCatOrDog = intake.species?.toLowerCase() === 'cat' || intake.species?.toLowerCase() === 'dog';
    if (isCatOrDog && (!intake.gender || intake.gender?.toLowerCase() === 'unknown')) {
        return `Sex cannot be '${intake.gender}' when the species is cat or dog`
    } else {
        return null;
    }
}

export function validateRequiredFields(intake: AnimalIntakeExtended): string {
    const missingFields = [];
    if (!intake.age) {
        missingFields.push('age');
    }
    if (!intake.arn) {
        missingFields.push('arn');
    }
    if (!intake.gender) {
        missingFields.push('gender');
    }
    if (intake.spayNeutered !== 'Y' && intake.spayNeutered !== 'N') {
        missingFields.push('spayed/neutered status');
    }

    if (missingFields.length > 0) {
        return `Missing the following required fields: ${missingFields.join(', ')}`;
    } else {
        return null;
    }
}

//The "location found" field must be set if the type is "Stray"
export function validateLocationFound(intake: AnimalIntakeExtended): string {
    if (intake.operationType?.toLowerCase() === 'stray') {
        return intake.locationFound === null ? `The 'Location Found' field must have a value when the intake type is 'Stray'` : null
    } else {
        return null;
    }
}

//Spay/Neuter status must be set of the intake type is "Stray"
export function validateSpyNeuterStatus(intake: AnimalIntakeExtended): string {
    const isStray = intake.operationType?.toLowerCase() === 'stray';
    if (isStray && intake.spayNeutered !== 'Y' && intake.spayNeutered !== 'N') {
        return `Intakes of type 'Stray' must have the spy/neuter status set (value was '${intake.spayNeutered}')`;
    } else {
        return null;
    }
}

//Animal gender must be set to "M" or "F" if it's a cat or dog
export function validateGender(intake: AnimalIntakeExtended): string {
    const isCatOrDog = intake.species?.toLowerCase() === 'cat' || intake.species?.toLowerCase() === 'dog';
    if (isCatOrDog) {
        return (intake.gender === 'M' || intake.gender === 'F') ? null : `Gender must be set to "M" or "F" if the species is ${intake.species}`;
    } else {
        return null;
    }
}

//Animal name must:
//   end with "-c" if it's a cat
//   end with "-d" if it's a dog
//   end with "-m" if it's anything else
export function validateAnimalName(intake: AnimalIntakeExtended): string {
    if (!intake.species) {
        return 'Intake is missing value "Species"'
    } else {
        //Intentionally examining case sensitive names (for now unless someone tells me otherwise)
        let expectedNameEnding = '-m';
        if (intake.species?.toLowerCase() === 'dog') {
            expectedNameEnding = '-d'
        } else if (intake.species?.toLowerCase() === 'cat') {
            expectedNameEnding = '-c'
        }

        if (!intake.animalName.endsWith(expectedNameEnding)) {
            return `Name should end with '${expectedNameEnding}' when species is '${intake.species}'`;
        }
    }

    return null;
}

export const validateJurisdiction = ((jurisdictions: Jurisdictions) => (intake: AnimalIntakeExtended) => {
    const fixedJurisdiction = intake.jurisdiction
        ?.replace(', Town of', '')
        ?.toLowerCase();

    if (intake.operationType?.toLowerCase() === 'stray') {
        if (!jurisdictions[fixedJurisdiction]) {
            return `No jurisdiction matches: ${intake.jurisdiction}`;
        } else {
            const locationFound = getAddress(intake.locationFound);
            const isMatch = jurisdictions[fixedJurisdiction].some(street => {
                return street.isMatch(locationFound.streetNumber, locationFound.streetName, locationFound.suffix, locationFound.prefix);
            });
            
            if (isMatch) {
                return null;
            } else {
                let expected = null;
                Logger.LogDebug(`Intake jurisdiction incorrect, looking for expected match (${fixedJurisdiction})`);
                Object.keys(jurisdictions).forEach(jurisdiction => {                    
                    Logger.LogDebug(`Checking ${jurisdiction}`);
                    const isMatch = jurisdictions[jurisdiction].some(street => {
                        return street.isMatch(locationFound.streetNumber, locationFound.streetName, locationFound.suffix, locationFound.prefix);
                    });
                    if(isMatch){
                        expected = jurisdiction;
                    }
                });

                return `Location found (${intake.locationFound}) did not match jurisdiction. Expected="${expected ? expected : '[none found]'}", Actual="${fixedJurisdiction}"`;
            }
        }
    } else {
        return null;
    }
});


