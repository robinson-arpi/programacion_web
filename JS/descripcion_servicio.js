const todasLasImagenes = document.querySelectorAll('.contenedor-flotante div img')
const imagenContenedor = document.querySelector('.contenedor-imagen')

window.addEventListener('DOMContentLoaded',()=>{
    todasLasImagenes[0].parentElement.classList.add('active');   
})
todasLasImagenes.forEach((image) =>{
    image.addEventListener('mouseover',() =>{
        imagenContenedor.querySelector('img').src = image.src;
        resetearActivadorImagenes();
        image.parentElement.classList.add('active');
    })
})
function resetearActivadorImagenes(){
    todasLasImagenes.forEach((img) =>{
        img.parentElement.classList.remove('active')
    })
}