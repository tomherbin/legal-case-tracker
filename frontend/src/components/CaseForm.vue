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
              <v-textarea v-model="caseData.summary" label="Summary" required></v-textarea>
              <v-textarea v-model="caseData.description" label="Description" required></v-textarea>
              <v-select v-model="caseData.status" :items="['Open', 'In Progress', 'Closed']" label="Status"
                required></v-select>
              <v-btn :loading="loading" :disabled="!valid || loading" color="success" class="mr-4" type="submit">
                {{ loading ? 'Saving...' : 'Submit Case' }}
              </v-btn>
              <!-- Delete Button - Only shows in Edit Mode -->
              <v-btn v-if="isEditMode" color="error" class="mr-4" @click="deleteCase">
                Delete Case
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
      loading: false,
      caseData: {
        title: '',
        summary: '',
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
      this.loading = true;
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
      this.loading = false;
    },
    async deleteCase() {
      try {
        await CasesAPI.deleteCase(this.$route.params.id);
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting case', error);
      }
    }
  },
};
</script>
