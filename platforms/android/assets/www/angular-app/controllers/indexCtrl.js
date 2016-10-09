(function(){

	angular.module("watermarker")
	.controller("indexCtrl", indexCtrl );


	function indexCtrl($scope){

		var vm = this;

		vm.takePhotoBtn = "Tirar Foto";
		vm.selectPhotoBtn = "Selecionar Foto";

		

		vm.showText = function(){

			console.log("clicou");

			if(!vm.hiddenText){
				vm.hiddenText = "Clicou no botao";
			}
			else{
				vm.hiddenText = null;
			}
			

		};

	}

})();