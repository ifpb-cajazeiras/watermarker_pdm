#Projeto Final PDM 'WaterMarker'
Aplicativo android que permite tirar uma foto e adicionar uma marca d'água nela a partir de um texto digitado pelo usuário.
Desenvolvido com o uso do Cordova.

**Dependencias do app**

Angular JS

Bootstrap

jquery.watermark

cordova-plugin-file

cordova-plugin-camera

**Comportamento do app**

		1- Página inicial contém 2 botões (ver câmera e ver galeria);

		2- Em ver câmera, a página camera.html é exibida;

		3- camera.html contém um botão para tirar foto, e inputs para inserção do texto da logomarca e configuração do seu tamanho.

		4- Ao bater uma foto, é possível salva-la digitando o nome do arquivo no input abaixo da imagem e clicando no botão salvar.

		5- camera.html também possui um botão para a página da galeria (gallery.html)

		6- Em gallery.html as imagens que se encontram no 'ARMAZENAMENTO INTERNO'/Pictures são exibidas.


**Como instalar**

		1- git clone esse repositório

		2-Mova o arquivo watermarker.apk (encontrado na pasta APK) para algum diretório do seu android

		3-Usando o android, execute o apk para instalar o app. 


**Como fazer build**

		1- sudo chmod +x build.sh

		2- ./build.sh

O script build irá adicionar a plataforma android e instalar os plugins ao projeto. É necessário possuir o cordova instalado.




