export class Utilities {
  public static parseDateToString(date: Date, separator: String): String {
    return date == null && separator != null
      ? ''
      : date.getDate() +
          '' +
          separator +
          '' +
          (date.getMonth() + 1) +
          '' +
          separator +
          date.getFullYear();
  }

  public static parseStringToDate(date: String, separator: string): Date {
    var result: Date = new Date();
    if (date != null && separator != null) {
      let parts: String[] = date.split(separator);
      if (parts.length == 3) {
        result = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      }
    }
    return result;
  }

  public static dateToString(date: Date): string {
    return date == null
      ? ''
      : date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear();
  }
}
