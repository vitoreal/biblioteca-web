<template>
  <div class="row">
    
    <form @submit.prevent="logar" ref="formLogar" method="post" action="salvar">
      <div class="card">
        <h5 class="card-header bg-secondary text-white">Cadastrar assunto</h5>
        <div class="card-body">

          <div class="row mb-3">
            <label for="descricao" class="col-auto col-form-label">Descrição:</label>
            <div class="col-sm-4">
              <input v-model="state.descricao"  type="text" maxlength="20" class="form-control" id="descricao">
              <label class="error" v-if="v$.descricao.$error">{{ v$.descricao.$errors[0].$message }}</label>
            </div>
          </div>

        </div>
    </div>

      <div class="mt-4">
          <button type="submit" @click="submitForm" class="btn btn-primary float-end">salvar</button>
          <router-link to="/assunto" class="btn btn-info float-end me-2">
            Voltar
          </router-link>
      </div>
  </form>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, maxLength, sameAs, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "CadastrarAssuntoPage",
  props: ["errorLogin"],
  setup() {
    const state = reactive({
      descricao: "",
    })

   // const router = 
    const rules = computed(() => {
      return { 
        descricao: {
            required: helpers.withMessage("Campo descrição é obrigatório!", required),
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
  data() {
    return {
      msgSistema: '',
    }
  },
  validations() {
    return {
      descricao: { 
        required
      },
    };
  },
  methods: {
   async submitForm() {
      
      this.v$.$validate();

      if(!this.v$.$error){

        const response = await this.axios.post('/assunto/salvar', {
          descricao: this.state.descricao,
        })
        .then(function (response) {
          console.log(response);

          if(this.checkIsUndefined(response)){
          if(response.data.type == 'SUCESSO'){
            alert(response.data.mensagem);
            this.$router.push('/')
          }
        }
        })
        .catch(function (error) {
          console.log(error);
          if(error.response.data.type == 'ERROR'){
              this.msgSistema = error.response.data.mensagem;
              this.tipoMsgSistema = 'alert-danger';
            }
        });

      }
      
    }
  },
};
</script>