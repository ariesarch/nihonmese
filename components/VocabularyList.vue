<template>
  <div>
    <h1>Vocabulary List</h1>
    <div v-for="vocab in vocabularies" :key="vocab.lesson_id" class="card">
      <h2>{{ vocab.japanese }}</h2>
      <p>English: {{ vocab.english }}</p>
      <p>Burmese: {{ vocab.burmese }}</p>
    </div>
    <pagination :total-items="totalItems" :items-per-page="itemsPerPage" @page-changed="fetchVocabularies" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      vocabularies: [] as Array<{ lesson_id: string; japanese: string; english: string; burmese: string; }>,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  methods: {
    async fetchVocabularies() {
      const response = await fetch(`/api/vocabularies?page=${this.currentPage}&limit=${this.itemsPerPage}`);
      const data = await response.json();
      this.vocabularies = data.vocabularies;
      this.totalItems = data.total;
    },
  },
  mounted() {
    this.fetchVocabularies();
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px 0;
}
</style>
