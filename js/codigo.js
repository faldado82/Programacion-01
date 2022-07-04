// Arrays a utilizar
let usuarios = [];
let niveles = [];
let ejercicios = [];
let entregas = [];

// Elementos útiles para funciones de Login:

// Input Login Usuario
let inputUsuarioLogIn = document.querySelector('#logInUsuarioInput');
// Input Login Password
let inputPasswordLogIn = document.querySelector('#logInPasswordInput');
// Elemento página de inicio (registro y login)
let paginaInicio = document.querySelector('#pagina-inicio');
// Elemento página interior aplicacion (luego del log in exitoso)
let paginaApp = document.querySelector('#contenedor-aplicacion');
// Nombre del usuario que se visualiza al hacer login exitoso
let nombreAMostrar = document.querySelector('#nombreUsuario');

// Esta cuenta va a ser la que logre pasar el login, y segun su tipo (docente o alumno) se mostraran diferentes datos en las secciones.
let cuentaActiva = null;

// ################################### Funciones crear y guardar ###################################

// Función para crear un nuevo nivel (objeto) y agregarlo al array niveles
function crearYGuardarNivel(numero, nombre) {
  if (!isNaN(numero) && nombre.trim().length > 0 && isNaN(nombre)) {
    // Convertimos a número antes de agregarlo al objeto
    numero = Number(numero);
    let unNivel = new Nivel();
    unNivel.numero = numero;
    unNivel.nombre = nombre;
    // Agregamos el objeto nivel al array de niveles
    niveles.push(unNivel);
  }
}

// Función para crear un nuevo docente (objeto) y agregarlo al array usuarios
function crearYGuardarDocente(nombre, usuario, password) {
  if (
    validarNombre(nombre) &&
    validarUsuario(usuario) &&
    validarPassword(password) &&
    !validarUsuarioExistente(usuario)
  ) {
    let unDocente = new Docente();
    unDocente.nombre = nombre;
    unDocente.usuario = usuario.toLowerCase();
    unDocente.password = password;
    // Agregamos el objeto Docente con todas sus propiedades al array de usuarios
    usuarios.push(unDocente);
  }
}

// Función para crear un nuevo alumno (objeto) y agregarlo al array de usuarios
function crearYGuardarAlumno(nombre, usuario, password, nivel, docente) {
  if (
    validarNombre(nombre) &&
    validarUsuario(usuario) &&
    validarPassword(password) &&
    docente !== null &&
    nivel !== null &&
    !validarUsuarioExistente(usuario)
  ) {
    let unAlumno = new Alumno();
    unAlumno.nombre = nombre;
    unAlumno.usuario = usuario.toLowerCase();
    unAlumno.password = password;
    // El objeto Alumno tiene dentro un objeto Nivel
    unAlumno.Nivel = nivel;
    // El objeto Alumno tiene dentro un objeto Docente
    unAlumno.Docente = docente;
    // Agregamos el objeto Alumno con todas sus propiedades al array de usuarios
    usuarios.push(unAlumno);
  }
}

// Función para crear un nuevo ejercicio (objeto) y agregarlo al array de ejercicios
function crearYGuardarEjercicio(
  nivel,
  tituloEjercicio,
  descripcionEjercicio,
  imagen,
  docente
) {
  if (
    nivel !== null &&
    docente !== null &&
    tituloEjercicio.trim().length + descripcionEjercicio.trim().length >= 20 &&
    tituloEjercicio.trim().length + descripcionEjercicio.trim().length <= 200 &&
    imagen.trim().length > 4 &&
    tituloEjercicio.trim().length > 0 &&
    descripcionEjercicio.trim().length > 0 &&
    validarImagenArchivo(imagen)
  ) {
    let unEjercicio = new Ejercicio();
    unEjercicio.Nivel = nivel;
    unEjercicio.tituloEjercicio = tituloEjercicio;
    unEjercicio.descripcionEjercicio = descripcionEjercicio;
    unEjercicio.imagen = imagen;
    unEjercicio.Docente = docente;
    ejercicios.push(unEjercicio);
  }
}

