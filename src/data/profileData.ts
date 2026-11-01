export type ProfileData = {
  documentId: string;
  restriction: string;
  classification: string;
  fullName: string;
  nickname: string;
  age: number;
  sex: string;
  nationality: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  fathersName: string;
  mothersName: string;
  assignedNode: string;
  status: string;
  incidentCode: string;
  investigationNotes: string;
  initialLocation: string;
};

export const PROFILE_DATA: ProfileData = {
  documentId: "VT-DOS-0882",
  restriction: "TIER-2 RESTRICTED / READ-ONLY",
  classification: "FICTIONAL SIMULATED RECORD",
  fullName: "Merdin Morov",
  nickname: "M",
  age: 28,
  sex: "Male",
  nationality: "Republic of Valen",
  occupation: "Systems Infrastructure Analyst",
  email: "merdinmorov1@gmail.com",
  phoneNumber: "(202) 555-0147",
  fathersName: "Daniel Morov",
  mothersName: "Elena Morova",
  assignedNode: "VT-NODE-08 (Containment Wing)",
  status: "Detained / Protocol Locked",
  incidentCode: "SEC-BREACH-0x4B",
  investigationNotes:
    "Subject was isolated following anomalous configuration changes detected in external data relays. Local terminal session remains operational under temporary containment protocol. Network traces must be restricted to prevent automated telemetry capture.",
  initialLocation: "North District · Building 08",
};

export const PROFILE_RAW_TEXT = `[PROFILE RECORD // PERSONNEL DOSSIER]
=========================================
DOCUMENT ID     : ${PROFILE_DATA.documentId}
RESTRICTION     : ${PROFILE_DATA.restriction}
CLASSIFICATION  : ${PROFILE_DATA.classification}
=========================================

--- IDENTIFICATION ---
Full Name       : ${PROFILE_DATA.fullName}
Nickname        : ${PROFILE_DATA.nickname}
Age             : ${PROFILE_DATA.age}
Sex             : ${PROFILE_DATA.sex}
Nationality     : ${PROFILE_DATA.nationality}
Occupation      : ${PROFILE_DATA.occupation}

--- CONTACT DETAILS ---
Email           : ${PROFILE_DATA.email}
Phone Number    : ${PROFILE_DATA.phoneNumber}

--- FAMILY RECORDS ---
Father's Name   : ${PROFILE_DATA.fathersName}
Mother's Name   : ${PROFILE_DATA.mothersName}

--- ASSIGNMENT & STATUS ---
Assigned Node   : ${PROFILE_DATA.assignedNode}
Status          : ${PROFILE_DATA.status}
Incident Code   : ${PROFILE_DATA.incidentCode}

--- INVESTIGATION NOTES ---
${PROFILE_DATA.investigationNotes}
=========================================
[END OF FILE - READ ONLY]`;
