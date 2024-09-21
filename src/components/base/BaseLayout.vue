<template>
  <header-layout></header-layout>
  <div class="container-fluid">
    <div class="row">
      <menu-layout></menu-layout>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
<script>


export default {
  name: "BaseLayout"
}
</script>