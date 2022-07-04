misEventos();

// Invocamos a las funciones que precargan todos nuestros datos
function misEventos() {
  preCargaNiveles();
  preCargaDocentes();
  preCargaAlumnos();
  preCargaEjercicios();
  preCargaEntregas();
}

// ################################### User Interface ###################################

function mostrarUISegunUsuario(cuentaActiva) {
  // Sacamos de vista la página principal de registro y login, agregandole la clase ocultar-ventana
  paginaInicio.classList.add('ocultar-ventana');

  // Hacemos aparecer la ventana de la aplicación con los datos y secciones del docente o alumno, según corresponda
  mostrarNav(cuentaActiva);
  cargarSecciones(cuentaActiva);
  paginaApp.classList.remove('ocultar-ventana');

  // Mensaje de bienvenida
  nombreAMostrar.innerHTML = `Hola de nuevo, ${cuentaActiva.nombre}. <br> <p class="subTituloNombre">Seleccione una opción de la barra superior para ver la sección correspondiente.</p>`;
}

// Mostramos la navegación según el tipo de usuario logeado correctamente
function mostrarNav(usuario) {
  let nav;

  // tipo Docente
  if (usuario.tipo === 'docente') {
    nav = `
  <nav>
    <ul>
      <li id="btn-seccion1" class="item-lista">
        <a>Cambiar nivel de alumnos</a>
      </li>
    </ul>
    <ul>
      <li id="btn-seccion2" class="item-lista">
        <a>Plantear ejercicios</a>
      </li>
    </ul>
    <ul>
      <li id="btn-seccion3" class="item-lista">
        <a>Redactar devoluciones</a>
      </li>
    </ul>
    <ul>
      <li id="btn-seccion4" class="item-lista">
        <a>Ver información estadística</a></li>
    </ul>
    <button id="btnLogOut" class="btnlogOut">Cerrar Sesión</button>
  </nav>`;
    // tipo Alumno
  } else if (usuario.tipo === 'alumno') {
    nav = `
  <nav>
    <ul>
      <li id="btn-seccion1" class="item-lista">
        <a>Ver ejercicios planteados</a>
      </li>
    </ul>
    <ul>
      <li id="btn-seccion2" class="item-lista">
        <a>Realizar entrega de ejercicio</a>
      </li>
    </ul>
    <ul>
      <li  id="btn-seccion3" class="item-lista">
        <a>Ver ejercicios resueltos</a>
      </li>
    </ul>
    <ul>
      <li id="btn-seccion4" class="item-lista">
        <a>Ver información estadística</a></li>
    </ul>
      <button id="btnLogOut" class="btnlogOut">Cerrar Sesión</button>
  </nav>`;
  }
  document.querySelector('#navegacion').innerHTML = nav;
  document.querySelector('#btnLogOut').addEventListener('click', logOut);

  let navLinks = document.querySelectorAll('.item-lista');

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', mostrarSeccionIndividual);
  }
  // Hacemos click con esta función para que siempre aparezca la seccion 1 por default en cualquiera de los perfiles, al logearnos
  document.querySelector('#btn-seccion1').click();
}

// Ocultar y mostrar secciones
function mostrarSeccionIndividual() {
  ocultarSecciones();
  let idBoton = this.getAttribute('id');
  let idSeccion = '#' + idBoton.substring(4);

  document.querySelector(idSeccion).style.display = 'block';
}

function ocultarSecciones() {
  let secciones = document.querySelectorAll('.seccion');
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = 'none';
  }
}

function cargarSecciones(usuario) {
  // Si es docente
  if (usuario.tipo === 'docente') {
    seccion1Docente(usuario);
    seccion2Docente();
    seccion3Docente();
    seccion4Docente();

    // Si es alumno
  } else if (usuario.tipo === 'alumno') {
    seccion1Alumno(usuario);
    seccion2Alumno(usuario);
    seccion3Alumno();
    seccion4Alumno(usuario);
  }
}

/* ######################################################################## */
/* ##################### *** USER INTERFACE DOCENTE ***  ################## */
/* ######################################################################## */

// ###################### Seccion 1 DOCENTE ######################

function seccion1Docente(usuario) {
  let titulo = `<h2>Seleccione a uno de sus alumnos para subir su nivel!</h2>`;
  let selectAlumnos = `<select id="selListaAlumnos"><option value="-1">Elija uno de sus alumnos:</option>`;

  // Creamos la el div donde va a estar el select, aparece solo en caso de que se seleccione algún alumno
  let divSelectNiveles = `<div id="mostrarNiveles" class="selectNiveles"></div>`;

  for (let i = 0; i < usuarios.length; i++) {
    unAlumno = usuarios[i];

    if (
      unAlumno.tipo === 'alumno' &&
      unAlumno.Docente.usuario === usuario.usuario
    ) {
      selectAlumnos += `<option value="${unAlumno.usuario}"> ${unAlumno.nombre} - (${unAlumno.usuario}) </option>`;
    }
  }
  selectAlumnos += `</select>`;

  document.querySelector('#seccion1').innerHTML =
    titulo + selectAlumnos + divSelectNiveles;

  // Evento que se activa al seleccionar un alumno de select, sirve para cambiar de nivel
  document
    .querySelector('#selListaAlumnos')
    .addEventListener('click', mostrarSelectCambiarNivel);
}

