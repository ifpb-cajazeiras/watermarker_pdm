(function(){

	angular.module("watermarker")
	.controller("cameraCtrl", cameraCtrl );


	function cameraCtrl($scope){

		var vm = this;
		
		vm.title = "Camera Page";
		vm.picture = {};

		vm.takePicture = takePicture;

		function pictureTaken(imgData){
			$scope.$apply(function(){
				console.log("foto tirada");
				vm.picture = imgData;
			});
		}
		function fail(msg){
			console.log("falha ao tirar foto");
			console.log(msg);
		}

		function takePicture(){
			navigator.camera.getPicture(pictureTaken, fail, {

				quality:50, 
				sourceType: Camera.PictureSourceType.CAMERA,
				destinationType: Camera.DestinationType.FILE_URI

			});
		}

		

	}

})();