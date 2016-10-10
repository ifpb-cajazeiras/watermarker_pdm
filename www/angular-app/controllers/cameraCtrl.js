(function(){

	angular.module("watermarker")
	.controller("cameraCtrl", cameraCtrl );


	function cameraCtrl($scope){

		var vm = this;
		
		vm.title = "Camera Page";
		vm.picture = null;
		vm.lastPicture = null;
		vm.text = "";
		vm.pictureName = ""; 

		vm.takePicture = takePicture;

		vm.savePicture = saveBase64Img;

		function pictureTaken(imgData){
			$scope.$apply(function(){
				console.log("foto tirada");
				vm.picture = imgData;
				vm.lastPicture = imgData;
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
				destinationType: Camera.DestinationType.FILE_URI,
				encodingType: Camera.EncodingType.JPEG

			});
		}


		function saveBase64Img(){

			var imgData = vm.picture.replace("data:image/jpeg;base64,", "");

			console.log("tentar salvar " + imgData);
			cordova.base64ToGallery(imgData, {

				prefix:'logo_',
				mediaScanner:true

			}, function(path){
				console.log("sucesso ao salvar");
				console.log(path);
			}, function(err){

				console.log("erro ao salvar", err);

			} );
		}
		/*
		function savePicture(){
			var newFileName = vm.pictureName + ".jpg";
			var myFolderApp = "Pictures";

			save();

			function save(){
				window.resolveLocalFileSystemURL(vm.lastPicture, resolveOnSuccess, resOnError);
			}

			function resolveOnSuccess(entry){
				console.log("resolveOnSuccess");
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
					console.log("fileSys", fileSys);
					fileSys.root.getDirectory( myFolderApp,
						{create:true, exclusive: false},
						function(directory) {
							console.log("vai mover");
							entry.moveTo(directory, newFileName,  successMove, resOnError);
							console.log("moveu");
						},resOnError);

				}, resOnError);

			}

			function successMove(entry){
				console.log("sucesso ao salvar imagem");
				console.log(entry);
			}

			function resOnError(error){
				console.log("erro ao salvar imagem");
				console.log(error);
			}

		}*/

	}

})();