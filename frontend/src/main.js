import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Adjust the path if necessary
import store from "./store"; // Adjust the path if necessary
import "material-design-icons-iconfont/dist/material-design-icons.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { io } from "socket.io-client";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(store);

// Connect to Socket.IO server
const socket = io("http://localhost:3000");
app.config.globalProperties.$socket = socket;

app.use(vuetify).mount("#app");
