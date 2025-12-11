// ═══════════════════════════════════════════════════════════════════════════════
// SISTEMA DE BAJA DE ELEMENTOS - COMARRICO
// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL
// ═══════════════════════════════════════════════════════════════════════════════

const SHEET_ID = '1dIQB9lAu6iZByoYGI-WHDSE0dgvu0gxyrLv8Uvu-1r4';
const USUARIOS_SHEET = 'USUARIOS';
const REGISTROS_SHEET = 'REGISTROS_BAJA';
const VALIDACIONES_SHEET = 'VALIDACIONES_INDIVIDUALES';
const VALORES = 'VALORES'

const CORREOS_ACTIVOS_FIJOS = 'pragestionhumana@pastascomarrico.com';
const CORREOS_FINALIZACION = 'pragestionhumana@pastascomarrico.com';
const CORREOS_COPIA = 'juliusbloque23@gmail.com';

const EMAIL_ROUTING_CONFIG = {
  "ALMACÉN GENERAL": {
    "MOLDES E INSERTOS": {
      "MENOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      },
      "MAYOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      }
    },
    "MAQUINARIA": {
      "MENOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      },
      "MAYOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      }
    },
    "ESTIBAS DE MADERA Y/O GUACALES": {
      "MENOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "correo_aprobador1@comarrico.com"],
        "Aprobador 2": ["soptransformaciondigital@pastascomarrico.com", "correo_aprobador2@comarrico.com"],
        "Aprobador 3": ["practransformdgt3@alimentosdoria.com", "correo_aprobador3@comarrico.com"],
        "Aprobador 4": ["user@gmail.com", "correo_aprobador4@comarrico.com"]
      },
      "MAYOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      }
    },
    "INSUMO MATERIA PRIMA": {
      "MENOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      },
      "MAYOR_5M": {
        "Aprobador 1": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 2": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 3": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"],
        "Aprobador 4": ["pragestionhumana@pastascomarrico.com", "pragestionhumana@pastascomarrico.com"]
      }
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES PRINCIPALES DE LA APLICACIÓN WEB
// ═══════════════════════════════════════════════════════════════════════════════

function doGet() {
  const title = 'DADAS DE BAJA - COMARRICO';
  const faviconUrl = 'https://comarrico.com/wp-content/uploads/2022/02/cropped-Logo-menu-comarrico-150x150.png';
  
  return HtmlService.createTemplateFromFile('html/index')
    .evaluate()
    .setTitle(title)
    .setFaviconUrl(faviconUrl)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE GESTIÓN DE HOJAS DE CÁLCULO
// ═══════════════════════════════════════════════════════════════════════════════

function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SHEET_ID);
  } catch (error) {
    console.error('Error al abrir la hoja de cálculo:', error);
    throw new Error('No se pudo acceder a la hoja de cálculo');
  }
}

function getOrCreateValidacionesSheet(ss) {
  let sheet = ss.getSheetByName(VALIDACIONES_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(VALIDACIONES_SHEET);
    sheet.getRange(1, 1, 1, 6).setValues([
      ['ID_SOLICITUD', 'CORREO_VALIDADOR', 'NOMBRE_VALIDADOR', 'ESTADO', 'FECHA_VALIDACION', 'OBSERVACIONES']
    ]);
  }
  return sheet;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE GESTIÓN DE USUARIOS
// ═══════════════════════════════════════════════════════════════════════════════

function loginUser(email, password) {
  try {
    const ss = getSpreadsheet();
    const usuariosSheet = ss.getSheetByName(USUARIOS_SHEET);
    
    if (!usuariosSheet) {
      throw new Error('La hoja USUARIOS no existe');
    }
    
    const data = usuariosSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Encontrar índices de columnas
    const correoIndex = headers.indexOf('CORREO');
    const passwordIndex = headers.indexOf('CONTRASEÑA');
    const nombreIndex = headers.indexOf('NOMBRE');
    const procesoIndex = headers.indexOf('PROCESO');
    const cargoIndex = headers.indexOf('CARGO');
    const rolIndex = headers.indexOf('ROL');
    
    // Buscar usuario
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[correoIndex] === email && String(row[passwordIndex]) === String(password)) {
        const user = {
          id: row[0],
          nombre: row[nombreIndex],
          correo: row[correoIndex],
          proceso: row[procesoIndex],
          cargo: row[cargoIndex],
          rol: row[rolIndex]
        };
        
        return { success: true, user: user };
      }
    }
    
    return { success: false, message: 'Credenciales incorrectas' };
    
  } catch (error) {
    console.error('❌ Error en loginUser:', error);
    return { success: false, message: 'Error interno del servidor: ' + error.message };
  }
}

function registerUser(userData) {
  try {
    const ss = getSpreadsheet();
    const usuariosSheet = ss.getSheetByName(USUARIOS_SHEET);
    
    if (!usuariosSheet) {
      return { success: false, message: 'La hoja de usuarios no existe' };
    }
    
    const data = usuariosSheet.getDataRange().getValues();
    const newId = data.length;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === userData.email) {
        return { success: false, message: 'El correo ya está registrado' };
      }
    }
    
    usuariosSheet.appendRow([
      newId,
      userData.name,
      userData.email,
      userData.password,
      userData.proceso,
      userData.cargo,
      'USUARIO',
      new Date()
    ]);
    
    return { success: true, message: 'Usuario registrado exitosamente' };
  } catch (error) {
    console.error('Error en registro:', error);
    return { success: false, message: 'Error interno del servidor' };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE GESTIÓN DE SOLICITUDES
// ═══════════════════════════════════════════════════════════════════════════════

function submitRequest(requestData) {
  try {
    console.log('📝 Creando nueva solicitud:', requestData);

    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);

    if (!registrosSheet) {
      return { success: false, message: 'La hoja de registros no existe' };
    }

    const data = registrosSheet.getDataRange().getValues();
    const newId = data.length;

    const fecha = new Date();

    let estadoInicial = 'PENDIENTE_VALIDACION';
    const tiposEspeciales = ['MOBILIARIOS', 'MOLDES E INSERTOS', 'MAQUINARIA'];

    if (tiposEspeciales.includes(requestData.tipoElemento) && requestData.esActivoFijo === 'SI') {
      estadoInicial = 'CERRADO_POR_ACTIVO_FIJO';
    }

    // 🔹 Calcular precio si hay tipo2 y cantidad
    let precioUnitario = '';
    let calculoPrecio = '';
    if (requestData.tipo2 && requestData.kiloGalon) {
      precioUnitario = getPrecioPorTipo(requestData.tipo2); // busca en hoja VALORES
      calculoPrecio = Number(requestData.kiloGalon) * precioUnitario;
    }

    registrosSheet.appendRow([
      newId,
      requestData.correoSolicitante,
      requestData.nombreSolicitante,
      requestData.procesoSeleccionado,
      requestData.nombreElemento,
      requestData.tipoElemento,
      requestData.tipo2 || '',         // nuevo campo
      requestData.kiloGalon || '',     // cantidad ingresada
      precioUnitario || '',            // precio unitario
      calculoPrecio || '',                   // total calculado
      requestData.motivos,
      requestData.esActivoFijo || 'NO',
      requestData.valorRango || '',
      estadoInicial,
      fecha,
      '',
      requestData.descripcionDetallada || '',
      ''
    ]);

    if (estadoInicial === 'CERRADO_POR_ACTIVO_FIJO') {
      enviarNotificacionActivoFijo([
        newId,
        requestData.correoSolicitante,
        requestData.nombreSolicitante,
        requestData.procesoSeleccionado,
        requestData.nombreElemento
      ]);
    } else {
      enviarCorreosValidacion(newId, requestData);
    }

    enviarCorreoConfirmacionSolicitante(newId, requestData, 'ENVIADA');

    return { success: true, message: 'Solicitud enviada exitosamente', id: newId };
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    return { success: false, message: 'Error interno del servidor: ' + error.message };
  }
}


function getUserRequests(userEmail) {
  try {

    console.log(`📋 Obteniendo historial para usuario: ${userEmail}`);

    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    
    if (!registrosSheet) {
      return [];
    }
    
    const data = registrosSheet.getDataRange().getValues();
    const headers = data[0];
    
    const requests = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[1] === userEmail) { // CORREO_SOLICITANTE está en la columna 1
        requests.push({
          id: row[0],
          proceso: row[3],
          nombreElemento: row[4],
          estado: row[13],
          fechaSolicitud: row[14] ? new Date(row[14]).toLocaleDateString('es-ES') : '',
        });
      }
    }
    
    return requests;
  } catch (error) {
    console.error('Error al obtener solicitudes del usuario:', error);
    return [];
  }
}

