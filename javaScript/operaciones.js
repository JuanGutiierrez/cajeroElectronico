// saldo inicial del usuario como dato quemado
let saldoUsuario = 1000000000;
let retiro;
let consignacion;
let transferencia;

//captura de botones en operaciones.html
const contenedorBotones = document.querySelector('#contenedorBotones')
const botonSaldo = document.querySelector("#botonSaldo");
const botonRetirarDinero = document.querySelector("#botonRetirarDinero");
const botonConsignarDinero = document.querySelector("#botonConsignarDinero");
const botonCerrar = document.querySelector("#botonCerrar");
const botonTransferirDinero = document.querySelector("#botonTransferirDinero");

// captura del contenedor donde se van a escribir las operaciones <section>
let contenedorOperaciones = document.querySelector("#contenedorOperaciones");
contenedorOperaciones.classList.add("contenedorOperaciones");

// interuptores booleanos para limpiar o no la pantalla según se realice una acción repetida
// o se cambie a otra acción
let booleanoRetiro = false;

let booleanoValidarNombre = false;
let booleanoValidarcorreo = false;
let booleanoValidarNumeroTransferencia = false;
let booleanoValidarMonto = false;

// obtenemos la fecha
let nuevaFecha = new Date();
let dia = nuevaFecha.getDate();
let mes = nuevaFecha.getMonth();
let year = nuevaFecha.getFullYear();
let fecha = `${dia}/${mes}/${year}`;

//funcionamiento botón cerrar
botonCerrar.addEventListener("click", () => {
  contenedorOperaciones.innerHTML = ""; // Limpiamos el html de trassacciones anteriores
  // creamos los botones para confirmar no no la terminación del menú principal del cajero
  contenedorBotones.setAttribute("style", "display:none")
  contenedorOperaciones.innerHTML = `
      <article class"contenedorOpcionesCerrarSesion">
        <section class="tituloCerraSesion">
          <h1>¿Quieres cerrar sesión?</h1>
        </section>
        <section class="opcionesCerrarSesion">
          <input id="salir" class="botonesOperaciones" type="button" value = "SI">
          <input id="noSalir" class="botonesOperaciones" type="button" value = "NO">
        </section>
      </article>
        `;
  const salir = document.querySelector("#salir");
  const noSalir = document.querySelector("#noSalir");
  // con los botones creados en el innetHML creamos los eventos para salir o solo limpiar la pantalla
  salir.addEventListener("click", () => {
    contenedorBotones.setAttribute('style', 'display:flex')
    window.location = "../vista-login/login.html";
  });

  noSalir.addEventListener("click", () => {
    contenedorOperaciones.innerHTML = "";
    contenedorBotones.setAttribute('style', 'display:flex')
  });
});

// funcionamiento boton saldo
botonSaldo.addEventListener("click", () => {

  contenedorOperaciones.innerHTML = "";
  contenedorBotones.setAttribute("style", "display:none")

  const botonCerrarVentanaSaldo = document.createElement("input")
  botonCerrarVentanaSaldo.type = "button";
  botonCerrarVentanaSaldo.value = 'Atrás';
  botonCerrarVentanaSaldo.id = "botonCerrarVentanaSaldo";

  const contenedorTextoSaldo = document.createElement('table');
  contenedorTextoSaldo.id = 'contenedorTextoSaldo';
  contenedorTextoSaldo.classList.add('tablaSaldo')

  const cuerpoTablaSaldo = document.createElement('tbody');
  cuerpoTablaSaldo.id = 'cuerpoTablaSaldo';

  const tituloSaldo = document.createElement('h2');
  tituloSaldo.id = 'tituloSaldo';
  tituloSaldo.innerText = 'Saldo';

  const contenedorBotonYTituloSaldo = document.createElement('aside');
  contenedorBotonYTituloSaldo.id = 'contenedorBotonYTituloSaldo';

  contenedorTextoSaldo.appendChild(cuerpoTablaSaldo)

  contenedorBotonYTituloSaldo.append(botonCerrarVentanaSaldo, tituloSaldo)
  contenedorOperaciones.append(contenedorBotonYTituloSaldo, contenedorTextoSaldo);

  botonCerrarVentanaSaldo.addEventListener("click", () => {
    contenedorBotones.setAttribute("style", "display: flex");
    contenedorOperaciones.innerHTML = ""
  })

  cuerpoTablaSaldo.innerHTML +=
    `
      <tr class="filasTablaSaldo">
        <td>Cuenta</td>
        <td class="letraNormal">Saldo disponible</td>
      </tr>
      <tr class="filasTablaSaldo2">
        <td class="letraNormal"> Sr.Andres </td>
        <td>$ ${saldoUsuario}</td>
      </tr>
  `;


}); // fin botón saldo

