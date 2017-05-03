var editing=false;
$(document).ready(function(){

	refresh();
	$('.avatar').initial({width:40,height:40,fontSize: 30});
	
	$('button[type=submit]').click(function(e){
		e.preventDefault();						//nesubmitina
		var personlist = {
			name: $('#name').val(),
			email: $('#email').val(),
			position: $('#position').val()
		};
			
		if (personlist.name !=='')  {
			var id = Date.now();
				if(editing) {
					var id=editing;
				};
				localStorage.setItem(id, JSON.stringify(personlist));   
				$('form')[0].reset();
				refresh();
				$('.avatar').initial({width:40,height:40,fontSize: 30});
		}else {
		alert("Name is missing!");
		}					
	});

	function refresh() {
		var table = $('table>tbody');
		table.empty();					
		var i = 0;
	
		if(localStorage.length > 0) {	
			for(var key in localStorage) {		
				if(key !== null && key !== 'undefined') {	
					i++;	
					var item = JSON.parse(localStorage.getItem(key)); 
					table.append('<tr>' + 
									'<td>' + i + '</td>' + 
									'<td>' + item.name + '</td>' +
									'<td>' + item.email + '</td>' +
									'<td>' + item.position + '</td>' +
									'<td>' + '<img class="avatar round" data-name="'+item.name+'"/>' + '</td>' +
									'<td>' + '<button data-id="'+key+'" id="edit"><i class="fa fa-pencil"></i></button><button data-id="'+key+'" id="delete"><i class="fa fa-trash"></i></button>' + '</td>' +
								'</tr>');
				};
			};
		};
		$('button[id=delete]').click(function() {
			var key=$(this).data('id');
			localStorage.removeItem(key);
			refresh();
			$('.avatar').initial({width:40,height:40,fontSize: 30});
		});				
		rebind();
		editing=false;
	};

	function rebind(){	
		$('button[id=edit]').on('click', function(){
			var name=$(this).data('id');  
			var editedlist = JSON.parse(localStorage.getItem(name));
			var editing=name;
		
			$('#name').val(editedlist.name); 	
			$('#email').val(editedlist.email);
			$('#position').val(editedlist.position);
				
		});	
	}
});