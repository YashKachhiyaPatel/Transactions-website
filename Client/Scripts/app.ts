/* Yash Kachhiyapatel (301171192) - 18-June-2021 */
//IIFE -- Immediately Invoked Function Expression
"use strict";

//function to ask while deleting

(function(){

    function confirmDelete()
    {
      // confirm deletion
      $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
          event.preventDefault();
          location.href = '/contacting-list';
        }              
      }); 
    }

    function Start():void
    {
        console.log("App Started");
        
        confirmDelete();  
    }

    window.addEventListener("load", Start);

})();
