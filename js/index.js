var jogos_json;
var template_index;

var dias = [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ];

$( document ).ready( function() {
   $.getJSON( 'json/jogos.json', function( context ) {
      $.get( 'pages/template_index.html', function( templateScript ) {
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

function habilitaJogo( e ) {
   localStorage.setItem( e.id, e.checked );
   montaJogosAtivosInativos();
   return true;
}