function mostrarSelectCambiarNivel() {
  // El value del select de los alumnos del docente de arriba, es el nombre de usuario, asi obtenemos el objeto de ese alumno con esta funcion:
  let alumnoSeleccionado = obtenerAlumnoConUsuario(
    document.querySelector('#selListaAlumnos').value
  );

  let botonCambiarNivel = `<button id="btnCambiarNivel">Subir nivel</button>`;
  let divMensaje = `<div id="mensajeCambioDeNivel" class="mensajeCambioDeNivel"></div>`;

  if (alumnoSeleccionado !== null) {
    let selectNiveles = `<select class="selListaNiveles" id="selListaNiveles"><option disabled  value="${alumnoSeleccionado.Nivel.numero}"> Nivel actual (${alumnoSeleccionado.Nivel.numero}) : ${alumnoSeleccionado.Nivel.nombre}</option>`;

    if (alumnoSeleccionado.Nivel.numero === 1) {
      selectNiveles += `<option selected value="${2}"> Siguiente Nivel: Intermedio (2)</option>`;
    } else if (alumnoSeleccionado.Nivel.numero === 2) {
      selectNiveles += `<option selected="true" value="${3}"> Siguiente Nivel: Avanzado (3)</option>`;
    } else {
      selectNiveles += `<option disabled selected value="-1"> Ya no hay más niveles para avanzar!</option>`;
    }

    // Mostramos el select de los niveles dinámicamente según alumno, y mostramos el botón para cambiarlo, junto con un div que puede mostrar mensajes
    selectNiveles += `</select>`;

    // Esto esta dentro del div
    document.querySelector('#mostrarNiveles').innerHTML =
      selectNiveles + botonCambiarNivel + divMensaje;

    document
      .querySelector('#btnCambiarNivel')
      .addEventListener('click', btnCambiarNivel);
  } else {
    document.querySelector('#mostrarNiveles').innerHTML = ' ';
  }
}

function btnCambiarNivel() {
  // Capturamos en una variable el alumno (objeto) seleccionado
  let alumnoSeleccionado = obtenerAlumnoConUsuario(
    document.querySelector('#selListaAlumnos').value
  );
  // Capturamos en una variable el nivel (objeto) seleccionado
  let nivelSeleccionado = obtenerNivelConNumero(
    Number(document.querySelector('#selListaNiveles').value)
  );

  if (
    alumnoSeleccionado.Nivel !== nivelSeleccionado &&
    nivelSeleccionado !== null
  ) {
    // Le cambiamos el nivel efectivamente al usuario
    alumnoSeleccionado.Nivel = nivelSeleccionado;

    // Se actualiza el select de niveles
    mostrarSelectCambiarNivel();
    document.querySelector(
      '#mensajeCambioDeNivel'
    ).innerHTML = `Nivel cambiado a ${alumnoSeleccionado.Nivel.numero} (<b>${alumnoSeleccionado.Nivel.nombre})</b> con éxito!`;
  } else {
    document.querySelector(
      '#mensajeCambioDeNivel'
    ).innerHTML = `Este es el máximo nivel! <b>No puedes cambiarlo</b>`;
  }

  // Actualizamos la seccion 3 y 4 (ya que ahí se ve el nivel de los alumnos también)
  seccion3Docente();
  seccion4Docente();
}

// ###################### Seccion 2 DOCENTE ######################

function seccion2Docente() {
  let titulo = `<h2>Plantear Ejercicios</h2>`;
  let selectNivel = `<label>Seleccione Nivel para Enviar Ejercicio: </label><select id="selListaNivelesEjS2"><option value="-1">Elija Nivel de Alumno:</option>
    <br>`;
  let inputTituloEjercicio = `<br/><label for="txtTitulo">Título de Ejercicio: </label><input id="txtTitulo" type="text"
    placeholder="Escriba su Título"><br>`;
  let textAreaPlantearEjercicios = `<label for="txtDescripcion">Descripción: </label><textarea name="textarea" rows="10" cols="50" id="txtDescripcion"
    placeholder="Describa su ejercicio aqui:
Respetar cantidad de caracteres: 
20 (min), 200(max) entre Título y Descripción."></textarea><br>`;
  let archivoImagen = `<br/><label for="archivoImagen">Imagen:</label><input id="fileImagen" type="file"><br>`;
  let botonEnviarEjercicio = `<button id="btnAgregarEjercicio">Agregar Ejercicio</button> <br/>`;
  let divMensajeEjercicioPlanteado = `<div id="divMensajeEjercicioPlanteado" class="divMensajes"></div>`;

  for (let i = 0; i < niveles.length; i++) {
    let unNivel = niveles[i];

    selectNivel += `<option value="${unNivel.numero}"> ${unNivel.numero} - (${unNivel.nombre})</option>`;
  }
  selectNivel += `</select>`;

  document.querySelector('#seccion2').innerHTML =
    `<div class="agregarEjercicio">` +
    titulo +
    selectNivel +
    inputTituloEjercicio +
    textAreaPlantearEjercicios +
    archivoImagen +
    botonEnviarEjercicio +
    divMensajeEjercicioPlanteado +
    `</div>`;

  document
    .querySelector('#btnAgregarEjercicio')
    .addEventListener('click', btnAgregarEjercicio);
}

