// Clase para crear Nivel
class Nivel {
  constructor() {
    this.numero; // numero
    this.nombre; // string
  }
}

// Clase para crear Docente
class Docente {
  constructor() {
    this.nombre; // string
    this.usuario; // string
    this.password; // string
    this.tipo = 'docente';
  }
}

// Clase para crear Alumno
class Alumno {
  constructor() {
    this.nombre; // string
    this.usuario; // string
    this.password; // string
    this.Nivel; // objeto
    this.Docente; // objeto
    this.tipo = 'alumno';
    this.entregasIndividuales = [];
  }
}

// Clase para crear Ejercicio
class Ejercicio {
  static nro = 1;
  constructor() {
    this.Nivel; // objeto
    this.id = Ejercicio.nro++; // identificador único
    this.tituloEjercicio; // string
    this.descripcionEjercicio; // string
    this.imagen; // imagen
    this.Docente; // objeto
  }
}

// Clase para crear Entrega
class Entrega {
  static nro = 1;
  constructor() {
    this.id = Entrega.nro++; // identificador único
    this.Alumno; // objeto
    this.Ejercicio; // objeto
    this.Docente; // objeto
    this.sonido; // sonido
    this.devolucion; // string
  }
}
