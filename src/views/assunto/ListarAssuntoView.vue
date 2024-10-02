<template>
  <div class="row">
    <div class="mb-4">
        <router-link to="assunto/cadastrar" class="btn btn-primary float-end">
          Cadastrar
        </router-link>
    </div>
    
    <div class="card">
      <h5 class="card-header bg-secondary text-white">Assunto</h5>
      <div class="card-body">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descrição</th>
              <th scope="col" class="alinhaCenter">Ação</th>
            </tr>
          </thead>
          <tbody v-if="listaTodos != null && listaTodos.total > 0">
            <tr v-for="(item, index) in listaTodos.lista" :key="index">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.descricao }}</td>
              <td class="alinhaCenter" style="width: 10%;">
                
                <RouterLink :to="'/assunto/editar/'+item.id" class="me-2">
                  <font-awesome-icon icon="pen-to-square" size="lg"  class="iconeEditar" />
                </RouterLink>
                
                <button type="button" class="btn btn-sm">
                  <font-awesome-icon icon="trash" size="lg" class="iconeExcluir" @click="confirmExcluir(item.id)" />
                </button>
    
              </td>
            </tr>
          </tbody>
          <tbody v-if="listaTodos == null || listaTodos.total == 0">
            <tr>
              <td class="alinhaCenter" colspan="3">
                Nenhum resultado encontrado!
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="listaTodos != null && listaTodos.total > 0">
          <vue-awesome-paginate
            :total-items="listaTodos.total"
            :items-per-page="limit"
            :max-pages-shown="7"
            v-model="currentPage"
            @click="myCallback"
          />
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
        listaTodos: null,
        currentPage : ref(1),
        limit: 10,
        skip: 0
    }    
  },
  async mounted(){
      await this.getLista();
  },
  methods: {
    async getLista(){

      const urlFetch = 'assunto/listar/'+this.skip+'/'+this.limit;

      await this.axios.get(urlFetch).then(res => {
        
        this.listaTodos = res.data.lista

        if (isProxy(this.listaTodos)){
          this.listaTodos = toRaw(this.listaTodos)
        }

      }).catch((error) => {
        if(error.response){
          notify({
            title: 'Mensagem',
            text: error.response.data.mensagem,
            type: 'error',
            position: 'top right',
          })
        }
      });
    },
    myCallback() {
        this.skip = (this.currentPage*this.limit) - this.limit;
        this.getLista();
    },
    async confirmExcluir(id) {

      if (confirm("Tem certeza que deseja excluir esse registro?") == true) {
        this.excluir(id);
      } 
      
    },
    async excluir(id){
      
      const loader = this.$loading.show();
      const response = await this.axios.post('/assunto/excluir', {
         id: id,
        })
        .then(function (response) {
          loader.hide();
          if(response.data.type == 'SUCESSO'){

            notify({
              title: 'Mensagem',
              text: response.data.mensagem,
              type: 'success',
              position: 'top right',
              duration: 10000,
            })
          }
          
        })
        .catch(function (error) {
          console.log(error);
          loader.hide();
          if(error.response.data.type == 'ERROR'){
              notify({
              title: 'Mensagem',
              text: error.response.data.mensagem,
              type: 'error',
              position: 'top right',
            })

            }
        });

        this.getLista();
    }
  },
}
  
</script>
