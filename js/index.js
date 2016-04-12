$( document ).ready( function() {
   $.getJSON( 'json/jogos.json', function( context ) {
      $.get( 'pages/template_index.html', function( templateScript ) {
         var template = Handlebars.compile( templateScript );
         var html = template( context );
         $( '#content-placeholder' ).html( html );

         for ( var i in context.jogos ) {
            var jogo = context.jogos[ i ];
            informacoes( jogo.id, jogo.id );
         }
      }, 'html' );
   } );
} );

function informacoes( id, nome ) {
   $( '#' + id + '_data' ).html(
         '<small>'
               + ( localStorage.getItem( nome + '_data' ) == null ? 'n/a'
                     : localStorage.getItem( nome + '_data' ) ) + '</small>' );
   $( '#' + id + '_acertos' )
         .html(
               '<small>'
                     + ( localStorage.getItem( nome + '_acertos' ) == null ? 'n/a'
                           : localStorage.getItem( nome + '_acertos' ) )
                     + '</small>' );
   $( '#' + id + '_erros' ).html(
         '<small>'
               + ( localStorage.getItem( nome + '_erros' ) == null ? 'n/a'
                     : localStorage.getItem( nome + '_erros' ) ) + '</small>' );
}