function btnAgregarEjercicio() {
  let msg;

  let nivelSeleccionado = obtenerNivelConNumero(
    Number(document.querySelector('#selListaNivelesEjS2').value)
  );
  let titulo = document.querySelector('#txtTitulo').value;
  let descripcion = document.querySelector('#txtDescripcion').value;
  let imagen = document.querySelector('#fileImagen').value;
  let archImagen = quitarFakePath(imagen);

  if (
    nivelSeleccionado !== null &&
    titulo.trim().length + descripcion.trim().length <= 200 &&
    titulo.trim().length + descripcion.trim().length >= 20 &&
    titulo.trim().length > 0 &&
    descripcion.trim().length > 0 &&
    archImagen.length > 4 &&
    validarImagenArchivo(archImagen)
  ) {
    msg = `Se agregó correctamente.✅`;

    crearYGuardarEjercicio(
      nivelSeleccionado,
      titulo,
      descripcion,
      archImagen,
      cuentaActiva
    );

    // Vaciamos campos luego de agregar exitosamente
    document.querySelector('#txtTitulo').value = '';
    document.querySelector('#txtDescripcion').value = '';
    document.querySelector('#fileImagen').value = '';
    document.querySelector('#selListaNivelesEjS2').value = '-1';
  } else if (nivelSeleccionado === null) {
    msg = 'Debe seleccionar un nivel ❌';
  } else if (
    titulo.trim().length + descripcion.trim().length > 200 ||
    titulo.trim().length + descripcion.trim().length < 20 ||
    titulo.trim().length === 0 ||
    descripcion.trim().length === 0
  ) {
    msg =
      'El título y la descripción deben tener como mínimo 20 caracteres, máximo 200. Ambos campos deben contener texto❌';
  } else if (archImagen.length < 4) {
    msg = 'Debe seleccionar una imagen ❌';
  } else if (!validarImagenArchivo(archImagen)) {
    msg = 'Debe adjuntar una imagen (jpg o png) ❌';
  }

  document.querySelector('#divMensajeEjercicioPlanteado').innerHTML = msg;
}

// ###################### Seccion 3 DOCENTE ######################

function seccion3Docente() {
  let titulo = `<h2>Ver entregas recientes y redactar devoluciones a sus alumnos </h2>`;
  let tabla = `<table id="tablaTareasPorCorregir" class="tablaDevoluciones" ><th>Nombre de alumno</th><th>Ejercicio</th><th>Imagen</th><th>Audio del alumno</th><th>Redacte devolución</th><th>Enviar entrega</th>`;
  let divMensaje = '<div id="msgAlEntregarTarea"></div>';

  for (let i = 0; i < usuarios.length; i++) {
    let unUsuario = usuarios[i];

    if (unUsuario.tipo === 'alumno') {
      for (let j = 0; j < unUsuario.entregasIndividuales.length; j++) {
        let unaEntrega = unUsuario.entregasIndividuales[j];

        let sonido = `<audio controls><source src="Ejercicios/audio/${unaEntrega.sonido}"></audio>`;
        let img = `<img src="Ejercicios/img/${unaEntrega.Ejercicio.imagen}"`;
        if (
          unaEntrega.devolucion.length === 0 &&
          unaEntrega.Alumno.Docente.usuario === cuentaActiva.usuario
        ) {
          // Le creamos un atributo data-set para guardar el id único de cada entrega en cada fila.
          //Cada entrega, por más que sean la misma de distintos alumnos, tendran un id único.

          tabla += `<tr data-id="${unaEntrega.id}"><td>${unaEntrega.Alumno.nombre} <br> (Nivel actual: ${unaEntrega.Alumno.Nivel.nombre})</td><td>${unaEntrega.Ejercicio.tituloEjercicio} <br> (${unaEntrega.Ejercicio.Nivel.nombre})</td><td>${img}</td><td>${sonido}</td><td><input type="text" placeholder="Escriba devolución" class="inputDevolucion" /> </td> <td><button class="btnFila">Enviar devolución</button></td></tr>`;
        }
      }
    }
  }
  tabla += `</table>`;

  document.querySelector('#seccion3').innerHTML = titulo + divMensaje + tabla;

  // Esta función comprobará si la tabla esta vacia (tiene solo 1 fila, osea los title headers), en caso de estarlo, mostrara un mensaje de que no hay tareas pendientes para corregir
  mensajeSiTablaVacia();

  // Hacemos un nodeList de todos los botones de la tabla para agregarles un evento
  let botonesEnviarDevolucion = document.querySelectorAll('.btnFila');

  for (let j = 0; j < botonesEnviarDevolucion.length; j++) {
    botonesEnviarDevolucion[j].addEventListener('click', enviarDevolucion);
  }
}

