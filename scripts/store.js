'use strict';
/* global cuid, Item */
const store = (function() {
  
  const items = [
    
  ];
  const hideCheckedItems = false;
  const searchTerm = '';
  const findById = (function(id) {
    let val = this.items.findIndex(function(element){
      return (element.id === id); 
    }); 
    console.log(val);
    return val; 
  });

  const addItem = (function(name) {
    try {
      Item.validateName(name);
      this.items.push(Item.create(name));
    } catch(error) {
      console.log('Cannot add item: ' + error.message);
    }
  });

  const findAndToggleChecked = (function(id) {
    console.log(this);
    let val = this.findById(id);
    console.log(val);    
    return this.items[val].checked = !this.items[val].checked;
  });

  const findAndUpdateName = (function(id, newName){
    try {
      Item.validateName(newName);
      this.findById(id).name = newName;    
    } catch(error) {
      console.log('Cannot update name: ' + error.message);
    }
  });
  const findAndDelete = (function(id){
    let val = this.items.findIndex(function(element){
      return element.id === id;
    });
    this.items.splice(val, 1);
  });

  return {
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete,
  };
}());