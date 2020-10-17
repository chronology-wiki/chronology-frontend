<template>
  <div style="margin: 0 auto">
    <button
      v-for="perspective in perspectives"
      v-bind:key="perspective.perspective_id"
      v-bind:style="{
        backgroundColor: selectedPerspectives[perspective.perspective_id]
          ? perspectiveColors[perspective.perspective_id] || 'transparent'
          : 'initial'
      }"
      v-on:click="toggleActive(perspective.perspective_id)"
    >
      {{ perspectiveText(perspective) }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import {
  Perspective,
  PerspectiveColors,
  SelectedPerspectives,
  toggleActive
} from "./Timeline.vue";

export default Vue.extend({
  props: {
    perspectives: {
      type: Array as PropType<Perspective[]>
    },
    selectedPerspectives: {
      type: Object as PropType<SelectedPerspectives>
    },
    toggleActive: Function as PropType<toggleActive>,
    perspectiveColors: Object as PropType<PerspectiveColors>
  },
  methods: {
    perspectiveText(perspective: Perspective): string {
      if (this.selectedPerspectives[perspective.perspective_id]) {
        return `${perspective.name} \u2713`;
      } else {
        return perspective.name;
      }
    }
  }
});
</script>

<style scoped>
.active {
  background-color: linen;
}
</style>
