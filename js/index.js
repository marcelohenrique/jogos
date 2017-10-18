var jogos_json;
var template_index;

var dias = [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ];

$( document ).ready( function() {
   $.getJSON( '../json/jogos.json', function( context ) {
      $.get( 'template_index.html', function( templateScript ) {
         jogos_json = context;
         template_index = templateScript;

         montaJogosAtivosInativos();
      }, 'html' );
   } );
} );

function montaJogosAtivosInativos() {
   var jogosAtivos = new Context();
   var jogosInativos = new Context();

   jogos_json.jogos.forEach( function( jogo, index ) {
      jogo.data = new Date( localStorage.getItem( jogo.id + '_data' ) );
      jogo.ativo = ( localStorage.getItem( jogo.id + '_ativo' ) === 'true' );

      if ( jogo.ativo ) {
         jogosAtivos.jogos.push( jogo );
      } else {
         jogosInativos.jogos.push( jogo );
      }
   } );

   montaTelaInicialJogos( jogosAtivos, jogosInativos );
}

function Context() {
   this.jogos = [];
}

function montaTelaInicialJogos( jogosAtivos, jogosInativos ) {
   montaTemplate( template_index, '#content-placeholder-ativos', jogosAtivos );
   montaTemplate( template_index, '#content-placeholder-inativos',
         jogosInativos );
}

function montaTemplate( templateScript, contentPlaceholder, context ) {
   context.jogos.sort( ordenaJogos );

   var template = Handlebars.compile( templateScript );
   var html = template( context );
   $( contentPlaceholder ).html( html );

   for ( var i in context.jogos ) {
      var jogo = context.jogos[ i ];
      informacoes( jogo.id, jogo.id );
   }
}

function ordenaJogos( a, b ) {
   return a.data.getTime() - b.data.getTime();
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

function formata( dataStr ) {
   var data = new Date( dataStr );
   var diaDaSemana = dias[ data.getDay() ];
   var diaDoMes = zeroAEsquerda( data.getDate() );
   var mes = zeroAEsquerda( data.getMonth() + 1 );
   var ano = zeroAEsquerda( data.getFullYear() % 2000 );
   var horas = zeroAEsquerda( data.getHours() );
   var minutos = zeroAEsquerda( data.getMinutes() );
   var segundos = zeroAEsquerda( data.getSeconds() );

   return diaDaSemana + ', ' + diaDoMes + '/' + mes + '/' + ano + ' ' + horas
         + ':' + minutos + '.';
}

function zeroAEsquerda( numero ) {
   if ( numero < 10 ) {
      return '0' + numero;
   } else {
      return numero;
   }
}

function habilitaJogo( e ) {
   localStorage.setItem( e.id, e.checked );
   montaJogosAtivosInativos();
   return true;
}
