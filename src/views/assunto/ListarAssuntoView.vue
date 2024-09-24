<template>
  <div class="row">
    <div class="mb-4">
        <router-link to="assunto/cadastrar" class="btn btn-primary float-end">
          Cadastrar
        </router-link>
    </div>
    
    <div class="card">
      <div class="card-header">
        Assunto
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <div v-if="listaAssunto && listaAssunto.total > 0">
          <pagination v-model="page" :records="listaAssunto.total" :per-page="limit" @paginate="myCallback"/>
        </div> 
      </div>
      
  </div>
  </div>
</template>
<script>

import { notify } from "@kyvg/vue3-notification";

export default {
  
  data() {
    return {
        listaAssunto: [],
        page: 1,
    }    
  },
  async mounted(){
      await this.getAssuntos();
  },
  methods: {
    async getAssuntos(){

      const urlFetch = 'assunto/listar/'+this.page;

      await this.axios.get(urlFetch).then(res => {
        this.listaAssunto = res.data
        console.log(this.listaAssunto.lista);
      }).catch((error) => {
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'error',
          position: 'top right',
        })
      });
    }
  },
}
  
</script>