function getAdminRequests(user) {
  try {
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    
    if (!registrosSheet) {
      return [];
    }
    
    const data = registrosSheet.getDataRange().getValues();
    const requests = [];
    
    for (let i = 1; i < data.length; i++) {
      const proceso = data[i][3];
      const tipoElemento = data[i][5];
      const valorRango = data[i][12];
      
      // Obtener la configuración de equipos (ahora es un objeto, no array)
      const requiredTeams = getRequiredValidators(proceso, tipoElemento, valorRango);
      
      // Verificar si el usuario pertenece a algún equipo
      let userBelongsToTeam = false;
      
      for (const teamName in requiredTeams) {
        if (requiredTeams[teamName].includes(user.correo)) {
          userBelongsToTeam = true;
          break;
        }
      }
      
      if (userBelongsToTeam) {
        const row = data[i];
        requests.push({
          id: row[0],
          nombreSolicitante: row[2],
          proceso: row[3],
          nombreElemento: row[4],
          estado: row[13],
          fechaSolicitud: formatDate(row[14]),
        });
      }
    }
    
    return requests;
  } catch (error) {
    console.error('Error al obtener solicitudes administrativas:', error);
    return [];
  }
}

function getUserRequestHistory(userEmail) {
  try {
    console.log(`📋 Obteniendo historial para usuario: ${userEmail}`);
    
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    
    if (!registrosSheet) {
      throw new Error('La hoja REGISTROS_BAJA no existe');
    }
    
    const data = registrosSheet.getDataRange().getValues();
    const headers = data[0];
    
    const requests = [];
    
    // Filtrar solicitudes del usuario
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[1] === userEmail) { // CORREO_SOLICITANTE está en la columna 1
        requests.push({
          id: row[0],
          correoSolicitante: row[1],
          nombreSolicitante: row[2],
          proceso: row[3],
          nombreElemento: row[4],
          tipoElemento: row[5],
          motivoBaja: row[10],
          esActivoFijo: row[11],
          valorRango: row[12],
          estado: row[13],
          fechaSolicitud: row[14] ? new Date(row[14]).toLocaleDateString('es-ES') : '',
          fechaValidacion: row[15] ? new Date(row[15]).toLocaleDateString('es-ES') : '',
          observaciones: row[16] || '',
          validadoPor: row[17] || ''
        });
      }
    }
    
    // Ordenar por ID descendente (más recientes primero)
    requests.sort((a, b) => b.id - a.id);
    
    console.log(`📋 Encontradas ${requests.length} solicitudes para ${userEmail}`);
    return requests;
    
  } catch (error) {
    console.error('❌ Error al obtener historial:', error);
    return [];
  }
}

function getRequestsForAdmin() {
  try {
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    
    if (!registrosSheet) {
      return [];
    }
    
    const data = registrosSheet.getDataRange().getValues();
    const requests = [];
    
    for (let i = 1; i < data.length; i++) {
      requests.push({
        id: data[i][0],
        correoSolicitante: data[i][1],
        nombreSolicitante: data[i][2],
        proceso: data[i][3],
        nombreElemento: data[i][4],
        tipoElemento: data[i][5],
        motivoBaja: data[i][10],
        esActivoFijo: data[i][11],
        valorRango: data[i][12],
        estado: data[i][13],
        fechaSolicitud: data[i][14],
        fechaValidacion: data[i][15],
        observaciones: data[i][16],
        validadoPor: data[i][17]
      });
    }
    
    requests.sort((a, b) => new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud));
    return requests;
    
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    return [];
  }
}

function getRequestDetails(requestId) {
    try {
        if (!requestId) {
            return { success: false, message: 'ID de solicitud no válido' };
        }

        const ss = getSpreadsheet();
        const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
        if (!registrosSheet) {
            return { success: false, message: 'Hoja de registros no encontrada' };
        }

        const data = registrosSheet.getDataRange().getValues();

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            console.log(`🔍 Comparando: ${row[0]} (${typeof row[0]}) == ${requestId} (${typeof requestId})`);

            if (row[0] == requestId) {
                const request = {
                    id: row[0],
                    correoSolicitante: row[1],
                    nombreSolicitante: row[2],
                    proceso: row[3],
                    nombreElemento: row[4],
                    tipoElemento: row[5],
                    tipo2: row[6],
                    kiloGalon: row[7],
                    precioUnitario: row[8],
                    calculoFormatted: row[9],
                    motivoBaja: row[10],
                    esActivoFijo: row[11],
                    valorRango: row[12],
                    estado: row[13],
                    fechaSolicitud: row[14] ? formatDate(row[14]) : '',
                    fechaValidacion: row[15] ? formatDate(row[15]) : '',
                    observaciones: row[16],
                    validadoPor: row[17],
                };

                const individualValidations = getIndividualValidations(requestId);
                const ambientalValidations = getAmbientalValidations(requestId); 

                return {
                    success: true,
                    request: request,
                    individualValidations: individualValidations || [],
                    ambientalValidations: ambientalValidations || [] 
                };
            }
        }

        return { success: false, message: 'Solicitud no encontrada' };

    } catch (error) {
        console.error('❌ Error al obtener detalles:', error);
        return { success: false, message: 'Error interno: ' + error.message };
    }
}

function rejectRequest(requestId, observaciones, validador) {
  try {
    console.log(`❌ Rechazando solicitud ID: ${requestId} por ${validador.nombre}`);
    
    if (!requestId || !validador || !validador.correo || !validador.nombre) {
      return { success: false, message: 'Datos de rechazo no válidos' };
    }
    
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    const validacionesSheet = getOrCreateValidacionesSheet(ss);
    
    if (!registrosSheet) {
      return { success: false, message: 'La hoja REGISTROS_BAJA no existe' };
    }
    
    const data = registrosSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == requestId) {
        const row = i + 1;
        
        // Registrar rechazo individual
        const validationResult = registerIndividualValidation(
          validacionesSheet, 
          requestId, 
          validador.correo, 
          validador.nombre, 
          'RECHAZADA', 
          observaciones
        );
        
        if (!validationResult || !validationResult.success) {
          return validationResult || { success: false, message: 'Error en registro de rechazo' };
        }
        
        // Cualquier rechazo rechaza inmediatamente toda la solicitud
        registrosSheet.getRange(row, 14).setValue('RECHAZADA');
        registrosSheet.getRange(row, 16).setValue(new Date());
        registrosSheet.getRange(row, 19).setValue(`DE: ${validador.nombre} - ${observaciones || ''}`);
        registrosSheet.getRange(row, 18).setValue(validador.nombre);
        
        try {
          enviarNotificacionRechazo(data[i], observaciones);
        } catch (notifError) {
          console.log('⚠️ Error al enviar notificación de rechazo:', notifError);
        }
        
        return { success: true, message: 'Solicitud rechazada exitosamente' };
      }
    }
    
    return { success: false, message: 'Solicitud no encontrada' };
    
  } catch (error) {
    console.error('❌ Error en rejectRequest:', error);
    return { success: false, message: 'Error interno: ' + error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE VALIDACIÓN MÚLTIPLE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Registrar validación individual - VERSIÓN CORREGIDA
 */
function registerIndividualValidation(validacionesSheet, requestId, correoValidador, nombreValidador, estado, observaciones, equipo = '') {
  try {
    const data = validacionesSheet.getDataRange().getValues();
    
    // Verificar si ya existe una validación de este validador para esta solicitud
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == requestId && data[i][1] === correoValidador) {
        return { success: false, message: 'Ya ha validado esta solicitud anteriormente' };
      }
    }
    
    // Agregar nueva validación con información de equipo
    validacionesSheet.appendRow([
      requestId,
      correoValidador,
      nombreValidador,
      estado,
      new Date(),
      observaciones || '',
      equipo  // Nueva columna para el equipo
    ]);

    // Actualizar encabezados si es necesario
    const headers = data[0];
    if (!headers || headers.length < 7) {
      validacionesSheet.getRange(1, 1, 1, 7).setValues([
        ['ID_SOLICITUD', 'CORREO_VALIDADOR', 'NOMBRE_VALIDADOR', 'ESTADO', 'FECHA_VALIDACION', 'OBSERVACIONES', 'EQUIPO']
      ]);
    }

    // Obtener estado de validación (esta es la línea que causaba el error)
    const validationStatus = getRequestValidationStatus(requestId);

    if (validationStatus) {
      // Enviar notificación al equipo
      enviarNotificacionEquipoValidado(
        requestId,
        correoValidador,
        nombreValidador,
        equipo,
        estado,
        observaciones,
        validationStatus
      );
    }
    
    return { success: true, message: 'Validación registrada exitosamente' };
  } catch (error) {
    console.error('Error al registrar validación individual:', error);
    return { success: false, message: 'Error al registrar validación: ' + error.message };
  }
}

/**
 * Obtener validaciones individuales - ACTUALIZADA con equipo
 */