function enviarDevolucion() {
  // Acedemos a los elementos de la fila del boton apretado, como al input que necesitamos.
  let botonApretado = this;
  let fila = botonApretado.parentElement.parentElement; // el padre del padre del boton es su fila
  // Capturamos el value de el input de la fila
  let inputDeFila = fila.querySelector('input').value;
  let divMensaje = document.querySelector('#msgAlEntregarTarea');
  // Accedemos al objeto único de entrega usando el dataset del id y la funcion obtenerEntregaConID
  let ejercicioDeLaFilaObjeto = obtenerEntregaConID(Number(fila.dataset.id));

  if (inputDeFila.trim().length > 0 && isNaN(inputDeFila)) {
    ejercicioDeLaFilaObjeto.devolucion = inputDeFila;
    // Actualizamos la sección 3, no se deberán ver las tareas que tengan devolución
    divMensaje.innerHTML =
      '<p> ✅ Devolución enviada con éxito ✅, ⏳ ¡Actualizando tareas! ⏳ </p>';

    //NOTA IMPORTANTE: Lo que nos pasaba acá era que al actualizar la sección (para ver las siguientes tareas sin devolución, llamando a seccion3Docente), no se mostraba nunca el mensaje de éxito de arriba obviamente, entonces le pusimos un pequeño delay de 2.5 segundos, para que se vea el mensaje de que fue enviada, mientras anunciamos que actualizaremos la tabla. Desactivamos los botones e inputs de esa fila para que no se pueda escribir nada durante esos 2.5 segundos.

    fila.querySelector('input').setAttribute('disabled', 'true');
    botonApretado.setAttribute('disabled', 'true');

    // Se actualiza la tabla luego de 2.5 segundos
    setTimeout(seccion3Docente, 2500);
  } else {
    divMensaje.innerHTML = '<p> ❌ Debe escribir algo de devolución! ❌</p>';
  }
}

function mensajeSiTablaVacia() {
  let tabla = document.querySelector('#tablaTareasPorCorregir');

  if (tabla.rows.length === 1) {
    tabla.innerHTML =
      '<p>Por ahora no tiene tareas pendientes para corregir!</p>';
  }
}

// ###################### Seccion 4 DOCENTE ######################

function seccion4Docente() {
  let titulo = '<h2>Ver información estadística</h2>';
  let contadorTotalTareasEntregadas = 0;
  let mayorCantidadDeEjResueltos = Number.NEGATIVE_INFINITY;
  let alumnoQueMasResolvio = '';
  let selectAlumnos = `<select id="selectAlumnoEstadisticas"><option value="-1">Elija uno de sus alumnos para ver sus estadísticas</option>`;
  let divMensaje = `<div id="mensajeEstadisticasIndividuales"></div>`;
  // Mostrar al alumno que ha resuelto más ejercicios

  //Capturamos el máximo de tareas entregadas
  for (let j = 0; j < usuarios.length; j++) {
    let unUsuario = usuarios[j];

    if (unUsuario.tipo === 'alumno' && unUsuario.Docente === cuentaActiva) {
      for (let x = 0; x < unUsuario.entregasIndividuales.length; x++) {
        let cantidadEntregas = unUsuario.entregasIndividuales.length;

        if (mayorCantidadDeEjResueltos < cantidadEntregas) {
          mayorCantidadDeEjResueltos = cantidadEntregas;
        }
      }
    }
  }
  // Mostramos el o los alumnos que tengan ese máximo
  for (let i = 0; i < usuarios.length; i++) {
    let unUsuario = usuarios[i];
    if (unUsuario.tipo === 'alumno' && unUsuario.Docente === cuentaActiva) {
      if (
        unUsuario.entregasIndividuales.length === mayorCantidadDeEjResueltos
      ) {
        alumnoQueMasResolvio +=
          '<b>' +
          unUsuario.nombre +
          '</b>' +
          ` (${mayorCantidadDeEjResueltos} tareas)` +
          ' | ';
      }
    }
  }

  // Mostrar cantidad total de ejercicios entregados
  for (let i = 0; i < entregas.length; i++) {
    let unaEntrega = entregas[i];

    if (unaEntrega.Docente.usuario === cuentaActiva.usuario) {
      contadorTotalTareasEntregadas++;
    }
  }

  // Select por alumnos

  for (let i = 0; i < usuarios.length; i++) {
    let unAlumno = usuarios[i];

    if (
      unAlumno.tipo === 'alumno' &&
      unAlumno.Docente.usuario === cuentaActiva.usuario
    ) {
      selectAlumnos += `<option value="${unAlumno.usuario}"> ${unAlumno.nombre} - (${unAlumno.usuario}) </option>`;
    }
  }

  selectAlumnos += `</select>`;

  document.querySelector('#seccion4').innerHTML =
    titulo +
    `<p>El o los alumnos que más resolvieron ejercicios fueron: ${alumnoQueMasResolvio} <br/> El total de tareas entregadas por todos sus alumnos es: <b> ${contadorTotalTareasEntregadas}</b> </p>` +
    selectAlumnos +
    divMensaje;

  document
    .querySelector('#selectAlumnoEstadisticas')
    .addEventListener('click', mostrarEstadisticasIndividuales);
}

