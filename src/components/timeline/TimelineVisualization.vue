<template>
  <div class="timeline-visualization">
    <div class="event-row first">
      <div class="event-left">
        <div class="timeline-circle"></div>
      </div>
    </div>
    <div
      role="button"
      tabindex="0"
      class="event-button event-row"
      v-for="evt in selectedEvents"
      v-bind:key="evt.name"
      v-on:click="handleClick(evt)"
    >
      <div class="event-left">
        {{ formatEventDate(evt) }}
        <div
          v-for="perspective in evt.perspectives"
          v-bind:key="perspective.perspective_id"
        >
          {{ "\u2b91" }}
          <span
            v-bind:style="{
              backgroundColor: getPerspectiveBackground(
                perspective.perspective_id
              )
            }"
            >{{ formatEventDate(perspective.modifications) }}</span
          >
        </div>
        <div
          class="timeline-circle"
          v-bind:style="{ backgroundColor: getCircleColor(evt) }"
        ></div>
      </div>
      <div class="event-right">
        <section>
          <div class="event-name">{{ evt.name }}</div>
          <div
            v-for="perspective in evt.perspectives"
            v-bind:key="perspective.perspective_id"
          >
            {{ "\u2b91" }}
            <span
              v-bind:style="{
                backgroundColor: getPerspectiveBackground(
                  perspective.perspective_id
                )
              }"
              >{{ perspective.name }}</span
            >
          </div>
        </section>
        <!-- <section>
          <div class="base-info">Location: {{ evt.where.location }}</div>
        </section>
        <section>
          <div class="base-info">Historicity: {{evt.historicity.stance}}</div>
          <div
            v-for="perspective in evt.perspectives.filter(p => (p.modifications.historicity || {}).stance)"
            v-bind:key="perspective.id"
            >
            {{ '\u2b91' }} <span v-bind:style="{backgroundColor: getPerspectiveBackground(perspective.id)}">{{perspective.modifications.historicity.stance}}</span>
          </div>
        </section>
        <section>
          <div class="base-info description">Description: {{ evt.what.description }}</div>
          <div
            v-for="perspective in evt.perspectives.filter(p => (p.modifications.what || {}).description)"
            v-bind:key="perspective.id"
            >
            <div class="description">
              {{ '\u2b91' }} <span v-bind:style="{backgroundColor: getPerspectiveBackground(perspective.id)}">{{perspective.modifications.what.description}}</span>
            </div>
          </div>
        </section> -->
      </div>
    </div>
    <div class="event-row last">
      <div class="event-left">
        <div class="timeline-circle"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { formatTimelineDate } from "./date-helpers";
import { startCase } from "lodash-es";
import {
  EventWithPerspectives,
  HistoricityStance,
  Perspective,
  PerspectiveColors,
  SelectedPerspectives,
  TimelineEvent
} from "./Timeline.vue";
import { perspectives } from "./mormon-data";

export default Vue.extend({
  props: {
    events: {
      type: Array as PropType<EventWithPerspectives[]>
    },
    perspectives: {
      type: Array as PropType<Perspective[]>
    },
    selectedPerspectives: {
      type: Object as PropType<SelectedPerspectives>
    },
    perspectiveColors: {
      type: Object as PropType<PerspectiveColors>
    }
  },
  computed: {
    selectedEvents(): EventWithPerspectives[] {
      return this.events.map((evt: EventWithPerspectives) => {
        const perspectives = [];
        for (let perspective_id in evt.perspectives) {
          if (this.selectedPerspectives[perspective_id]) {
            perspectives.push(evt.perspectives[perspective_id]);
          }
        }
        return { ...evt, perspectives };
      });
    }
  },
  methods: {
    formatEventDate(evt: TimelineEvent): string {
      return "Unknown";
      // if (evt.date.exactValue) {
      //   return formatTimelineDate(evt.date.exactValue);
      // } else if (evt.date.rangeValue) {
      //   return formatTimelineDate(evt.date.rangeValue.start) + " to " + formatTimelineDate(evt.date.rangeValue.end)
      // } else {
      //   return "Unknown"
      // }
    },
    getCircleColor(evt: TimelineEvent): string {
      return "linen";
    },
    getPerspectiveBackground(perspectiveId: number): string {
      return this.perspectiveColors[perspectiveId] || "transparent";
    },
    displayHistoricity(text: HistoricityStance) {
      return `Historicity: ${text}`;
    }
  }
});
</script>

<style lang="css" scoped>
.timeline-circle {
  position: absolute;
  top: calc(50% - 0.8rem);
  right: -1rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.8rem;
  min-height: 1.6rem;
  box-shadow: 0 10rem 40rem -24rem #393b3f;
  border: 1px solid black;
}

.first,
.last {
  height: 3rem;
}

.first .timeline-circle {
  top: 0;
  background-color: black;
}

.last .timeline-circle {
  bottom: 0;
  top: unset;
  background-color: black;
}

.event-left {
  padding: 0.8rem;
  width: 30%;
  min-width: 30%;
  max-width: 30%;
  position: relative;
  margin-right: 1.6rem;
  border-right: 0.4rem solid darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-right {
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.event-right section {
  margin: 0.4rem 0;
}

.event-row {
  display: flex;
  flex-direction: row;
  width: 60rem;
}

.event-button {
  cursor: pointer;
}

.event-button:hover {
  background-color: #f3f3f3;
}

.timeline-visualization {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.event-name {
  font-weight: bold;
}

.base-info {
  font-style: italic;
}

.description {
}
</style>
