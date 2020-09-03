var mymap = L.map('main_map').setView([-34.6012424, -58.3861497], 13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution:
		'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	maxZoom: 18,
}).addTo(mymap);

L.marker([-34.6012424, -58.3861497]).addTo(mymap);
L.marker([-34.6012124, -58.3951497]).addTo(mymap);
L.marker([-34.6012024, -58.3961497]).addTo(mymap);
