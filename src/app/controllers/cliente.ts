export interface Cliente{
    name?: string;
    lastname?: string;
    nit?: string;
    nick?: string;
    password?: string;
    telefono?: string;
    dpi?: string;
}

export interface ClienteActualizacion {
    nombre?: string; 
    apellido?: string;
    nit?: string; 
    telefono?: string; 
    dpi?: string;
    correo?: string; 
    nick?: string; 
}

// "name": "Usuario", 
// "lastname": "Prueba", 
// "nick": "prueba123@correo.com", 
// "password": "123",
// "telefono": "2545-5454",
// "nit": "1351132",
// "dpi": "121212121"