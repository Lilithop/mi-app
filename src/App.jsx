import { useState } from 'react'
import './App.css'

const preguntas = [
  {
    texto: '¿Qué es un canary token?',
    opciones: [
      'Un antivirus que bloquea malware',
      'Una trampa digital que te avisa cuando alguien la toca',
      'Una contraseña muy larga y segura',
      'Un tipo de firewall',
    ],
    correcta: 1,
    explicacion:
      'Es un señuelo (un archivo, enlace o clave falsa) que no tiene uso legítimo. Si alguien lo abre o lo usa, recibes una alerta.',
  },
  {
    texto: 'Alguien abre un documento con un canary token. ¿Qué pasa?',
    opciones: [
      'Se bloquea el computador del atacante',
      'No pasa nada visible',
      'Se borra el documento',
      'Te llega una alerta con datos como la hora y la IP',
    ],
    correcta: 3,
    explicacion:
      'El documento avisa en silencio: normalmente recibes un correo o webhook con la hora, la IP y otros detalles de quien lo abrió.',
  },
  {
    texto: '¿Dónde se puede colocar un canary token?',
    opciones: [
      'Solo en documentos de Word',
      'Solo en páginas web',
      'En documentos, enlaces, claves falsas, registros DNS y más',
      'Solo en servidores Linux',
    ],
    correcta: 2,
    explicacion:
      'Hay muchos tipos: documentos, URLs, claves de acceso falsas (como las de AWS), registros DNS, carpetas y otros.',
  },
  {
    texto: '¿Un canary token impide que alguien entre a tus sistemas?',
    opciones: [
      'Sí, bloquea cualquier intruso',
      'Solo si es de pago',
      'Sí, pero solo en redes privadas',
      'No, detecta; no previene',
    ],
    correcta: 3,
    explicacion:
      'Su trabajo es avisarte de que alguien está husmeando donde no debería. Es un complemento de otras medidas de seguridad, no un reemplazo.',
  },
  {
    texto: '¿Qué hace que un canary token sea un buen señuelo?',
    opciones: [
      'Que tenga un nombre llamativo, como "claves-backup"',
      'Que esté escondido donde nadie pueda encontrarlo',
      'Que se use todos los días en el trabajo',
      'Que tenga un nombre aburrido y genérico',
    ],
    correcta: 0,
    explicacion:
      'Tiene que parecer valioso y estar donde un intruso buscaría. Como nadie legítimo lo usa, cualquier toque es sospechoso.',
  },
  {
    texto: '¿Cuál de estas situaciones puede disparar un falso positivo?',
    opciones: [
      'Que el sol caliente el servidor',
      'Que un escáner de correo o antivirus abra el enlace o archivo',
      'Que cambies tu contraseña',
      'Que reinicies el computador',
    ],
    correcta: 1,
    explicacion:
      'Algunos escáneres automáticos abren enlaces y archivos para revisarlos, y eso puede activar el token. Por eso conviene revisar los detalles de cada alerta.',
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
          <span className="etiqueta">Ciberseguridad</span>
          <h1>Canary tokens</h1>
          <p className="sub">
            Pequeñas trampas digitales que te avisan cuando alguien husmea donde
            no debe. ¿Cuánto sabes de ellas?
          </p>
          <p className="detalle">{preguntas.length} preguntas · 2 minutos</p>
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