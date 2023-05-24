var prediccion1="";
var prediccion2="";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});
camara=document.getElementById("camara");
Webcam.attach('#camara');

function tomarfoto(){
    Webcam.snap(function(data_uri){
        document.getElementById('resultado').innerHTML = '<img id="foto" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/K8twWqwpz/model.json',modelLoaded);

function modelLoaded(){
    console.log("Modelo Cargado!");
}
function speak(){
var synth = window.speechSynthesis;
speak1 = "La primera prediccion es "+prediccion1;
speak2 = "La segunda prediccion es "+prediccion2;
var uttherThis = new SpeechSynthesisUtterance(speak1 + speak2);
synth.speak(uttherThis); 
}
function check(){
    img=document.getElementById("foto");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
         document.getElementById("resultado_emocion1").innerHTML=results[0].label;
         document.getElementById("resultado_emocion2").innerHTML=results[1].label;
         prediccion1 = results[0].label;
         prediccion2 = results[1].label;
         speak();
         if(results[0].label == "Feliz"){
            documents.getElementById("dibujo_emoji").innerHTML="&#128512";
         }
         if (results[0].label == "Triste"){
            document.getElementById("dibujo_emoji").innerHTML = "&#128532";
            
         }
         if (results[0].label == "enojo"){
            document.getElementById("dibujo_emoji").innerHTML = "&#128545";
            
         }
         if(results[1].label == "Feliz"){
            documents.getElementById("dibujo_emoji2").innerHTML="&#128512";
         }
         if (results[1].label == "Triste"){
            document.getElementById("dibujo_emoji2").innerHTML = "&#128532";
            
         }
         if (results[1].label == "enojo"){
            document.getElementById("dibujo_emoji2").innerHTML = "&#128545";
            
         }

        }
}
