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
   var diaDaSemana = dias[ data.getDay() ];
   var diaDoMes = zeroAEsquerda( data.getDate() );
   var mes = zeroAEsquerda( data.getMonth() + 1 );
   var ano = zeroAEsquerda( data.getFullYear() );
   var horas = zeroAEsquerda( data.getHours() );
   var minutos = zeroAEsquerda( data.getMinutes() );
   var segundos = zeroAEsquerda( data.getSeconds() );

   return diaDaSemana + ', ' + diaDoMes + '/' + mes + '/' + ano + ' ' + horas
         + ':' + minutos + ':' + segundos + '.';
}

function zeroAEsquerda( numero ) {
   if ( numero < 10 ) {
      return '0' + numero;
   } else {
      return numero;
   }
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
