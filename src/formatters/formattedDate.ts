import { formattedInArrows } from './formattedInArrows';
import { withColor } from '../styles';

export function formattedDate(date: Date, clear: boolean = false) {
    return formattedInArrows(withColor(date.toISOString(), 'white', clear));
}
