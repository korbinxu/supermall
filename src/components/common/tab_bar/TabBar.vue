<template>
  <div id="tab_bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tab_bar {
  display: flex;
  background-color: #f2f2f2;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -5px 2px rgba(red, green, blue, 0.3);
}
</style>