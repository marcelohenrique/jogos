$( document ).ready( function() {
   informacoes( '#uml', 'UML' );
} );

// function setCookie( cname, cvalue, exdays ) {
// var d = new Date();
// d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000 ) );
// var expires = "expires=" + d.toUTCString();
// document.cookie = cname + "=" + cvalue + "; " + expires;
// }
//
// function getCookie( cname ) {
// var name = cname + "=";
// var ca = document.cookie.split( ';' );
// for ( var i = 0; i < ca.length; i++ ) {
// var c = ca[ i ];
// while ( c.charAt( 0 ) == ' ' )
// c = c.substring( 1 );
// if ( c.indexOf( name ) == 0 )
// return c.substring( name.length, c.length );
// }
// return "";
// }
//
// function checkCookie() {
// var username = getCookie( "username" );
// if ( username != "" ) {
// alert( "Welcome again " + username );
// } else {
// username = prompt( "Please enter your name:", "" );
// if ( username != "" && username != null ) {
// setCookie( "username", username, 365 );
// }
// }
// }

function informacoes( id, nome ) {
   $( id )
         .html(
               'Último: ' + localStorage.getItem( nome + '_data' ) + '<br />'
                     + 'Acertos: ' + localStorage.getItem( nome + '_acertos' )
                     + '<br />' + 'Erros: '
                     + localStorage.getItem( nome + '_erros' ) );
}
