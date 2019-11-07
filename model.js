
function LocalStorage(){
   this.setData = function(inputArray,key){
      localStorage.setItem(key,JSON.stringify(inputArray));
   }

   this.getData = function(key){
      return JSON.parse(localStorage.getItem(key)) || [];
   }
}

function SessionStorage(){
   this.setData = function(inputArray,key){
      sessionStorage.setItem(key,JSON.stringify(inputArray))
   }

   this.getData = function(key){
      return JSON.parse(sessionStorage.getItem(key)) || [];
   }
}

var localStorageInstance = new LocalStorage();
var sessionStorageInstance = new SessionStorage();

