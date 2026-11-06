const Preguntas = [
    { IdPregunta: 1, Descripcion: "¿Qué significa EC2?" },
    { IdPregunta: 2, Descripcion: "¿Qué es AWS Lambda?" },
    { IdPregunta: 3, Descripcion: "¿Cuál es la diferencia entre RDS y DynamoDB?" },
    { IdPregunta: 4, Descripcion: "¿Para qué sirve el servicio de Amazon Kinesis?" },
    { IdPregunta: 5, Descripcion: "¿Qué significa S3?" },
    { IdPregunta: 6, Descripcion: "¿Qué servicio permite convertir texto a voz?" },
    { IdPregunta: 7, Descripcion: "¿Qué servicio de AWS permite crear bases de datos relacionales administradas?" },
    { IdPregunta: 8, Descripcion: "¿Qué servicio permite analizar vulnerabilidades en cargas de trabajo?" },
    { IdPregunta: 9, Descripcion: "¿Qué servicio permite desarrollar aplicaciones de IA generativa mediante modelos fundacionales?" },
    { IdPregunta: 10, Descripcion: "¿Qué servicio sirve para administrar usuarios, roles y permisos?" },
    { IdPregunta: 11, Descripcion: "¿Qué es la nube?" },
    { IdPregunta: 12, Descripcion: "¿Qué es una región?" },
    { IdPregunta: 13, Descripcion: "¿Porque se llama AWS Route 53?" },
    { IdPregunta: 14, Descripcion: "¿Qué es el modelo de responsabilidad compartida?" },
    { IdPregunta: 15, Descripcion: "¿Qué es una zona de disponibilidad?" },
    { IdPregunta: 16, Descripcion: "¿Qué es el servicio Amazon CloudFront?" },
    { IdPregunta: 17, Descripcion: "¿Qué significa las siglas AWS?" },
];

