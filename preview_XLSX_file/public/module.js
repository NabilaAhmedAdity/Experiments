var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $sce) {	
	$scope.adi;
	$scope.myFunction = function() {
		$http({
		  method: 'GET',
		  url: '/file.xlsx',
		  responseType: 'arraybuffer'
		}).then(function successCallback(response) {
		    var file = response.data;
		    //console.log(file);
		    var data = new Uint8Array(file);
		   ///console.log(data);
		    var w = XLSX.read(data, {type: 'array'});
		    //console.log(w);
			var firstSheet = w.Sheets[w.SheetNames[0]];
			var output = XLSX.utils.sheet_to_html(firstSheet);
			console.log(output);
			$scope.adi = $sce.trustAsHtml(output);
			document.getElementById("file").innerHTML = output;

		  }, function errorCallback(response) {
		    console.log("Error is here");
		    console.log(response);
		  });
	}
});