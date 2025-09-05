// Comprehensive TypeScript types based on the full dataset of 7,226 entries
// Generated from analysis of all entries in merger-digest-w-names-subtypes.log

// Core interfaces for the log entry structure
export interface LogEntry {
  document: Document;
  metadata: EntryMetadata;
}

export interface Document {
  action: string;
  id: string;
  listId: string;
  lists: List[];
  metadata: DocumentMetadata;
  type: string;
  firstSeen: number;
  lastSeen: number;
  firstSignificantSeen: number;
  lastSignificantSeen: number;
  lastSignificantUpdate: number;
  naturalCreationDate: number;
  profileNotes: string;
  activeStatus: "Active" | "Inactive";
  significantDocuments: any[];
  significantProfiles: SignificantProfile[];
  lastModifiedDate: string;
  enhancedRiskCountry: string[];
  enhancedRiskCountryCode: string[];
  profileLocations: ProfileLocation[];
  aliases: Alias[];
  updateDetails: UpdateDetails;
  name: string;
  subtype: Subtype;
  tasking: Tasking;

  // Optional fields that may not be present in all entries
  identityNumbers?: IdentityNumber[];
  recordStatus?: RecordStatus[];
  lastReviewDates?: LastReviewDate[];
  countryOfAffiliation?: string[];
  countryOfAffiliationCode?: string[];
}

export interface DocumentMetadata {
  dates: {
    profileCreated: number;
    profileUpdated: number;
    arrival_client: number;
  };
  provider: string;
  source: string;
  dataSources: string[];
  feed_id: number;
  confidence: Record<string, any>;
  sourceProfileIds: string[];
}

export interface EntryMetadata {
  id: string;
  source: string;
  unfiltered: boolean;
  current_format: string;
  replaceContent: boolean;
}

export interface List {
  id: string;
  name: string;
  active: boolean;
  tags: string[];
  hierarchy: HierarchyItem[];
  listActive: boolean;
  description?: string;
  since?: string;
  additionalFields?: Array<{
    key: string;
    value: string;
  }>;
}

export interface HierarchyItem {
  id: string;
  name: string;
  parent?: string;
}

