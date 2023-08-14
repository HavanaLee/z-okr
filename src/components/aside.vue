<template>
  <div class="layout_sider" style="max-height: 989px">
    <aside></aside>
  </div>
</template>

<style scoped lang="scss">
.layout_sider {
  width: 262px;
  height: 100%;
  flex-shrink: 0;
  max-height: 100%;
  overflow: hidden;
  border-right: 1px solid rgba(235, 236, 240, 0.6);
  aside {
    width: 262px;
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 75;
  }
}
</style>
