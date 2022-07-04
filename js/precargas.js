// Precarga niveles
function preCargaNiveles() {
  crearYGuardarNivel(1, 'Inicial');
  crearYGuardarNivel(2, 'Intermedio');
  crearYGuardarNivel(3, 'Avanzado');
}

// Función para precargar docentes
function preCargaDocentes() {
  crearYGuardarDocente('Eric Clapton', 'eric1945', 'Heaven92');
  crearYGuardarDocente('Bob Dylan', 'bobbydylan', 'bWind1962');
  crearYGuardarDocente('Janis Joplin', 'lajanis', 'Rock1');
  crearYGuardarDocente('Amy Winehouse', 'amyrehab83', 'iSaidno1');
}

// Función para precargar alumnos
function preCargaAlumnos() {
  crearYGuardarAlumno(
    'Juan Carlos',
    'juanca',
    'Pass1',
    obtenerNivelConNumero(1),
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarAlumno(
    'María del Mar',
    'lamarydelcap',
    'Firulais88',
    obtenerNivelConNumero(2),
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarAlumno(
    'Roberto Carlos',
    'robbieuru',
    'Roca52',
    obtenerNivelConNumero(3),
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarAlumno(
    'Julia Rivera',
    'juliguitarra',
    'iloveTacos1996',
    obtenerNivelConNumero(1),
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarAlumno(
    'Federico Gimenez',
    'elfede',
    'Fefo3',
    obtenerNivelConNumero(1),
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarAlumno(
    'Laura Gomez',
    'laurasote',
    'Lauchita1',
    obtenerNivelConNumero(3),
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarAlumno(
    'Gabriel Richieri',
    'gabo87',
    'gaboteElbebote3',
    obtenerNivelConNumero(1),
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarAlumno(
    'Ramiro Ortega',
    'elramaorteguita',
    'iloveMusic24',
    obtenerNivelConNumero(3),
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarAlumno(
    'Erica Ramírez',
    'erica7',
    'Lapregunta99',
    obtenerNivelConNumero(2),
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarAlumno(
    'Rafa Diaz',
    'rafitamiles',
    'hyperActive17',
    obtenerNivelConNumero(2),
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarAlumno(
    'Ivan Modernell',
    'elivansabe',
    'micChecker21',
    obtenerNivelConNumero(1),
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarAlumno(
    'Nicolas Rodriguez',
    'estudio50',
    'js4Life',
    obtenerNivelConNumero(1),
    obtenerDocenteConUsuario('amyrehab83')
  );
}

// Función para precargar ejercicios
function preCargaEjercicios() {
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Permutaciones',
    'Ejercicios secuenciales para trabajar velocidad y ritmo. Repetir 3 veces cada uno con diferentes articulaciones.',
    'ej1.png',
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'Repeticiones',
    'Ejercicios repetitivos para mejorar la velocidad y ritmo. Repetir 5 veces con diferentes articulaciones.',
    'ej2.png',
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'The Caterpillar',
    'Ejercicios cromaticos descendentes para trabajar lentamente la digitacion por todo el traste de la guitarra. Realizar a 60bpm, 75bpm y 90bpm por cada negra.',
    'ej3.png',
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Cromaticos a velocidad',
    'Ejercicios cromaticos para trabajar velocidad de la digitacion en todo el traste. Realizar con diferentes articulaciones a 80, 90 y 100 bpm por cada tiempo de negra.',
    'ej4.png',
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Acordes de Septimas',
    'Ejercicios de acordes con septimas mayor y menor. Repetir varias veces cada uno hasta memorizar la secuencia completa.',
    'ej5.png',
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(3),
    'Yankee Doodle',
    'Aprenderemos este tema clásico del folk estadounidense y que gracias a las series de dibujos animados y a las películas de Hollywood es conocida en muchas partes del mundo.',
    'ej6.png',
    obtenerDocenteConUsuario('lajanis')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(3),
    'Cromaticos a alta velocidad',
    'Ejercicios cromaticos para trabajar velocidad de la digitacion en todo el traste. Realizar con diferentes articulaciones a 80, 90 y 100 bpm por cada tiempo de negra.',
    'ej4.png',
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'Acordes de Septimas',
    'Ejercicios de acordes con septimas mayor y menor. Repetir varias veces cada uno hasta memorizar la secuencia completa.',
    'ej5.png',
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(3),
    'El regreso de Doodle',
    'Aprenderemos este tema clásico del folk estadounidense y que gracias a las series de dibujos animados y a las películas de Hollywood es conocida en muchas partes del mundo.',
    'ej6.png',
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Old McDonald has A Farm',
    'El viejo MacDonald tenía una granja es una popular canción infantil perteneciente al folklore musical estadounidense, de autor anónimo. Tocar de memoria',
    'ej7.png',
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'La marcha de los Santos',
    'Es un himno góspel que toma elementos de música folkórica. Autor desconocido, y si bien es música espiritual hoy día es tocada por bandas de jazz. Tocar de memoria.',
    'ej8.png',
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'REM - Everybody Hurts',
    'Es una canción del grupo estadounidense R.E.M. La canción está incluida en el álbum Automatic for the people de 1992 y fue lanzada como single al año siguiente. Tocar de memoria.',
    'ej9.png',
    obtenerDocenteConUsuario('bobbydylan')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(3),
    'Yankee Doodle',
    'Aprenderemos este tema clásico del folk estadounidense y que gracias a las series de dibujos animados y a las películas de Hollywood es conocida en muchas partes del mundo.',
    'ej6.png',
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Old McDonald has A Farm',
    'El viejo MacDonald tenía una granja es una popular canción infantil perteneciente al folklore musical estadounidense, de autor anónimo. Tocar de memoria',
    'ej7.png',
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'La marcha de los Santos',
    'Es un himno góspel que toma elementos de música folkórica. Autor desconocido, y si bien es música espiritual hoy día es tocada por bandas de jazz. Tocar de memoria.',
    'ej8.png',
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(3),
    'REM - Everybody Hurts',
    'Es una canción del grupo estadounidense R.E.M. La canción está incluida en el álbum Automatic for the people de 1992 y fue lanzada como single al año siguiente. Tocar de memoria.',
    'ej9.png',
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Permutaciones',
    'Ejercicios secuenciales para trabajar velocidad y ritmo. Repetir 3 veces cada uno con diferentes articulaciones.',
    'ej1.png',
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'Repeticiones',
    'Ejercicios repetitivos para mejorar la velocidad y ritmo. Repetir 5 veces con diferentes articulaciones.',
    'ej2.png',
    obtenerDocenteConUsuario('amyrehab83')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'La marcha de los Santos',
    'Es un himno góspel que toma elementos de música folkórica. Autor desconocido, y si bien es música espiritual hoy día es tocada por bandas de jazz. Tocar de memoria.',
    'ej8.png',
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'REM - Everybody Hurts',
    'Es una canción del grupo estadounidense R.E.M. La canción está incluida en el álbum Automatic for the people de 1992 y fue lanzada como single al año siguiente. Tocar de memoria.',
    'ej9.png',
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'Permutaciones',
    'Ejercicios secuenciales para trabajar velocidad y ritmo. Repetir 3 veces cada uno con diferentes articulaciones.',
    'ej1.png',
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(2),
    'Repeticiones',
    'Ejercicios repetitivos para mejorar la velocidad y ritmo. Repetir 5 veces con diferentes articulaciones.',
    'ej2.png',
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(1),
    'The Caterpillar',
    'Ejercicios cromaticos descendentes para trabajar lentamente la digitacion por todo el traste de la guitarra. Realizar a 60bpm, 75bpm y 90bpm por cada negra.',
    'ej3.png',
    obtenerDocenteConUsuario('eric1945')
  );
  crearYGuardarEjercicio(
    obtenerNivelConNumero(3),
    'Cromaticos a velocidad',
    'Ejercicios cromaticos para trabajar velocidad de la digitacion en todo el traste. Realizar con diferentes articulaciones a 80, 90 y 100 bpm por cada tiempo de negra.',
    'ej4.png',
    obtenerDocenteConUsuario('eric1945')
  );
}

// Función para precargar entregas
function preCargaEntregas() {
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('juanca'),
    obtenerEjercicioConID(1),
    obtenerDocenteConUsuario('lajanis'),
    'ej1.m4a',
    'Muy buen trabajo'
  ),
    crearYGuardarEntrega(
      obtenerNivelConNumero(1),
      obtenerAlumnoConUsuario('juanca'),
      obtenerEjercicioConID(3),
      obtenerDocenteConUsuario('lajanis'),
      'ej3.m4a',
      ''
    ),
    crearYGuardarEntrega(
      obtenerNivelConNumero(1),
      obtenerAlumnoConUsuario('juanca'),
      obtenerEjercicioConID(4),
      obtenerDocenteConUsuario('lajanis'),
      'ej4.m4a',
      ''
    );
  crearYGuardarEntrega(
    obtenerNivelConNumero(3),
    obtenerAlumnoConUsuario('elramaorteguita'),
    obtenerEjercicioConID(7),
    obtenerDocenteConUsuario('bobbydylan'),
    'ej4.m4a',
    ''
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('gabo87'),
    obtenerEjercicioConID(10),
    obtenerDocenteConUsuario('bobbydylan'),
    'ej7.m4a',
    ''
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(2),
    obtenerAlumnoConUsuario('erica7'),
    obtenerEjercicioConID(11),
    obtenerDocenteConUsuario('bobbydylan'),
    'ej8.m4a',
    'Muy bien! Cuidado de no trastear al cambiar de cuerda.'
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('elivansabe'),
    obtenerEjercicioConID(14),
    obtenerDocenteConUsuario('amyrehab83'),
    'ej7.m4a',
    'Excelente interpretación de memoria. Sigue así !'
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(2),
    obtenerAlumnoConUsuario('rafitamiles'),
    obtenerEjercicioConID(15),
    obtenerDocenteConUsuario('amyrehab83'),
    'ej8.m4a',
    'Que linda interprecion, casi lloran mis oidos!'
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('elivansabe'),
    obtenerEjercicioConID(17),
    obtenerDocenteConUsuario('amyrehab83'),
    'ej1.m4a',
    ''
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(2),
    obtenerAlumnoConUsuario('rafitamiles'),
    obtenerEjercicioConID(18),
    obtenerDocenteConUsuario('amyrehab83'),
    'ej2.m4a',
    ''
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(2),
    obtenerAlumnoConUsuario('lamarydelcap'),
    obtenerEjercicioConID(19),
    obtenerDocenteConUsuario('eric1945'),
    'ej8.m4a',
    'Buen Trabajo! Pon cuidado en afinar antes de grabar.'
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('juliguitarra'),
    obtenerEjercicioConID(20),
    obtenerDocenteConUsuario('eric1945'),
    'ej9.m4a',
    'Si querias hacer sangrar mis oidos... Lo conseguiste!.'
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('juliguitarra'),
    obtenerEjercicioConID(21),
    obtenerDocenteConUsuario('eric1945'),
    'ej1.m4a',
    'Muy bien realizado, prueba tocarlo con guitarra Electrica.'
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(2),
    obtenerAlumnoConUsuario('lamarydelcap'),
    obtenerEjercicioConID(22),
    obtenerDocenteConUsuario('eric1945'),
    'ej2.m4a',
    ''
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(1),
    obtenerAlumnoConUsuario('juliguitarra'),
    obtenerEjercicioConID(23),
    obtenerDocenteConUsuario('eric1945'),
    'ej3.m4a',
    ''
  );
  crearYGuardarEntrega(
    obtenerNivelConNumero(3),
    obtenerAlumnoConUsuario('robbieuru'),
    obtenerEjercicioConID(24),
    obtenerDocenteConUsuario('eric1945'),
    'ej4.m4a',
    ''
  );
}
