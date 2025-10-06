class GreModel {
  constructor(data = {}) {
    this.operacion = data.operacion || 'generar_guia';
    this.tipo_de_comprobante = data.tipo_de_comprobante || 7;
    this.serie = data.serie || 'TTT1';
    this.numero = data.numero || 2;
    this.cliente = {
      tipo_de_documento: data.cliente?.tipo_de_documento || 6,
      numero_de_documento: data.cliente?.numero_de_documento || '20600695771',
      denominacion: data.cliente?.denominacion || 'NUBEFACT SA',
      direccion: data.cliente?.direccion || 'MIRAFLORES LIMA',
      email: data.cliente?.email || 'demo@gmail.com',
      email_1: data.cliente?.email_1 || '',
      email_2: data.cliente?.email_2 || ''
    };
    this.fecha_de_emision = data.fecha_de_emision || '2025-10-06';
    this.observaciones = data.observaciones || 'Prueba de GRE';
    this.motivo_de_traslado = data.motivo_de_traslado || '01';
    this.peso_bruto_total = data.peso_bruto_total || '1';
    this.peso_bruto_unidad_de_medida = data.peso_bruto_unidad_de_medida || 'KGM';
    this.numero_de_bultos = data.numero_de_bultos || '1';
    this.tipo_de_transporte = data.tipo_de_transporte || '01';
    this.fecha_de_inicio_de_traslado = data.fecha_de_inicio_de_traslado || '2025-10-07';
    this.transportista = {
      documento_tipo: data.transportista?.documento_tipo || '6',
      documento_numero: data.transportista?.documento_numero || '20600695771',
      denominacion: data.transportista?.denominacion || 'NUBEFACT SA',
      placa_numero: data.transportista?.placa_numero || 'ABC444'
    };
    this.conductor = {
      documento_tipo: data.conductor?.documento_tipo || '1',
      documento_numero: data.conductor?.documento_numero || '12345678',
      nombre: data.conductor?.nombre || 'JORGE',
      apellidos: data.conductor?.apellidos || 'LOPEZ',
      numero_licencia: data.conductor?.numero_licencia || 'Q12345678'
    };
    this.punto_de_partida = {
      ubigeo: data.punto_de_partida?.ubigeo || '150115',
      direccion: data.punto_de_partida?.direccion || 'AV. PRINCIPAL 123, MIRAFLORES',
      codigo_establecimiento_sunat: data.punto_de_partida?.codigo_establecimiento_sunat || '0000'
    };
    this.punto_de_llegada = {
      ubigeo: data.punto_de_llegada?.ubigeo || '130101',
      direccion: data.punto_de_llegada?.direccion || 'CALLE SECUNDARIA 456, CALLAO',
      codigo_establecimiento_sunat: data.punto_de_llegada?.codigo_establecimiento_sunat || '0000'
    };
    this.enviar_automaticamente_al_cliente = data.enviar_automaticamente_al_cliente || false;
    this.formato_de_pdf = data.formato_de_pdf || '';
    this.items = data.items || [
      {
        unidad_de_medida: 'NIU',
        codigo: '001',
        descripcion: 'PRODUCTO DE PRUEBA 1',
        cantidad: '1'
      }
    ];
    this.documento_relacionado = data.documento_relacionado || [
      {
        tipo: '01',
        serie: 'F001',
        numero: '1'
      }
    ];
  }

  validate() {
    const requiredFields = [
      { field: this.operacion, name: 'operacion' },
      { field: this.tipo_de_comprobante, name: 'tipo_de_comprobante' },
      { field: this.serie, name: 'serie' },
      { field: this.numero, name: 'numero' },
      { field: this.cliente.tipo_de_documento, name: 'cliente_tipo_de_documento' },
      { field: this.cliente.numero_de_documento, name: 'cliente_numero_de_documento' },
      { field: this.cliente.denominacion, name: 'cliente_denominacion' },
      { field: this.fecha_de_emision, name: 'fecha_de_emision' },
      { field: this.motivo_de_traslado, name: 'motivo_de_traslado' },
      { field: this.peso_bruto_total, name: 'peso_bruto_total' },
      { field: this.peso_bruto_unidad_de_medida, name: 'peso_bruto_unidad_de_medida' },
      { field: this.numero_de_bultos, name: 'numero_de_bultos' },
      { field: this.tipo_de_transporte, name: 'tipo_de_transporte' },
      { field: this.fecha_de_inicio_de_traslado, name: 'fecha_de_inicio_de_traslado' },
      { field: this.transportista.documento_tipo, name: 'transportista_documento_tipo' },
      { field: this.transportista.documento_numero, name: 'transportista_documento_numero' },
      { field: this.transportista.denominacion, name: 'transportista_denominacion' },
      { field: this.transportista.placa_numero, name: 'transportista_placa_numero' },
      { field: this.conductor.documento_tipo, name: 'conductor_documento_tipo' },
      { field: this.conductor.documento_numero, name: 'conductor_documento_numero' },
      { field: this.conductor.nombre, name: 'conductor_nombre' },
      { field: this.conductor.apellidos, name: 'conductor_apellidos' },
      { field: this.conductor.numero_licencia, name: 'conductor_numero_licencia' },
      { field: this.punto_de_partida.ubigeo, name: 'punto_de_partida_ubigeo' },
      { field: this.punto_de_partida.direccion, name: 'punto_de_partida_direccion' },
      { field: this.punto_de_llegada.ubigeo, name: 'punto_de_llegada_ubigeo' },
      { field: this.punto_de_llegada.direccion, name: 'punto_de_llegada_direccion' },
      { field: this.items.length > 0, name: 'items', condition: true }
    ];

    const missingFields = requiredFields
      .filter(({ field, condition }) => condition === undefined ? !field : !condition)
      .map(({ name }) => name);

    if (missingFields.length > 0) {
      throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
    }
  }

  toJSON() {
    return {
      operacion: this.operacion,
      tipo_de_comprobante: this.tipo_de_comprobante,
      serie: this.serie,
      numero: this.numero,
      cliente_tipo_de_documento: this.cliente.tipo_de_documento,
      cliente_numero_de_documento: this.cliente.numero_de_documento,
      cliente_denominacion: this.cliente.denominacion,
      cliente_direccion: this.cliente.direccion,
      cliente_email: this.cliente.email,
      cliente_email_1: this.cliente.email_1,
      cliente_email_2: this.cliente.email_2,
      fecha_de_emision: this.fecha_de_emision,
      observaciones: this.observaciones,
      motivo_de_traslado: this.motivo_de_traslado,
      peso_bruto_total: this.peso_bruto_total,
      peso_bruto_unidad_de_medida: this.peso_bruto_unidad_de_medida,
      numero_de_bultos: this.numero_de_bultos,
      tipo_de_transporte: this.tipo_de_transporte,
      fecha_de_inicio_de_traslado: this.fecha_de_inicio_de_traslado,
      transportista_documento_tipo: this.transportista.documento_tipo,
      transportista_documento_numero: this.transportista.documento_numero,
      transportista_denominacion: this.transportista.denominacion,
      transportista_placa_numero: this.transportista.placa_numero,
      conductor_documento_tipo: this.conductor.documento_tipo,
      conductor_documento_numero: this.conductor.documento_numero,
      conductor_nombre: this.conductor.nombre,
      conductor_apellidos: this.conductor.apellidos,
      conductor_numero_licencia: this.conductor.numero_licencia,
      punto_de_partida_ubigeo: this.punto_de_partida.ubigeo,
      punto_de_partida_direccion: this.punto_de_partida.direccion,
      punto_de_partida_codigo_establecimiento_sunat: this.punto_de_partida.codigo_establecimiento_sunat,
      punto_de_llegada_ubigeo: this.punto_de_llegada.ubigeo,
      punto_de_llegada_direccion: this.punto_de_llegada.direccion,
      punto_de_llegada_codigo_establecimiento_sunat: this.punto_de_llegada.codigo_establecimiento_sunat,
      enviar_automaticamente_al_cliente: this.enviar_automaticamente_al_cliente,
      formato_de_pdf: this.formato_de_pdf,
      items: this.items,
      documento_relacionado: this.documento_relacionado
    };
  }
}

module.exports = GreModel;
