$(document).ready(function(){

  console.log('sending');
  
   $("#submit").on("click",function () {
    console.log('click event');


      var item = $('form input');
      var todo = {item: item.val()};
      console.log('todo obj',todo);

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){       
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;
     
     
   })

  $('form').on('submit', function(e){

    console.log('submitting');
    e.preventDefault()


    

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          console.log(data);
          
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
    
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
         location.reload();
        }
      });
  });

});
