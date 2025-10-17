const buildGreJson = (inputData) => {
  /*const requiredFields = [
    'operacion',
    'tipo_de_comprobante',
    'serie',
    'numero',
    'cliente',
    'fecha_de_emision',
    'motivo_de_traslado',
    'peso_bruto_total',
    'numero_de_bultos',
    'tipo_de_transporte',
    'fecha_de_inicio_de_traslado',
    'punto_de_partida',
    'punto_de_llegada',
    'items'
  ];

  const requiredClientFields = [
    'tipo_de_documento',
    'numero_de_documento',
    'denominacion'
  ];

  const requiredPointFields = [
    'ubigeo',
    'direccion',
    'codigo_establecimiento_sunat'
  ];

  const requiredItemFields = [
    'unidad_de_medida',
    'codigo',
    'descripcion',
    'cantidad'
  ];

  // Validar campos requeridos
  for (const field of requiredFields) {
    if (!inputData[field]) {
      throw new Error(`Falta el campo requerido: ${field}`);
    }
  }

  // Validar campos del cliente
  for (const field of requiredClientFields) {
    if (!inputData.cliente[field]) {
      throw new Error(`Falta el campo requerido en cliente: ${field}`);
    }
  }

  // Validar puntos de partida y llegada
  for (const point of ['punto_de_partida', 'punto_de_llegada']) {
    for (const field of requiredPointFields) {
      if (!inputData[point][field]) {
        throw new Error(`Falta el campo requerido en ${point}: ${field}`);
      }
    }
  }

  // Validar items
  if (!Array.isArray(inputData.items) || inputData.items.length === 0) {
    throw new Error('Se requiere al menos un item en la lista de items');
  }

  for (const item of inputData.items) {
    for (const field of requiredItemFields) {
      if (!item[field]) {
        throw new Error(`Falta el campo requerido en item: ${field}`);
      }
    }
  }

  // Validar formatos y valores específicos
  if (inputData.operacion !== 'generar_guia') {
    throw new Error('El campo operacion debe ser "generar_guia"');
  }

  if (inputData.tipo_de_comprobante !== 7) {
    throw new Error('El campo tipo_de_comprobante debe ser 7 para GRE');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(inputData.fecha_de_emision)) {
    throw new Error('El campo fecha_de_emision debe tener el formato YYYY-MM-DD');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(inputData.fecha_de_inicio_de_traslado)) {
    throw new Error('El campo fecha_de_inicio_de_traslado debe tener el formato YYYY-MM-DD');
  }

  if (!['01', '02', '03', '04', '05', '06', '07', '08', '09', '13', '14'].includes(inputData.motivo_de_traslado)) {
    throw new Error('El campo motivo_de_traslado debe ser un código válido (01-09, 13, 14)');
  }

  if (!['01', '02'].includes(inputData.tipo_de_transporte)) {
    throw new Error('El campo tipo_de_transporte debe ser "01" (privado) o "02" (público)');
  }

  if (!/^\d{11}$/.test(inputData.cliente.numero_de_documento)) {
    throw new Error('El campo cliente.numero_de_documento debe ser un RUC válido de 11 dígitos');
  }

  // Construir JSON limpio*/
  const greJson = {
    operacion: inputData.operacion,
    tipo_de_comprobante: inputData.tipo_de_comprobante,
    serie: inputData.serie,
    numero: inputData.numero,
    cliente_tipo_de_documento: inputData.cliente_tipo_de_documento,
    cliente_numero_de_documento: inputData.cliente_numero_de_documento,
    cliente_denominacion: inputData.cliente_denominacion,
    cliente_direccion: inputData.cliente_direccion || '',
    cliente_email: inputData.cliente_email || '',
    cliente_email_1: inputData.cliente_email_1 || '',
    cliente_email_2: inputData.cliente_email_2 || '',
    fecha_de_emision: inputData.fecha_de_emision,
    motivo_de_traslado: inputData.motivo_de_traslado,
    peso_bruto_total: inputData.peso_bruto_total,
    peso_bruto_unidad_de_medida: inputData.peso_bruto_unidad_de_medida || 'KGM',
    numero_de_bultos: inputData.numero_de_bultos,
    tipo_de_transporte: inputData.tipo_de_transporte,
    fecha_de_inicio_de_traslado: inputData.fecha_de_inicio_de_traslado,
    transportista_documento_tipo: inputData.transportista_documento_tipo || null,
    transportista_documento_numero: inputData.transportista_documento_numero || null,
    transportista_denominacion: inputData.transportista_denominacion || null,
    transportista_placa_numero: inputData.transportista_placa_numero || null,
    conductor_documento_tipo: inputData.conductor_documento_tipo || null,
    conductor_documento_numero: inputData.conductor_documento_numero || null,
    conductor_nombre: inputData.conductor_nombre || null,
    conductor_documento_apellidos: inputData.conductor_apellidos || null,
    conductor_numero_licencia: inputData.conductor_numero_licencia || null,
    punto_de_partida_ubigeo: inputData.punto_de_partida_ubigeo,
    punto_de_partida_direccion: inputData.punto_de_partida_direccion,
    punto_de_partida_codigo_establecimiento_sunat: inputData.punto_de_partida_codigo_establecimiento_sunat,
    punto_de_llegada_ubigeo: inputData.punto_de_llegada_ubigeo,
    punto_de_llegada_direccion: inputData.punto_de_llegada_direccion,
    punto_de_llegada_codigo_establecimiento_sunat: inputData.punto_de_llegada_codigo_establecimiento_sunat,
    items: inputData.items.map(item => ({
      unidad_de_medida: item.unidad_de_medida,
      codigo: item.codigo,
      descripcion: item.descripcion,
      cantidad: item.cantidad
    })),
    observaciones: inputData.observaciones || '',
    enviar_automaticamente_al_cliente: inputData.enviar_automaticamente_al_cliente || false,
    formato_de_pdf: inputData.formato_de_pdf || '',
    documento_relacionado: inputData.documento_relacionado || []
  };

  return greJson;
};

module.exports = { buildGreJson };