import { withColor } from '../styles';

export function formattedInArrows(content: string, clear: boolean = false) {
    return withColor(`[`, 'gray', clear) + content + withColor(`]`, 'gray', clear);
}
