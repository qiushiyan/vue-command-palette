import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import "./styles/index.css";
import "./styles/tailwind.css";

const routes = [
  { path: "/", component: () => import("./pages/Home.vue") },
  { path: "/about", component: () => import("./pages/About.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(createPinia()).mount("#app");
