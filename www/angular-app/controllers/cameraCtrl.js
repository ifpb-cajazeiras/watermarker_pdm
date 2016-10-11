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

		vm.savePicture = savePicture;

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
		
		function convertBase64ToFile(data, callback){

			var imgData = data.replace("data:image/jpeg;base64,", "");
			//var the_file = new Blob([window.atob(imgData)],  {type: 'image/png', encoding: 'utf-8'});

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

		

		function decodeBase64Image(data, callback){
			var imgData = data.replace("data:image/jpeg;base64,", "");
			callback( new Buffer(imgData, 'base64') );
		}

		function savePicture(){
			var newFileName = vm.pictureName + ".png";
			var myFolderApp = "Pictures";

			//var imgData = vm.picture.replace("data:image/jpeg;base64,", "");
			//var the_file = new Blob([window.atob(imgData)],  {type: 'image/png', encoding: 'utf-8'});



			//save();

			/*function save(){
				window.resolveLocalFileSystemURL(cordova.file.dataDirectory, resolveOnSuccess, resOnError);
			}*/

			getPictureFolder(function(pictureFolder){

				writeFileInDirectory(pictureFolder);

			});

			function getPictureFolder(callback){

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
					console.log("fileSys", fileSys);
					fileSys.root.getDirectory( myFolderApp,
						{create:true, exclusive: false},
						callback,resOnError);

				}, resOnError);

			}

			function writeFileInDirectory(dir){
				
				dir.getFile(newFileName, {create:true}, function(file){

					console.log("criou arquivo vazio");

					convertBase64ToFile(vm.picture, function(pngBlob){

						file.createWriter(function(fw){

							fw.seek(fw.length);
							fw.write(pngBlob);
							console.log("salvou arquivo");

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

	}

})();