function crearYGuardarEntrega(
  nivel,
  alumno,
  ejercicio,
  docente,
  sonido,
  devolucion
) {
  if (
    nivel !== null &&
    alumno !== null &&
    ejercicio !== null &&
    docente !== null &&
    sonido.length > 4 &&
    validarSonidoArchivo(sonido) &&
    alumno.Nivel === ejercicio.Nivel &&
    nivel === alumno.Nivel &&
    docente === alumno.Docente
  ) {
    let unaEntrega = new Entrega();
    unaEntrega.Nivel = nivel;
    unaEntrega.Alumno = alumno;
    unaEntrega.Ejercicio = ejercicio;
    unaEntrega.Docente = docente;
    unaEntrega.sonido = sonido;
    unaEntrega.devolucion = devolucion;
    // Agregamos la entrega al array general de entregas y al personal del alumno que entregó
    entregas.push(unaEntrega);
    alumno.entregasIndividuales.push(unaEntrega);
  }
}

// ################################### Funciones para obtener objetos con usuario, número o ID ###################################

// Esta función toma un nombre de usuario y devuelve el objeto de Docente con ese Usuario unico (en caso de existir) Nos aseguramos que sea de ese tipo poniendole el .tipo = 'docente' en el if statement
function obtenerDocenteConUsuario(usuario) {
  let docente = null;
  let i = 0;
  while (i < usuarios.length && docente === null) {
    // Chequeamos que coincida el usuario y el tipo para asegurarnos que devuelve un docente y no un alumno por error
    if (
      usuarios[i].usuario.toLowerCase() === usuario.toLowerCase() &&
      usuarios[i].tipo === 'docente'
    ) {
      docente = usuarios[i];
    }
    i++;
  }
  return docente;
}

// Esta función toma un nombre de usuario y devuelve el objeto de Alumno con ese Usuario unico (en caso de existir) Nos aseguramos que sea de ese tipo poniendole el .tipo = 'alumno' en el if statement
function obtenerAlumnoConUsuario(usuario) {
  let alumno = null;
  let i = 0;
  while (i < usuarios.length && alumno === null) {
    // Chequeamos que coincida el usuario y el tipo para asegurarnos que devuelve un alumno y no un alumno por error
    if (
      usuarios[i].usuario.toLowerCase() === usuario.toLowerCase() &&
      usuarios[i].tipo === 'alumno'
    ) {
      alumno = usuarios[i];
    }
    i++;
  }
  return alumno;
}

// Esta función toma un id y devuelve el objeto de Ejercicio de acuerdo a ese id único
function obtenerEjercicioConID(id) {
  let ejercicio = null;
  let i = 0;
  while (i < ejercicios.length && ejercicio === null) {
    if (ejercicios[i].id === id) {
      ejercicio = ejercicios[i];
    }
    i++;
  }
  return ejercicio;
}

// Esta función toma un número y devuelve el objeto de Nivel de acuerdo a ese número
function obtenerNivelConNumero(numero) {
  let nivel = null;
  let i = 0;
  while (i < niveles.length && nivel === null) {
    if (niveles[i].numero === numero) {
      nivel = niveles[i];
    }
    i++;
  }
  return nivel;
}

// Esta función toma un id y devuelve el objeto de Entrega de acuerdo a ese id
function obtenerEntregaConID(id) {
  let entrega = null;
  let i = 0;
  while (i < entregas.length && entrega === null) {
    if (entregas[i].id === id) {
      entrega = entregas[i];
    }
    i++;
  }
  return entrega;
}

