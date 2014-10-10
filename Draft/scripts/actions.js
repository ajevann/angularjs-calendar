function highlightAll(number){
	var id = '.' + number;
	$(id).each(function( i ){
		$( this ).css( "border", "3px solid #000" );
	});
}

function unhighlightAll(number){
	var id = '.' + number;
	$(id).each(function( i ){
		$( this ).css( "border", "1px solid #ddd" );
	});
}

function showHideFilter() {
	$( "#optionsContainer" ).toggle();
}

