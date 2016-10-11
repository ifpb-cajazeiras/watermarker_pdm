(function(){

	angular.module("watermarker")
		.controller("galleryCtrl", galleryCtrl);

	function galleryCtrl($scope){

		var vm = this;

		vm.images = [];

		vm.message = "";

		getImages(function(files){

			console.log("encontrou "+ files.length + " arquivos");

			files.forEach(function(f){

				console.log(f);

			});
			
			$scope.$apply(function(){
				vm.images = removeNonImages(files);
				if(vm.images.length === 0){
					vm.message = "Não existe imagens em Pictures";
				}
			});

		});

		function removeNonImages(files){

			var imgs = [];

			for( f in files){
				if(files[f].nativeURL.indexOf('.jpg') === -1  &&  files[f].nativeURL.indexOf('.png') === -1 ){
					continue;
				}
				else{
					imgs.push(files[f]);
				}
			}

			return imgs;

		}


		function getImages(callback){

			window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(sdcard){

				sdcard.getDirectory('Pictures', {create:false}, function(dcim){

					searchImages(dcim, callback);

				}, dcimError);

				function searchImages(directoryEntry, found){
					var directoryReader = directoryEntry.createReader();
					directoryReader.readEntries(function(entries){

						found(entries);

					},searchError);

					function searchError(err){
						console.log("erro ao procurar arquivos");
						console.log(err);
					}
				}

				function dcimError(err){
					console.log("erro ao pegar diretorio dcim");
					console.log(err);
				}


			}, fsError);

			
			function fsError(err){
				console.log("erro ao pegar filesystem");
				console.log(err);
			}

		}

	}	

})();