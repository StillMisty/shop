<template>
  <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto text-center">
      <p>&copy; {{ new Date().getFullYear() }} Your Company Name. All rights reserved.</p>
      <div class="mt-2">
        <a href="/privacy" class="text-gray-400 hover:text-white">Privacy Policy</a>
        <span class="mx-2">|</span>
        <a href="/terms" class="text-gray-400 hover:text-white">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// This file is intentionally left blank.
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>