<template>
  <div class="row">
    <div class="mb-4">
        <button type="button" @click="submitForm" class="btn btn-info float-end">Gerar Relatório</button>
        <router-link to="livro/cadastrar" class="btn btn-primary float-end me-2">
          Cadastrar
        </router-link>
    </div>
    
    <div class="card">
      <h5 class="card-header bg-secondary text-white">Livros</h5>
      <div class="card-body">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Editora</th>
              <th scope="col">Edição</th>
              <th scope="col">Ano Publicação</th>
              <th scope="col">Assunto</th>
              <th scope="col">Autor</th>
              <th scope="col" class="alinhaCenter">Ação</th>
            </tr>
          </thead>
          <tbody v-if="listaTodos != null && listaTodos.total > 0">
            <tr v-for="(item, index) in listaTodos.lista" :key="index">
              <td>{{ item.titulo }}</td>
              <td>{{ item.editora }}</td>
              <td>{{ item.edicao }}</td>
              <td>{{ item.ano_publicacao }}</td>
              <td>
                <ul>
                  <li v-for="value in item.assuntos">
                    {{ value.descricao }}
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="value in item.autores">
                    {{ value.nome }}
                  </li>
                </ul>
              </td>
              <td class="alinhaCenter" style="width: 10%;">
                
                <RouterLink :to="'/livro/editar/'+item.id" class="me-2">
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
              <td class="alinhaCenter" colspan="7">
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
  name: "ListarLivro",
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

      const urlFetch = 'livro/listar/'+this.skip+'/'+this.limit;
      const loader = this.$loading.show();
      await this.axios.get(urlFetch).then(res => {
        
        this.listaTodos = res.data.lista

        if (isProxy(this.listaTodos)){
          this.listaTodos = toRaw(this.listaTodos)
        }

      }).catch((error) => {
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'error',
          position: 'top right',
        })
      });

      loader.hide();
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
      const response = await this.axios.post('/livro/excluir', {
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
