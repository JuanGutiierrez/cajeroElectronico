// captura de de los impust usuario y contraseña html
const usuarios = document.querySelector('#usuario');
const contrasenas = document.querySelector('#contrasena');
const ingresar = document.querySelector('#ingresar');
const entradas = document.querySelectorAll('.entradaUsuario');
const formularioInputs = document.querySelector('#formularioInputs');
const saldo = document.querySelector('#saldo');
const error = document.querySelector('#error');
error.setAttribute('style', 'display:none');
console.log(entradas);

// base de datos de los clientes
const usuariosValidos = ['Andres', 'Mario', 'Mayra', 'Juan', 'Suzana'];
const contrasenasValidas = ['1234', '3456', '7899', '0987', '0988'];
let tamanhoVector = usuariosValidos.length;
let contrasenaEncontrado = false;
let usuarioEncontrado = false;
let contadorErrores = 0;
let position = 0;

// Expresiones regulares
const validarUsuario = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
const validadContrasena = /^(\d)?(\d|,)*\.?\d$/;

// función para validad que los caracteres ingresado sean validos para usuario y contraseña
const validarForm = (e)=>{
    switch(e.target.name){
        case 'usuario':
            if(validarUsuario.test(e.target.value)){
                console.log('Caracteres de usuario correctos')
               
                error.setAttribute('style', 'display:none');
            }else{
                console.log('Caracteres de usuario incorrectos')
                error.setAttribute('style', 'display:block');
            }
        break;

        case 'contrasena':
            if(validadContrasena.test(e.target.value)){
                console.log('Caracteres de contraseña correctos')
                error.setAttribute('style', 'display:none');
            }else{
                console.log('Caracteres de contraseña incorrectos')
                error.setAttribute('style', 'display:block');
            }
        break;
    }
}
 // validar que el usuario ingresado tenga los caracteres correctos
    entradas.forEach((entrada) => {
    entrada.addEventListener('blur', validarForm)

});

// Validar si el usuario o contraseña está en la base de datos y contar errores
// si la clave y usuario es acertada lo manda a la vista de operaciones
// si la clave y usuario es incorrecto 3 veces va a página de salida
ingresar.addEventListener('click', (e)=>{
    if(contadorErrores <=2){
        e.preventDefault(); 
        for(let i = 0; i < tamanhoVector; i++){
            if((usuariosValidos[i] == usuarios.value) && contrasenasValidas[i] == contrasenas.value){
                usuarioEncontrado = true;
                contrasenaEncontrado = true;
                console.log('el usuario está en la base de datos');
                console.log(usuarioEncontrado);
                console.log('La contraseña está en la base de datos');
                console.log(usuarioEncontrado);
                position = i;
                window.location="../index.html";
                break;
            }
            if(i == (tamanhoVector-1)){
                console.log('Usuario o contraseña errados');
                contadorErrores++;
                console.log(contadorErrores);
            }
        }

    }
    if(contadorErrores >= 2){
        // ingresar.href = "../html/loginErrado.html"  
        formularioInputs.setAttribute('action','loginErrado.html')
        window.location = "../vista-login-errado/loginErrado.html"
    }
    });