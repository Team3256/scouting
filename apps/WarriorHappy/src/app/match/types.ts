import { History } from "./components/ActionGrid";

export type UltimateHistory = {
  log: History;
  checkboxes?: { [key: string]: boolean };
};
