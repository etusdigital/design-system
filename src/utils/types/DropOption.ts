import { type Option as OptionT } from "./Option";

export type Option = OptionT & {
  selected?: boolean;
  options?: Option[];
};