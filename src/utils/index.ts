import { cx } from 'classix';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: Array<string | false | null | undefined>) => twMerge(cx(...inputs));

export default cn;
