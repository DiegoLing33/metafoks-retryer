import { withColor } from '../styles';
import { formattedInArrows } from './formattedInArrows';

export function formattedDate(date: Date, clear = false) {
    return formattedInArrows(withColor(date.toISOString(), 'white', clear), clear);
}
