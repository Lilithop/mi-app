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
      'Es un señuelo (un archivo, enlace o clave falsa) que ningún usuario legítimo tiene motivo para tocar. Si alguien lo abre o lo usa, recibes una alerta.',
  },
  {
    texto: 'Alguien abre un documento que tiene un canary token. ¿Qué pasa?',
    opciones: [
      'Se bloquea el computador de esa persona',
      'No pasa nada visible',
      'Se borra el documento',
      'Te llega una alerta con datos como la hora y la IP',
    ],
    correcta: 3,
    explicacion:
      'El documento avisa en silencio: normalmente recibes un correo o un webhook con la hora, la IP y otros detalles de quien lo abrió.',
  },
  {
    texto: '¿Un canary token impide que alguien entre a tus sistemas?',
    opciones: [
      'No, detecta pero no previene',
      'Sí, bloquea a cualquier intruso',
      'Solo si es de pago',
      'Sí, pero solo en redes privadas',
    ],
    correcta: 0,
    explicacion:
      'Su trabajo es avisarte de que alguien está husmeando donde no debería. Es un complemento de otras medidas de seguridad, no un reemplazo.',
  },
  {
    texto: 'Pones una clave de acceso falsa (como una de AWS) como canary token. ¿Cuándo salta la alerta?',
    opciones: [
      'Cuando alguien ve el archivo donde está',
      'Cada vez que reinicias el servidor',
      'Cuando alguien intenta usarla',
      'Cuando la clave expira',
    ],
    correcta: 2,
    explicacion:
      'Solo mirar la clave no avisa de nada: la alerta salta cuando alguien intenta usarla. Por eso sirve para descubrir que un intruso encontró y probó credenciales robadas.',
  },
  {
    texto: '¿Cuál de estas situaciones puede disparar un falso positivo en un canary token?',
    opciones: [
      'Que cambies tu contraseña',
      'Que reinicies el computador',
      'Que un escáner de correo o un antivirus abra el enlace o archivo',
      'Que el sol caliente el servidor',
    ],
    correcta: 2,
    explicacion:
      'Algunos escáneres automáticos abren enlaces y archivos para revisarlos, y eso puede activar el token. Por eso conviene mirar los detalles de cada alerta antes de asumir que hay un intruso.',
  },
  {
    texto: '¿Cuál es una señal típica de un correo de phishing?',
    opciones: [
      'Te apura a hacer clic y a poner tu contraseña',
      'Tiene una firma al final',
      'Viene de un contacto y no trae enlaces',
      'Está escrito en tu idioma',
    ],
    correcta: 0,
    explicacion:
      'El phishing suele crear urgencia ("tu cuenta será cerrada") y llevarte a una página falsa para robar tus datos. Ante la duda, entra al sitio escribiendo tú mismo la dirección, sin usar el enlace del mensaje.',
  },
  {
    texto: '¿Para qué sirve activar la verificación en dos pasos?',
    opciones: [
      'Para que la página cargue más rápido',
      'Para no tener que recordar tu contraseña',
      'Para recibir menos correos',
      'Para que, aunque roben tu contraseña, haga falta un segundo paso para entrar',
    ],
    correcta: 3,
    explicacion:
      'Con ella, la contraseña sola ya no basta. Las apps de autenticación y las llaves de seguridad son más seguras que los códigos por SMS.',
  },
  {
    texto: '¿Cuál es la mejor práctica con las contraseñas?',
    opciones: [
      'Usar la misma, fácil de recordar',
      'Cambiarla cada semana por una parecida',
      'Anotarla en un archivo llamado contraseñas.txt',
      'Una larga y única por cuenta, guardada en un gestor de contraseñas',
    ],
    correcta: 3,
    explicacion:
      'Si reutilizas una contraseña y una web la filtra, los atacantes la prueban en tus otras cuentas. Un gestor genera y recuerda claves largas y distintas por ti.',
  },
  {
    texto: 'Subiste por accidente una clave de API a un repositorio público. ¿Qué haces primero?',
    opciones: [
      'Borrar el archivo y listo',
      'Esperar a ver si alguien la usa',
      'Revocarla de inmediato y crear una nueva',
      'Hacer el repositorio privado y no hacer nada más',
    ],
    correcta: 2,
    explicacion:
      'Aunque borres el archivo, la clave sigue en el historial de Git, y hay bots que rastrean repos públicos en minutos. Hay que tratarla como filtrada: revócala y genera otra.',
  },
  {
    texto: 'Un sitio muestra el candado de HTTPS. ¿Qué significa?',
    opciones: [
      'La conexión viaja cifrada, pero el sitio igual podría ser falso',
      'El sitio es 100% confiable',
      'Nadie puede espiar tu dispositivo',
      'El sitio no tiene anuncios',
    ],
    correcta: 0,
    explicacion:
      'HTTPS protege los datos en el camino entre tu navegador y el sitio, pero no garantiza que el sitio sea honesto: las páginas de phishing también pueden tener candado. Revisa siempre la dirección.',
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
          <h1>Canary tokens y más</h1>
          
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