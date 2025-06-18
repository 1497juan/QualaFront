export interface Product {
    codigoProducto: number;
    nombre: string;
    descripcion: string;
    referenciaInterna: string;
    precioUnitario: number;
    estado: boolean;
    unidadMedida: string;
    fechaCreacion: Date;
}