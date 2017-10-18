var dias = [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ];

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
