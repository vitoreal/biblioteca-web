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
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody v-if="listaAssunto != null && listaAssunto.total > 0">
            <tr v-for="(item, index) in listaAssunto.lista" :key="index">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.descricao }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="listaAssunto != null && listaAssunto.total > 0">
          <pagination v-model="page" :records="listaAssunto.total" :per-page="limit" @paginate="myCallback"/>
        </div> 
      </div>
      
  </div>
  </div>
</template>
<script>
import { isProxy, ref, toRaw } from 'vue';
import { notify } from "@kyvg/vue3-notification";

export default {
  name: "ListarAssunto",
  data() {
    return {
        listaAssunto: null,
        page: 1,
        limit: 10,
        skip: 0
    }    
  },
  async mounted(){
      await this.getAssuntos();
  },
  methods: {
    async getAssuntos(){

      const urlFetch = 'assunto/listar/'+this.skip+'/'+this.limit;

      await this.axios.get(urlFetch).then(res => {
       
        this.listaAssunto = res.data.lista

        if (isProxy(this.listaAssunto)){
          this.listaAssunto = toRaw(this.listaAssunto)
        }

        console.log(this.listaAssunto);        
      }).catch((error) => {
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'error',
          position: 'top right',
        })
      });
    },
    myCallback() {
        this.skip = (this.page*this.limit) - this.limit;
        this.getAssuntos();
    }
  },
}
  
</script>