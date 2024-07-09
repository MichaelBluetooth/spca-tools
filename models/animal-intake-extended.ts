export interface AnimalIntakeExtended {
    animalId?: string;
    arn?: string;
    animalName?: string;
    species?: string;
    primaryBreed?: string;    
    secondaryBreed?: string;    //Mix, Standard, Bearded Dragon, Terrier, etc
    gender?: string;            //F, M or U
    age?: string;               //2yrs, 6mos, 0mos
    altered?: string;           //Yes, No
    danger?: string;            //Yes, No
    dangerReason?: string;
    primaryColor?: string;
    secondaryColor?: string;
    thirdColor?: string;
    colourPattern?: string;
    secondColourPattern?: string;
    size?: string;              //Large, Medium, Small, Extra Large
    preAltered?: string;        //Y, N, U
    spayNeutered?: string;      //Y, N, U
    spayNeuteredBy?: string;
    recordOwner?: string;
    intakeDateTime?: string;
    operationType?: string;
    operationSubType?: string;
    petId?: string;
    petIdType?: string;
    locationFound?: string;
    jurisdiction?: string;
    condition?: string;
    ageGroup?: string;  //2-7 years, 9 weeks - 6 months, 5-8 weeks
    doa?: string;
    siteName?: string;
    source?: string;
    intakeReason?: string;
    lengthOwned?: string;
    unit?: string;
    injuryType?: string;
    cause?: string;
    agencyName?: string;
    location?: string;
    subLocation?: string;
    asilomarStatus?: string; //Unhealthy/Untreatable, Treatable-Rehabilitatable
}