const Respuestas = [
    { IdResp: 1, IdPregunta: 1, Descripcion: "Elastic Compute Cloud", Correcta: true },
    { IdResp: 2, IdPregunta: 1, Descripcion: "Extended Compute Cloud", Correcta: false },
    { IdResp: 3, IdPregunta: 1, Descripcion: "Expansive Compute Cloud", Correcta: false },
    { IdResp: 4, IdPregunta: 1, Descripcion: "Electronic Compute Cloud", Correcta: false },

    { IdResp: 5, IdPregunta: 2, Descripcion: "Servicio sin servidor que ejecuta código con eventos y pago por hora", Correcta: false },
    { IdResp: 6, IdPregunta: 2, Descripcion: "Servicio sin servidor para ejecutar código que exige reservar la VM", Correcta: false },
    { IdResp: 7, IdPregunta: 2, Descripcion: "Servicio sin servidor que ejecuta código con eventos y sin gestión", Correcta: true },
    { IdResp: 8, IdPregunta: 2, Descripcion: "Base de datos NoSQL gestionada para consultas de alta velocidad", Correcta: false },

    { IdResp: 9, IdPregunta: 3, Descripcion: "RDS es una base de datos relacional, mientras que DynamoDB es una base de datos NoSQL", Correcta: true },
    { IdResp: 10, IdPregunta: 3, Descripcion: "RDS es una base de datos NoSQL, mientras que DynamoDB es una base de datos relacional", Correcta: false },
    { IdResp: 11, IdPregunta: 3, Descripcion: "RDS y DynamoDB son ambos servicios de base de datos relacionales", Correcta: false },
    { IdResp: 12, IdPregunta: 3, Descripcion: "RDS y DynamoDB son ambos servicios de base de datos NoSQL", Correcta: false },

    { IdResp: 13, IdPregunta: 4, Descripcion: "Procesa y analiza datos en tiempo real pero solo para archivos PDF", Correcta: false },
    { IdResp: 14, IdPregunta: 4, Descripcion: "Procesa y analiza datos en tiempo real con previa reserva de discos.", Correcta: false },
    { IdResp: 15, IdPregunta: 4, Descripcion: "Ejecuta procesos por lotes de archivos pesados en reposos.", Correcta: false },
    { IdResp: 16, IdPregunta: 4, Descripcion: "Procesa y analiza datos en tiempo real a gran escala", Correcta: true },

    { IdResp: 17, IdPregunta: 5, Descripcion: "Simple Storage Software", Correcta: false },
    { IdResp: 18, IdPregunta: 5, Descripcion: "Service Software Storage", Correcta: false },
    { IdResp: 19, IdPregunta: 5, Descripcion: "Scalable Storage Service", Correcta: false },
    { IdResp: 20, IdPregunta: 5, Descripcion: "Simple Storage Service ", Correcta: true },

    { IdResp: 21, IdPregunta: 6, Descripcion: "AWS Speech Synthesis", Correcta: false },
    { IdResp: 22, IdPregunta: 6, Descripcion: "Amazon Lex", Correcta: false },
    { IdResp: 23, IdPregunta: 6, Descripcion: "Amazon Polly", Correcta: true },
    { IdResp: 24, IdPregunta: 6, Descripcion: "Amazon Audio Engine ", Correcta: false },

    { IdResp: 25, IdPregunta: 7, Descripcion: "Amazon RDS", Correcta: true },
    { IdResp: 26, IdPregunta: 7, Descripcion: "Amazon DynamoDB", Correcta: false },
    { IdResp: 27, IdPregunta: 7, Descripcion: "Amazon Redshift", Correcta: false },
    { IdResp: 28, IdPregunta: 7, Descripcion: "AmazonElastiCache", Correcta: false },

    { IdResp: 29, IdPregunta: 8, Descripcion: "Amazon Macie", Correcta: false },
    { IdResp: 30, IdPregunta: 8, Descripcion: "Amazon GuardDuty", Correcta: false },
    { IdResp: 31, IdPregunta: 8, Descripcion: "Amazon Inspector", Correcta: true },
    { IdResp: 32, IdPregunta: 8, Descripcion: "Amazon Security Hub", Correcta: false },

    { IdResp: 33, IdPregunta: 9, Descripcion: "Amazon SageMaker", Correcta: false },
    { IdResp: 34, IdPregunta: 9, Descripcion: "Amazon Bedrock", Correcta: true },
    { IdResp: 35, IdPregunta: 9, Descripcion: "Amazon Comprehend", Correcta: false },
    { IdResp: 36, IdPregunta: 9, Descripcion: "Amazon Lex", Correcta: false },

    { IdResp: 37, IdPregunta: 10, Descripcion: "AWS laM", Correcta: false },
    { IdResp: 38, IdPregunta: 10, Descripcion: "AWS TeamDev", Correcta: false },
    { IdResp: 39, IdPregunta: 10, Descripcion: "AWS IAN", Correcta: false },
    { IdResp: 40, IdPregunta: 10, Descripcion: "AWS IAM", Correcta: true },

    { IdResp: 41, IdPregunta: 11, Descripcion: "Entrega de recursos de TI bajo demanda por Internet con pago por uso", Correcta: true },
    { IdResp: 42, IdPregunta: 11, Descripcion: "Entrega de recursos de TI bajo demanda por Internet con pago fijo mensual", Correcta: false },
    { IdResp: 43, IdPregunta: 11, Descripcion: "Servidores locales alojados en un centro de datos físico propio", Correcta: false },
    { IdResp: 44, IdPregunta: 11, Descripcion: "Entrega de recursos de TI con previa reserva por Internet y pago por uso", Correcta: false },

    { IdResp: 45, IdPregunta: 12, Descripcion: "Ubicación lógica para aislar usuarios y permisos globales", Correcta: false },
    { IdResp: 46, IdPregunta: 12, Descripcion: "Un centro de datos físico individual dentro de una ciudad", Correcta: false },
    { IdResp: 47, IdPregunta: 12, Descripcion: "Ubicación física global con múltiples zonas de disponibilidad", Correcta: true },
    { IdResp: 48, IdPregunta: 12, Descripcion: "Antena de Internet que conecta AWS a tu router", Correcta: false },

    { IdResp: 49, IdPregunta: 13, Descripcion: "Fue creado después de 53 horas por desarrolladores de AWS", Correcta: false },
    { IdResp: 50, IdPregunta: 13, Descripcion: "Hace referencia a las 53 ubicaciones de servidores originales de AWS", Correcta: false },
    { IdResp: 51, IdPregunta: 13, Descripcion: "Hace referencia por tener 53 rutas de red de alta velocidad", Correcta: false },
    { IdResp: 52, IdPregunta: 13, Descripcion: "Hace referencia al puerto 53 que utiliza el protocolo DNS", Correcta: true },

    { IdResp: 53, IdPregunta: 14, Descripcion: "El usuario de Internet es responsable de la seguridad de AWS", Correcta: false },
    { IdResp: 54, IdPregunta: 14, Descripcion: "AWS asegura la infraestructura y el cliente asegura sus dato", Correcta: true },
    { IdResp: 55, IdPregunta: 14, Descripcion: "El cliente asegura la infraestructura y AWS asegura los datos", Correcta: false },
    { IdResp: 56, IdPregunta: 14, Descripcion: "AWS asume por completo la seguridad de datos y configuraciones", Correcta: false },

    { IdResp: 57, IdPregunta: 15, Descripcion: "Centros de datos aislados con redundancia en una región", Correcta: true },
    { IdResp: 58, IdPregunta: 15, Descripcion: "Una región geográfica completa compuesta por servidores", Correcta: false },
    { IdResp: 59, IdPregunta: 15, Descripcion: "Servidores aislados globalmente para procesar peticiones", Correcta: false },
    { IdResp: 60, IdPregunta: 15, Descripcion: "Antena de señal móvil que amplifica el Internet local", Correcta: false },

    { IdResp: 61, IdPregunta: 16, Descripcion: "Antena física de satélite para enviar datos al espacio", Correcta: false },
    { IdResp: 62, IdPregunta: 16, Descripcion: "Red VPN privada para conectar servidores locales a AWS", Correcta: false },
    { IdResp: 63, IdPregunta: 16, Descripcion: "Red CDN global para entregar contenido con baja latencia", Correcta: true },
    { IdResp: 64, IdPregunta: 16, Descripcion: "Servidor DNS global para gestionar nombres de dominio", Correcta: false },

    { IdResp: 65, IdPregunta: 17, Descripcion: "AWS Web Software", Correcta: false },
    { IdResp: 66, IdPregunta: 17, Descripcion: "AWS Web Systems", Correcta: false },
    { IdResp: 67, IdPregunta: 17, Descripcion: "Amazon Web Servers", Correcta: false },
    { IdResp: 68, IdPregunta: 17, Descripcion: "Amazon Web Services", Correcta: true },
];