// ################################### Funcionalidad Registro ###################################
function registro() {
  // No capturamos los value directamente porque nos interesa acceder luego al parentElement de cada elemento, para mostrar distintos errores en sus correspondientes span, y agregarle la class .error para pintar su borde de rojo
  let nombreInput = document.querySelector('#inputNombreRegistro');
  let usuarioInput = document.querySelector('#inputUsuarioRegistro');
  let passwordInput = document.querySelector('#inputPasswordRegistro');
  let confirmPasswordInput = document.querySelector('#confirmPasswordRegistro');
  let radioValor = valorRadioBtnRegistro();

  // Llamamos a estas funciones por si el usuario apreta "registrarme" se pondrían en rojo con su correspondiente mensaje en todos los campos que no validen, al mismo tiempo.
  validarNombreReg(nombreInput);
  validarUsuarioReg(usuarioInput);
  validarPasswordReg(passwordInput);
  compararPasswordsReg(passwordInput, confirmPasswordInput);

  if (
    validarNombreReg(nombreInput) &&
    validarUsuarioReg(usuarioInput) &&
    validarPasswordReg(passwordInput) &&
    compararPasswordsReg(passwordInput, confirmPasswordInput) &&
    radioValor !== undefined
  ) {
    // Tipo docente
    if (radioValor === 'docente') {
      // guardamos al docente en el array usuarios
      crearYGuardarDocente(
        nombreInput.value.trim().toLowerCase(),
        usuarioInput.value.trim(),
        passwordInput.value.trim()
      );

      // Esta funcion muestra nuestro UI y define la nueva cuentaActiva
      finRegistroExitoso();

      // Tipo alumno
    } else if (radioValor === 'alumno') {
      let selectDocente = document.querySelector(
        '#selectDocenteRegistro'
      ).value;

      if (selectDocente !== -1) {
        // guardamos al alumno en el array usuarios
        crearYGuardarAlumno(
          nombreInput.value.trim(),
          usuarioInput.value.trim().toLowerCase(),
          passwordInput.value.trim(),
          obtenerNivelConNumero(1),
          obtenerDocenteConUsuario(selectDocente)
        );
        // Esta funcion muestra nuestro UI y define la nueva cuentaActiva
        finRegistroExitoso();
      }
    }
  }
}

function finRegistroExitoso() {
  document.querySelector(
    '#mensajeRegistroExitoso'
  ).innerHTML = `Registro exitoso ✅ Estamos creando tu perfil...⏳`;

  let botonRegistro = document.querySelector('#btnRegistro');

  // La cuenta activa es ahora el último elemento del array usuarios
  cuentaActiva = usuarios[usuarios.length - 1];

  // Desactivamos el boton para que la función no pueda ser ejecutada nuevamente, mientras mostramos el mensaje de éxito
  botonRegistro.setAttribute('disabled', 'true');
  // Tardamos 2 segundos y medio para que se pueda ver el mensaje exitoso de registro
  setTimeout(ocultarVentanaRegistro, 2500);
  setTimeout(function () {
    mostrarUISegunUsuario(cuentaActiva);
  }, 2500);
}

// Nos devuelve el valor del radio button que este "cheked"
function valorRadioBtnRegistro() {
  let radios = document.getElementsByName('tipoUsuario');
  let valor;
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      valor = radios[i].value;
    }
  }
  return valor;
}

// ################################### Funcionalidad Login y Logout ###################################

function logIn() {
  let i = 0;
  // Buscamos la cuenta ingresada, si la encontramos vamos a la contraseña
  while (cuentaActiva === null && i < usuarios.length) {
    // usuarios[i] es cada objeto del array usuarios, el elemento actual en cada iteración
    // Se dejará de buscar una vez que encontramos el objeto
    if (
      usuarios[i].usuario.toLowerCase().trim() ===
      inputUsuarioLogIn.value.toLowerCase().trim()
    ) {
      cuentaActiva = usuarios[i];
    }
    i++;
  }
  // Chequeamos por contraseña
  if (
    cuentaActiva !== null &&
    cuentaActiva.password === inputPasswordLogIn.value
  ) {
    // Hacemos desaparecer el span de error de login
    document.querySelector('#mensajeLogIn').innerHTML = '';

    // Mostramos el UI segun el usuario
    mostrarUISegunUsuario(cuentaActiva);
  } else {
    // Hacemos aparecer el span del error login, poniendole un mensaje
    document.querySelector('#mensajeLogIn').innerHTML =
      'Usuario o contraseña incorrectos! Ingreselos nuevamente';
  }
}

function logOut() {
  // Reseteamos la cuentaActiva
  cuentaActiva = null;

  // Mostramos la pagina de inicio nuevamente, y ocultamos la de la aplicación
  paginaInicio.classList.remove('ocultar-ventana');
  paginaInicio.classList.add('mostrar-ventana');
  paginaApp.classList.add('ocultar-ventana');

  // Limpiamos inputs
  limpiarUsuarioInput();
  limpiarPasswordInput();
  limpiarInputsRegistro();
}

