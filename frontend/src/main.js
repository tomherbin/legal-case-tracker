import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Adjust the path if necessary
import store from "./store"; // Adjust the path if necessary

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App);

app.use(router);
app.use(store);

app.use(vuetify).mount("#app");
