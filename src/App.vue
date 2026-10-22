<template>
  <div id="wrap">
    <TheSidebar :class="{ 'is-collapsed': isSidebarCollapsed }" />

    <div class="main-wrapper">
      <TheHeader @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed" />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import TheHeader from '@components/layout/TheHeader.vue';
import TheSidebar from '@components/layout/TheSidebar.vue';

const isSidebarCollapsed = ref(false);
</script>

<style lang="scss" scoped>
#wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;

  :deep(.sidebar) {
    transition: margin-left 0.3s ease, width 0.3s ease;
    
    &.is-collapsed {
      margin-left: -250px;
    }
  }
  
  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background-color: #f5f6fa;
  }
  
  .main-content {
    flex: 1;
    overflow-y: auto;
    padding: 30px 50px;
  }
}

</style>