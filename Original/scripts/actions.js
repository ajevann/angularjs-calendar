function highlightAll(number){
	var id = '.' + number;
	$(id).each(function( i ){
		console.log('hit ' + $( this ).css( "border" ));
		$( this ).css( "border", "3px solid #000" );
	});
}

function unhighlightAll(number){
	var id = '.' + number;
	$(id).each(function( i ){
		console.log('hit ' + $( this ).css( "border" ));
		$( this ).css( "border", "1px solid #ddd" );
	});
}