export interface ProfileLocation {
  country: string;
  country_code: string;
  count: number;
  tags: string[];
  country_centroid?: string;
  location?: Location;
  location_shape?: LocationShape;
  text?: string;
  value?: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface LocationShape {
  type: string;
  coordinates: number[];
}

export interface Alias {
  type: AliasType;
  name: string;
}

export interface IdentityNumber {
  type: string;
  value: string;
}

export interface SignificantProfile {
  type: string;
  profileId: string;
  name: string;
}

export interface UpdateDetails {
  id: string;
  type: string;
  source: string;
  description: string;
  forceSuppression: boolean;
  timestamp: number;
}

export interface RecordStatus {
  key: string;
  value: string;
}

export interface LastReviewDate {
  key: string;
  value: string;
}

export interface Tasking {
  derbyhat: TaskingDerbyhat;
}

export interface TaskingDerbyhat {
  disableRecommendation: boolean;
  disableRollup: boolean;
  disableInfluence: boolean;
}

// Enums for better type safety
export type Subtype =
  | "sub-region"
  | "airport"
  | "port"
  | "city"
  | "region"
  | "free-trade-zone"
  | "country";

export type AliasType =
  | "originalScriptPrimaryName"
  | "originalScriptName"
  | "alsoKnownAs"
  | "formerlyKnownAs"
  | "primaryName";

// Statistics from the full dataset
export interface DatasetStatistics {
  totalEntries: number;
  subtypeDistribution: Record<Subtype, number>;
  activeStatusDistribution: {
    Active: number;
    Inactive: number;
  };
  topCountries: Record<string, number>;
  listTypes: Record<string, number>;
}

// Sample statistics from the actual dataset
export const DATASET_STATISTICS: DatasetStatistics = {
  totalEntries: 7226,
  subtypeDistribution: {
    "sub-region": 4236,
    airport: 685,
    port: 513,
    city: 1083,
    region: 445,
    "free-trade-zone": 120,
    country: 144,
  },
  activeStatusDistribution: {
    Active: 6972,
    Inactive: 254,
  },
  topCountries: {
    Russia: 5430,
    Iran: 1258,
    Yemen: 836,
    Iraq: 760,
    Venezuela: 456,
    Myanmar: 418,
    Somalia: 400,
    Syria: 380,
    Libya: 360,
    Sudan: 324,
    Belarus: 322,
    "South Sudan": 282,
    "S. Sudan": 282,
    Zimbabwe: 254,
    Liberia: 246,
    Cuba: 244,
    "North Korea": 238,
    "Dem. Rep. Korea": 238,
    Ukraine: 236,
    "Cote d'Ivoire": 179,
  },
  listTypes: {
    "Sub-Region": 4236,
    Airport: 685,
    Port: 513,
    City: 1083,
    Region: 445,
    "Free Trade Zone": 120,
    "DFATD (Canada) Current Sanctions - Countries": 36,
    "FinCEN Advisories": 85,
    "FATF Strategic Deficiencies Jurisdictions": 28,
    "FATF Strategic Deficiencies Jurisdictions - On-going Process": 127,
    "EU High-Risk Third Countries List": 46,
    Country: 195,
    "FATF Non-Cooperative Countries and Territories (NCCT)": 23,
    "US Department of State Major Illicit Drug Producing & Drug-Transit Countries": 29,
    "DFAT (Australia) Arms Embargoes": 19,
    "French Non-Cooperative Countries and Territories (ETNC) List": 44,
    "EU List of Non-cooperative Jurisdictions For Tax Purposes": 47,
    "EU Embargoes On Arms And Related Materiel": 26,
    "SECO (Switzerland) Arms Embargoes": 22,
    "FinCEN Section 311 - Special Measures": 5,
    "OFAC - Country-related Sanctions Programs": 33,
    "UN SC Sanctions Committees Arms Embargoes": 19,
    "METI (Japan) Embargoes": 11,
    "MAS (Singapore) Embargoes": 4,
    "US Department of State - State Sponsors of Terrorism": 6,
    "Hong Kong Chapter 537 United Nations Sanctions Ordinance List": 22,
    "EC 2021/1030 Belarus List": 1,
    "EC (CFSP) 2021/1031 Belarus List": 1,
    "DFATD (Canada) Special Economic Measures (Belarus) Regulations - Section 3": 1,
    "UK - Republic of Belarus (Sanctions) Regulations": 1,
    "EC 2022/212 Belarus List": 1,
    "EC (CFSP) 2022/218 Belarus List": 1,
    "OECD Unco-operative Tax Havens List": 7,
    "SECO (Switzerland) Ukraine List": 13,
    "EC 2025/395 Ukraine List": 11,
    "EC (CFSP) 2025/394 Ukraine List": 11,
    "HKMA (Hong Kong) List": 1,
    "OFAC - Specially Designated National List": 2,
    "HM Treasury Consolidated List": 2,
    "DFAT (Australia) Consolidated List": 2,
    "BIS Entity List": 2,
    "Finance and Economy Ministry (Monaco) Economic Sanctions": 2,
    "Companies House (UK) Disqualified Directors": 2,
    "DFATD (Canada) Special Economic Measures (Ukraine) Regulations": 2,
    "EC 810/2014 Ukraine List": 2,
    "EC 2014/499/CFSP Ukraine List": 2,
    "Japanese Finance Ministry - Ukraine List": 2,
    "DFAT (Australia) Autonomous Sanctions - Russia, Crimea and Sevastopol": 2,
    "EC 2017/1549 Ukraine List": 1,
    "EC (CFSP) 2017/1561 Ukraine List": 1,
    "EC 2018/388 Ukraine List": 2,
    "EC (CFSP) 2018/392 Ukraine List": 2,
    "EC (CFSP) 2018/1237 Ukraine List": 2,
    "EC 2018/1230 Ukraine List": 2,
    "French Economy Ministry - EU and UN Asset Freezing Measures": 2,
    "EC 2020/1267 Ukraine List": 2,
    "EC (CFSP) 2020/1269 Ukraine List": 2,
    "FCDO (UK) Sanctions List - Asset Freeze": 2,
    "Monaco National Asset Freeze List": 2,
    "US Executive Order 14065": 2,
    "EC 2022/263 Ukraine List": 2,
    "EC (CFSP) 2022/266 Ukraine List": 2,
    "EC 2022/1903 Ukraine List": 4,
    "EC (CFSP) 2022/1908 Ukraine List": 4,
    "EC 2023/571 Ukraine List": 2,
    "EC (CFSP) 2023/572 Ukraine List": 2,
    "NSDC (Ukraine) Special Economic and Other Restrictive Measures (Sanctions)": 1,
    "EC 2022/262 Ukraine List": 1,
    "EC (CFSP) 2022/264 Ukraine List": 1,
    "CSSF (Luxembourg) Sanctions List": 1,
    "EC 2019/408 Ukraine List": 1,
    "EC (CFSP) 2019/415 Ukraine List": 1,
  },
};

// Utility types for working with the data
export type LogEntryArray = LogEntry[];

export interface ParsedLogData {
  entries: LogEntryArray;
  statistics: DatasetStatistics;
  parsingDate: string;
  totalEntries: number;
}

// Type guards for runtime type checking
export function isLogEntry(obj: any): obj is LogEntry {
  return (
    obj &&
    typeof obj === "object" &&
    obj.document &&
    obj.metadata &&
    typeof obj.document.id === "string" &&
    typeof obj.document.name === "string" &&
    typeof obj.document.subtype === "string"
  );
}

export function isSubtype(value: string): value is Subtype {
  return [
    "sub-region",
    "airport",
    "port",
    "city",
    "region",
    "free-trade-zone",
    "country",
  ].includes(value);
}

export function isActiveStatus(value: string): value is "Active" | "Inactive" {
  return value === "Active" || value === "Inactive";
}

// All types are already exported above
