import * as moment from 'moment';


export function getCurrentLocalDateString(): string {
  return moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
}
