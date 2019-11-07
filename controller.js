function Controller(){
  var parentFunction = this;

  this.selectedStorage = function(){
    return document.getElementById('selectedValue').value;
  }

  this.selectedStorageEventHandler = function(){
    var selected = document.getElementById('selectedValue');
    selected.addEventListener('change',parentFunction.onSelectionChange);
  }

  this.onSelectionChange = function(){
    var selectedValue = parentFunction.selectedStorage();
    parentFunction.displayItemsOnLoad(selectedValue);
  }
  
  this.onKeyPressEventListener = function(){
      document.getElementById('mainInput').addEventListener('keypress', parentFunction.onKeyPress);
  }

  this.checkboxEventListener = function(checkbox){
    checkbox.addEventListener('click',parentFunction.completedItems);
  }

  this.deleteButtonEventListener = function(spanDeleteButton){
      spanDeleteButton.addEventListener('click',parentFunction.removeItems);
  }

  this.addButtonEventListener = function(addButton){
      addButton.addEventListener ("click", parentFunction.addItemsToStorage);
  }

  this.onKeyPress = function(e){
        if (e.keyCode == 13) {
          parentFunction.addItemsToStorage();
      }
    };
  }
  
  Controller.prototype.displayItemsOnLoad = function(selectedValue){
    document.getElementById('listOfItems').innerHTML = ""; //Clear the display area
    if(selectedValue === 'selectStorage'){
      alert('You must select any one storage!');
      document.getElementById("mainInput").value = "";
      document.getElementById('countOfItems').innerHTML = 0;
    }
    else{
      var data = storageInstance2.getStorageData();
        for(var i=0;i<data.length;i++){
          this.displayItems(data[i].id, data[i].value, data[i].completed);
        }
        this.countItems(data.length);
    }
    this.onKeyPressEventListener();
}

  Controller.prototype.addItemsToStorage = function(){
    var selectedValue = controllerInstance.selectedStorage();
    var data = storageInstance2.getStorageData();
    if(selectedValue === 'selectStorage'){
      alert('You must select any one storage!');
      document.getElementById("mainInput").value = "";
      document.getElementById('countOfItems').innerHTML = 0;
    }
    else{
      var uniqueId= Date.now();
      var inputFieldValue = document.getElementById("mainInput").value;
        if (inputFieldValue.trim() === '') {
          alert("Please write something!");
        }
        else{
          data.push({id: uniqueId,value: inputFieldValue, completed: false})
          storageInstance2.setStorageData(data);
          document.getElementById("mainInput").value = "";
          controllerInstance.displayItems(uniqueId,inputFieldValue);
          controllerInstance.countItems(data.length);
        }
    }
  }

  Controller.prototype.displayItems = function(uniqueId,inputFieldValue, completed){
    viewInstance.createListItem( uniqueId,inputFieldValue, completed);
  }

  Controller.prototype.completedItems = function(){
    var data = storageInstance2.getStorageData();
    var listItemId = this.parentElement.id;
    for(var j=0;j<data.length;j++){
      if(data[j].id === Number(listItemId)){
        data[j].completed = this.checked ? true : false;
      }
      storageInstance2.setStorageData(data);
    }
  }

  Controller.prototype.removeItems = function(){
      var data = storageInstance2.getStorageData();
      var listItemId = this.parentElement.id;
          for(var j=0;j< data.length;j++){
            if(data[j].id === Number(listItemId)){
              data.splice(j,1);
              var div = this.parentElement;
              div.parentNode.removeChild(div);
            }
        }
        storageInstance2.setStorageData(data);
        controllerInstance.countItems(data.length)
  }

  Controller.prototype.countItems = function(count){
    document.getElementById("countOfItems").innerHTML = count;
  }

  var controllerInstance = new Controller();