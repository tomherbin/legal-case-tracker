import { createRouter, createWebHistory } from "vue-router";
import CaseList from "../components/CaseList.vue";
import CaseForm from "../components/CaseForm.vue"; // Import the CaseForm component

const routes = [
  {
    path: "/",
    name: "CaseList",
    component: CaseList,
  },
  {
    path: "/add-case",
    name: "CaseForm",
    component: CaseForm, // Define the route for adding a new case
  },
  {
    path: "/cases/edit/:id",
    name: "EditCase",
    component: CaseForm,
    props: true,
  },

  // ... other routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
