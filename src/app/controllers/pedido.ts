export interface DetallePedido{
   cantidad?: string;
   precio_unidad?: string;
   subtotal?: string;
   idProducto?: string;
}

export interface Pedido {
   fecha?: string,
   direccion?: string,
   total?: number,
   url_comprobante?:string,
   idtipo_pedido?: number,
   idcliente?: number,
   idestado_pedido?: number,
   idusuario?: number,
   detalle_pedido?: Array<DetallePedido> 
}