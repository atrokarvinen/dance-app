import { DancePattern } from "../dance";

export const waltzBasicStep: DancePattern = {
  aliases: ["Basic Step"],
  counterPars: [],
  danceId: 1,
  dancePatternId: 1,
  description: "The basic step for the Waltz.",
  imageUrl: "https://via.placeholder.com/150",
  name: "Basic Step",
  predecessors: [],
  successors: [],
  variations: [],
  videoUrl: "https://www.youtube.com/watch?v=1",
};

export const waltzNaturalTurn: DancePattern = {
  aliases: ["Natural Turn"],
  counterPars: [],
  danceId: 1,
  dancePatternId: 2,
  description: "The natural turn for the Waltz.",
  imageUrl: "https://via.placeholder.com/150",
  name: "Natural Turn",
  predecessors: [],
  successors: [],
  variations: [],
  videoUrl: "https://www.youtube.com/watch?v=3",
};

export const tangoBasicStep: DancePattern = {
  aliases: ["Basic Step"],
  counterPars: [],
  danceId: 2,
  dancePatternId: 3,
  description: "The basic step for the Tango.",
  imageUrl: "https://via.placeholder.com/150",
  name: "Basic Step",
  predecessors: [],
  successors: [],
  variations: [],
  videoUrl: "https://www.youtube.com/watch?v=2",
};

export const dummyPatterns: DancePattern[] = [
  waltzBasicStep,
  waltzNaturalTurn,
  tangoBasicStep,
];