function getIndividualValidations(requestId) {
  try {
    const ss = getSpreadsheet();
    const validacionesSheet = ss.getSheetByName(VALIDACIONES_SHEET);
    if (!validacionesSheet) return [];

    const data = validacionesSheet.getDataRange().getValues();
    const validations = [];
    const targetId = String(requestId).trim();

    for (let i = 1; i < data.length; i++) {
      const rowId = String(data[i][0]).trim();
      
      if (rowId === targetId) {
        validations.push({
          requestId: rowId,
          correoValidador: data[i][1] || '',
          validador: data[i][2] || '',
          estado: data[i][3] || '',
          fecha: data[i][4] ? formatDate(data[i][4]) : '',
          observaciones: data[i][5] || '',
          equipo: data[i][6] || ''  // Nueva propiedad para el equipo
        });
      }
    }

    console.log(`✅ Encontradas ${validations.length} validaciones para ${requestId}`);
    return validations;
  } catch (error) {
    console.error('Error al obtener validaciones individuales:', error);
    return [];
  }
}

function validateRequest(requestId, observaciones, validador) {
  try {
    console.log(`🔧 INICIANDO VALIDACIÓN para ID: ${requestId}`);
    console.log(`👤 Validador: ${validador.nombre} (${validador.correo})`);
    
    if (!requestId || !validador || !validador.correo || !validador.nombre) {
      return { success: false, message: 'Datos de validación no válidos' };
    }
    
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    const validacionesSheet = getOrCreateValidacionesSheet(ss);
    
    if (!registrosSheet) {
      return { success: false, message: 'La hoja REGISTROS_BAJA no existe' };
    }
    
    const data = registrosSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == requestId) {
        const row = i + 1;
        const estadoActual = data[i][13];
        
        console.log(`📊 Estado actual de la solicitud: ${estadoActual}`);
        
        if (estadoActual !== 'PENDIENTE_VALIDACION') {
          return { success: false, message: 'La solicitud no está pendiente de validación' };
        }
        
        // Obtener configuración de equipos para esta solicitud
        const proceso = data[i][3];
        const tipoElemento = data[i][5];
        const valorRango = data[i][12];
        const requiredTeams = getRequiredValidators(proceso, tipoElemento, valorRango);
        
        console.log(`👥 Equipos requeridos:`, Object.keys(requiredTeams));
        
        // Verificar si el validador pertenece a algún equipo
        let perteneceAEquipo = false;
        let equipoPerteneciente = '';
        
        for (const teamName in requiredTeams) {
          if (requiredTeams[teamName].includes(validador.correo)) {
            perteneceAEquipo = true;
            equipoPerteneciente = teamName;
            break;
          }
        }
        
        console.log(`🔍 ¿Pertenece a algún equipo? ${perteneceAEquipo} -> ${equipoPerteneciente}`);
        
        if (!perteneceAEquipo) {
          return { success: false, message: 'No tiene permisos para validar esta solicitud' };
        }
        
        // Verificar si ya validó alguien de este equipo
        const existingValidations = getIndividualValidations(requestId);
        const equipoYaValidado = existingValidations.some(validation => 
          requiredTeams[equipoPerteneciente].includes(validation.correoValidador) && 
          validation.estado === 'VALIDADA'
        );
        
        console.log(`🔍 ¿El equipo ${equipoPerteneciente} ya está validado? ${equipoYaValidado}`);
        
        if (equipoYaValidado) {
          return { success: false, message: `El ${equipoPerteneciente} ya validó esta solicitud` };
        }
        
        // Registrar validación individual
        const validationResult = registerIndividualValidation(
          validacionesSheet, 
          requestId, 
          validador.correo, 
          validador.nombre, 
          'VALIDADA', 
          observaciones,
          equipoPerteneciente
        );
        
        if (!validationResult || !validationResult.success) {
          return validationResult || { success: false, message: 'Error en registro de validación' };
        }
        
        console.log(`✅ Validación registrada para ${equipoPerteneciente}`);
        
        // Verificar si TODOS los equipos están validados
        const validationStatus = getRequestValidationStatus(requestId);
        
        console.log(`📊 Estado final de validación:`, validationStatus);
        
        if (validationStatus && validationStatus.allValidated) {
          // TODOS los equipos han validado
          console.log(`🎉 TODOS los equipos han validado! Marcando como VALIDADA...`);
          
          registrosSheet.getRange(row, 14).setValue('VALIDADA');
          registrosSheet.getRange(row, 16).setValue(new Date());
          registrosSheet.getRange(row, 18).setValue(`Validada por equipos: ${validationStatus.validatedTeams.join(', ')}`);
          
          try {
            const requestData = {
              nombreSolicitante: data[i][2],
              correoSolicitante: data[i][1],
              procesoSeleccionado: data[i][3],
              nombreElemento: data[i][4],
              tipoElemento: data[i][5],
              esActivoFijo: data[i][11],
              valorRango: data[i][12],
              motivos: data[i][10],
              kiloGalon: data[i][7]
            };

            enviarNotificacionFinal(requestId, requestData);  
            enviarCorreoConfirmacionSolicitante(requestId, requestData, 'VALIDADA');

          } catch (notifError) {
            console.log('⚠️ Error al enviar notificación:', notifError);
          }       
          
          return { 
            success: true, 
            message: 'Solicitud validada exitosamente por todos los equipos', 
            allValidated: true,
            equipo: equipoPerteneciente
          };
        } else {
          // Algunos equipos pendientes
          console.log(`⏳ Equipos pendientes: ${validationStatus.pendingTeams.length}`);
          
          return { 
            success: true, 
            message: `Su validación ha sido registrada para el ${equipoPerteneciente}. Equipos pendientes: ${validationStatus.pendingTeams.length} (${validationStatus.pendingTeams.join(', ')})`, 
            allValidated: false,
            equipo: equipoPerteneciente,
            pendientes: validationStatus.pendingTeams
          };
        }
      }
    }
    
    return { success: false, message: 'Solicitud no encontrada' };
    
  } catch (error) {
    console.error('❌ Error en validateRequest:', error);
    return { success: false, message: 'Error interno: ' + error.message };
  }
}

function testDebug() {
  var result = debugValidationStatus(1); // Reemplaza 123 con el ID real
  console.log(result);
}

/**
 * Función de debug para probar la validación por equipos
 */
function debugValidationStatus(requestId) {
  try {
    console.log('🔧 MODO DEBUG - Validación por equipos');
    
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    if (!registrosSheet) return '❌ Hoja no encontrada';

    const data = registrosSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == requestId) {
        const proceso = data[i][3];
        const tipoElemento = data[i][5];
        const valorRango = data[i][12];
        const estadoActual = data[i][13];

        console.log('📋 DATOS DE LA SOLICITUD:');
        console.log('- ID:', data[i][0]);
        console.log('- Proceso:', proceso);
        console.log('- Tipo Elemento:', tipoElemento);
        console.log('- Valor Rango:', valorRango);
        console.log('- Estado Actual:', estadoActual);

        // Obtener configuración de equipos
        const requiredTeams = getRequiredValidators(proceso, tipoElemento, valorRango);
        console.log('👥 CONFIGURACIÓN DE EQUIPOS:', requiredTeams);

        // Obtener validaciones existentes
        const individualValidations = getIndividualValidations(requestId);
        console.log('✅ VALIDACIONES EXISTENTES:', individualValidations);

        // Verificar cada equipo
        console.log('🔍 VERIFICANDO EQUIPOS:');
        for (const teamName in requiredTeams) {
          const teamEmails = requiredTeams[teamName];
          const hasValidation = teamEmails.some(email => 
            individualValidations.some(v => v.correoValidador === email && v.estado === 'VALIDADA')
          );
          
          console.log(`- ${teamName}: ${hasValidation ? 'VALIDADO ✅' : 'PENDIENTE ⏳'}`);
          if (!hasValidation) {
            console.log(`  Correos del equipo: ${teamEmails.join(', ')}`);
          }
        }

        const validationStatus = getRequestValidationStatus(requestId);
        return validationStatus;
      }
    }
    
    return '❌ Solicitud no encontrada';
  } catch (error) {
    console.error('Error en debug:', error);
    return '❌ Error: ' + error.message;
  }
}

/**
 * Obtiene el estado de validación por equipos para una solicitud - VERSIÓN CORREGIDA
 */
