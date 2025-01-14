<script setup lang="ts">
import { ref } from 'vue';

// State to control sidebar visibility
const isSidebarOpen = ref(false);

// Toggle the sidebar visibility
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// You don't need to defineProps for "isSidebarOpen" because it's a local state
defineProps({
  items: {
    type: Array,
    required: true,
  },
  valueKey: {
    type: String,
    default: 'name',
  },
  detail: {
    type: String,
    default: 'name',
  },
});
</script>

<template>
  <div class="overflow-hidden w-full md:w-64 fixed top-16 left-0 bottom-0">
    <button 
      @click="toggleSidebar"
      class="p-2 bg-blue-500 text-white rounded-md absolute top-4 left-4 z-10 lg:hidden"
    >
      <!-- Hamburger Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Sidebar -->
    <div
      :class="[
        'h-screen sticky inset-y-0 left-0 transform bg-cyan-800 text-white overflow-y-auto transition-transform duration-300 ease-in-out',
        { '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen },
        'lg:translate-x-0 lg:static'
      ]"
      style="width: 250px;"
    >
      <!-- Sidebar content -->
      <nav class="p-4">
        <ul>
          <li class="mb-2" v-for="(item, index) in items" :key="index">
            <!-- Check if item[detail] exists and is a valid path -->
            <NuxtLink :to="item[detail] || '/default-path'" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ item[valueKey] }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
