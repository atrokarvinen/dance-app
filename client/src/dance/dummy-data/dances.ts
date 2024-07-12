import { Dance } from "../dance";
import { tangoBasicStep, waltzBasicStep } from "./dance-patterns";

export const dummyDances: Dance[] = [
  { danceId: 1, name: "Waltz", dancePatterns: [waltzBasicStep] },
  { danceId: 2, name: "Tango", dancePatterns: [tangoBasicStep] },
];