function getRequestValidationStatus(requestId) {
  try {
    console.log(`🔍 Obteniendo estado de validación para solicitud: ${requestId}`);
    
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    if (!registrosSheet) {
      console.log('❌ Hoja REGISTROS_BAJA no encontrada');
      return null;
    }

    const data = registrosSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == requestId) {
        const proceso = data[i][3];
        const tipoElemento = data[i][5];
        const valorRango = data[i][12];

        // Obtener configuración de equipos
        const requiredTeams = getRequiredValidators(proceso, tipoElemento, valorRango);
        const individualValidations = getIndividualValidations(requestId);

        console.log(`📊 Configuración de equipos para ${requestId}:`, requiredTeams);
        console.log(`📋 Validaciones individuales encontradas:`, individualValidations);

        // Verificar qué equipos están validados
        const teamValidationStatus = {};
        const validatedTeams = [];
        const pendingTeams = [];

        for (const teamName in requiredTeams) {
          const teamEmails = requiredTeams[teamName];
          
          // Verificar si ALGÚN miembro del equipo ha validado
          const teamValidated = teamEmails.some(email => 
            individualValidations.some(validation => 
              validation.correoValidador === email && validation.estado === 'VALIDADA'
            )
          );
          
          // Encontrar quién validó por este equipo
          const validatedBy = individualValidations.find(validation => 
            teamEmails.includes(validation.correoValidador) && validation.estado === 'VALIDADA'
          );

          teamValidationStatus[teamName] = {
            validated: teamValidated,
            members: teamEmails,
            validatedBy: validatedBy || null
          };

          if (teamValidated) {
            validatedTeams.push(teamName);
            console.log(`✅ ${teamName} está VALIDADO por: ${validatedBy ? validatedBy.validador : 'N/A'}`);
          } else {
            pendingTeams.push(teamName);
            console.log(`⏳ ${teamName} está PENDIENTE`);
          }
        }

        const allTeamsValidated = Object.keys(requiredTeams).every(teamName => 
          teamValidationStatus[teamName].validated
        );

        console.log(`📊 RESUMEN para ${requestId}:`);
        console.log(`- Equipos validados: ${validatedTeams.length}/${Object.keys(requiredTeams).length}`);
        console.log(`- Equipos pendientes: ${pendingTeams.length}`);
        console.log(`- ¿Todos validados?: ${allTeamsValidated}`);
        console.log(`- Equipos pendientes específicos:`, pendingTeams);

        return {
          requiredTeams: requiredTeams,
          teamValidationStatus: teamValidationStatus,
          validatedTeams: validatedTeams,
          pendingTeams: pendingTeams,
          allValidated: allTeamsValidated,
          individualValidations: individualValidations
        };
      }
    }
    
    console.log(`❌ Solicitud ${requestId} no encontrada`);
    return null;

  } catch (error) {
    console.error('❌ Error al obtener estado de validaciones:', error);
    return null;
  }
}

