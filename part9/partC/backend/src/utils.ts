import {
  Diagnosis,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HealthType,
  NewPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};
const isDate = (s: string): boolean => {
  return Boolean(Date.parse(s));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};
// const isType = (param: string): param is HealthType => {
//   return Object.values(HealthType)
//     .map((v) => v.toString())
//     .includes(param);
// };
// const parseType = (type: unknown): HealthType => {
//   if (!type || !isString(type) || !isType(type)) {
//     throw new Error("Incorrect or missing type");
//   }
//   return type;
// };
const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return rating;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("type" in object) ||
    !("description" in object) ||
    !("date" in object) ||
    !("specialist" in object)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  let newEntry: EntryWithoutId | undefined;

  if ("type" in object) {
    // newEntry.type = parseType(object.type);
    switch (object.type) {
      case HealthType.HealthCheck:
        if (!("healthCheckRating" in object))
          throw new Error("Incorrect data: health check rating is missing");

        newEntry = {
          description: parseName(object.description),
          date: parseDate(object.date),
          type: HealthType.HealthCheck,
          specialist: parseSpecialist(object.specialist),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        break;
      case HealthType.Hospital:
        if (
          !("discharge" in object) ||
          typeof object.discharge !== "object" ||
          !object.discharge
        )
          throw new Error("Incorrect data: discharge is missing");

        if (!("date" in object.discharge) || !("criteria" in object.discharge))
          throw new Error(
            "Incorrect data: discharge is missing date or criteria",
          );
    
        newEntry = {
          description: parseName(object.description),
          date: parseDate(object.date),
          type: HealthType.Hospital,
          specialist: parseSpecialist(object.specialist),
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseName(object.discharge.criteria),
          },
        };
        break;
      case HealthType.OccupationalHealthcare:
        if (
          !("employerName" in object) ||
          !("sickLeave" in object) ||
          !object.sickLeave ||
          typeof object.sickLeave !== "object"
        ) {
          throw new Error("Incorrect data: employer name is missing");
        }
        if (!("endDate" in object.sickLeave) || !object.sickLeave) {
          throw new Error("Incorrect data: sick leave is missing end date");
        }
        if (!("startDate" in object.sickLeave) || !object.sickLeave) {
          throw new Error("Incorrect data: sick leave is missing start date");
        }
        newEntry = {
          description: parseName(object.description),
          date: parseDate(object.date),
          type: HealthType.OccupationalHealthcare,
          specialist: parseSpecialist(object.specialist),
          employerName: parseName(object.employerName),
          sickLeave: {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          },
        };
        break;
      default:
        throw new Error("Incorrect data: unknown type");
    }

    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(object);
    }
  }

  if (!newEntry) {
    throw new Error("Incorrect data: some fields are missing");
  }
  return newEntry;
};
// const toNewEntry = (object: unknown): EntryWithoutId => {
//   if (!object || typeof object !== "object")
//     throw new Error("Incorrect or missing data");
//   if ("type" in object) {
//     if (object.type === "HealthCheck") {
//       const newEntry: EntryWithoutId = {
//         description: parseName(object.description),
//         date: parseDate(object.date),
//         specialist: parseName(object.specialist),
//       };
//     }

//     if ("description" in object && "date" in object && "specialist" in object) {
//     }
//   }
//   throw new Error("Incorrect data: some fields are missing");
// };
export default toNewPatient;
