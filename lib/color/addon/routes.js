import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function() {
  this.route('dissimilarity');
  this.route('lightness');
	this.route('color-wheel');
	this.route('image-manipulation');
	this.route('mix');
	this.route('mix-2');
	this.route('number');
	this.route('spiral');
	this.route('hsl');
	this.route('lch');
	this.route('perlin-noise');
});
