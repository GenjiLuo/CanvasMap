function EqualAreaCylindrical() {"use strict";
	var cosPhi0 = Math.cos(30 / 180 * Math.PI);

	this.toString = function() {
		return 'Cylindrical Equal-Area';
	};
	
	this.getStandardParallel = function() {
		return Math.acos(cosPhi0);
	};
	
	this.setStandardParallel = function(phi0) {
		cosPhi0 = Math.cos(phi0);
	};
	
	this.forward = function(lon, lat, xy) {
		xy[0] = lon * cosPhi0;
		xy[1] = Math.sin(lat) / cosPhi0;
	};
}