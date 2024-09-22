import utils from 'src/composables/Utils';

export default function Paginacao() {

  const util = utils();

 // emulate ajax call
 async function fetchFromServer (url, startRow, limit, filter, sortBy, descending) {

  const param = '/'+startRow+'/'+limit+'/'+sortBy;

  const response = await this.axios.get(url+param).catch((error) => {
    this.$notify({
      group: 'foo',
      title: 'Mensagem',
      text: 'Erro Inexperado!',
      type: 'error',
      position: 'top right',
  
    })
  });

  if(util.checkIsdefined(response)) {
    if(response.data.type == 'ERROR'){

      this.$notify({
        // (optional)
        // Name of the notification holder
        group: 'foo',
        // (optional)
        // Title (will be wrapped in div.notification-title)
        title: 'Mensagem',
        text: response.data.mensagem,
        type: 'error',
        position: 'top right',
    
      })

    } else {
      return response.data.lista;
    }
  }

  return null;

}


  return {
    fetchFromServer,
  }


}
