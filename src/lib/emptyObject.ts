type objWithProperties<Type> = {
  [Property in keyof Type]: any
}
export function isEmpty<T>(obj: objWithProperties<T>) {
  for(const key in obj) {
    if(typeof obj[key] !== "undefined") {
      return false
    }
  }
  return true
}
