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
		vm.fontSize = 130;
		vm.textWidth = 1000;

		vm.takePicture = takePicture;

		vm.savePicture = savePicture;

		vm.feedback = "";

		function pictureTaken(imgData){
			$scope.$apply(function(){
				console.log("foto tirada");
				vm.picture = imgData;
				vm.lastPicture = imgData;
				vm.feedback = "";
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

		function savePicture(){
			var newFileName = vm.pictureName + ".png";
			var myFolderApp = "Pictures";

			getPictureFolder(function(pictureFolder){

				writeFileInDirectory(pictureFolder, function(){
					
					$scope.$apply(function(){
						vm.feedback = "sucesso ao salvar";
					});

				});

			});

			function getPictureFolder(callback){

				window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSys){

					console.log("fileSys", fileSys);
					fileSys.getDirectory( myFolderApp,
						{create:true, exclusive: false},
						callback,resOnError);


				}, resOnError);
				/*
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
					console.log("fileSys", fileSys);
					fileSys.root.getDirectory( myFolderApp,
						{create:true, exclusive: false},
						callback,resOnError);

				}, resOnError);*/

			}

			function writeFileInDirectory(dir, success){
				
				dir.getFile(newFileName, {create:true}, function(file){

					console.log("criou arquivo vazio");

					convertBase64ToFile(vm.picture, function(pngBlob){

						file.createWriter(function(fw){

							fw.seek(fw.length);
							fw.write(pngBlob);
							console.log("salvou arquivo");

							success();

						}, function(err){
							console.log("falha ao criar writer", err);
						});

					});

				});

			}

			function successMove(entry){
				console.log("sucesso ao salvar imagem");
				console.log(entry);
			}

			function resOnError(error){
				console.log("erro ao salvar imagem");
				console.log(error);
			}

		}


		function convertBase64ToFile(data, callback){

			var imgData = data.replace("data:image/jpeg;base64,", "");

			b64toBlob(imgData, callback);

			function b64toBlob(b64Data, callback ) {
			    var contentType = 'image/png';
			    var sliceSize = 512;

			    var byteCharacters = atob(b64Data);
			    var byteArrays = [];

			    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			        var slice = byteCharacters.slice(offset, offset + sliceSize);

			        var byteNumbers = new Array(slice.length);
			        for (var i = 0; i < slice.length; i++) {
			            byteNumbers[i] = slice.charCodeAt(i);
			        }

			        var byteArray = new Uint8Array(byteNumbers);

			        byteArrays.push(byteArray);
			    }

			    var blob = new Blob(byteArrays, {type: contentType});
			    callback(blob);
			}
			
		}

	}

})();