function mostrarEstadisticasIndividuales() {
  let alumnoSeleccionado = obtenerAlumnoConUsuario(this.value);
  let todosLosEjPlanteados = 0;
  let resueltosDeSuNivel = 0;
  let divMensaje = document.querySelector('#mensajeEstadisticasIndividuales');

  if (alumnoSeleccionado !== null) {
    for (let i = 0; i < ejercicios.length; i++) {
      let unEjercicio = ejercicios[i];

      if (
        unEjercicio.Docente === alumnoSeleccionado.Docente &&
        unEjercicio.Nivel === alumnoSeleccionado.Nivel
      ) {
        todosLosEjPlanteados++;
      }
    }

    for (let j = 0; j < alumnoSeleccionado.entregasIndividuales.length; j++) {
      let unaEntregaIndividual = alumnoSeleccionado.entregasIndividuales[j];
      if (unaEntregaIndividual.Ejercicio.Nivel === alumnoSeleccionado.Nivel) {
        resueltosDeSuNivel++;
      }
    }

    divMensaje.innerHTML = `<p>De <b> ${todosLosEjPlanteados} </b> ejercicios planteados para ${alumnoSeleccionado.nombre} (Nivel: ${alumnoSeleccionado.Nivel.nombre}), ha resuelto: <b>${resueltosDeSuNivel} </>ejercicios.</p>`;
  } else {
    // Vaciamos el div de las estadisticas, para que no quede la del alumno anteriormente seleccionado
    divMensaje.innerHTML = '';
  }
}

/* ######################################################################## */
/* ##################### *** USER INTERFACE ALUMNO ***  ################### */
/* ######################################################################## */

// ###################### Seccion 1 ALUMNO ######################

function seccion1Alumno(usuario) {
  // Capturamos el objeto docente del alumno
  let docenteDelAlumno = usuario.Docente;

  let titulo = `<h2>Buscar ejercicios planteados por tu docente <span class="nombreProfe">${usuario.Docente.nombre}</span>, para tu nivel (${usuario.Nivel.nombre}):</h2>`;

  let inputBuscador = `<input type="search" class="inputBusqueda" id="inputBusquedaTxt" placeholder="Busque su ejercicio por título o descripción">`;

  let btnBuscador = `<button id="buscaEjercicio" class="btnBusqueda">Buscar</button>`;

  let resultadoBusquedaDiv = `<div id="resultadoBusqueda" class="resultadoBusqueda"></div>`;

  let tablaEjercicios = `<table id="tablaEjerciciosPlanteados"><tr><th>Título del Ejercicio </th><th>Descripción</th><th>Imagen</th></tr>`;

  for (let i = 0; i < ejercicios.length; i++) {
    let unEjercicio = ejercicios[i];

    if (
      unEjercicio.Docente.usuario === docenteDelAlumno.usuario &&
      unEjercicio.Nivel === usuario.Nivel
    ) {
      let img = `<img src="Ejercicios/img/${unEjercicio.imagen}" >`;
      tablaEjercicios += `<tr><td>${unEjercicio.tituloEjercicio}<br> (Nivel: ${unEjercicio.Nivel.nombre}) </td><td>${unEjercicio.descripcionEjercicio}</td><td>${img}</td></tr>`;
    }
  }

  tablaEjercicios += `</table>`;

  // Mostramos la sección
  document.querySelector('#seccion1').innerHTML =
    titulo +
    inputBuscador +
    btnBuscador +
    resultadoBusquedaDiv +
    tablaEjercicios;

  chequearTablaEjerciciosVacia();

  // Le agregamos un evento al boton de busqueda
  document
    .querySelector('#buscaEjercicio')
    .addEventListener('click', btnBuscarEjercicio);
}

