# simpleSocket

Fra din komando linje skal du i roden af folderen:
    
    npm install 
    
Herefter kan du starte applicationen fra roden af folderen med
    node server/www

Det skulle gerne starte applikationen på http://localhost:3000

Du kan også forbinde direkte til en websocket forbindelse: 

    ws://localhost:3000/primus

En test klient som kalder server og får token tilbage kan køres fra

    node server/testClient.js

