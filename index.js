'use strict';
/* global $ */

const STORE = {
  items: [ 
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: false},
    {name: 'bread', checked: false}
  ],
  hideCheckedItems: false,
  wordSearch: ''
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  let filteredItems = STORE.items; 
  if (STORE.hideCheckedItems === true) {
    filteredItems = STORE.items.filter(function(item) { 
      return item.checked === false;
    });
  }  
  //hides the list items that are not the same as the user input
  if (STORE.wordSearch !== '') {
    filteredItems = filteredItems.filter(function(item) {
      return item.name.toLowerCase().startsWith(STORE.wordSearch); 
    });
  }
  console.log(filteredItems);
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}
//returns index of items in array inside STORE 
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // this function handles when users want to delete a shopping list item
  //fetch info from DOM (which delete button was clicked)
  //change STORE
  //render
  //Step 1, like in handleItemCheckClicked, use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    //get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.target);
    //delete the item 
    deleteItem(itemIndex);
    //render the updated shopping list 
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');
}

//function hides items that have been checked 
function handleHideItemChecked() {
  $('.js-shopping-list-hide').on('click', () => { 
    console.log('checkbox clicked');
    STORE.hideCheckedItems = !STORE.hideCheckedItems;
    renderShoppingList();
  });
}
 
//functions to display searched items 
function searchItems(searchedItem) { 
  STORE.wordSearch = searchedItem;
}
//search box 
function handleSearchItems() {
  $('.js-search-items').on('keyup', function() {
    event.preventDefault();
    let searchWord = $(this).val().toLowerCase();
    //check for enter
    //if (event.key === 'Enter') {
      
    //  searchItems(searchWord); 
    //  renderShoppingList();
    //}
    console.log(event.key === 'Enter'); 
    searchItems(searchWord);
    renderShoppingList(); 
    console.log(STORE);
  });  
}


//make function that edits item in shopping list
//make event listener to handle dbl click 
//change li to text field 
//text box
/*function changeItems(itemIndex) { 
  $('.js-shopping-item').on('keyup', function(e) {
    STORE.items[itemIndex].name = editedList; 
    //if (this.key === 'Enter') {
    //  console.log('enter key pressed');
  });
}
*/
function handleEditItems() {
  $('.js-shopping-list').on('dblclick', '.js-shopping-item', function() {
    //change html in the DOM 
    $(this).html('<input class="edit-item" type="text">'); 

    $('.js-shopping-item').on('keyup', function(e) {
      if(e.key === 'Enter') {
        let editedList = $('.edit-item').val();
        let itemIndex = (getItemIndexFromElement(e.currentTarget));
        STORE.items[itemIndex].name = editedList; 
        //changeItems();
        renderShoppingList();
      }
    });
  }); 
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideItemChecked();
  handleSearchItems();
  handleEditItems();
}

$(handleShoppingList);