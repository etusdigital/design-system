import { type Option as OptionT } from "./Option";

export type Option = OptionT & {
  path?: string;
  selected?: boolean;
  options?: Option[];
};