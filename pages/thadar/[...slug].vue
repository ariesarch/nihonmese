
<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch thadars.json from the server
const { data:thadars, error } = await useFetch('/api/thadars');
</script>
<template>
  <main class="mx-auto flex flex-1 gap-2">
    <CommonSideBar :items="thadars" valueKey="topic" detail="detail"/>
    <div class="flex-1 items-center justify-center ml-64 p-4">
        <ContentDoc />
    </div>
  </main>
</template>