function getRequiredValidators(proceso, tipoElemento, valorRango) {
  try {
    if (EMAIL_ROUTING_CONFIG[proceso] && 
        EMAIL_ROUTING_CONFIG[proceso][tipoElemento] && 
        EMAIL_ROUTING_CONFIG[proceso][tipoElemento][valorRango]) {
      return EMAIL_ROUTING_CONFIG[proceso][tipoElemento][valorRango];
    }
    
    // Configuración por defecto si no se encuentra
    return {
      "Aprobador 1": ["pragestionhumana@pastascomarrico.com"],
      "Aprobador 2": ["pragestionhumana@pastascomarrico.com"],
      "Aprobador 3": ["pragestionhumana@pastascomarrico.com"],
      "Aprobador 4": ["pragestionhumana@pastascomarrico.com"]
    };
  } catch (error) {
    console.error('Error al obtener validadores requeridos:', error);
    return {
      "Aprobador 1": ["pragestionhumana@pastascomarrico.com"],
      "Aprobador 2": ["pragestionhumana@pastascomarrico.com"],
      "Aprobador 3": ["pragestionhumana@pastascomarrico.com"],
      "Aprobador 4": ["pragestionhumana@pastascomarrico.com"]
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE NOTIFICACIONES POR CORREO
// ═══════════════════════════════════════════════════════════════════════════════

function getAllTeamEmails(proceso, tipoElemento, valorRango) {
  try {
    const teamsConfig = getRequiredValidators(proceso, tipoElemento, valorRango);
    const allEmails = [];
    
    for (const teamName in teamsConfig) {
      if (teamsConfig.hasOwnProperty(teamName)) {
        allEmails.push(...teamsConfig[teamName]);
      }
    }
    
    // Eliminar duplicados y retornar
    return [...new Set(allEmails)];
  } catch (error) {
    console.error('Error al obtener todos los correos de equipos:', error);
    return ['pragestionhumana@pastascomarrico.com'];
  }
}

function enviarNotificacionEquipoValidado(requestId, correoValidador, nombreValidador, equipo, estado, observaciones, validationStatus) {
  try {
    // Obtener información completa de la solicitud
    const requestDetails = getRequestDetails(requestId);
    if (!requestDetails || !requestDetails.success) {
      console.error(`❌ No se pudo obtener detalles de la solicitud ${requestId}`);
      return;
    }
    
    const requestData = requestDetails.request;
    
    // Preparar información sobre miembros de cada equipo
    let equiposInfoHTML = '';
    
    for (const teamName in validationStatus.requiredTeams) {
      const teamEmails = validationStatus.requiredTeams[teamName];
      const teamStatus = validationStatus.teamValidationStatus[teamName];
      
      let miembrosLista = '';
      teamEmails.forEach(email => {
        // Verificar si este miembro ya validó
        const validacion = validationStatus.individualValidations.find(v => 
          v.correoValidador === email && v.estado === 'VALIDADA'
        );
        
        const icono = validacion ? '✅' : '⏳';
        const estadoMiembro = validacion ? `Validado (${validacion.validador})` : 'Pendiente';
        
        miembrosLista += `<li>${icono} ${email} - <em>${estadoMiembro}</em></li>`;
      });
      
      const validadorPor = teamStatus.validatedBy ? teamStatus.validatedBy.validador : 'N/A';
      const estadoEquipo = teamStatus.validated ? `✅ Validado por: ${validadorPor}` : '⏳ Pendiente';
      
      equiposInfoHTML += `
      <div style="margin-bottom: 15px; padding: 10px; background: ${teamStatus.validated ? '#e8f5e9' : '#fff3e0'}; border-radius: 5px;">
        <h4 style="margin: 0 0 8px 0; color: ${teamStatus.validated ? '#2e7d32' : '#e65100'};">${teamName}</h4>
        <p style="margin: 0 0 8px 0; font-weight: bold;">${estadoEquipo}</p>
        <p style="margin: 0; font-size: 13px;"><strong>Miembros del equipo:</strong></p>
        <ul style="margin: 5px 0 0 0; padding-left: 20px; font-size: 12px;">
          ${miembrosLista}
        </ul>
      </div>`;
    }
    
    // Preparar resumen de estado de validación
    const totalEquipos = Object.keys(validationStatus.requiredTeams).length;
    const equiposValidados = validationStatus.validatedTeams.length;
    const equiposPendientes = validationStatus.pendingTeams.length;
    
    const subject = `✅ ${equipo} ha validado - Solicitud #${requestId} - ${requestData.nombreElemento}`;
    
    const body = `
<div style="font-family: Arial, sans-serif; max-width: 750px; margin: auto; padding: 20px;
            border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
  
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="color: #2e7d32; margin-bottom: 10px;">✅ Validación de Equipo Registrada</h2>
    <p style="color: #555; font-size: 14px;">Sistema de Baja de Elementos - DORIA</p>
  </div>
  
  <!-- Información de la Dada de Baja -->
  <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ddd;">
    <h3 style="color: #004080; margin-top: 0;">📋 Información de la Dada de Baja</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee; width: 40%;"><strong>ID Solicitud:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>#${requestId}</strong></td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Elemento:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${requestData.nombreElemento}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Tipo:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${requestData.tipoElemento}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Solicitante:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${requestData.nombreSolicitante} (${requestData.correoSolicitante})</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Proceso:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${requestData.proceso}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Es Activo Fijo:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${requestData.esActivoFijo || 'NO'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Valor Rango:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${requestData.valorRango || 'No aplica'}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Motivo de Baja:</strong></td>
        <td style="padding: 8px;">${requestData.motivoBaja || 'No especificado'}</td>
      </tr>
    </table>
  </div>
  
  <!-- Detalles de la Validación Actual -->
  <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 15px 0;">
    <h4 style="margin: 0 0 10px 0; color: #2e7d32;">📝 Detalles de la Validación Registrada</h4>
    <p style="margin: 0;"><strong>Equipo que validó:</strong> ${equipo}</p>
    <p style="margin: 5px 0 0 0;"><strong>Validador:</strong> ${nombreValidador} (${correoValidador})</p>
    <p style="margin: 5px 0 0 0;"><strong>Fecha/Hora:</strong> ${new Date().toLocaleString('es-ES')}</p>
    ${observaciones ? `<p style="margin: 5px 0 0 0;"><strong>Observaciones:</strong> ${observaciones}</p>` : ''}
  </div>
  
  <!-- Estado General de Validación -->
  <div style="display: flex; gap: 20px; margin: 20px 0;">
    <div style="flex: 1; background: #e8f5e9; padding: 15px; border-radius: 5px; text-align: center;">
      <div style="font-size: 24px; font-weight: bold; color: #2e7d32;">${equiposValidados}/${totalEquipos}</div>
      <div style="font-size: 14px; color: #2e7d32;">Equipos Validados</div>
    </div>
    
    <div style="flex: 1; background: #fff3e0; padding: 15px; border-radius: 5px; text-align: center;">
      <div style="font-size: 24px; font-weight: bold; color: #e65100;">${equiposPendientes}/${totalEquipos}</div>
      <div style="font-size: 14px; color: #e65100;">Equipos Pendientes</div>
    </div>
  </div>
  
  <!-- Información Detallada por Equipo -->
  <h3 style="color: #2e7d32; margin: 25px 0 15px 0;">👥 Estado de Validación por Equipo</h3>
  <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
    ${equiposInfoHTML}
    
    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 13px; color: #666;">
      <p style="margin: 0;"><strong>Nota:</strong> Cada equipo requiere que solo UN miembro valide para considerarse aprobado.</p>
      <p style="margin: 5px 0 0 0;">✅ = Ya validado | ⏳ = Pendiente de validación</p>
    </div>
  </div>
  
  <!-- Botón de Acción -->
  <div style="text-align: center; margin-top: 25px;">
    <a href="https://script.google.com/a/macros/pastascomarrico.com/s/AKfycbylr5F3mAB9vDkgbS3ZWPKN1JNOGZEJs5JISeh64La-ABR1eui6ISc4QFOYp7LCV6_Q3g/exec" 
       style="background: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; 
              border-radius: 5px; font-weight: bold; display: inline-block;">
       🔍 Ver Detalles Completos
    </a>
  </div>
  
  <!-- Pie -->
  <p style="margin-top: 25px; color: #555; font-size: 13px; text-align: center;">
    Este correo fue generado automáticamente por el Sistema de Baja de Elementos.<br>
    Por favor no responder a este mensaje.
  </p>
</div>
    `;
    
    // Enviar a todos los miembros de todos los equipos
    const allTeamEmails = [];
    for (const teamName in validationStatus.requiredTeams) {
      allTeamEmails.push(...validationStatus.requiredTeams[teamName]);
    }
    
    // Añadir también los correos de finalización para mantenerlos informados
    const finalizacionEmails = CORREOS_FINALIZACION.split(',');
    const allEmails = [...new Set([...allTeamEmails, ...finalizacionEmails])];
    
    const destinatarios = allEmails.join(',');
    
    enviarCorreoConCopia(destinatarios, subject, body);
    console.log(`✅ Notificación detallada enviada a ${allEmails.length} destinatarios`);
    
  } catch (error) {
    console.error('❌ Error al enviar notificación de equipo detallada:', error);
  }
}


function enviarCorreosValidacion(requestId, requestData) {
  try {
    const allTeamEmails = getAllTeamEmails(
      requestData.procesoSeleccionado, 
      requestData.tipoElemento, 
      requestData.valorRango
    );
    
    const requiredTeams = getRequiredValidators(
      requestData.procesoSeleccionado, 
      requestData.tipoElemento, 
      requestData.valorRango
    );
    
    const destinatarios = allTeamEmails.join(',');
    const subject = `🔔 Solicitud de Aprobación por Equipos: ${requestId} - ${requestData.nombreElemento}`;
    
    let equiposHTML = '';
    for (const teamName in requiredTeams) {
      equiposHTML += `<li><strong>${teamName}</strong>: ${requiredTeams[teamName].join(', ')}</li>`;
    }
    
    const body = `
<div style="font-family: Arial, sans-serif; background-color: #f9fafc; padding: 20px; color: #333;">
  <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 25px;">
    
    <h2 style="margin:0; font-size:20px; color:#004080;">🏢 VALIDACIÓN POR EQUIPOS - COMARRICO</h2>
    <hr style="border:none; border-top:2px solid #004080; margin:15px 0;">
    
    <p style="font-size:15px; color:#444;">Estimados miembros de los equipos aprobadores,</p>
    <p style="font-size:15px; color:#444;">
      Se solicita la <strong>aprobación por equipos</strong> para dar de baja el siguiente elemento.
    </p>

    <table style="width:100%; border-collapse: collapse; font-size:14px; margin:15px 0;">
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>ID de Solicitud:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestId}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Proceso:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData.procesoSeleccionado}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Elemento:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData.nombreElemento}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Tipo:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData.tipoElemento}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Solicitante:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData.nombreSolicitante}</td></tr>
      <tr><td style="padding:6px;"><strong>Motivo de la baja:</strong></td><td style="padding:6px;">${requestData.motivos}</td></tr>
    </table>

    <div style="background:#f1f6fb; border-left:4px solid #004080; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;"><strong>VALIDACIÓN POR EQUIPOS REQUERIDA:</strong></p>
      <ul style="margin:10px 0;">
        ${equiposHTML}
      </ul>
      <p style="margin:10px 0 0 0;"><em>Cada equipo requiere que solo UN miembro valide para considerarse aprobado.</em></p>
    </div>

    <div style="text-align:center; margin:30px 0;">
      <a href="https://tu-sistema.com/validaciones" 
         style="background:#004080; color:#fff; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:14px; display:inline-block;">
         🔎 Revisar Solicitud
      </a>
    </div>

    <p style="font-size:14px; color:#555;">Gracias por su gestión.<br>Saludos cordiales,</p>

    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
    <p style="font-size:12px; color:#888; text-align:center;">
      Sistema de Baja de Elementos - COMARRICO<br>
      Fecha: ${new Date().toLocaleString('es-ES')}
    </p>
  </div>
</div>
`;
    
    enviarCorreoConCopia(destinatarios, subject, body);
    console.log(`✅ Correo de validación por equipos enviado a: ${destinatarios}`);
    
  } catch (error) {
    console.error('Error al enviar correos de validación por equipos:', error);
  }
}

function enviarNotificacionActivoFijo(requestData) {
  try {
    console.log(`📧 Enviando notificación de activo fijo para ID: ${requestData[0]}`);
    
    const subject = `🏢 Nueva solicitud de baja de activo fijo - ID: ${requestData[0]}`;
const body = `
<div style="font-family: Arial, sans-serif; background-color: #f9fafc; padding: 20px; color: #333;">
  <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 25px;">
    
    <!-- Encabezado -->
    <h2 style="margin:0; font-size:20px; color:#004080;">🏢 SISTEMA DE BAJA DE ELEMENTOS - COMARRICO</h2>
    <hr style="border:none; border-top:2px solid #004080; margin:15px 0;">
    
    <!-- Introducción -->
    <h3 style="color:#2c3e50;">📢 Nueva solicitud de Activo Fijo</h3>
    <p style="font-size:15px; color:#444;">
      Se ha registrado una <strong>nueva solicitud</strong> que corresponde a un <b>Activo Fijo</b>. 
      Esta solicitud requiere validación especial por parte del equipo de activos fijos.
    </p>
    
    <!-- Detalle de la solicitud -->
    <h3 style="color:#2c3e50; margin-top:20px;">📋 Detalles de la Solicitud</h3>
    <table style="width:100%; border-collapse: collapse; font-size:14px; margin:15px 0;">
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>ID de Solicitud:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData[0]}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Solicitante:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData[2]}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Correo Solicitante:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData[1]}</td></tr>
      <tr><td style="padding:6px; border-bottom:1px solid #eee;"><strong>Proceso:</strong></td><td style="padding:6px; border-bottom:1px solid #eee;">${requestData[3]}</td></tr>
      <tr><td style="padding:6px;"><strong>Nombre del Elemento:</strong></td><td style="padding:6px;">${requestData[4]}</td></tr>
    </table>
    
    <!-- Mensaje de acción -->
    <div style="background:#f1f6fb; border-left:4px solid #004080; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;">🔍 Esta solicitud requiere validación especial del <strong>equipo de Activos Fijos</strong>.</p>
    </div>

    <!-- Pie -->
    <p style="font-size:14px; color:#555;">Gracias por su gestión.<br>Saludos cordiales,</p>
    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
    <p style="font-size:12px; color:#888; text-align:center;">
      Sistema de Baja de Elementos - COMARRICO<br>
      Fecha: ${new Date().toLocaleString('es-ES')}
    </p>
  </div>
</div>
`;
    
    enviarCorreoConCopia(CORREOS_ACTIVOS_FIJOS, subject, body);
    console.log(`✅ Correo de activo fijo enviado exitosamente`);
    
  } catch (error) {
    console.error(`❌ Error al enviar notificación de activo fijo:`, error);
  }
}

function enviarNotificacionRechazo(requestData, motivo) {
  try {
    const subject = `❌ Solicitud rechazada - ID: ${requestData[0]}`;
    
    const body = `
<div style="font-family: Arial, sans-serif; background-color: #f9fafc; padding: 20px; color: #333;">
  <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 25px;">
    
    <h2 style="margin:0; font-size:20px; color:#b30000;">❌ SOLICITUD RECHAZADA</h2>
    <hr style="border:none; border-top:2px solid #b30000; margin:15px 0;">
    
    <p style="font-size:15px; color:#444;">Estimado/a <strong>${requestData[2]}</strong>,</p>
    <p style="font-size:15px; color:#444;">
      Lamentamos informarle que su solicitud <strong>${requestData[0]}</strong> ha sido <span style="color:#b30000; font-weight:bold;">rechazada</span>.
    </p>

    <table style="width:100%; border-collapse: collapse; font-size:14px; margin:15px 0;">
      <tr>
        <td style="padding:8px; border-bottom:1px solid #eee;"><strong>ID de Solicitud:</strong></td>
        <td style="padding:8px; border-bottom:1px solid #eee;">${requestData[0]}</td>
      </tr>
      <tr>
        <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Solicitante:</strong></td>
        <td style="padding:8px; border-bottom:1px solid #eee;">${requestData[2]}</td>
      </tr>
      <tr>
        <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Elemento:</strong></td>
        <td style="padding:8px; border-bottom:1px solid #eee;">${requestData[4]}</td>
      </tr>
      <tr>
        <td style="padding:8px;"><strong>Motivo del rechazo:</strong></td>
        <td style="padding:8px;">${motivo}</td>
      </tr>
    </table>

    <div style="background:#fff5f5; border-left:4px solid #b30000; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;">
        Si necesita más información o desea apelar esta decisión, por favor contacte al <strong>administrador del sistema</strong>.
      </p>
    </div>

    <p style="font-size:14px; color:#555;">Gracias por su atención.<br>Saludos cordiales,</p>

    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
    <p style="font-size:12px; color:#888; text-align:center;">
      Sistema de Baja de Elementos - COMARRICO<br>
      Fecha: ${new Date().toLocaleString('es-ES')}
    </p>
  </div>
</div>
    `;
    
    enviarCorreoConCopia(requestData[1], subject, body);
    console.log(`✅ Notificación de rechazo enviada`);
  } catch (error) {
    console.error('Error al enviar notificación de rechazo:', error);
  }
}

function enviarCorreoConfirmacionSolicitante(id, requestData, estado, observaciones = '') {
  try {
    console.log(`📧 Enviando confirmación al solicitante - Estado: ${estado}`);
    
    const estadoTexto = {
      'ENVIADA': 'ENVIADA EXITOSAMENTE',
      'VALIDADA': 'VALIDADA',
      'RECHAZADA': 'RECHAZADA'
    };
    
    const estadoIcon = {
      'ENVIADA': '📤',
      'VALIDADA': '✅',
      'RECHAZADA': '❌'
    };
    
    const estadoColor = {
      'ENVIADA': '#004080',
      'VALIDADA': '#008000',
      'RECHAZADA': '#b30000'
    };
    
    const asunto = `${estadoIcon[estado]} Solicitud de Baja ${estadoTexto[estado]} - ID: ${id}`;
    
    let cuerpo = `
<div style="font-family: Arial, sans-serif; background-color: #f9fafc; padding: 20px; color: #333;">
  <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 25px;">

    <h2 style="margin:0; font-size:20px; color:${estadoColor[estado]};">
      ${estadoIcon[estado]} ESTADO DE SU SOLICITUD: ${estadoTexto[estado]}
    </h2>
    <hr style="border:none; border-top:2px solid ${estadoColor[estado]}; margin:15px 0;">

    <table style="width:100%; border-collapse: collapse; font-size:14px; margin:15px 0;">
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>ID de Solicitud:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${id}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Solicitante:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.nombreSolicitante}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Correo:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.correoSolicitante}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Proceso:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.procesoSeleccionado}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Elemento:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.nombreElemento}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Tipo:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.tipoElemento}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Es Activo Fijo:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.esActivoFijo}</td></tr>
      ${requestData.valorRango ? `<tr><td style="padding:8px;"><strong>Rango de Valor:</strong></td><td style="padding:8px;">${requestData.valorRango}</td></tr>` : ''}
    </table>

    <div style="background:#f1f6fb; border-left:4px solid ${estadoColor[estado]}; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;">
        <strong>Motivo de Baja:</strong><br>${requestData.motivos}
      </p>
    </div>
`;

    if (estado === 'ENVIADA') {
      cuerpo += `
    <div style="background:#f9f9f9; border-left:4px solid #004080; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;">
        <strong>📋 Próximos pasos:</strong><br>
        Su solicitud ha sido enviada exitosamente y se encuentra en proceso de revisión.<br>
        Recibirá una notificación cuando sea validada o rechazada por el área correspondiente.
      </p>
    </div>`;
    } else if (estado === 'VALIDADA') {
      cuerpo += `
    <div style="background:#f6fff6; border-left:4px solid #008000; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;">
        🎉 <strong>¡Solicitud aprobada!</strong><br>
        Su solicitud ha sido validada exitosamente.<br>
        ${observaciones ? `<em>📝 Observaciones:</em> ${observaciones}` : ''}
      </p>
    </div>`;
    } else if (estado === 'RECHAZADA') {
      cuerpo += `
    <div style="background:#fff5f5; border-left:4px solid #b30000; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;">
        ⚠️ <strong>Solicitud rechazada</strong><br>
        Su solicitud ha sido rechazada.<br>
        📝 Motivo del rechazo: ${observaciones}<br><br>
        Puede crear una nueva solicitud corrigiendo los aspectos mencionados.
      </p>
    </div>`;
    }

    cuerpo += `
    <p style="font-size:14px; color:#555;">Gracias por su gestión.<br>Saludos cordiales,</p>

    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
    <p style="font-size:12px; color:#888; text-align:center;">
      Sistema de Baja de Elementos - COMARRICO<br>
      Fecha: ${new Date().toLocaleString('es-ES')}
    </p>
  </div>
</div>
    `;
    
    enviarCorreoConCopia(requestData.correoSolicitante, asunto, cuerpo);
    console.log(`✅ Correo de confirmación enviado exitosamente`);
    
  } catch (error) {
    console.error(`❌ Error al enviar correo de confirmación:`, error);
  }
}

function enviarNotificacionFinal(id, requestData) {
  try {
    console.log("📊 Datos en requestData (final):", requestData);
    console.log(`📧 Enviando notificación final para ID: ${id}`);
    
    const destinatarios = CORREOS_FINALIZACION;
    const asunto = `Aprobación Finalizada para Baja de ${requestData.nombreElemento} - ${id} `;
    
    // 👇 Consultar validaciones registradas en la hoja
    const validaciones = getIndividualValidations(id);
    
    const listaAprobadores = validaciones.length > 0
      ? validaciones.map(v => `<li>${v.validador} (${v.correoValidador})</li>`).join("")
      : "<li>No se registraron aprobadores</li>";
    
    const cuerpo = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333;">
      <div style="max-width: 700px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
        
        <!-- Encabezado -->
        <div style="background: #004080; color: white; padding: 15px 25px; text-align: center;">
          <h2 style="margin: 0;">🏢 Sistema de Baja de Elementos - COMARRICO</h2>
        </div>
        
        <!-- Contenido -->
        <div style="padding: 25px;">
          <h3 style="color: #2c3e50; text-align: center;">✅ Solicitud Finalizada</h3>
          
          <p style="font-size: 15px; color: #555;">Buen día,</p>
          <p style="font-size: 15px; color: #555;">
            Se notifica que la solicitud para dar de baja el siguiente elemento ha sido 
            <b>aprobada por completo</b>.  
            Con este correo se autoriza al proceso de <b>Ambiental (Cuarto de Excedentes)</b> a proceder con el descarte según los protocolos establecidos.
          </p>
          
          <h3 style="color: #2c3e50; margin-top: 25px;">📋 Resumen de la Solicitud</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
            <tr><td><b>ID de Solicitud:</b></td><td>${id}</td></tr>
            <tr><td><b>Proceso:</b></td><td>${requestData.procesoSeleccionado}</td></tr>
            <tr><td><b>Equipo/Material:</b></td><td>${requestData.nombreElemento} (${requestData.tipoElemento})</td></tr>
            <tr><td><b>Cantidad a retirar:</b></td><td>${requestData.kiloGalon} Kg/Galones</td></tr>
            <tr><td><b>Motivo de la Baja:</b></td><td>${requestData.motivos}</td></tr>
          </table>
          
          <h3 style="color: #2c3e50; margin-top: 25px;">Registro de aprobación</h3>
          <ul style="font-size: 14px; color: #555; margin-top: 10px; padding-left: 20px;">
            ${listaAprobadores}
          </ul>
          
          <p style="font-size: 15px; color: #555; margin-top: 20px;">Por favor, coordinar la ejecución de este proceso.</p>
          <p style="font-size: 15px; color: #555;">Muchas gracias a todos por su colaboración.</p>
        </div>
        
        <!-- Pie -->
        <div style="background: #f0f2f5; padding: 15px; text-align: center; font-size: 13px; color: #777;">
          ───────────────────────────────────────────────<br>
          Sistema de Baja de Elementos - COMARRICO<br>
          Fecha: ${new Date().toLocaleString('es-ES')}
        </div>
      </div>
    </div>
    `;
    
    enviarCorreoConCopia(destinatarios, asunto, cuerpo);
    console.log(`✅ Notificación final enviada a: ${destinatarios}`);
    
  } catch (error) {
    console.error(`❌ Error al enviar notificación final:`, error);
  }
}

function enviarCorreoConfirmacionValidacion(requestId, correoValidador, nombreValidador, estado, observaciones) {
  const subject = `✔️ Nueva validación en la solicitud #${requestId}`;

  // 🔹 Obtener validaciones actuales
  const validaciones = getIndividualValidations(requestId);

  // 🔹 Generar tabla de validadores
  let tablaValidadores = `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
      <tr style="background: #e8f5e9; color: #2e7d32;">
        <th style="padding: 8px; border: 1px solid #ddd;">Validador</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Correo</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Estado</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Fecha</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Observaciones</th>
      </tr>`;

  validaciones.forEach(v => {
    tablaValidadores += `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.validador}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.correoValidador}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.estado}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.fecha}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.observaciones || ''}</td>
      </tr>`;
  });

  tablaValidadores += `</table>`;

  const body = `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px;
              border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #2e7d32; text-align: center; margin-bottom: 20px;">✔️ Validación registrada</h2>
    <p>El validador <b>${nombreValidador}</b> (<i>${correoValidador}</i>) ha registrado una validación en la solicitud <b>#${requestId}</b>.</p>
    
    <h3 style="color: #2e7d32; margin-top: 20px;">📋 Lista de validaciones realizadas</h3>
    ${tablaValidadores}

    <p style="margin-top: 20px; color: #555;">Puedes consultar el detalle completo en el sistema.</p>
    <p style="margin-top: 20px; color: #555;">Saludos,<br><b>Equipo de Gestión de Solicitudes</b></p>
  </div>
  `;

  MailApp.sendEmail({
    to: correoValidador, // o al solicitante según tu flujo
    subject,
    htmlBody: body
  });
}

function enviarNotificacionPendientes(requestId, correoValidador, nombreValidador, estado, pendientes) {
  const subject = `⏳ Validación pendiente en la solicitud #${requestId}`;

  // 🔹 Obtener validaciones actuales
  const validaciones = getIndividualValidations(requestId);

  // 🔹 Generar tabla de validadores
  let tablaValidadores = `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
      <tr style="background: #fff3e0; color: #e65100;">
        <th style="padding: 8px; border: 1px solid #ddd;">Validador</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Correo</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Estado</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Fecha</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Observaciones</th>
      </tr>`;

  validaciones.forEach(v => {
    tablaValidadores += `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.validador}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.correoValidador}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.estado}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.fecha}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${v.observaciones || ''}</td>
      </tr>`;
  });

  tablaValidadores += `</table>`;

  const body = `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px;
              border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fff8e1;">
    <h2 style="color: #e65100; text-align: center; margin-bottom: 20px;">⏳ Validación pendiente</h2>
    <p>La solicitud <b>#${requestId}</b> fue validada por <b>${nombreValidador}</b> (<i>${correoValidador}</i>).</p>
    <p><b>Estado registrado:</b> ${estado}</p>
    
    <h3 style="color: #e65100; margin-top: 20px;">📋 Lista de validaciones realizadas</h3>
    ${tablaValidadores}

    <p style="margin-top: 20px; color: #555;">Aún estás pendiente de validar esta solicitud.  
    Por favor ingresa al sistema y registra tu validación.</p>

    <p style="margin-top: 20px; color: #555;">Saludos,<br><b>Equipo de Gestión de Solicitudes</b></p>
  </div>
  `;

  pendientes.forEach(email => {
    MailApp.sendEmail({
      to: email,
      subject,
      htmlBody: body
    });
  });
}

function enviarCorreoConCopia(to, subject, body) {
  try {
    MailApp.sendEmail({
      to: to,                 
      cc: CORREOS_COPIA, 
      subject: subject,
      htmlBody: body
    });
    console.log(`📧 Correo enviado a: ${to} con copia a: ${CORREOS_COPIA}`);
  } catch (error) {
    console.error(`❌ Error al enviar correo con copia:`, error);
  }
}

function formatDate(date) {
  if (!date) return '';
  
  if (typeof date === 'string') {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString('es-ES');
    }
    return date;
  }
  
  if (date instanceof Date) {
    return date.toLocaleDateString('es-ES');
  }
  
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('es-ES');
  }
  
  return '';
}

function getPrecioPorTipo(tipo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("VALORES");
  const data = sheet.getRange("B2:E" + sheet.getLastRow()).getValues(); 
  // Columna B = Tipo II, Columna E = Precio

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === tipo) {
      return data[i][3]; // E está en la posición 3 (B=0, C=1, D=2, E=3)
    }
  }
  return null;
}

