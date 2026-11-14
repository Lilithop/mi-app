import { useState } from 'react'
import './App.css'

const preguntas = [
  {
    texto: "Correo con 'Nomina_Noviembre.pdf .exe'. ¿Qué haces?",
    opciones: [
      'Lo abro, es mi nómina',
      'Reviso la extensión real antes de abrir',
      'Lo reenvío a un compañero',
      'Lo renombro y lo abro',
    ],
    correcta: 1,
    explicacion:
      "Windows oculta extensiones por defecto; ese segundo '.exe' es la trampa.",
  },
  {
    texto: "Un ZIP trae 'informe.pdf' en el listado. ¿Qué haces?",
    opciones: [
      'Lo abro, es un PDF',
      'No confío en ZIPs de origen desconocido',
      'Lo abro si el nombre es claro',
      'Lo renombro primero',
    ],
    correcta: 1,
    explicacion:
      'Este es un caso real (CVE-2023-38831): un ZIP puede mostrar un PDF en la lista y ejecutar otra cosa al hacer clic. Se los voy a demostrar en 15 minutos.',
  },
  {
    texto: 'Outlook muestra un link raro en la vista previa del correo. ¿Qué haces?',
    opciones: [
      'Lo abro, es un link normal',
      'Parece raro, lo reporto sin dar clic',
      'Lo abro solo si conozco al remitente',
      'Copio el link al navegador',
    ],
    correcta: 1,
    explicacion:
      'Ni siquiera hace falta dar clic — con que Outlook muestre la vista previa del link malicioso basta (CVE-2024-21413).',
  },
  {
    texto: 'Ves un archivo .lnk con ícono de Word. ¿Qué haces?',
    opciones: [
      'Es un acceso directo normal, lo abro',
      'Reviso propiedades antes de abrir',
      'Confío en el ícono, es Word',
      'Lo ejecuto como administrador',
    ],
    correcta: 1,
    explicacion:
      'El ícono se puede falsificar. La única pista real era la extensión .lnk.',
  },
  {
    texto: 'Un ZIP trae un archivo .library-ms que no reconoces. ¿Qué haces?',
    opciones: [
      'La ignoro y reporto a TI',
      'La abro para saber qué es',
      'La renombro a .txt',
      'La ejecuto en modo seguro',
    ],
    correcta: 0,
    explicacion:
      'Esta no la conocía nadie, y es la más peligrosa: roba credenciales sin que se vea nada ejecutarse (CVE-2025-24054).',
  },
  {
    texto: 'PDF legítimo y firmado de una política interna conocida. ¿Qué haces?',
    opciones: [
      'Lo abro con confianza',
      'Lo reporto por si acaso',
      'Pido verificación igual',
      'No lo abro nunca',
    ],
    correcta: 0,
    explicacion:
      'TRAMPA INVERSA: el punto no era desconfiar, era confiar correctamente. Reportar todo satura a TI y nos resta como primera línea de defensa.',
  },
  {
    texto: "Volante con QR: 'Escanea para ver tu recibo de nómina'. ¿Qué haces?",
    opciones: [
      'Lo escaneo, es de la empresa',
      'Reporto el volante a seguridad',
      'Verifico con RRHH antes de escanear',
      'Lo ignoro',
    ],
    correcta: 1,
    explicacion:
      'Mismo principio fuera de la pantalla: un QR en un volante es el mismo ataque, solo que en papel. (Respuesta C también es válida).',
  },
]

const letras = ['A', 'B', 'C', 'D']

function mensajeFinal(aciertos, total) {
  const r = aciertos / total
  if (r === 1) return 'Puntaje perfecto. Ya piensas como un defensor.'
  if (r >= 0.67) return 'Muy bien, dominas lo esencial.'
  if (r >= 0.34) return 'Vas por buen camino. Repasa las explicaciones.'
  return 'Buen comienzo. Las explicaciones de abajo te ayudan a repasar.'
}

export default function App() {
  const [pantalla, setPantalla] = useState('bienvenida')
  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState([])

  const pregunta = preguntas[indice]
  const elegida = respuestas[indice]
  const aciertos = respuestas.filter((r, i) => r === preguntas[i].correcta).length

  const elegir = (i) => {
    const nuevas = [...respuestas]
    nuevas[indice] = i
    setRespuestas(nuevas)
  }

  const siguiente = () => {
    if (indice < preguntas.length - 1) setIndice(indice + 1)
    else setPantalla('resultado')
  }

  const reiniciar = () => {
    setRespuestas([])
    setIndice(0)
    setPantalla('bienvenida')
  }

  if (pantalla === 'bienvenida') {
    return (
      <main className="fondo">
        <section className="tarjeta centro">
          <span className="etiqueta">Seguridad en internet</span>
          <h1>¿Abrirías este archivo?</h1>
          
          <button className="boton" onClick={() => setPantalla('cuestionario')}>
            Empezar
          </button>
        </section>
      </main>
    )
  }

  if (pantalla === 'resultado') {
    return (
      <main className="fondo">
        <section className="tarjeta ancha">
          <div className="centro">
            <span className="etiqueta">Resultado</span>
            <h1 className="puntaje">
              {aciertos}
              <span>/{preguntas.length}</span>
            </h1>
            <p className="sub">{mensajeFinal(aciertos, preguntas.length)}</p>
          </div>

          <ol className="revision">
            {preguntas.map((p, i) => {
              const acerto = respuestas[i] === p.correcta
              return (
                <li key={i} className={acerto ? 'item bien' : 'item mal'}>
                  <div className="item-titulo">
                    <span className="marca">{acerto ? '✓' : '✗'}</span>
                    <strong>{p.texto}</strong>
                  </div>
                  {!acerto && (
                    <p className="tuya">
                      Tu respuesta: {p.opciones[respuestas[i]]}
                    </p>
                  )}
                  <p className="correcta">
                    Respuesta correcta: {p.opciones[p.correcta]}
                  </p>
                  <p className="explicacion">{p.explicacion}</p>
                </li>
              )
            })}
          </ol>

          <div className="centro">
            <button className="boton" onClick={reiniciar}>
              Volver a intentarlo
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="fondo">
      <section className="tarjeta">
        <div className="cabecera">
          <span className="contador">
            Pregunta {indice + 1} de {preguntas.length}
          </span>
          <div className="progreso">
            <div style={{ width: `${((indice + 1) / preguntas.length) * 100}%` }} />
          </div>
        </div>

        <h2>{pregunta.texto}</h2>

        <div className="opciones">
          {pregunta.opciones.map((op, i) => (
            <button
              key={i}
              className={elegida === i ? 'opcion activa' : 'opcion'}
              onClick={() => elegir(i)}
            >
              <span className="letra">{letras[i]}</span>
              {op}
            </button>
          ))}
        </div>

        <div className="pie">
          <button
            className="atras"
            onClick={() => setIndice(indice - 1)}
            disabled={indice === 0}
          >
            Atrás
          </button>
          <button className="boton" onClick={siguiente} disabled={elegida === undefined}>
            {indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
          </button>
        </div>
      </section>
    </main>
  )
}