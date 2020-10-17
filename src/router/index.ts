import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Timeline from "../components/timeline/Timeline.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/timeline",
    name: "timeline",
    component: Timeline
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