function getValidatedRequests() {
  try { 
    const ss = getSpreadsheet(); 
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET); 
      
    if (!registrosSheet) { 
      console.log('❌ Hoja REGISTROS_BAJA no encontrada');
      return []; 
    }
    
    const data = registrosSheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      console.log('⚠️ No hay datos en la hoja');
      return [];
    }
    
    const validatedRequests = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const estado = row[13] ? row[13].toString().trim().toUpperCase() : '';

      console.log(`Fila ${i}: ID=${row[0]}, Estado procesado=${estado}`);

      if (estado === 'VALIDADA') {
        // 🔥 SOLUCIÓN: Convertir fechas a string ANTES de enviar
        const fechaSolicitud = row[14] ? new Date(row[14]).toISOString() : '';
        const fechaValidacion = row[15] ? new Date(row[15]).toISOString() : (row[14] ? new Date(row[14]).toISOString() : '');
        
        validatedRequests.push({
          id: row[0],
          correoSolicitante: row[1] || '',
          nombreSolicitante: row[2] || '',
          proceso: row[3] || '',
          nombreElemento: row[4] || '',
          tipoElemento: row[5] || '',
          tipo2: row[6] || '',
          kiloGalon: row[7] || '',
          precioUnitario: row[8] || '',
          calculoPrecio: row[9] || '',
          motivoBaja: row[10] || '',
          esActivoFijo: row[11] || '',
          valorRango: row[12] || '',
          estado: row[13] || '',
          fechaSolicitud: fechaSolicitud, // ✅ Ahora es string
          fechaValidacion: fechaValidacion, // ✅ Ahora es string
          observaciones: row[16] || '',
          validadoPor: row[17] || ''
        });
      }
    }
    
    console.log(`✅ Encontradas ${validatedRequests.length} solicitudes validadas`);
    
    // Ordenar por fecha de validación (más recientes primero)
    validatedRequests.sort((a, b) => {
      const dateA = new Date(a.fechaValidacion);
      const dateB = new Date(b.fechaValidacion);
      return dateB - dateA;
    });
    
    console.log('📤 Enviando datos al frontend...');
    return validatedRequests;
    
  } catch (error) {
    console.error('❌ Error en getValidatedRequests:', error.toString());
    return [];
  }
}