function btnBuscarEjercicio() {
  let docenteDelAlumno = cuentaActiva.Docente;

  let inputBusquedaTxt = document.querySelector('#inputBusquedaTxt').value;

  let resultado = '';
  let mensaje = '';
  let encontroPalabra = false;

  if (inputBusquedaTxt.trim().length > 0) {
    for (let i = 0; i < ejercicios.length; i++) {
      let unEjercicio = ejercicios[i];
      let img = `<img src="Ejercicios/img/${unEjercicio.imagen}" >`;

      if (
        unEjercicio.Docente.usuario === docenteDelAlumno.usuario &&
        unEjercicio.Nivel === cuentaActiva.Nivel
      ) {
        if (!encontroPalabra) {
          mensaje =
            '<p>No encontramos más resultados que coincidan con su busqueda!</p>';
        }
        if (
          unEjercicio.tituloEjercicio
            .toLowerCase()
            .indexOf(inputBusquedaTxt.toLowerCase()) !== -1
        ) {
          encontroPalabra = true;
          resultado += `<h2>${unEjercicio.tituloEjercicio}</h2> <br> <p> ${unEjercicio.descripcionEjercicio}</p><br> ${img} <br>`;
        } else if (
          unEjercicio.descripcionEjercicio
            .toLowerCase()
            .indexOf(inputBusquedaTxt.toLowerCase()) !== -1
        ) {
          encontroPalabra = true;
          resultado += `<h2>${unEjercicio.tituloEjercicio}</h2> <br> <p> ${unEjercicio.descripcionEjercicio}</p><br> ${img} <br>`;
        }
      }
    }
  } else {
    resultado = '<p>Escriba algo antes de buscar</p>';
  }
  document.querySelector('#resultadoBusqueda').innerHTML = resultado + mensaje;
}

function chequearTablaEjerciciosVacia() {
  let tabla = document.querySelector('#tablaEjerciciosPlanteados');

  if (tabla.rows.length === 1) {
    tabla.innerHTML = '<p>No tiene ejercicios planteados para su nivel</p>';
  }
}

// ###################### Seccion 2 ALUMNO ######################

function seccion2Alumno(usuario) {
  let titulo = `<h2>Realizar entrega de Ejercicios pendientes:</h2>`;
  let docenteDelAlumno = usuario.Docente;
  let selectDeEjercicios =
    '<select id="selectEjercicios"><option value="-1">Elija un ejercicio a entregar</option>';
  let botonEntrega = `<button id="btnEntrega" class="btnEntrega">Enviar tarea</button>`;
  let divMensajeEntrega =
    '<div id="mensajeEntregaTarea" class="divMensajes"></div>';
  for (let i = 0; i < ejercicios.length; i++) {
    let unEjercicio = ejercicios[i];

    if (
      unEjercicio.Docente.usuario === docenteDelAlumno.usuario &&
      unEjercicio.Nivel === usuario.Nivel &&
      !checkObjetoRepetidoEnEntregas(unEjercicio, usuario)
    ) {
      selectDeEjercicios += `<option value="${unEjercicio.id}"> ${unEjercicio.tituloEjercicio}</option>`;
    }
  }

  let archivoSonido = `<br/><label for="archivoSonido">Adjunte archivo de sonido:</label><input id="fileSonido" type="file"><br>`;

  selectDeEjercicios += `</select>`;

  document.querySelector('#seccion2').innerHTML =
    titulo +
    selectDeEjercicios +
    archivoSonido +
    botonEntrega +
    divMensajeEntrega;

  document
    .querySelector('#btnEntrega')
    .addEventListener('click', btnEntregarTarea);

  seccion3Alumno();
  seccion4Alumno();
}

function checkObjetoRepetidoEnEntregas(obj, usuario) {
  for (let i = 0; i < entregas.length; i++) {
    if (entregas[i].Ejercicio === obj && entregas[i].Alumno === usuario) {
      return true;
    }
  }
  return false;
}

function btnEntregarTarea() {
  let ejercicioAEntregar = obtenerEjercicioConID(
    Number(document.querySelector('#selectEjercicios').value)
  );
  let sonido = document.querySelector('#fileSonido').value;
  let archivoSonido = quitarFakePath(sonido);
  let mensaje = '';
  let devolucion = '';

  if (
    ejercicioAEntregar !== null &&
    archivoSonido.length > 4 &&
    validarSonidoArchivo(archivoSonido)
  ) {
    crearYGuardarEntrega(
      cuentaActiva.Nivel,
      cuentaActiva,
      ejercicioAEntregar,
      cuentaActiva.Docente,
      archivoSonido,
      devolucion
    );

    // Llamamos a seccion 2 de nuevo, para que se actualize el select con SOLO las tareas pendientes
    seccion2Alumno(cuentaActiva);

    mensaje = 'Tarea enviada con éxito ✅';
  } else if (ejercicioAEntregar === null) {
    mensaje = 'Debe elegir una tarea ❌';
  } else if (archivoSonido.length < 4) {
    mensaje = 'Debe adjuntar un archivo ❌';
  } else if (!validarSonidoArchivo(archivoSonido)) {
    mensaje =
      'Debe adjuntar solo un audio con el formato correcto (m4a, mp3, wav o flac) ❌';
  }

  document.querySelector('#mensajeEntregaTarea').innerHTML = mensaje;
}

