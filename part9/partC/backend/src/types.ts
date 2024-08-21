export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
}

export type NoSsn = Omit<Patient, "ssn">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = Omit<Patient, "id">;