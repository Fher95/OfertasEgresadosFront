export class DateMinMaxControl {
  minDate?: Date;
  maxDate?: Date;

  onMinDateSelect() {
    console.log("Min date selection changed");
    if (this.minDate instanceof Date) {
      console.log("Min date is instance of Date")
      if (this.minDate > this.maxDate) {
        console.log("Changing max date");
        this.maxDate = this.minDate;
      }
    }
  }

  onMaxDateSelect() {
    if (this.maxDate instanceof Date) {
      if (this.maxDate < this.minDate) {
        this.maxDate = this.minDate;
      }
    }
  }
}