// ###################### Seccion 3 ALUMNO ######################

function seccion3Alumno() {
  let titulo = `<h2>Ver tus ejercicios resueltos</h2>`;
  let tabla = `<table id="tablaTareasResueltas" class="tablaDevoluciones"><th>Título del Ejercicio</th><th>Descripción</th><th>Imagen</th><th>Sonido</th><th>Devolución del docente</th>`;

  for (let i = 0; i < cuentaActiva.entregasIndividuales.length; i++) {
    let unaEntrega = cuentaActiva.entregasIndividuales[i];

    let sonido = `<audio controls><source src="Ejercicios/audio/${unaEntrega.sonido}"></audio>`;
    let img = `<img src="Ejercicios/img/${unaEntrega.Ejercicio.imagen}">`;

    if (
      unaEntrega.Alumno.usuario === cuentaActiva.usuario &&
      unaEntrega.devolucion !== ''
    ) {
      tabla += `<tr><td>${unaEntrega.Ejercicio.tituloEjercicio} <br> (Nivel: ${unaEntrega.Ejercicio.Nivel.nombre}) </td><td>${unaEntrega.Ejercicio.descripcionEjercicio}</td><td>${img}</td><td>${sonido}</td><td>${unaEntrega.devolucion}</td></tr>`;
    } else if (
      unaEntrega.Alumno.usuario === cuentaActiva.usuario &&
      unaEntrega.devolucion === ''
    ) {
      tabla += `<tr><td>${unaEntrega.Ejercicio.tituloEjercicio} <br> (Nivel: ${unaEntrega.Ejercicio.Nivel.nombre}) </td><td>${unaEntrega.Ejercicio.descripcionEjercicio}</td><td>${img}</td> <td>${sonido}</td><td>Aún el docente no redactó una devolución</td></tr>`;
    }
  }

  document.querySelector('#seccion3').innerHTML = titulo + tabla;

  chequearTablaEntregasVacia();
}

function chequearTablaEntregasVacia() {
  let tabla = document.querySelector('#tablaTareasResueltas');

  if (tabla.rows.length === 1) {
    tabla.innerHTML = '<p>No has entregado ninguna tarea</p>';
  }
}

// ###################### Seccion 4 ALUMNO ######################

function seccion4Alumno() {
  let titulo = `<h2>Ver información estadística</h2>`;
  let divMensaje;
  let docenteDelAlumno = obtenerDocenteConUsuario(cuentaActiva.Docente.usuario);
  let totalEjPlanteados = 0;

  let totalResueltos = cuentaActiva.entregasIndividuales.length;

  let totalResueltosParaSuNivel = 0;

  let contadorEntregasConDevolucion = 0;
  let porcentaje;

  for (let i = 0; i < ejercicios.length; i++) {
    let unEjercicio = ejercicios[i];

    if (
      unEjercicio.Docente === docenteDelAlumno &&
      unEjercicio.Nivel === cuentaActiva.Nivel
    ) {
      totalEjPlanteados++;
    }
  }

  for (let j = 0; j < cuentaActiva.entregasIndividuales.length; j++) {
    if (cuentaActiva.entregasIndividuales[j].devolucion !== '') {
      contadorEntregasConDevolucion++;
    }

    if (
      cuentaActiva.entregasIndividuales[j].Ejercicio.Nivel ===
      cuentaActiva.Nivel
    ) {
      totalResueltosParaSuNivel++;
    }
  }

  if (totalEjPlanteados === 0) {
    porcentaje = 0;
  } else {
    porcentaje = (totalResueltosParaSuNivel * 100) / totalEjPlanteados;
  }

  divMensaje = `<div><p>Porcentaje de ejercicios resueltos para su nivel (${cuentaActiva.Nivel.nombre}):<b> ${porcentaje}%</b><br>Total de ejercicios planteados por su docente para su nivel (${cuentaActiva.Nivel.nombre}): <b>${totalEjPlanteados}</b> <br>De <b>${totalResueltos}</b> ejercicios resueltos en total (para todos los niveles), tienen devolucion: <b>${contadorEntregasConDevolucion}</b></p></div>`;

  document.querySelector('#seccion4').innerHTML = titulo + divMensaje;
}

