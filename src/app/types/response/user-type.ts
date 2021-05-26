/* All variables must have a type, but in this example isn't possible
 because i don't have explicit information of each user field */
export interface UserType {
  id: number;
  name: string | null;
  email: string | null;
  role: string | null;
  payrollNumber: string | null;
  departmentEng: string | null;
  departmentEsp: string | null;
  positionEng: string | null;
  positionEsp: string | null;
  language: string | null;
  hiringDate: string | null;
  area: number | null;
  codeLog: string | null;
  employeeKind: string | null;
  positionNumber: string | null;
  superior: string | null;
  timeDelay: any | null;
  disabilities: any | null;
  unjustifiedAbsences: any | null;
  behaviorReports: any | null;
  suspension: any | null;
  permitWithOutPayment: any | null;
  incidents: string | null;
  accidents: string | null;
  checkObjectives: string | null;
  objectiveChecker: string | null;
  status: string | null;
  objectiveManager: string | null;
}
