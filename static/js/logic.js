const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
  ctx.canvas.width = 28*10;
  ctx.canvas.height = 28*10;
}
function reposition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  reposition(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.strokeStyle = "white";
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

function enviarApi(){
    d3.select("#respuesta").attr("style","visibility:visible")

    let imagen_64 = canvas.toDataURL()
    console.log("Imagen base64:",imagen_64)
    d3.json("/api",{
        method:"POST",
        body:JSON.stringify({
            imagen:imagen_64
        }), 
        headers:{
            "Content-type":"application/json"
        }})
        .then(json=>{
            console.log(json)
            d3.select("#respuesta").text(`Estimación: ${json.etiqueta}`)
        })

}
