import xlsx from 'node-xlsx';
import { existsSync } from "fs";
import { Street } from "./jurisdictions";

export type Jurisdictions = { [key: string]: Street[]; };

function mapJurisdictions(jurisdiction: string): string {
    if(jurisdiction.toLowerCase() === 'TRUMANSBURG VILLAGE'.toLowerCase()){
        return 'ULYSSES'.toLowerCase();
    } else if (jurisdiction.toLowerCase() === 'cayuga heights'){
        return 'ithaca';
    } else {
        return jurisdiction.toLowerCase();
    }
}

export function readJurisdictions(fileNameAndPath: string): Jurisdictions {
    if (!existsSync(fileNameAndPath)) {
        throw `Jurisdictions file note found: "${fileNameAndPath}"`;
    }
    const sheets = xlsx.parse(fileNameAndPath);
    if (sheets.length === 0) {
        throw "No sheets found in jurisdictions file";
    }
    const sheet = sheets[0];
    const jurisdictions = {};
    sheet.data.forEach((row) => {
        if (row[0] !== 'Pre') {
            let jurisdiction = row[7]?.trim();
            const street: Street = new Street(
                +row[3], //low
                +row[4], //high
                row[5]?.trim() || null, //side
                row[1]?.trim() || null, //street name
                row[2]?.trim() || null, //suffix
                row[0]?.trim() || null, //prefix
            );

            if (jurisdiction) {
                jurisdiction = mapJurisdictions(jurisdiction);
                if(!jurisdictions[jurisdiction]){
                    jurisdictions[jurisdiction] = [];
                }                
                jurisdictions[jurisdiction].push(street);
            }
        }
    });
    return jurisdictions;
}