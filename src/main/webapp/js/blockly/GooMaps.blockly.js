window.blockly = window.blockly || {};
window.blockly.js = window.blockly.js || {};
window.blockly.js.blockly = window.blockly.js.blockly || {};
window.blockly.js.blockly.GooMaps = window.blockly.js.blockly.GooMaps || {};

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.GooMaps.propriedadeavancadaMapa = function() {

	var item;
	// Propriedade avançada para Bloquear a ação de Double Click
	// no Mapa, outras funções avançadas podem ser inseridas.
	this.cronapi.maps.setAdvancedMapOptions("map9225",
			'{\"disableDoubleClickZoom\" : true }');
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.GooMaps.Marcador_CronApp = function() {

	var item;
	this.cronapi.maps.createMarker("map9225", 'CronApp', 'CronApp',
			this.cronapi.maps.createLatLngPoint('-12.9994955', '-38.4688318'),
			'', '<h1>Sede do Cronapp em Salvador </h1>', '{\"opacity\" : 1.0}');
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.GooMaps.Centralizar_Mapa = function(item) {

	var item;
	this.cronapi.maps.centralizeMap("map9225", this.cronapi.maps
			.getPropertyFromAutoComplete(item, 'latitude'), this.cronapi.maps
			.getPropertyFromAutoComplete(item, 'longitude'));
	this.cronapi.maps.createMarker("map9225", 'Mark', this.cronapi.maps
			.getPropertyFromAutoComplete(item, 'addressName'),
			this.cronapi.maps.createLatLngPoint(this.cronapi.maps
					.getPropertyFromAutoComplete(item, 'latitude'),
					this.cronapi.maps.getPropertyFromAutoComplete(item,
							'longitude')), '', this.cronapi.maps
					.getPropertyFromAutoComplete(item, 'addressName'),
			'{\"opacity\" : 1.0}');
}

/**
 * GooMaps
 */
window.blockly.js.blockly.GooMaps.IniciaMapa = function() {

	var item;
	// Condicional responsável por manter o mapa sendo
	// renderizado, em uma situação em que o usuário altere
	// paginas, para manter o mapa sendo renderizado.
	if (!this.cronapi.maps.isInitialized("map9225")) {
		// Colocado o Ponto Central com as coordenadas de onde está localizada a empresa em Salvador
		this.cronapi.maps.init("map9225", 'roadmap', this.cronapi.maps
				.createLatLngPoint('-12.9994955', '-38.4688318'), '16',
				function(sender_item) {
					item = sender_item;
					this.blockly.js.blockly.GooMaps.propriedadeavancadaMapa();
					this.blockly.js.blockly.GooMaps.Marcador_CronApp();
					this.blockly.js.blockly.GooMaps.autocomplete();
				}.bind(this));
	}
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.GooMaps.autocomplete = function() {

	var item;
	// Bloco responsável para apresentar o recurso do Autocomplete
	// de endereço, Geocodificação ou Estabelecimento.
	this.cronapi.maps.createAutoComplete("buscaEnd", 'address',
			this.cronapi.maps.createLatLngBounds(this.cronapi.maps
					.createLatLngPoint('-13.0102706', '-38.5328507'),
					this.cronapi.maps.createLatLngPoint('-12.9363121',
							'-38.3952963')), 'true', '', function(sender_item) {
				item = sender_item;
				this.blockly.js.blockly.GooMaps.Centralizar_Mapa(item);
			}.bind(this));
}
