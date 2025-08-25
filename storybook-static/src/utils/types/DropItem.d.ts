import { Item as ItemT } from './Item';
export type Item = ItemT & {
    selected?: boolean;
};
