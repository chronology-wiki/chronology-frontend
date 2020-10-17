export interface EventWithPerspectives {
  event: TimelineEvent;
  perspectives: PerspectiveEventMap;
}

export type PerspectiveEventMap = {
  [perspectiveId: number]: PerspectiveEvent;
};

export type PerspectiveEvent = {
  perspective_event_id: number;
  event_id: number;
  perspective_id: number;
  name?: string;
  description?: string;
  is_deleted: boolean;
  historicity_stance: HistoricityStance;
  relevance_stance: number;
  created_by: number;
  created_date: string;
  is_latest: boolean;
  original_perspective_event: number;
};

export enum HistoricityStance {
  Fact = "Fact",
  Fiction = "Fiction",
  Unknown = "Unknown",
  LeaningFact = "LeaningFact",
  LeaningFiction = "LeaningFiction"
}

export type TimelineEvent = {
  event_id: number;
  name: string;
  description?: string;
  url_slug: string;
  is_deleted: boolean;
  is_latest: boolean;
  original_event: number;
  created_by: number;
  created_date: string;
};