// ################################### Validaciones  ###################################

// Se permite cualquier nombre, no debe contener números ni caracteres especiales.
function validarNombreReg(inputNombre) {
  let validado = false;

  if (isNaN(inputNombre.value) && inputNombre.value.trim().length >= 4) {
    let bandera = true;
    let i = 0;
    while (bandera && i < inputNombre.value.trim().length) {
      if (
        inputNombre.value.charCodeAt(i) >= 33 &&
        inputNombre.value.charCodeAt(i) <= 64
      ) {
        bandera = false;
        mostrarErrorRegistro(
          inputNombre,
          'No debe contener números! Tampoco simbolos (!, #, $, &, @)'
        );
      } else {
        mostrarExitoRegistro(inputNombre);
        validado = true;
      }
      i++;
    }
  } else {
    mostrarErrorRegistro(inputNombre, 'Mínimo 4 caracteres. Solo letras.');
  }

  return validado;
}

// Esta función valida al usuario, no debe existir previamente en el array de usuarios, se permiten numeros, pero no espacios, debe ser mayor a 4 caracteres
function validarUsuarioReg(inputUsuario) {
  let validado = false;

  if (
    isNaN(inputUsuario.value) &&
    inputUsuario.value.trim().length >= 4 &&
    !tieneEspacioEntreMedio(inputUsuario.value.trim())
  ) {
    // Si valida todo lo de arriba, aún debera validar que es único
    if (!validarUsuarioExistente(inputUsuario.value)) {
      validado = true;
      mostrarExitoRegistro(inputUsuario);
    } else {
      mostrarErrorRegistro(
        inputUsuario,
        'Ese nombre de usuario ya existe! Probá otro distinto.'
      );
    }
  } else {
    mostrarErrorRegistro(
      inputUsuario,
      'Mínimo 4 caracteres. Sin espacios entremedio.'
    );
  }

  return validado;
}
// Esta función valida la contraseña ingresada, debe contener al menos 1 numero, 1 mayuscula y 1 minuscula, no debe tener espacios entremedio, mayor a 4 caracteres
function validarPasswordReg(inputPassword) {
  let hayMayuscula = false;
  let hayMinuscula = false;
  let hayNumero = false;
  let validado = false;

  if (inputPassword.value.trim().length >= 4) {
    for (let i = 0; i < inputPassword.value.trim().length; i++) {
      // Chequea el carácter en busca de mayusculas
      if (
        inputPassword.value.charCodeAt(i) >= 65 &&
        inputPassword.value.charCodeAt(i) <= 90
      ) {
        hayMayuscula = true;
      }
      // Chequea el carácter en busca de minúsculas
      if (
        inputPassword.value.charCodeAt(i) >= 97 &&
        inputPassword.value.charCodeAt(i) <= 122
      ) {
        hayMinuscula = true;
      }
      // Chequea el carácter en busca de números
      if (
        inputPassword.value.charCodeAt(i) >= 48 &&
        inputPassword.value.charCodeAt(i) <= 57
      ) {
        hayNumero = true;
      }
    }
  }

  if (
    hayMayuscula &&
    hayMinuscula &&
    hayNumero &&
    !tieneEspacioEntreMedio(inputPassword.value.trim())
  ) {
    validado = true;
    mostrarExitoRegistro(inputPassword);
  } else {
    mostrarErrorRegistro(
      inputPassword,
      'Mínimo 4 caracteres, al menos una mayuscula, una minúscula y un número. Sin espacios entremedio.'
    );
  }
  return validado;
}

// Esta función compara las contraseñas, y ambas son iguales, devuelve true
function compararPasswordsReg(input1, input2) {
  let validado = false;
  if (
    input1.value.trim() === input2.value.trim() &&
    input2.value.trim().length >= 4
  ) {
    mostrarExitoRegistro(input2);
    validado = true;
  } else {
    mostrarErrorRegistro(input2, 'Las contraseñas deben coincidir!');
  }
  return validado;
}

