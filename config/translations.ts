export const translations = {
  es_MX: {
    // Navbar
    userNamePlaceholder: 'Jane Doe',
    loginNavButton: 'Iniciar Sesión / Registrarse',
    logoutButton: 'Cerrar Sesión',
    config: 'Configuración',
    plans: 'Planes',

    // Auth Modal
    loginTitle: 'Iniciar Sesión',
    signupTitle: 'Crear Cuenta',
    loginSubtitle: 'Para guardar y ver tu historial de creaciones.',
    signupSubtitle: 'Crea una cuenta para empezar a guardar tu trabajo.',
    emailLabel: 'Correo Electrónico',
    passwordLabel: 'Contraseña',
    loginButton: 'Iniciar Sesión',
    signupButton: 'Crear Cuenta',
    noAccountPrompt: '¿No tienes una cuenta?',
    hasAccountPrompt: '¿Ya tienes una cuenta?',
    signupLink: 'Regístrate',
    loginLink: 'Inicia Sesión',

    // Controls Panel (App.tsx and components)
    uploadTitle: '1. Sube la Foto de tu Habitación',
    uploadCta: 'Haz clic para subir o arrastra y suelta',
    uploadFormats: 'PNG, JPG, o WEBP',
    styleTitle: '2. Elige un Estilo',
    aspectRatioTitle: '3. Selecciona la Relación de Aspecto',
    instructionsTitle: '4. Añade Instrucciones (Opcional)',
    instructionsPlaceholder: 'ej., añade una planta grande en la esquina, cambia el color de la pared a azul claro...',
    generateButton: 'Generar Decoración',
    generatingButton: 'Generando...',

    // Result Display
    generatingTitle: 'Generando tu nueva habitación...',
    generatingSubtitle: 'Esto puede tomar un momento. Por favor, espera.',
    loadingMessage1: 'Dando vida a tus ideas...',
    loadingMessage2: 'Ajustando los últimos detalles...',
    loadingMessage3: 'La creatividad está en proceso...',
    loadingMessage4: 'Casi listo, ¡un momento más!',
    errorTitle: 'Ocurrió un Error',
    masterpieceTitle: 'Tu obra maestra te espera',
    masterpieceSubtitle: 'La imagen generada aparecerá aquí.',

    // History Panel
    historyTitle: 'Historial de Generaciones',
    clearHistory: 'Limpiar historial',
    historyPlaceholder: 'Tu historial de generaciones aparecerá aquí.',
    historyLoginPrompt: 'Inicia sesión para ver y guardar tu historial.',

    // Aspect Ratios (constants.ts)
    aspectRatioSquare: 'Cuadrado (1:1)',
    aspectRatioLandscape: 'Paisaje (16:9)',
    aspectRatioPortrait: 'Retrato (9:16)',
    aspectRatioStandard: 'Estándar (4:3)',
    aspectRatioClassic: 'Clásico (3:4)',

    // Alerts and Errors (App.tsx, geminiService.ts)
    errorUpload: 'Por favor, sube una imagen para empezar.',
    confirmClearHistory: '¿Estás seguro de que quieres borrar todo tu historial de generaciones? Esta acción no se puede deshacer.',
    errorStyleNotFound: (styleName: string) => `Estilo "${styleName}" no encontrado en la configuración.`,
    errorNoImage: 'La IA no devolvió una imagen. Por favor, inténtalo de nuevo.',
    errorFailedGeneration: 'No se pudo generar la imagen. Por favor, revisa tu clave de API e inténtalo de nuevo.',
    errorAuthDefault: 'Ocurrió un error de autenticación. Por favor, revisa tus datos e inténtalo de nuevo.',
    errorHistoryLoad: 'No se pudo cargar el historial.',
    errorHistoryClear: 'No se pudo limpiar el historial.',
  }
};