-- CreateTable
CREATE TABLE `pagos` (
    `id` VARCHAR(255) NOT NULL,
    `fecha` VARCHAR(255) NOT NULL,
    `forma` VARCHAR(255) NOT NULL,
    `forma_pago_nombre` VARCHAR(255) NOT NULL,
    `receptor` VARCHAR(255) NOT NULL,
    `receptor_nombre` VARCHAR(255) NOT NULL,
    `monto` VARCHAR(255) NOT NULL,
    `monto_recibido` VARCHAR(255) NOT NULL,
    `num_operacion` VARCHAR(255) NOT NULL,
    `cuenta_bancaria_movimiento` VARCHAR(255) NOT NULL,
    `cuenta_bancaria_movimiento_nombre` VARCHAR(255) NOT NULL,
    `status_pago` VARCHAR(255) NOT NULL,
    `status_pago_nombre` VARCHAR(255) NOT NULL,
    `comprobante_pagado` VARCHAR(255) NOT NULL,
    `empresa` VARCHAR(255) NOT NULL,
    `empresa_nombre` VARCHAR(255) NOT NULL,
    `fecha_qn` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
