/**

Função para colocar um elemento em 100% da tela
A ajustar o top padding do element que irá abaixo

*/

function pageFullHeight()
{
	var slideContainer 	= document.getElementById( 'slide-show' );
	var abaixoSlider 	= document.getElementById( 'index-content' );
	var mainMenu		= document.getElementById( 'menu-principal' );

	var window_h 		= window.innerHeight;
	var window_w 		= window.innerWidth;

	if ( slideContainer )
	{
		
		slideContainer.style.height = window_h + 'px';

		if ( abaixoSlider )
		{
			abaixoSlider.style.marginTop = ( window_h - 100  ) + 'px';
		}
	}

	if( mainMenu )
		mainMenu.style.height = window_h + 'px';
}

// roda o script pelo menos uma vez
pageFullHeight();


window.addEventListener( 'reload', function(){
	pageFullHeight();
} );

window.addEventListener( 'resize', function(){
	pageFullHeight();
} );


// esconde e mostra a barra de navegação

var menu = document.querySelector("li.wrraper-menu");
menu.addEventListener( 'click', function(){

	var menuPrincipal = document.getElementById( 'menu-principal' );

	if( menuPrincipal ){
		menuPrincipal.classList.toggle( 'show-menu' );
		console.log( menuPrincipal );
	}
} );