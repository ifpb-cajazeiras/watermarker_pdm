echo "adicionando plataforma android"
cordova platform add android
echo "adicionando plugin file"
cordova plugins add cordova-plugin-file
echo "adicionando plugin camera"
cordova plugins add cordova-plugin-camera

echo "construindo app"
cordova build android