<template>
  <div>
    <a href="#" class="btn btn-primary">Cadastrar</a>
    <div class="card">
      <div class="card-header">
        Autor
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        
        <pagination v-model="page" :records="listaAssunto.total" :per-page="limit" @paginate="myCallback"/>
      </div>
      
  </div>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
        listaAssunto: [],
        page: 1,
        limit: 25,
    }    
  },
  async mounted(){
      await this.getAssuntos();
  },
  methods: {
    async getAssuntos(){
      await this.axios.get('assunto/salvar',{
        id: id
      }).catch((error) => {
        this.$notify({
          group: 'foo',
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