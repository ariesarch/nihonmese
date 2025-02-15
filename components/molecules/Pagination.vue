<template>
  <div class="mt-2 flex items-center justify-center space-x-4">
    <AtomsButton @click="goToPrevious" variant="outline" size="md" :disabled="currentPage === 1">Previous</AtomsButton>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <AtomsButton @click="goToNext" variant="outline" size="md" :disabled="currentPage === totalPages">Next</AtomsButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
  },
  methods: {
    goToPrevious() {
      if (this.currentPage > 1) {
        this.$emit('page-change', this.currentPage - 1);
      }
    },
    goToNext() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.currentPage + 1);
      }
    }
  }
});
</script>