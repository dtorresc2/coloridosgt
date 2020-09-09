export interface DetallePedido{
   cantidad?: number;
   precio_unidad?: number;
   subtotal?: number;
   idProducto?: number;
   producto?: string;
   desc?: string;
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