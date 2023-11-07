<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">{{ isEditMode ? 'Edit Case' : 'Add New Case' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form" @submit.prevent="submitCase">
              <v-text-field v-model="caseData.title" label="Title" required></v-text-field>
              <v-textarea v-model="caseData.description" label="Description" required></v-textarea>
              <v-select v-model="caseData.status" :items="['Open', 'In Progress', 'Closed']" label="Status"
                required></v-select>
              <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
                Submit Case
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CasesAPI from '@/services/CasesAPI';

export default {
  name: 'CaseForm',
  data() {
    return {
      valid: true,
      caseData: {
        title: '',
        description: '',
        status: 'Open',
      },
      isEditMode: false,
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isEditMode = true;
      this.fetchCase(this.$route.params.id);
    }
  },
  methods: {
    async fetchCase(caseId) {
      try {
        const response = await CasesAPI.getCaseById(caseId);
        this.caseData = response.data;
      } catch (error) {
        console.error('Error fetching case', error);
      }
    },
    async submitCase() {
      if (this.$refs.form.validate()) {
        try {
          let response;
          if (this.isEditMode) {
            response = await CasesAPI.updateCase(this.$route.params.id, this.caseData);
          } else {
            response = await CasesAPI.createCase(this.caseData);
          }
          if (response.status === 200 || response.status === 201) {
            this.$router.push('/');
          } else {
            console.error('Failed to submit case', response);
          }
        } catch (error) {
          console.error('Error submitting case', error);
        }
      }
    },
  },
};
</script>
