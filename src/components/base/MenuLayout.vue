<template>
<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active" aria-current="page" >
            <font-awesome-icon icon="house" size="lg" />
            Home
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/livro" class="nav-link" aria-current="page" >
            <font-awesome-icon icon="book" size="lg" />
            Livros
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/autor" class="nav-link" aria-current="page" >
            <font-awesome-icon icon="person" size="xl" />
            Autor
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/assunto" class="nav-link" aria-current="page" >
            <font-awesome-icon icon="list" size="lg" />
            Assunto
          </RouterLink>
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