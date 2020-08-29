export interface Producto {
   id?: number,
   nombre?: string,
   descripcion?: string,
   precio?: number, 
   cantidad?: number,
   descuento?: number,
   cantidad_minima?: number,
   categoria_idcategoria?: number,
   buffer?: string,
   key?:string
   idusuario?: number
}