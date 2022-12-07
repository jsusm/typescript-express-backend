export function timeStringToDate(time: string){
  console.log({time})
  return new Date('1970-06-01T' + time)
}
/**
 *  Return true if date1 is before date2
 */
export function isBefore(date1: Date, date2: Date){
  return date2.getTime() > date1.getTime()
}

