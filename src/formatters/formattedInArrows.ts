import { withColor } from '../styles';

export function formattedInArrows(content: string, clear = false) {
    return withColor(`[`, 'gray', clear) + content + withColor(`]`, 'gray', clear);
}
