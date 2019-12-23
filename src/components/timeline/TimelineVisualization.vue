<template>
  <div class="timeline-visualization">
    <button class="event-button" v-for="evt in events" v-bind:key="evt.name">
      <div class="event-left">
        {{ formatDate(evt.date) }}
        <div class="timeline-circle"></div>
      </div>
      <div class="event-right">
        {{ evt.name }}
      </div>
    </button>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: ["events"],
  methods: {
    formatDate(date) {
      if (typeof date === "string") {
        return dayjs(date).format("YYYY-MMM-D");
      } else {
        return date.year;
      }
    }
  }
};
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
  background-color: black;
}

.event-left {
  padding: 0.8rem;
  width: 20%;
  position: relative;
  margin-right: 1.6rem;
  border-right: 0.4rem solid darkgray;
}

.event-right {
  padding: 0.8rem;
}

.event-button {
  display: flex;
  flex-direction: row;
  border: none;
  margin: 0;
  padding: 0;
  width: 60rem;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;
  /* Normalize line-height. Cannot be changed from normal in Firefox 4+. */
  line-height: normal;
  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  /* Corrects inability to style clickable input types in iOS */
  -webkit-appearance: none;
}

.event-button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.timeline-visualization {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