/**
 * Obtiene las validaciones para múltiples solicitudes
 * Optimizado para evitar llamadas individuales
 */
function getMultipleValidations(requestIds) {
  try {
    console.log('🔍 Obteniendo validaciones para requests:', requestIds);
    
    const ss = getSpreadsheet();
    const validacionesSheet = ss.getSheetByName(VALIDACIONES_SHEET);
    
    if (!validacionesSheet) {
      console.log('❌ Hoja de validaciones no encontrada');
      return [];
    }
    
    const data = validacionesSheet.getDataRange().getValues();
    const allValidations = [];
    
    // Buscar validaciones para los requestIds solicitados
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const requestId = row[0];
      
      if (requestIds.includes(requestId)) {
        allValidations.push({
          requestId: requestId,
          correoValidador: row[1] || '',
          validador: row[2] || '',
          estado: row[3] || '',
          fecha: row[4] ? new Date(row[4]).toISOString() : '',
          observaciones: row[5] || ''
        });
      }
    }
    
    console.log(`✅ Encontradas ${allValidations.length} validaciones`);
    return allValidations;
    
  } catch (error) {
    console.error('❌ Error en getMultipleValidations:', error);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES PARA RE-APROBACIÓN AMBIENTAL
// ═══════════════════════════════════════════════════════════════════════════════

const AMBIENTAL_VALIDACIONES_SHEET = 'AMBIENTAL_VALIDACIONES';

function getOrCreateAmbientalValidacionesSheet(ss) {
  let sheet = ss.getSheetByName(AMBIENTAL_VALIDACIONES_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(AMBIENTAL_VALIDACIONES_SHEET);
    sheet.getRange(1, 1, 1, 11).setValues([
      ['ID_SOLICITUD', 'CORREO_SOLICITANTE', 'NOMBRE_SOLICITANTE', 'PROCESO', 
       'NOMBRE_ELEMENTO', 'TIPO_ELEMENTO', 'PRECIO_REAL', 'CANTIDAD_REAL', 
       'OBSERVACIONES', 'FECHA_VALIDACION_AMBIENTAL', 'VALIDADO_POR']
    ]);
    // Formatear encabezados
    sheet.getRange(1, 1, 1, 11).setBackground('#2e7d32').setFontColor('white').setFontWeight('bold');
  }
  return sheet;
}

function submitAmbientalValidation(requestId, precioReal, cantidadReal, proveedor, observaciones, validador) {
  try {
    console.log(`🌱 Validando ambientalmente solicitud ID: ${requestId} por ${validador.nombre}`);
    
    if (!requestId || !validador || !validador.correo) {
      return { success: false, message: 'Datos de validación no válidos' };
    }
    
    if (!precioReal || !cantidadReal) {
      return { success: false, message: 'Precio real y cantidad real son obligatorios' };
    }
    
    const ss = getSpreadsheet();
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET);
    const ambientalSheet = getOrCreateAmbientalValidacionesSheet(ss);
    
    if (!registrosSheet) {
      return { success: false, message: 'La hoja REGISTROS_BAJA no existe' };
    }
    
    const data = registrosSheet.getDataRange().getValues();
    let requestData = null;
    
    // Buscar la solicitud
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === String(requestId).trim()) {
        requestData = {
          id: data[i][0],
          correoSolicitante: data[i][1],
          nombreSolicitante: data[i][2],
          proceso: data[i][3],
          nombreElemento: data[i][4],
          tipoElemento: data[i][5],
          tipo2: data[i][6] || '',
          kiloGalon: data[i][7] || '',
          precioUnitario: data[i][8] || '',
          calculoPrecio: data[i][9] || ''
        };
        break;
      }
    }
    
    if (!requestData) {
      return { success: false, message: 'Solicitud no encontrada' };
    }
    
    // Verificar si ya existe una validación ambiental
    const ambientalData = ambientalSheet.getDataRange().getValues();
    for (let i = 1; i < ambientalData.length; i++) {
      if (String(ambientalData[i][0]).trim() === String(requestId).trim()) {
        return { success: false, message: 'Esta solicitud ya fue validada ambientalmente' };
      }
    }
    
    // Registrar validación ambiental
    ambientalSheet.appendRow([
      requestId,
      requestData.correoSolicitante,
      requestData.nombreSolicitante,
      requestData.proceso,
      requestData.nombreElemento,
      requestData.tipoElemento,
      parseFloat(precioReal),
      parseFloat(cantidadReal),
      proveedor || '',
      observaciones || '',
      new Date(),
      validador.nombre
    ]);
    
    // Enviar notificación
    enviarNotificacionAmbiental(requestData, precioReal, cantidadReal, proveedor, observaciones, validador);
    
    console.log(`✅ Validación ambiental registrada exitosamente para ID: ${requestId}`);
    return { 
      success: true, 
      message: 'Validación ambiental registrada exitosamente',
      requestId: requestId
    };
    
  } catch (error) {
    console.error('❌ Error en submitAmbientalValidation:', error);
    return { success: false, message: 'Error interno: ' + error.message };
  }
}

