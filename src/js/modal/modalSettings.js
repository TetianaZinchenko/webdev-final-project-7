
export let modalSettings = {
  buttons : {
    activeClass : 'btn-active',
    disableAttribute : "disabled",
    watched : {
      text : ['remove from watched', 'add to watched'],
      getText : function(value){
        return value ? this.text[0] : this.text[1];
      }
    },
    queue : {
      text : ['remove from queue', 'add to queue'],
      getText : function(value){
        return value ? this.text[0] : this.text[1];
      }
    }
  }  
};