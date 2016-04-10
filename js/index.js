$(document).ready(function() {
	informacoes('uml', 'uml');
});

function informacoes(id, nome) {
	$('#' + id + '_data').html(
			'Último: ' + localStorage.getItem(nome + '_data'));
	$('#' + id + '_acertos').html(
			'Acertos: ' + localStorage.getItem(nome + '_acertos'));
	$('#' + id + '_erros').html(
			'Erros: ' + localStorage.getItem(nome + '_erros'));
}
