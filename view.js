function View(){    
    this.appendCheckbox = function(checkbox,listItem){
        listItem.appendChild(checkbox);
        controllerInstance.checkboxEventListener(checkbox);
    }
    
    this.appendListItemText = function(spanListItemText,listItemText,listItem){
        spanListItemText.appendChild(listItemText);
        listItem.appendChild(spanListItemText);
    }
    
    this.appendDeleteButton = function(spanDeleteButton,deleteButton,listItem){
        spanDeleteButton.appendChild(deleteButton);
        listItem.appendChild(spanDeleteButton);
        controllerInstance.deleteButtonEventListener(spanDeleteButton);
    }
    
    this.appendListItem = function(listItem){
        document.getElementById("listOfItems").appendChild(listItem);
    }
    
    this.appendAddButton = function(addButton, addButtonText){
        addButton.appendChild(addButtonText);
        document.body.appendChild(addButton);
        controllerInstance.addButtonEventListener(addButton);
    }
}

View.prototype.createListItem = function(uniqueId,inputFieldValue,completedTask){
    var listItem = viewInstance.createNewElement('LI',{id: uniqueId});
    this.createCheckbox(listItem,completedTask);
    this.createListItemText(inputFieldValue, listItem);
    this.createDeleteButton(listItem);
    this.appendListItem(listItem);
}

View.prototype.createCheckbox = function( listItem, completedTask){
    var checkbox = viewInstance.createNewElement('input',{className : "checkbox", type : "checkbox"});
    checkbox.checked = completedTask;
    this.appendCheckbox(checkbox, listItem);
}

View.prototype.createListItemText = function(inputFieldValue, listItem){
    var spanListItemText = viewInstance.createNewElement('SPAN',{class: 'text'});
    var listItemText = viewInstance.createNewTextNode(inputFieldValue)
    this.appendListItemText(spanListItemText,listItemText,listItem);
}

View.prototype.createDeleteButton = function(listItem){
    var spanDeleteButton = viewInstance.createNewElement('SPAN',{class: "close"})
    var deleteButton = viewInstance.createNewTextNode("\u00D7")
    this.appendDeleteButton(spanDeleteButton,deleteButton,listItem);
}

View.prototype.createAddButton = function(){
    var addButton = viewInstance.createNewElement('button',{});
    var addButtonText = viewInstance.createNewTextNode('ADD')
    this.appendAddButton(addButton, addButtonText);
}

View.prototype.createNewElement = function(elementType,attributes){
    var element = document.createElement(elementType);
    for(var key in attributes){
        element.setAttribute(key,attributes[key])
    }
    return element;
}

View.prototype.createNewTextNode = function(value){
    return document.createTextNode(value);
}

var viewInstance = new View();

viewInstance.createAddButton();
controllerInstance.selectedStorageEventHandler();