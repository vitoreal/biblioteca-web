<template>
  <div class="row">
    
    <form @submit.prevent ref="formLogar" method="post" action="salvar">
      <div class="card">
        <h5 class="card-header bg-secondary text-white">Editar autor</h5>
        <div class="card-body">

          <div class="row mb-3">
            <label for="nome" class="col-auto col-form-label">Nome:</label>
            <div class="col-sm-4">
              <input v-model="state.nome"  type="text" maxlength="20" class="form-control" id="nome">
              <label class="error" v-if="v$.nome.$error">{{ v$.nome.$errors[0].$message }}</label>
            </div>
          </div>

        </div>
    </div>

      <div class="mt-4">
          <button type="submit" @click="submitForm" class="btn btn-primary float-end">salvar</button>
          <a href="/autor" type="button" class="btn btn-info float-end me-2">Voltar</a>
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
      nome: "",
    })

   // const router = 
    const rules = computed(() => {
      return { 
        nome: {
            required: helpers.withMessage("Campo nome é obrigatório!", required),
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
      nome: { 
        required
      },
    };
  },
  methods: {
   async submitForm() {
      
      this.v$.$validate();
      
      if(!this.v$.$error){

        const loader = this.$loading.show();
        
        const response = await this.axios.post('/autor/salvar', {
          id: this.$route.params.id,
          nome: this.state.nome,
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
            
            router.push({ path: '/autor' })
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
          
          if(error.response.data.type != 'SUCESSO'){
              notify({
              title: 'Mensagem',
              text: error.response.data.mensagem,
              type: 'warn',
              position: 'top right',
            })

            }
        });
          
      }
      
    },
    async getDado(){

      const loader = this.$loading.show();
      const urlFetch = 'autor/buscar/'+this.$route.params.id;

      await this.axios.get(urlFetch).then(res => {
        loader.hide();
        this.state.nome = res.data.result.nome;
      }).catch((error) => {
        console.log(error)
        notify({
          title: 'Mensagem',
          text: error.response.data.mensagem,
          type: 'error',
          position: 'top right',
        })
      });

    }
  },
  mounted() {
    this.getDado();
  }
};
</script>