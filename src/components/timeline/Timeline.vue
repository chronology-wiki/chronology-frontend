<template>
  <div>
    <TimelineFilters />
    <TimelineVisualization v-bind:events="events" />
  </div>
</template>

<script>
  import TimelineFilters from './TimelineFilters'
  import TimelineVisualization from './TimelineVisualization'

  export default {
    components: {TimelineFilters, TimelineVisualization},
    data() {
      return {
        events: []
      }
    },
    created() {
      this.getEvents()
    },
    methods: {
      getEvents() {
        this.events = [
          {
            id: 1,
            name: "Mormon church organized",
            date: "1830-06-30"
          },
          {
            id: 2,
            name: "First vision",
            date: {
              year: "1820",
              month: {
                start: 2,
                end: 5,
              },
            },
          }
        ]
        // fetch('https://raw.githubusercontent.com/chronology-wiki/mormon.chronology/master/events/events.json')
        // .then(r => r.json())
        // .then(evts => this.events = evts)
      }
    }
  }
</script>

<style lang="css" scoped>

</style>