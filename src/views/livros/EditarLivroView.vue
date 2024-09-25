<template>
  <div class="row">
    
    <form @submit.prevent ref="formLogar" method="post" action="salvar">
      <div class="card">
        <h5 class="card-header bg-secondary text-white">Editar livros</h5>
        <div class="card-body">

          <div class="row mb-3">
            <label for="titulo" class="col-auto col-form-label">Titulo:</label>
            <div class="col-sm-5">
              <input v-model="state.titulo"  type="text" maxlength="40" class="form-control" id="titulo">
              <label class="error" v-if="v$.titulo.$error">{{ v$.titulo.$errors[0].$message }}</label>
            </div>
          </div>

          <div class="row mb-3">
            <label for="editora" class="col-auto col-form-label">Editora:</label>
            <div class="col-sm-5">
              <input v-model="state.editora" type="text" maxlength="40" class="form-control" id="editora">
              <label class="error" v-if="v$.editora.$error">{{ v$.editora.$errors[0].$message }}</label>
            </div>
          </div>

          <div class="row mb-3">
            <label for="edicao" class="col-auto col-form-label">Edição:</label>
            <div class="col-sm-5">
              <input v-model="state.edicao" type="text" maxlength="40" class="form-control" id="edicao">
              <label class="error" v-if="v$.edicao.$error">{{ v$.edicao.$errors[0].$message }}</label>
            </div>
          </div>

          <div class="row mb-3">
            <label for="anoPublicacao" class="col-auto col-form-label">Ano de publicação:</label>
            <div class="col-sm-5">
              <MaskInput v-model="state.anoPublicacao" mask="####" class="form-control" />
              <label class="error" v-if="v$.anoPublicacao.$error">{{ v$.anoPublicacao.$errors[0].$message }}</label>
            </div>
          </div>
          <div class="row mb-3">
            <label for="assunto" class="col-auto col-form-label">Assunto:</label>
            <div class="col-sm-5">
              <select v-model="state.assunto" id="assunto" class="form-control" multiple>
                <option v-for="(item, index) in state.listaAssunto" :key="index" :value="item.id">{{ item.descricao }}</option>
              </select>
              <label class="error" v-if="v$.assunto.$error">{{ v$.assunto.$errors[0].$message }}</label>
            </div>
          </div>

          <div class="row mb-3">
            <label for="autor" class="col-auto col-form-label">Autor:</label>
            <div class="col-sm-5">
              <select v-model="state.autor" id="autor" class="form-control" multiple>
                <option v-for="(item, index) in state.listaAutor" :key="index" :value="item.id">{{ item.nome }}</option>
              </select>
              <label class="error" v-if="v$.autor.$error">{{ v$.autor.$errors[0].$message }}</label>
            </div>
          </div>
          
          <div class="row mb-3">
            <label for="valor" class="col-auto col-form-label">Valor:</label>
            <div class="col-sm-3">
              <input v-model="state.valor" v-money3="config" maxlength="8"type="text" class="form-control" id="valor">
              <label class="error" v-if="v$.valor.$error">{{ v$.valor.$errors[0].$message }}</label>
            </div>
          </div>

        </div>
    </div>

      <div class="mt-4">
          <button type="submit" @click="submitForm" class="btn btn-primary float-end">salvar</button>
          <a href="/livro" type="button" class="btn btn-info float-end me-2">Voltar</a>
      </div>
  </form>
  </div>
</template>
<script>
import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { required, numeric, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { Money3Directive } from 'v-money3'
import { MaskInput } from 'vue-3-mask';

export default {
  name: "CadastrarLivrosPage",
  setup() {
    const state = reactive({
      titulo: "",
      editora: "",
      edicao: "",
      anoPublicacao: "",
      valor: "",
      assunto: [],
      autor: [],
      listaAssunto: null,
      listaAutor: null,
    })

   // const router = 
    const rules = computed(() => {
      return { 
        titulo: {
            required: helpers.withMessage("Campo titulo é obrigatório!", required),
        },
        editora: {
            required: helpers.withMessage("Campo editora é obrigatório!", required),
        },
        edicao: {
            required: helpers.withMessage("Campo edição é obrigatório!", required),
        },
        anoPublicacao: {
            required: helpers.withMessage("Campo ano de publicação é obrigatório!", required),
        },
        valor: {
            required: helpers.withMessage("Campo valor é obrigatório!", required),
        },
        assunto: {
            required: helpers.withMessage("Campo assunto é obrigatório!", required),
        },
        autor: {
            required: helpers.withMessage("Campo autor é obrigatório!", required),
        },

      };
    })
    const v$ = useVuelidate(rules, state);

    return { state, v$, router}
      
  },
  data() {
    return {
      fullPage: false,
      config: {
        prefix: '',
        suffix: '',
        thousands: '.',
        decimal: ',',
        precision: 2,
        }
    }
  },
  directives: { money3: Money3Directive },
  components: {
    MaskInput,
  },
  validations() {
    return {
      titulo: { 
        required
      },
      editora: { 
        required
      },
      edicao: { 
        required
      },
      anoPublicacao: { 
        numeric
      },
      valor: { 
        required
      },
      assunto: { 
        required
      },
      autor: { 
        required
      },
    };
  },
  methods: {
   async submitForm() {
      
      this.v$.$validate();
      
      if(!this.v$.$error){

        const loader = this.$loading.show();

        const response = await this.axios.post('/livro/salvar', {
          titulo: this.state.titulo,
          editora: this.state.editora,
          edicao: this.state.edicao,
          anoPublicacao: this.state.anoPublicacao,
          valor: this.state.valor,
          assunto: this.state.assunto,
          autor: this.state.autor,
        })
        .then(function (response) {
          
          if(response.data.type == 'SUCESSO'){
            notify({
              title: 'Mensagem',
              text: response.data.mensagem,
              type: 'success',
              position: 'top right',
              duration: 10000,
            })
            
            router.push({ path: '/livro' })
          } else {
            notify({
              title: 'Mensagem',
              text: response.data.mensagem,
              type: 'warn',
              position: 'top right',
            })
          }
          loader.hide();
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
          
      }
      console.log(this.v$)
    },
   
    async getListaAutor(){
      
      const response = await this.axios.get('autor/listar-autor').catch((error) => {
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'warn',
          position: 'top right',
        })
      });

     this.state.listaAutor = response.data.lista

    },
    async getListaAssunto(){
      
      const response = await this.axios.get('assunto/listar-assunto').catch((error) => {
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'warn',
          position: 'top right',
        })
      });
      
     this.state.listaAssunto = response.data.lista
    },
    limpaForm(){
      this.state.descricao = '';
    }
  },
  async mounted(){
    const loader = this.$loading.show();
      await this.getListaAutor();
      await this.getListaAssunto();
      loader.hide();
  },

};
</script>