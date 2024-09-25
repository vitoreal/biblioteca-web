<template>
  <div class="row">
    
    <form @submit.prevent ref="formLogar" method="post" action="salvar">
      <div class="card">
        <h5 class="card-header bg-secondary text-white">Editar assunto</h5>
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
          <a href="/assunto" type="button" class="btn btn-info float-end me-2">Voltar</a>
      </div>
  </form>
  </div>
</template>
<script>
import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, sameAs, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { notify } from "@kyvg/vue3-notification";

export default {
  name: "EditarAssuntoView",
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

    return { state, v$, router}
      
  },
  data() {
    return {
      fullPage: false
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

        const loader = this.$loading.show();
        
        const response = await this.axios.post('/assunto/salvar', {
          id: this.$route.params.id,
          descricao: this.state.descricao,
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
            
            router.push({ path: '/assunto' })
          } else {
            notify({
              title: 'Mensagem',
              text: response.data.mensagem,
              type: 'warn',
              position: 'top right',
            })
          }
          
        })
        .catch(function (error) {
          console.log(error);
          if(error.response.data.type != 'SUCESSO'){
              notify({
              title: 'Mensagem',
              text: error.response.data.mensagem,
              type: 'warn',
              position: 'top right',
            })

            }
        });
        loader.hide();
      }
      
    },
    async getDado(){

      const loader = this.$loading.show();
      const urlFetch = 'assunto/buscar/'+this.$route.params.id;
      await this.axios.get(urlFetch).then(res => {
        
        this.state.descricao = res.data.result.descricao;
      }).catch((error) => {
        console.log(error)
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'error',
          position: 'top right',
        })
      });
      loader.hide();
    }
  },
  mounted() {
    this.getDado();
  }
};
</script>