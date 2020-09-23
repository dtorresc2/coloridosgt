export interface DetallePedido{
   cantidad?: number;
   precio_unidad?: number;
   subtotal?: number;
   idproducto?: number;
   descuento?: number;
   producto?: string;
   descripcion?: string;
   descuento_real?: number;
}

export interface Pedido {
   fecha?: string,
   direccion?: string,
   descuento?: number,
   total?: number,
   url_comprobante?:string,
   idtipo_pedido?: number,
   idcliente?: number,
   idestado_pedido?: number,
   idusuario?: number,
   detalle_pedido?: Array<DetallePedido> 
}

export interface ResultadoInventario {
   idProducto?: number;
   cantidadPedida?: number;
   cantidadDisp?: number;
   estado?: number;
   producto?: string;
}