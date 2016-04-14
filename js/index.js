$( document ).ready( function() {
   $.getJSON( 'json/jogos.json', function( context ) {
      $.get( 'pages/template_index.html', function( templateScript ) {
         for ( var i in context.jogos ) {
            var jogo = context.jogos[ i ];
            jogo.data = new Date( localStorage.getItem( jogo.id + '_data' ) );
         }

         context.jogos.sort( function( a, b ) {
            return a.data.getTime() - b.data.getTime();
         } );

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

var dias = [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ];

function formata( dataStr ) {
   var data = new Date( dataStr );
   return dias[ data.getDay() ] + ', ' + data.getDate() + '/'
         + ( data.getMonth() < 9 ? '0' : '' ) + ( data.getMonth() + 1 ) + '/'
         + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes()
         + ':' + data.getSeconds() + '.';
}

function informacoes( id, nome ) {
   $( '#' + id + '_data' ).html(
         '<small>'
               + ( localStorage.getItem( nome + '_data' ) == null ? 'n/a'
                     : formata( localStorage.getItem( nome + '_data' ) ) )
               + '</small>' );
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
