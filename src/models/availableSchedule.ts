export class AvailableSchedule {
  monday: [string, string][];
  tuesday: [string, string][];
  wednesday: [string, string][];
  thursday: [string, string][];
  friday: [string, string][];
  saturday: [string, string][];
  constructor(
    monday: [string, string][],
    tuesday: [string, string][],
    wednesday: [string, string][],
    thursday: [string, string][],
    friday: [string, string][],
    saturday: [string, string][],
    sunday: [string, string][]
  ) {
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
  }
  sunday: [string, string][];
}
