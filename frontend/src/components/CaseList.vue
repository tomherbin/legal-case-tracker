<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Case List</h1>
        <v-btn color="primary" to="/add-case">Add New Case</v-btn>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="caseItem in cases" :key="caseItem._id" @click="editCase(caseItem._id)">
              <v-list-item-content>
                <v-list-item-title> {{ caseItem.title }} </v-list-item-title>
                <v-list-item-subtitle>{{ caseItem.status }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client';
import CasesAPI from '@/services/CasesAPI';

export default {
  name: 'CaseList',
  data() {
    return {
      cases: [],
      socket: null,
    };
  },
  created() {
    this.socket = io('http://localhost:3000');

    this.fetchCases();

    this.socket.on('case-updated', () => {
      this.fetchCases();
    });
    this.socket.on('case-created', () => {
      this.fetchCases();
    });
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    async fetchCases() {
      try {
        const response = await CasesAPI.getCases();
        this.cases = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    editCase(caseId) {
      this.$router.push({ name: 'EditCase', params: { id: caseId } });
    },
  },
};
</script>

