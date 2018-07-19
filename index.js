/*Requirements
In terms of user experience, your shopping list app must allow users to:

enter items they need to purchase by entering text and hitting "Return" or clicking the "Add item" button
check and uncheck items on the list by clicking the "Check" button
permanently remove items from the list
Additionally:

You must use a CDN-hosted version of jQuery
Put your application code in a file called index.js and link to it in index.html
Be sure to put both script elements at the bottom of the <body> element.
Do not alter index.html or main.css other than adding the links to the external JavaScript inside index.html. 
Write JavaScript code that works with the existing HTML and CSS to implement the required features.
Hint: you may find it helpful to read up on and use the following jQuery methods: 
.submit(), preventDefault(), toggleClass(), and closest().*/


'use strict'; 
/* global $ */
function main() {
  function createNewListItem() {
    $('#js-shopping-list-form').submit(event => {
      // this stops the default form submission behavior
      event.preventDefault();
      
      const userText = $('.js-shopping-list-entry').val();
      $('.shopping-list').append(`
        <li>
          <span class="shopping-item">${userText}</span>
          <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
              <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
              <span class="button-label">delete</span>
            </button>
          </div>
        </li>
      `); 
    });
  }

  function toggle () {
    $('ul').on('click', '.shopping-item-toggle', function(event){
      const theElementweWant = $(this).closest('li').find('.shopping-item');
      $(theElementweWant).toggleClass('shopping-item__checked');
    });
  }

  //permanently remove items from the list
  function deleteItems () {
    $('ul').on('click', '.shopping-item-delete', function(event){  
      const theElementToDelete = $(this).closest('li');
      $(theElementToDelete).remove();
    });
  }
  createNewListItem();
  toggle();
  deleteItems();
}

$(main);