let guardadoFechaRetiro = [];
let guardadoValorRetiro = [];

// Expresiones regular retirar dinero
const validarRetiro = /^(\d)?(\d|,)*\.?\d$/;

// funcionamiento botón retirar dinero
botonRetirarDinero.addEventListener("click", () => {

  contenedorOperaciones.innerHTML = ""; // limpiamos el contenido de la pantalla

  contenedorBotones.setAttribute("style", "display:none");

  const tituloRetirarDinero = document.createElement('h2');
  tituloRetirarDinero.id = 'tituloRetirarDinero';
  tituloRetirarDinero.innerText = 'Retirar dinero'

  const botonCerrarVentanaRetirar = document.createElement("input")
  botonCerrarVentanaRetirar.type = "button";
  botonCerrarVentanaRetirar.value = 'Atrás';
  botonCerrarVentanaRetirar.id = "botonCerrarVentanaRetirar";

  const contendorBotonYtituloRetirar = document.createElement('article');
  contendorBotonYtituloRetirar.id = 'contendorBotonYtituloRetirar';
  contendorBotonYtituloRetirar.append(tituloRetirarDinero, botonCerrarVentanaRetirar);

  // creamos el input donde vamos a ingresar el monto retiro con createElement
  const campoRetiro = document.createElement("input");
  campoRetiro.type = "text";
  campoRetiro.name = "retiro";
  campoRetiro.id = "campoRetiro";
  campoRetiro.placeholder = "Valor a retirar";

  // creamos el botón retiro para concretar la transacción
  const botonRetiro = document.createElement("input");
  botonRetiro.type = "button";
  botonRetiro.value = "Retirar";
  botonRetiro.id = "botonRetiro";

  const contenedorElementosInputTransferir = document.createElement('form');
  contenedorElementosInputTransferir.id = 'contenedorElementosInputRetirar';
  contenedorElementosInputTransferir.append(campoRetiro, botonRetiro);

  const cuerpoTablaRetirar = document.createElement('tbody');
  cuerpoTablaRetirar.id = 'cuerpoTablaRetiro';


  const contenedorTablaRetiro = document.createElement("table");
  contenedorTablaRetiro.id = 'contenedorTablaRetiro';

  contenedorTablaRetiro.innerHTML =
    `
    <thead class="encabezadoTablaRetiro">
      <tr class="filasTablaRetirar"> 
        <td class="fechaRetiro">Fecha</td>
        <td class="valorRetiro">Valor del retiro </td>
      </tr>
    </thead>
    `;
  contenedorTablaRetiro.append(cuerpoTablaRetirar);
  const tituloMovimientos = document.createElement('h2');
  tituloMovimientos.id = 'tituloMovimientos';
  tituloMovimientos.textContent = 'Movimientos';



  contenedorOperaciones.append(
    contendorBotonYtituloRetirar,
    contenedorElementosInputTransferir,
    tituloMovimientos,
    contenedorTablaRetiro
  );

  botonCerrarVentanaRetirar.addEventListener("click", () => {
    contenedorBotones.setAttribute("style", "display: flex");
    contenedorOperaciones.innerHTML = ""
  });

  for (let i = 0; i < guardadoValorRetiro.length; i++) {

    cuerpoTablaRetiro.innerHTML +=
      `
      <tr class"filasTablaRetirar2>
        <td class="fechaRetiro">${guardadoFechaRetiro[i]}</td>
        <td class="valorRetiro">$${guardadoValorRetiro[i]}</td>
      </tr>
                
      `;

  }

  // evento campo retiro de dinero, validamos expresiones regulare y que en la cuenta
  // haya suficiente dinero a retirar
  botonRetiro.addEventListener("click", () => {

    if (validarRetiro.test(campoRetiro.value)) {
      retiro = parseFloat(campoRetiro.value);

      if (retiro < saldoUsuario) {
        saldoUsuario -= retiro;
        console.log(saldoUsuario);
        guardadoFechaRetiro.push(fecha);
        guardadoValorRetiro.push(retiro);
        cuerpoTablaRetirar.innerHTML +=
          `
          <tr class"filasTablaRetirar2> 
            <td class="fechaRetiro">${fecha}</td>
            <td class="valorRetiro">$${retiro}</td>
          </tr>
                
        `;
      } else {

        cuerpoTablaRetirar.innerHTML += 
        `
          <tr>
            <td>No tiene el dinero suficiente en la cuenta para hacer este retiro</td>
          </tr>
          <tr>
            <td></td>
          </tr>
        `;

      }
    } else {
      console.log("Incorrecto");
      cuerpoTablaRetirar.innerHTML += 
      `
        <tr>
          <td>Datos incorrectos, vuelva a digitarlos</td>
        </tr>
      `;

    }
  });
}); // fin botón retira

