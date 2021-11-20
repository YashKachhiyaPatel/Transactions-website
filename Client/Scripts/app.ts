
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
          location.href = '/owner/addcustomer';
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

var i = 0;
var j = 0;
var addCustomer = document.getElementById('addnewcustomer');
var added = $('.new-added-customer');







addCustomer.addEventListener("click", function(e){
	e.preventDefault();

   var newLine = '<div class="row form-group mb-2">'+
			        '<div class="col-lg-2 col-6">'+
			          '<input type="text" name="custname[]" id="cust-name" class="form-control" placeholder="Name">'+
			        '</div>'+
			        '<div class="col-lg-4 col-6">'+
			          '<input type="email" name="custemail[]" id="cust-email" class="form-control" placeholder="Customers Email">'+
			        '</div>'+
			        '<div class="col-lg-3 col-6">'+
			          '<input type="number" name="custnumber[]" id="cust-number" class="form-control" placeholder="Mobile No.">'+
			        '</div>'+
			        '<div class="col-lg-2 col-5">'+
			          '<input type="number" name="custamount[]" id="cust-amount" class="form-control" placeholder="Amount">'+
			        '</div>'+
			         '<div class="col-lg-1 col-1">'+
			           '<a href="" class="text-black remove_button" id="delete-icon"> <i class="fas fa-times delete-row"></i></a>'+
			        '</div>'+
			      '</div>';

			      i++;
                  if(i<5){
                  	$(added).append(newLine);	
                  	j = i;
                  }else{

                  	addCustomer.style.display = "none";
                  	alert('maximum 5 customers are allowed');
                  }
			      
});

$(added).on('click', '.remove_button', function(e){ //Once remove button is clicked
        e.preventDefault();
         j--;
        $(this).parent().parent('div').remove(); //Remove field html
        //Decrement field counter
        if(j<4){
        	addCustomer.style.display = "inline";
        	i = j;
        }
        if(j==0){
        	addCustomer.style.display = "inline";
        	i = 0;
        }
    });
