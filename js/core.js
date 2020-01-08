

var globalValues;
app.controller('main_control',function($scope,$http){
	var xaxis=[];
			load_demos();
			function load_demos(){
				
				setInterval(function() {
					
					$http.get("http://127.0.0.1:7001/load").success(function(values,time){
							//var passer= test;
							$scope.loaded_demos=values;
							getValue(values);
							//var voltage=data.voltage;
							//console.log('from core' + test);
							
							
						})
					
					}, 1000 );
				
				}
			
				var getValue = function(values){
					console.log(values);
					return values;
				}
	});

