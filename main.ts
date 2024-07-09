import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { AnimalIntakeExtended } from './models/animal-intake-extended';
import { parseAnimalIntakeExtended } from './utils/parse-animal-intake-extended';
import { validateAnimalIntakeExtended } from './utils/validate-animal-intake-extended';

const results: AnimalIntakeExtended[] = [];

const filePath = process.argv[2];

createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        results.push(parseAnimalIntakeExtended(data));
    })
    .on('end', () => {

        const problems: { intake: AnimalIntakeExtended, errors: string[] }[] = [];

        results.forEach((intake) => {
            const intakeErrors = validateAnimalIntakeExtended(intake);
            if (intakeErrors.length > 0) {
                problems.push({
                    intake: intake,
                    errors: intakeErrors
                });
            }
        });

        console.log(`There are ${problems.length} rows with errors`);
        console.log(`\r\n`);
        console.log(`Summary:`);
        console.log(`=======================================`);
        problems.forEach((problem) => {
            console.log(`Animal ID: ${problem.intake.animalId}, ARN: ${problem.intake.arn} --- ${problem.errors.length} problem(s)`);
        });

        console.log(`\r\n`);
        console.log(`Details:`);
        console.log(`=======================================`);
        problems.forEach((problem) => {            
            console.log(`Animal ID: ${problem.intake.animalId}, ARN: ${problem.intake.arn}`);
            problem.errors.forEach(error => {
                console.log(`\t- ${error}`);
            });
        });
    });