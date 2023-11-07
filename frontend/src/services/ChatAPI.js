import axios from "axios";

const BASE_URL = "http://localhost:3000/api";
const CHAT_URL = `${BASE_URL}/chat/send`;

export default {
  // Chat API Endpoints
  sendMessageToChat(message) {
    return axios.post(CHAT_URL, { message });
  },
};