function enviarNotificacionAmbiental(requestData, precioReal, cantidadReal, proveedor, observaciones, validador) {
  try {
    console.log(`📧 Enviando notificación de validación ambiental para ID: ${requestData.id}`);
    
    const subject = `🌱 Validación Ambiental Completada - ID: ${requestData.id}`;
    
    const body = `
<div style="font-family: Arial, sans-serif; background-color: #f9fafc; padding: 20px; color: #333;">
  <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 25px;">
    
    <h2 style="margin:0; font-size:20px; color:#2e7d32;">🌱 VALIDACIÓN AMBIENTAL COMPLETADA</h2>
    <hr style="border:none; border-top:2px solid #2e7d32; margin:15px 0;">
    
    <p style="font-size:15px; color:#444;">Se ha completado la validación ambiental de la siguiente solicitud:</p>

    <table style="width:100%; border-collapse: collapse; font-size:14px; margin:15px 0;">
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>ID de Solicitud:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.id}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Solicitante:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.nombreSolicitante}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Proceso:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.proceso}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Elemento:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.nombreElemento}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Tipo:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${requestData.tipoElemento}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Precio Real:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">$${parseFloat(precioReal).toLocaleString('es-CO')}</td></tr>
      <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Cantidad Real:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${parseFloat(cantidadReal).toLocaleString('es-CO')}</td></tr>
       <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Proveedor:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${proveedor}</td></tr>
      <tr><td style="padding:8px;"><strong>Validado por:</strong></td><td style="padding:8px;">${validador.nombre} (${validador.correo})</td></tr>
    </table>

    ${observaciones ? `
    <div style="background:#f1f8e9; border-left:4px solid #2e7d32; padding:12px; margin:20px 0; border-radius:5px; font-size:14px;">
      <p style="margin:0;"><strong>Observaciones Ambientales:</strong><br>${observaciones}</p>
    </div>
    ` : ''}

    <p style="font-size:14px; color:#555;">La información ha sido registrada en el sistema de gestión ambiental.</p>

    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
    <p style="font-size:12px; color:#888; text-align:center;">
      Sistema de Baja de Elementos - COMARRICO<br>
      Fecha: ${new Date().toLocaleString('es-ES')}
    </p>
  </div>
</div>
    `;
    
    enviarCorreoConCopia(CORREOS_FINALIZACION, subject, body);
    console.log(`✅ Notificación ambiental enviada exitosamente`);
    
  } catch (error) {
    console.error(`❌ Error al enviar notificación ambiental:`, error);
  }
}

function getAmbientalValidations(requestId) {
    try {
        const ss = getSpreadsheet();
        const ambientalSheet = ss.getSheetByName(AMBIENTAL_VALIDACIONES_SHEET);
        if (!ambientalSheet) return [];

        const data = ambientalSheet.getDataRange().getValues();
        const validations = [];
        const targetId = String(requestId).trim();

        for (let i = 1; i < data.length; i++) {
            const rowId = String(data[i][0]).trim();
            
            if (rowId === targetId) {
                validations.push({
                    requestId: rowId,
                    correoSolicitante: data[i][1] || '',
                    nombreSolicitante: data[i][2] || '',
                    proceso: data[i][3] || '',
                    nombreElemento: data[i][4] || '',
                    tipoElemento: data[i][5] || '',
                    precioReal: data[i][6] || '',
                    cantidadReal: data[i][7] || '',
                    proveedor: data[i][8] || '',
                    observaciones: data[i][9] || '',
                    fecha: data[i][10] ? formatDate(data[i][10]) : '',
                    validadoPor: data[i][11] || ''
                });
            }
        }

        console.log('🌱 Validaciones ambientales encontradas:', validations);
        return validations;
    } catch (error) {
        console.error('Error al obtener validaciones ambientales:', error);
        return [];
    }
}

function getValidatedRequestsWithAmbientalStatus() {
  try { 
    const ss = getSpreadsheet(); 
    const registrosSheet = ss.getSheetByName(REGISTROS_SHEET); 
    const ambientalSheet = getOrCreateAmbientalValidacionesSheet(ss);
      
    if (!registrosSheet) { 
      console.log('❌ Hoja REGISTROS_BAJA no encontrada');
      return []; 
    }
    
    const data = registrosSheet.getDataRange().getValues();
    const ambientalData = ambientalSheet.getDataRange().getValues();
    
    // Crear Set de IDs ya procesados ambientalmente
    const ambientalProcessedIds = new Set();
    for (let i = 1; i < ambientalData.length; i++) {
      ambientalProcessedIds.add(String(ambientalData[i][0]).trim());
    }
    
    const validatedRequests = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const estado = row[13] ? row[13].toString().trim().toUpperCase() : '';

      if (estado === 'VALIDADA') {
        const requestId = String(row[0]).trim();
        const yaProcesado = ambientalProcessedIds.has(requestId);
        
        validatedRequests.push({
          id: row[0],
          correoSolicitante: row[1] || '',
          nombreSolicitante: row[2] || '',
          proceso: row[3] || '',
          nombreElemento: row[4] || '',
          tipoElemento: row[5] || '',
          tipo2: row[6] || '',
          kiloGalon: row[7] || '',
          precioUnitario: row[8] || '',
          calculoPrecio: row[9] || '',
          motivoBaja: row[10] || '',
          esActivoFijo: row[11] || '',
          valorRango: row[12] || '',
          estado: row[13] || '',
          fechaSolicitud: row[14] ? new Date(row[14]).toISOString() : '',
          fechaValidacion: row[15] ? new Date(row[15]).toISOString() : (row[14] ? new Date(row[14]).toISOString() : ''),
          observaciones: row[16] || '',
          validadoPor: row[17] || '',
          yaProcesadoAmbiental: yaProcesado // Nueva propiedad
        });
      }
    }
    
    console.log(`✅ Encontradas ${validatedRequests.length} solicitudes validadas`);
    
    // Ordenar por fecha de validación (más recientes primero)
    validatedRequests.sort((a, b) => {
      const dateA = new Date(a.fechaValidacion);
      const dateB = new Date(b.fechaValidacion);
      return dateB - dateA;
    });
    
    return validatedRequests;
    
  } catch (error) {
    console.error('❌ Error en getValidatedRequestsWithAmbientalStatus:', error.toString());
    return [];
  }
}