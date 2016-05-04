$( document ).ready(
      function() {
         $.getJSON( 'json/jogos.json', function( context ) {
            $.get( 'pages/template_index.html',
                  function( templateScript ) {

                     var jogosAtivos = {
                        jogos : []
                     };
                     var jogosInativos = {
                        jogos : []
                     }

                     while ( context.jogos.length > 0 ) {
                        var jogo = context.jogos.shift();

                        // context.jogos
                        // .forEach( function( jogo ) {

                        jogo.data = new Date( localStorage.getItem( jogo.id
                              + '_data' ) );
                        jogo.ativo = ( localStorage
                              .getItem( jogo.id + '_ativo' ) === 'true' );

                        if ( jogo.ativo ) {
                           jogosAtivos.jogos.push( jogo );
                        } else {
                           jogosInativos.jogos.push( jogo );
                        }

                        // } );
                     }

                     jogosAtivos.jogos.sort( ordenaJogos );
                     jogosInativos.jogos.sort( ordenaJogos );

                     var template = Handlebars.compile( templateScript );
                     var html = template( jogosAtivos );
                     html += template( jogosInativos );
                     $( '#content-placeholder' ).html( html );

                     for ( var i in context.jogos ) {
                        var jogo = context.jogos[ i ];
                        informacoes( jogo.id, jogo.id );
                     }
                  }, 'html' );
         } );
      } );

function ordenaJogos( a, b ) {
   return a.data.getTime() - b.data.getTime();
}

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

function habilitaJogo( e ) {
   localStorage.setItem( e.id, e.checked );
   return true;
}
