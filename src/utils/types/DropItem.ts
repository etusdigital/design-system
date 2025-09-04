import { type Item as ItemT } from "./Item";

export type Item = ItemT & {
  selected?: boolean;
  items?: Item[];
};