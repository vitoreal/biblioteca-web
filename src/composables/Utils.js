export default function Utils() {

    // Busca os estados na API
    const checkIsdefined = (variable) => {

      if(variable == 'undefined' || variable == null || variable == undefined || variable == ''){
            return false;
        } else {
          return true;
        }
    }


  return {
    checkIsdefined
  }


}
