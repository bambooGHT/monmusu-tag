export default class TimeFormat {
  /** 地区时间格式化 */
  static formatArea(time: string): string {
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Intl.DateTimeFormat('af', options).format(date);
  };

  static formtIsoDate(time: string) {
    return time.split(".")[0].replace("T", " ");
  };
  /** 秒数转成分秒 */
  static duration(seconds: number): string {
    const m = Math.floor((seconds / 60 % 60));
    const s = Math.floor((seconds % 60));
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }
}