// rexpresión regular consignar dinero
const validarConsignacion = /^(\d)?(\d|,)*\.?\d$/;

let guardarValorConsignacion = [];
let guardarSaldoConsignacion = [];

// configuracion boton consignar dinero a la cuenta
botonConsignarDinero.addEventListener("click", () => {
  contenedorOperaciones.innerHTML = ""; // limpiamos el html
  contenedorBotones.setAttribute("style", "display: none");

  const botonCerrarVentanaConsignar = document.createElement("input");
  botonCerrarVentanaConsignar.type = "button";
  botonCerrarVentanaConsignar.value = 'Atrás';
  botonCerrarVentanaConsignar.id = "botonCerrarVentanaConsignar";

  const tituloConsignarDinero = document.createElement('h2');
  tituloConsignarDinero.id = 'tituloConsignarDinero';
  tituloConsignarDinero.textContent = 'Consignar dinero';

  const contendorBotonyTituloConsignar = document.createElement('article');
  contendorBotonyTituloConsignar.id = 'contendorBotonyTituloConsignar';
  contendorBotonyTituloConsignar.append(tituloConsignarDinero, botonCerrarVentanaConsignar);

  const contenedorElementosInputConsignar = document.createElement('form');
  contenedorElementosInputConsignar.id = 'contenedorElementosInputConsignar';

  // creamos el campo donde se va a consignar el dinero
  const campoConsignar = document.createElement("input");
  campoConsignar.type = "text";
  campoConsignar.name = "consignacion";
  campoConsignar.id = "campoConsignar";
  campoConsignar.placeholder = "Valor a consignación";

  // creamos el botón para consignar
  const botonConsignar = document.createElement("input");
  botonConsignar.type = "button";
  botonConsignar.value = "Consignar";
  botonConsignar.id = "botonConsignar";


  const contenedorTablaConsignar = document.createElement("table");
  contenedorTablaConsignar.id = 'contenedorTablaConsignar';
  contenedorElementosInputConsignar.append(campoConsignar, botonConsignar);

  const cuerpoTablaConsignar = document.createElement('tbody');
  cuerpoTablaConsignar.id = 'cuerpoTablaConsignar';

  contenedorTablaConsignar.appendChild(cuerpoTablaConsignar)

  contenedorOperaciones.append(
    contendorBotonyTituloConsignar,
    contenedorElementosInputConsignar,
    contenedorTablaConsignar
  );


  for (let i = 0; i < guardarValorConsignacion.length; i++) {

    cuerpoTablaConsignar.innerHTML += `
      <tr class="filasTablaSaldoConsignar">
        <td class="letraNormal">El valor de la consiganacion:</td>
        <td class="separacionSaldoConsignar">$${guardarValorConsignacion[i]}</td>
      </tr>
      <tr class="filasTablaSaldoConsignar2">
        <td class="letraNormal">Total cuenta: </td>
        <td class="separacionSaldoConsignar2">$${guardarSaldoConsignacion[i]}</td>
      </tr>
    `;
  }

  botonCerrarVentanaConsignar.addEventListener("click", () => {
    contenedorBotones.setAttribute("style", "display: flex");
    contenedorOperaciones.innerHTML = ""
  })

  // evento para realizar la consignación, validamos expresiones regulares
  botonConsignar.addEventListener("click", (e) => {
    if (validarConsignacion.test(campoConsignar.value)) {
      consignacion = parseFloat(campoConsignar.value);
      saldoUsuario += consignacion;
      guardarValorConsignacion.push(consignacion);
      guardarSaldoConsignacion.push(saldoUsuario)
      cuerpoTablaConsignar.innerHTML += `
        <tr class="filasTablaSaldoConsignar">
          <td class="letraNormal">El valor de la consiganacion: </td>
          <td class="separacionSaldoConsignar">$${consignacion}</td>
        </tr>
        <tr class="filasTablaSaldoConsignar2">
          <td class="letraNormal">Total cuenta: </td>
          <td class="separacionSaldoConsignar2">$${saldoUsuario}</td>
        </tr>
      `;

    } else {
      console.log("Incorrecto");
      cuerpoTablaConsignar.innerHTML += `
        <tr>
          <td>Datos incorrectos, Vuelva a digitarlos</td>
        </tr>
      `;
    }
  });
});

