(function(){

	var timeout;
	var delay = 500;

	angular.module("watermarker")
	.directive("watermark", function(){

		return function(scope, element, attrs){

			scope.$watch('vm.fontSize', function(newval, oldval){

				if( !isNaN(newval) ){
					updatePicture(scope, scope.vm.text);
				}

			});

			scope.$watch('vm.textWidth', function(newval, oldval){

				if( !isNaN(newval) ){	
					updatePicture(scope, scope.vm.text);
				}


			});

			scope.$watch('vm.text', function(newval, oldval){

				console.log("texto mudou para: " + newval);
				updatePicture(scope, newval);
				


			});

		};

	});

	function updatePicture(scope, newval){
		console.log("atualizar imagem");

		clearTimeout(timeout);

		timeout = setTimeout(function(){

			var fontSize, textWidth;

			scope.$apply(function(){

				scope.vm.picture = scope.vm.lastPicture;
				fontSize = scope.vm.fontSize;
				textWidth = scope.vm.textWidth;

			});

			if(scope.vm.picture){

				console.log("tamanho da imagem: " + $(".pic").width());

				$(".pic").watermark({
					text:newval,
					gravity:'nw',
					textSize:fontSize,
					textWidth:textWidth,
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
	}


})();