function StorageManager(key){
    this.getStorageData = function(){
        var selectedValue = controllerInstance.selectedStorage();
        var data;
        switch(selectedValue){
            case 'localStorage':
                data = localStorageInstance.getData(key);
                break;
            case 'sessionStorage':
                data = sessionStorageInstance.getData(key);
                break;
        }
        return data;
    }
    
    this.setStorageData = function(data){
        var selectedValue = controllerInstance.selectedStorage();
        switch(selectedValue){
            case 'localStorage':
                localStorageInstance.setData(data,key);
                break;
            case 'sessionStorage':
                sessionStorageInstance.setData(data,key);
                break;
        }
    }
}

var storageInstance = new StorageManager('items');
var storageInstance2 = new StorageManager('2ndInstance')