(function(){

	var timeout;
	var delay = 2000;

	angular.module("watermarker")
	.directive("watermark", function(){

		return function(scope, element, attrs){

			scope.$watch('vm.text', function(newval, oldval){

				console.log("texto mudou para: " + newval);

				clearTimeout(timeout);

				timeout = setTimeout(function(){

					scope.$apply(function(){

						scope.vm.picture = scope.vm.lastPicture;

					});

					if(scope.vm.picture){
						
						$("#pic").watermark({
							text:newval,
							done:function(url){
								
								scope.$apply(function(){

									console.log("sucesso ao adicionar logo marca");
									scope.vm.picture = url;

								});

								
							},
							fail:function(e){

								scope.$apply(function(){

									scope.vm.picture = scope.vm.lastPicture;

								});

								console.log("falha ao add logo marca", e);
							}
						});
					}


				}, delay);


			});

		};

	});


})();