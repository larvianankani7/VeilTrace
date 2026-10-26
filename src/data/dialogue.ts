export type DialogueLine = {
  id: string;
  speaker: "M" | "Unknown" | "SYSTEM";
  text: string;
};

export const openingDialogue: DialogueLine[] = [
  {
    id: "unknown-awakening",
    speaker: "Unknown",
    text: "So, this is what you get for crossing me. You must atone for your sins… but I'm not quite that cruel, you know? Find your way out of here, and perhaps you'll earn a chance to escape. Just make certain no one can trace you. Oh—and you might want to hurry. Your time is limited. Good luck.",
  },
  {
    id: "m-awakening",
    speaker: "M",
    text: "What the hell was that? Who… who was she? Damn it… my whole body's aching.",
  },
  {
    id: "m-room",
    speaker: "M",
    text: "Locked in a room with a computer and some cryptic threat… brilliant. What am I supposed to do now?",
  },
  {
    id: "system-breach",
    speaker: "SYSTEM",
    text: "Multiple services may be exposing identifying information. Your location and account activity may be traceable.",
  },
  {
    id: "m-computer",
    speaker: "M",
    text: "What does that even mean? Someone can find me through this thing? No, no… think, M. Ten minutes to do what, exactly?",
  },
];

export const breachScreen = {
  title: "SECURITY BREACH DETECTED",
  status: "SYSTEM STATUS: COMPROMISED · MANUAL INTERVENTION REQUIRED",
  warning: "UNAUTHORISED EXPOSURE: ACTIVE",
  objective: "FIND AND CONTAIN THE ELEVEN CRITICAL EXPOSURES.",
  countdown: "10:00",
  instruction:
    "Disconnect or restrict exposed services before the countdown expires. Failure to contain the breach will trigger the facility's emergency destruction sequence.",
};