// expresiones regulares para transferencia
const validarNombreTranferencia = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const validarCorreoTranferencia = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const validarNumeroCuentaTransferencia = /^(\d)?(\d|,)*\.?\d$/;
const validadValorTransferencia = /^(\d)?(\d|,)*\.?\d$/;

let guardadoFechaTransferencia = [];
let guardadoValorTransferencia = [];
let guardadoNombreTransferencia = [];
let guardadoNumeroCuentaTransferencia = [];
let guardadoCorreoTransferencia = [];

// configuracion boton transferir dinero
botonTransferirDinero.addEventListener("click", () => {
  contenedorOperaciones.innerHTML = ""; // limpiamos el html dentro de la etiqueta contenedor
  contenedorBotones.setAttribute("style", "display: none");

  const botonCerrarVentanaTransferir = document.createElement("input");
  botonCerrarVentanaTransferir.type = "button";
  botonCerrarVentanaTransferir.value = "Atrás";
  botonCerrarVentanaTransferir.className = "botonAtras";
  botonCerrarVentanaTransferir.id = "botonCerrarVentanaTransferir";

  botonCerrarVentanaTransferir.addEventListener("click", () => {
    contenedorBotones.setAttribute("style", "display: flex");
    contenedorOperaciones.innerHTML = "";
  });

  const tituloTransferencia = document.createElement("h2");
  tituloTransferencia.id = "tituloTransferencia";
  tituloTransferencia.textContent = "Transferir dinero";

  const contenedorBotonYTituloTransferir = document.createElement("article");
  contenedorBotonYTituloTransferir.id = "contenedorBotonYTituloTransferir";
  
  contenedorBotonYTituloTransferir.append(
    tituloTransferencia,
    botonCerrarVentanaTransferir
  );

  // creamos el campo para ingresar el nombre de la persona a transferir
  const nombreTransferencia = document.createElement("input");
  nombreTransferencia.type = "text";
  nombreTransferencia.name = "nombre";
  nombreTransferencia.id = "nombreTransferencia";
  nombreTransferencia.classList.add("datosTranferencia");
  nombreTransferencia.placeholder = "Nombre";

  // creamos el campo para ingresar el correo de la persona a transferir
  const correoTransferencia = document.createElement("input");
  correoTransferencia.type = "email";
  correoTransferencia.name = "correo";
  correoTransferencia.id = "correoTransferencia";
  correoTransferencia.classList.add("datosTranferencia");
  correoTransferencia.placeholder = "Correo";

  // creamos el campo para ingresar numero de cuenta a transferir
  const numeroTransferencia = document.createElement("input");
  numeroTransferencia.type = "text";
  numeroTransferencia.name = "numero";
  numeroTransferencia.id = "numeroTransferencia";
  numeroTransferencia.classList.add("datosTranferencia");
  numeroTransferencia.placeholder = "N° Cuenta";

  // creamos el campo para ingresar el monto a transferir
  const montoTransferir = document.createElement("input");
  montoTransferir.type = "text";
  montoTransferir.name = "monto";
  montoTransferir.id = "montoTransferir";
  montoTransferir.classList.add("datosTranferencia")
  montoTransferir.placeholder = "Valor a transferir";

  // creamos el boton para realizar la transacción
  const botontransferir = document.createElement("input");
  botontransferir.type = "button";
  botontransferir.value = "Transferir";
  botontransferir.classList.add("botontransferir");
  botontransferir.id = "botonTransferir";

  const contenedorElementosInputTransferir = document.createElement("form");
  contenedorElementosInputTransferir.id = "contenedorElementosInputTransferir";

  const contenedorBotonYInputTransferir = document.createElement("form");
  contenedorBotonYInputTransferir.id = "contenedorBotonYInputTransferir";

  const contenedorInputInformacion = document.createElement("form");
  contenedorInputInformacion.id = "contenedorInputInformacion";

  const tituloMovimientos2 = document.createElement("h2");
  tituloMovimientos2.textContent = "Movimientos"
  tituloMovimientos2.classList.add("tituloMovimientos2")

  contenedorBotonYInputTransferir.append(montoTransferir, botontransferir);

  contenedorInputInformacion.append(
    nombreTransferencia,
    correoTransferencia,
    numeroTransferencia
  );

  contenedorElementosInputTransferir.append(
    contenedorBotonYTituloTransferir,
    contenedorInputInformacion,
    contenedorBotonYInputTransferir,
  );


  const cuerpoTablaTransferencia = document.createElement("tbody");
  cuerpoTablaTransferencia.id = "cuerpoTablaTransferencia";

  const tablaTransferencia = document.createElement("table");
  tablaTransferencia.id = "tablaTransferencia";
  tablaTransferencia.innerHTML = `
    
    <thead class="contenidoTransferencia"> 
      <tr>
        <td>Fecha</td>
        <td>Nombre</td>
        <td>Correo</td>
        <td>N° Cuenta</td>
        <td>Valor</td>
      </tr> 
    </thead>
  
  `;

  tablaTransferencia.appendChild(cuerpoTablaTransferencia);
  contenedorOperaciones.append(
    contenedorElementosInputTransferir,
    tituloMovimientos2,
    tablaTransferencia
  );

  const datosTransferencia = document.querySelectorAll(
    ".contenedorOperaciones input"
  );

  //
  for (let i = 0; i < guardadoValorTransferencia.length; i++) {
    cuerpoTablaTransferencia.innerHTML += `
      <tr>
        <td>${guardadoFechaTransferencia[i]}</td>
        <td>${guardadoNombreTransferencia[i]}</td>
        <td>${guardadoCorreoTransferencia[i]}</td>
        <td>${guardadoNumeroCuentaTransferencia[i]}</td>
        <td>${guardadoValorTransferencia[i]}</td>        
      </tr>
                
                `;
  }

  // evento para realizar trasnferencia
  botontransferir.addEventListener("click", () => {
    // validamos las expresiones regulares de los datos ingresado
    datosTransferencia.forEach((dato) => {
      switch (dato.name) {
        case "nombre":
          if (validarNombreTranferencia.test(dato.value)) {
            booleanoValidarNombre = true;
            console.log("Nombre:" + booleanoValidarNombre);
          } else {
            booleanoValidarNombre = false;
            console.log("Nombre:" + booleanoValidarNombre);
          }
          break;

        case "correo":
          if (validarCorreoTranferencia.test(dato.value)) {
            booleanoValidarcorreo = true;
            console.log("correo:" + booleanoValidarcorreo);
          } else {
            booleanoValidarcorreo = false;
            console.log("correo" + booleanoValidarcorreo);
          }
          break;

        case "numero":
          if (validarNumeroCuentaTransferencia.test(dato.value)) {
            booleanoValidarNumeroTransferencia = true;
            console.log("Numero:" + booleanoValidarNumeroTransferencia);
          } else {
            booleanoValidarNumeroTransferencia = false;
            console.log("Numero:" + booleanoValidarNumeroTransferencia);
          }
          break;

        case "monto":
          if (validadValorTransferencia.test(dato.value)) {
            booleanoValidarMonto = true;
            console.log("Monto:" + booleanoValidarMonto);
          } else {
            booleanoValidarNumeroTransferencia = false;
            console.log("Monto:" + booleanoValidarMonto);
          }
          break;
      }
    });

    // si las exrpesiones regulares son correctas en los campos se realiza la trasnferencia
    if (
      booleanoValidarNombre &&
      booleanoValidarcorreo &&
      booleanoValidarNumeroTransferencia &&
      booleanoValidarMonto
    ) {
      transferencia = parseFloat(montoTransferir.value);

      if (transferencia < saldoUsuario) {
        // validación saldo en cuenta
        saldoUsuario -= transferencia;
        console.log("El saldo restante es " + saldoUsuario);
        // guardado de datos en los vectores
        guardadoFechaTransferencia.push(fecha);
        guardadoNombreTransferencia.push(nombreTransferencia.value);
        guardadoNumeroCuentaTransferencia.push(numeroTransferencia.value);
        guardadoValorTransferencia.push(transferencia);
        guardadoCorreoTransferencia.push(correoTransferencia.value);

        cuerpoTablaTransferencia.innerHTML += `
          <tr>
            <td>${fecha}</td>
            <td>${nombreTransferencia.value}</td>
            <td>${correoTransferencia.value}</td>
            <td>${numeroTransferencia.value}</td>
            <td>${transferencia}</td>
              
          </tr>
                
                `;
      } else {
        cuerpoTablaTransferencia.innerHTML += `
          <tr>
            <td></td>
            <td></td>
            <td>No hay suficiente saldo para transferir</td>
            <td></td>
            <td></td>
                    
          </tr>
                    `;
      }
    } else {
      cuerpoTablaTransferencia.innerHTML += `
        <tr>
          <td></td>
          <td></td>
          <td>error en uno de los campos, se debe verificar</td>
          <td></td>
          <td></td>
        </tr>
      `;
    }
    booleanoValidarNombre = false;
    booleanoValidarcorreo = false;
    booleanoValidarNumeroTransferencia = false;
    booleanoValidarMonto = false;
  });
});