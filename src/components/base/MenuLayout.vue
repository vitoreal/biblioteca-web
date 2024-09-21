<template>
<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            <font-awesome-icon icon="house" size="xl" />
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="book" size="xl" />
            Livros
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="person" size="xl" />
            Autor
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="list" size="xl" />
            Assunto
          </a>
        </li>
      </ul>
    </div>
  </nav>
  </template>

<script>


export default {
  name: "MenuLayout"
}
</script>