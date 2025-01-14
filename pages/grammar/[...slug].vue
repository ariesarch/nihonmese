
<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch grammars.json from the server
const { data:grammars, error } = await useFetch('/api/grammars');
</script>
<template>
  <main class="mx-auto flex flex-1 gap-2">
    <CommonSideBar :items="grammars" valueKey="pattern" detail="detail"/>
    <div class="flex-1 items-center justify-center ml-64 p-4">
        <ContentDoc />
    </div>
  </main>
</template>