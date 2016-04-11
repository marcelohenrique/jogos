$(document).ready(function() {
	$.getJSON('json/jogos.json', function(context) {
		$.get('pages/template_index.html', function(templateScript) {
			var template = Handlebars.compile(templateScript);
			var html = template(context);
			$('#content-placeholder').html(html);
		}, 'html');
		// for ( var jogo in context.jogos) {
		// informacoes(jogo.id, jogo.id);
		// }
	});
});

function informacoes(id, nome) {
	$('#' + id + '_data').html(
			'Último: ' + localStorage.getItem(nome + '_data'));
	$('#' + id + '_acertos').html(
			'Acertos: ' + localStorage.getItem(nome + '_acertos'));
	$('#' + id + '_erros').html(
			'Erros: ' + localStorage.getItem(nome + '_erros'));
}