// ################################## Eventos en el botón de login y en el de registrarme ###############################

// Boton Login
document.querySelector('#btnLogin').addEventListener('click', logIn);

// Boton registro (dentro del formulario)
document.querySelector('#btnRegistro').addEventListener('click', registro);

// Al hacer click se limpian los inputs de login, usuario y contraseña
inputUsuarioLogIn.addEventListener('click', limpiarUsuarioInput);
inputPasswordLogIn.addEventListener('click', limpiarPasswordInput);

// Al apretar la opcion (radio button) alumno en el formulario de registro, se abre el desplegable de docentes para elegir uno
document
  .querySelector('#alumnoRadio')
  .addEventListener('click', radioAlumnoChecked);

// Al apretar la opcion (radio button) de docente en el formulario de registro, se oculta el desplegable de docentes
document
  .querySelector('#profesorRadio')
  .addEventListener('click', radioDocenteChecked);

// ################################## Mostrar y ocultar ventanas  ###############################

// Abrir y cerrar ventana de registro
let btnCerrarVentanaRegistro = document.querySelector('.cerrarBtnForm');

btnAbrirVentanaRegistro.addEventListener('click', abrirVentanaRegistro);

btnCerrarVentanaRegistro.addEventListener('click', cerrarVentanaRegistro);

function abrirVentanaRegistro() {
  let ventanaRegistroDocente = document.querySelector(
    '.contenedor-ventana-registro'
  );

  ventanaRegistroDocente.classList.add('mostrar-ventana');

  document.querySelector('#btnRegistro').disabled = false;
}

function cerrarVentanaRegistro() {
  let ventanaRegistroDocente = document.querySelector(
    '.contenedor-ventana-registro'
  );
  ventanaRegistroDocente.classList.remove('mostrar-ventana');
}

function ocultarVentanaRegistro() {
  let ventanaRegistroDocente = document.querySelector(
    '.contenedor-ventana-registro'
  );

  ventanaRegistroDocente.classList.remove('mostrar-ventana');
}

// Mostramos el select de profesores para el registro
function radioAlumnoChecked() {
  let selectDocentes = `<select id="selectDocenteRegistro">`;
  let label = `<label>Seleccione un profesor</label>`;
  for (let i = 0; i < usuarios.length; i++) {
    let unUsuario = usuarios[i];

    if (unUsuario.tipo === 'docente') {
      selectDocentes += `<option value="${unUsuario.usuario}">${unUsuario.nombre} - (${unUsuario.usuario}) </option>`;
    }
  }
  selectDocentes += `</select>`;

  document.querySelector('#selectDocentesParaRegistro').innerHTML =
    label + selectDocentes;
}

// Ocultamos el select de profesores para el registro si esta la opcion docente seleccionada
function radioDocenteChecked() {
  document.querySelector('#selectDocentesParaRegistro').innerHTML = '';
}

// Esta función toma el elemento html del input, y le pone la class .exito a su parentElement para asi pintar de verde su borde y limpiar el span del error
function mostrarExitoRegistro(input) {
  let elementoPadre = input.parentElement;
  elementoPadre.classList.remove('error');
  elementoPadre.classList.add('exito');

  // Localizamos el span de ese input
  let span = elementoPadre.querySelector('span');
  span.innerHTML = '';
}

// Esta función toma el elemento html del input, y le pone la class .error a su parentElement para asi pintar de rojo su borde y las letras del span dentro del mismo
function mostrarErrorRegistro(input, mensaje) {
  let elementoPadre = input.parentElement;
  elementoPadre.classList.remove('exito');
  elementoPadre.classList.add('error');

  // Localizamos el span de ese input
  let span = elementoPadre.querySelector('span');
  span.innerHTML = mensaje;
}

// Limpieza de input de Usuario (login) y mensaje
function limpiarUsuarioInput() {
  document.querySelector('#mensajeLogIn').innerHTML = '';
  inputUsuarioLogIn.value = '';
}

// Limpieza de input de Password (login) y mensaje
function limpiarPasswordInput() {
  document.querySelector('#mensajeLogIn').innerHTML = '';
  inputPasswordLogIn.value = '';
}

// Limpia los inputs del registro
function limpiarInputsRegistro() {
  document.querySelector('#inputNombreRegistro').value = '';
  document.querySelector('#inputUsuarioRegistro').value = '';
  document.querySelector('#inputPasswordRegistro').value = '';
  document.querySelector('#confirmPasswordRegistro').value = '';
  document.querySelector('#mensajeRegistroExitoso').innerHTML = '';

  // Le sacamos el borde verde de la clase .exito que habia quedado previo a algún registro exitoso en los inputs del formulario
  let itemsRegistro = document.querySelectorAll('.item-formulario');
  for (let i = 0; i < itemsRegistro.length; i++) {
    itemsRegistro[i].classList.remove('exito');
  }
}
