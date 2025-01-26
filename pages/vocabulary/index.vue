<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Vocabulary</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ContentList path="/vocabulary" v-slot="{ list }">
        <div v-for="item in list" :key="item._path" class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
          <NuxtLink :to="item._path">
            <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
            <p class="text-gray-600">{{ item.description }}</p>
          </NuxtLink>
        </div>
      </ContentList>
    </div>
  </div>
</template>
