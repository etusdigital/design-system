import { type Item as ItemT } from "./Item";
export type Item = ItemT & {
    path?: string;
    selected?: boolean;
};
