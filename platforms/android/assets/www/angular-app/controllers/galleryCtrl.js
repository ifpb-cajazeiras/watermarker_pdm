(function(){

	angular.module("watermarker")
		.controller("galleryCtrl", galleryCtrl);

	function galleryCtrl($scope){

		var vm = this;

		vm.images = [];

		getImages(function(files){

			console.log("encontrou "+ files.length + " arquivos");

			
			$scope.$apply(function(){
				vm.images = files;
			});

		});


		function getImages(callback){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){

				var sdcard = fs.root;
				
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