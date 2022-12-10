export class Time {
  private miliseconds: number

  /** Time from string
    * @param {string} time - time in hh:mm:ss format
    */
  constructor(time: string);
  /** Time from miliseconds
    * @param {number} miliseconds - time miliseconds
    */
  constructor(miliseconds: number);
  /** Time from hour, minutes, and seconds. */
  constructor(hours: string | number, minutes?: number, seconds?: number) {
    if (typeof hours === 'string') {
      const [_hours, _minutes, _seconds] = this.parseTime(hours)
      this.miliseconds = _hours * 60 * 60 * 1000 + _minutes * 60 * 1000 + _seconds * 1000
      return
    }
    if (typeof minutes === 'undefined') {
      this.miliseconds = hours
      return
    }
    this.miliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + (seconds ?? 0) * 1000
  }

  /**
    * Parse time in hh:mm:ss format
    */
  private parseTime(time: string) {
    const pattern = /(\d{2}):(\d{2}):(\d{2})$/
    const [match] = pattern.exec(time)
    if (match !== time) {
      throw new Error(`Invalid time format: ${time}`)
    }
    const [hours, minutes, seconds] = time.split(':')
    return [
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
    ]
  }

  public getHours(): number {
    return Math.floor(this.miliseconds / (1000 * 60 * 60))
  }
  public getMinutes() {
    return Math.floor(this.miliseconds / (1000 * 60)) % 60
  }
  public getSeconds() {
    return Math.floor(this.miliseconds / 1000) % 60
  }
  public getMiliseconds() {
    return this.miliseconds
  }
  public getTime(): string {
    return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`
  }
  public isBefore(time: Time){
    if(this.miliseconds > time.miliseconds){
      return false
    }
    return true
  }
}