// Función para validar tipo de archivo de imagen
function validarImagenArchivo(nombreArchivo) {
  let siguienteIndicePunto = nombreArchivo.lastIndexOf('.') + 1;

  let extensionArchivo = nombreArchivo
    .substr(siguienteIndicePunto, nombreArchivo.length)
    .toLowerCase();

  if (extensionArchivo === 'jpg' || extensionArchivo === 'png') {
    return true;
  } else {
    return false;
  }
}

// Función para validar tipo de archivo de sonido
function validarSonidoArchivo(nombreArchivo) {
  let siguienteIndicePunto = nombreArchivo.lastIndexOf('.') + 1;
  let extensionArchivo = nombreArchivo
    .substr(siguienteIndicePunto, nombreArchivo.length)
    .toLowerCase();

  if (
    extensionArchivo === 'mp3' ||
    extensionArchivo === 'm4a' ||
    extensionArchivo === 'wav' ||
    extensionArchivo === 'flac'
  ) {
    return true;
  } else {
    return false;
  }
}

// Función para validar contraseñas en la precarga (al menos: 4 caracteres, una minuscula, una maysucula, un número y sin espacios entre medio)
function validarPassword(password) {
  let mayuscula = false;
  let minuscula = false;
  let numero = false;

  if (password.length >= 4) {
    for (let i = 0; i < password.length; i++) {
      // Chequea el carácter por en busca de mayusculas
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        mayuscula = true;
      }
      // Chequea el carácter por en busca de minúsculas
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        minuscula = true;
      }
      // Chequea el carácter por en busca de números
      if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        numero = true;
      }
    }
  }
  // si se cumplen todas las condiciones retorno true.
  if (mayuscula && minuscula && numero && !tieneEspacioEntreMedio(password)) {
    return true;
  }
  return false;
}

// Función para validar en la precarga que el usuario no tenga espacios entre medio y sea mayor a 4 caracteres (puede incluir algun número si se quiere, ya que no se especifica en el obligatorio(Por ej: eric1945).

function validarUsuario(usuario) {
  //Le sacamos el espacio de los costados
  usuario = usuario.trim();
  if (
    usuario.length >= 4 &&
    isNaN(usuario) &&
    !tieneEspacioEntreMedio(usuario) &&
    !validarUsuarioExistente(usuario)
  ) {
    return true;
  }

  return false;
}

// El nombre no puede contener números ni simbolos, pero si puede contener espacios entre medio (Por ej: Eric Clapton). Debe ser mayor o igual a 4 carácteres. Función para la precarga.

function validarNombre(nombre) {
  let validado = false;

  if (isNaN(nombre) && nombre.trim().length >= 4) {
    validado = true;
    let i = 0;
    while (validado && i < nombre.trim().length) {
      // Si nombre de usuario posee simbolos, la validacion de nombre es falso.
      if (nombre.charCodeAt(i) >= 33 && nombre.charCodeAt(i) <= 64) {
        validado = false;
      }
      i++;
    }
  }
  return validado;
}

// Función que detecta si hay un espacio entre medio entre un string ingresado, si es asi, devuelve true
function tieneEspacioEntreMedio(string) {
  let tieneEspacio = false;

  string = string.trim();
  let i = 0;

  while (!tieneEspacio && i < string.length) {
    if (string.charAt(i) === ' ') {
      tieneEspacio = true;
    }
    i++;
  }
  return tieneEspacio;
}

// Esta función retorna true si ya existe ese usuario en el array usuarios
function validarUsuarioExistente(nombreDeUsuario) {
  let i = 0;
  let yaExiste = false;
  while (!yaExiste && i < usuarios.length) {
    let unUsuario = usuarios[i];
    if (nombreDeUsuario.toLowerCase() === unUsuario.usuario.toLowerCase()) {
      yaExiste = true;
    }
    i++;
  }
  return yaExiste;
}

// Limpia barras como vimos en clase
function quitarFakePath(pNom) {
  let nombreOk = '';
  let encontreBarra = false;
  let posBarra = -1;
  let i = pNom.length - 1;
  while (i >= 0 && !encontreBarra) {
    let car = pNom[i];
    if (car === '\\' || car === '/') {
      encontreBarra = true;
      posBarra = i;
    }
    i--;
  }

  if (encontreBarra) {
    nombreOk = pNom.substr(posBarra + 1);
  }
  return nombreOk;
}
