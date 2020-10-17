<template>
  <div class="centered">
    <TimelineFilters
      :perspectives="perspectives"
      :selectedPerspectives="selectedPerspectives"
      :toggleActive="toggleActive"
      :perspectiveColors="perspectiveColors"
    />
    <TimelineVisualization
      :events="events"
      :perspectives="perspectives"
      :selectedPerspectives="selectedPerspectives"
      :perspectiveColors="perspectiveColors"
    />
  </div>
</template>

<script lang="ts">
import TimelineFilters from "./TimelineFilters.vue";
import TimelineVisualization from "./TimelineVisualization.vue";
import {
  events as mormonEvents,
  perspectives as mormonPerspectives
} from "./mormon-data";
import {
  events as mamEvents,
  perspectives as mamPerspectives
} from "./mam-data";
import Vue, { VueConstructor } from "vue";
import { easyFetch } from "./easyFetch";

export default (Vue as VueConstructor<TimelineBindings>).extend({
  components: { TimelineFilters, TimelineVisualization },
  data() {
    return {
      events: [] as EventWithPerspectives[],
      perspectives: [] as Perspective[],
      perspectiveColors: {
        // Consensus perspective
        1: "transparent"
      },
      selectedPerspectives: {}
    };
  },
  async created(this: TimelineBindings) {
    this.events = await easyFetch<EventWithPerspectives[]>(
      "http://localhost:8000/api/topics/1/events?perspectives=2,3"
    );

    this.perspectives = await easyFetch<Perspective[]>(
      "http://localhost:8000/api/perspectives"
    );

    for (let perspective of this.perspectives) {
      this.toggleActive(perspective.perspective_id);
      if (perspective.perspective_id !== 1) {
        this.perspectiveColors[perspective.perspective_id] =
          "#" + String(Math.floor(Math.random() * 10000));
      }
    }
  },
  methods: {
    toggleActive(perspectiveId: number): void {
      Vue.set(
        this.selectedPerspectives,
        perspectiveId,
        !this.selectedPerspectives[perspectiveId]
      );
    }
  }
});

interface TimelineBindings extends Vue {
  events: EventWithPerspectives[];
  perspectives: Perspective[];
  perspectiveColors: PerspectiveColors;
  selectedPerspectives: SelectedPerspectives;
  toggleActive(perspectiveId: number): void;
}

export type EventWithPerspectives = {
  event: TimelineEvent;
  perspectives: PerspectiveEventMap;
};

export type PerspectiveEventMap = {
  [perspectiveId: number]: PerspectiveEvent;
};

export interface PerspectiveEvent {
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
}

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

export type Perspective = {
  perspective_id: number;
  url_slug: string;
  name: string;
  is_deleted: boolean;
  is_latest: boolean;
  original_perspective: number;
  parent_perspective?: number;
  created_by: number;
  created_date: string;
};

export type SelectedPerspectives = {
  [perspective_id: number]: boolean;
};

export type PerspectiveColors = {
  [perspective_id: number]: string;
};

export type toggleActive = (perspectiveId: number) => void;
</script>

<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
