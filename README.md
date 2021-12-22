# Crowfender

![image](https://user-images.githubusercontent.com/82378764/147085559-e324ec88-fc48-42a9-b6c9-bdc9c6dd8f1a.png)

# Grupo08: Juegos Bandada

https://miggon23.github.io/Crowfender/
https://www.pivotaltracker.com/n/projects/2532819

# GDD
# Crowfender

Nombre de los autores o la empresa: Daniel Martín Gómez, Miguel González Pérez, Javier Callejo Herrero, Ignacio Ligero Martín
Sitio web o correo electrónico de contacto: damart24@ucm.es, miggon23@ucm.es, iligero@ucm.es, jacall02@ucm.es 

Resumen: Pájaros intentan entrar en una casa que tienes que defender.
Géneros: Survival suspense.
Modos: Por oleadas.
Público objetivo:
Edad: adolescentes y/o fans de hitchcock de Europa y Estados Unidos
Plataformas: Navegador Web

## DESCRIPCIÓN
Crowfender es un juego de supervivencia y suspense con vista 2.5D (vista estilo battletoads). El jugador tendrá que bloquear la entrada de los pájaros usando madera, además de echar a los pájaros que hayan conseguido entrar golpeándolos con la escoba, antes de que consigan invadir el centro. Nuestro protagonista tendrá que aguantar 5 horas en combate con los pájaros antes de que se marchen al amanecer. Lo que dura una hora en Crowfender depende del nivel de dificultad.

## ASPECTOS GENERALES
Crowfender trata de transmitir al jugador la angustia de una invasión voladora, al igual que en la película Los pájaros de Alfred Hitchcock. El juego se ambienta en una casa abandonada, a la que llega un explorador a pasar la noche tras una fuerte tormenta. Tras amainar la tormenta, bandadas de pájaros intentarán invadir la casa para acabar con el jugador. Después de pedir ayuda, el jugador deberá atrincherarse en la casa hasta que vengan a rescatarle, usando los recursos que encuentre en su estancia para defenderse.
![Vista general](https://user-images.githubusercontent.com/82326243/135584810-907936a6-6e13-4018-ac55-7e4c1632aaf7.png)

* Lo que se ve es la vista de la cámara, y una sola sala. El nivel completo será  más grande con diversas salas. 

* La persona en el medio de la sala es el avatar del usuario.

* Los pájaros que se ven son los enemigos del juego.

* A través de la puerta se cambia de sala.

* A través de la ventana entran los pájaros y se les expulsa dándoles un golpe con la escoba.

## Diagrama UML
![diagrama](https://user-images.githubusercontent.com/82326243/146690051-46b7b35d-8232-4270-b3be-6920af568b2d.png)




## A QUÉ SE JUEGA
Al estilo "Five Night's At Freddy's" (FNAF), el jugador tendrá que ir de habitación en habitación, tapiando puertas y ventanas, encendiendo la chimenea... para evitar que los pájaros entren a la casa, además de ir espantando a los pájaros que hayan logrado entrar, para que no invadan la habitación central. El jugador se encontrará con varias oleadas de pájaros, así como con distintas herramientas y formas de espantar a las insistentes aves. Al contrario que en FNAF, el jugador podrá desplazarse libremente por las habitaciones en escenarios de 2.5D.

## RELATO BREVE
El jugador se encuentra en la sala central, el jugador decide encargarse primero de los pájaros de la izquierda, por tanto va a buscar madera para tapiar la puerta de la derecha y encender la hoguera, consiguiendo evitar que entren los pájaros por arriba. Con esto consigue retener a los pájaros el tiempo suficiente para ir a espantar todos los pájaros de la izquierda. Mientras esto sucede, una alerta sonora (por ejemplo, el crujir de la puerta tapiada o el apagarse la hoguera) alertan al jugador de que el bloqueo que había puesto anteriormente ha terminado. Una segunda alerta, esta vez una campana, avisa de que los pájaros están entrando por el resto de habitaciones, sin bloqueo ya. Esto obliga al jugador a moverse constantemente entre habitaciones y a gestionar el tiempo que emplea en disuadir cada flanco atacado por los pájaros, creando así una sensación de tensión constante.

## JUGABILIDAD

### MECÁNICAS
Las mecánicas de Crowfender requieren interacción con el escenario mediante gestión de recursos, desplazamiento por el escenario por parte del jugador y ataque a los pájaros con el fin de ahuyentarlos, todo eso detallado en su correspondiente apartado de mecánicas. 

#### Mecánicas de jugador
Movimiento: Movimiento uniforme no acelerado, en 8 direcciones.
Ataque: Cuenta con una escoba que espanta a los pájaros (haciéndolos retroceder una sala) y les quita 1 punto de vida (matándolos si estos se quedan  sin vida). Golpea en el eje x a una distancia dos veces el ancho del jugador en la dirección en la que esté mirando. En el momento en el que el pájaro emprenda el vuelo (para cambiar de sala) no podrá ser golpeado ya que el jugador no puede golpear hacia arriba.
  
Vida: No tiene vida, pues los enemigos no le atacan directamente. En cambio, el jugador pierde cuando la sala central supera el límite de pájaros. Se detalla en dinámica: perder. 

Bloqueo: El jugador puede coger madera en el sótano con la que podrá bloquear ventanas, puertas o prender la chimenea. Sólo puede llevar una unidad de madera cada vez, y tendrá que gastarla para recoger más. 

#### Recursos
-Madera: La madera se consigue al visitar la habitación del sótano. Ésta se puede invertir en encender la hoguera o tapiar una ventana o puerta. La madera no es acumulable, solo se puede llevar una unidad de madera al mismo tiempo, y es ésta la cantidad que se invierte cuando se gasta, por lo que el jugador tendrá que visitar el sótano, tantas veces el sótano como acciones con madera quiera realizar.

#### Mecánicas de escenario
Esquema de la zona de juego
![Esquema Zona de Juego](https://user-images.githubusercontent.com/82326243/134644498-b26d2520-5295-4dc0-b4a1-fd46a808252d.png)
Los post-it en azul representan las zonas de spawn de los pájaros. Son zonas visibles para el jugador pero no accesibles para él.

- SPAWN: Punto de congregación de los pájaros que sirve para alertar al jugador del número potencial de pájaros que pueden entrar en la casa en un determinado momento. Los spawns son zonas no accesibles para el jugador, pero sí visibles e interactuables (mediante el uso de la electricidad en este último caso). 

Cada spawn tiene un límite fijo de pájaros que puede generar, y son 6. Para poder generar un pájaro después de haber superado el límite del spawn, debe haber muerto alguno de los pájaros que haya generado, aún siendo dentro de la casa. Esto se hace para poder devolver los pájaros que entren en la casa y no hayan muerto al spawn y no haya conflictos con los pájaros nuevos que se puedan generar (y se acumulen muchos pájaros en el spawn que no puedan ser representados gráficamente).

Los post-it en naranja son las entradas para los pájaros. En estas zonas el jugador puede realizar una determinada acción a cambio de madera para bloquear temporalmente el paso a los pájaros, a cambio del recurso madera. Estas zonas separan el spawn del interior de la casa, por donde sí se puede mover el jugador. 

El post-it verde, la zona del sótano, es una zona pacífica, donde no entran los cuervos. Aquí se consigue la madera.

El post-it amarillo donde pone Jugador, representa al jugador. El resto de post-it amarillos corresponden a los pájaros.

- Electrocutar: Hay un paneles de electricidad en cada sala lateral con los que el jugador podrá eliminar a los pájaros que haya en las salas donde aparecen los pájaros, haciendo que desaparezcan permanentemente. Esta tendrá un enfriamiento común para todas las salas, pero el efecto de echar a los pájaros del spawn afecta solo a esa sala. Ignora la vida de los pájaros.

- Entradas de pájaros: Los pájaros pasan de la zona de aparición a las salas laterales a través de entradas como la chimenea, la puerta o la ventana. Todas estas entradas pueden ser bloqueadas durante un periodo de tiempo utilizando madera (y gastándola).

- Cofre con madera: El jugador puede coger madera en un cofre situado en el sótano con la que podrá bloquear las entradas de los pájaros: bloquear la ventana o la puerta, así como prender la chimenea. Este bloqueo impide totalmente la entrada de pájaros durante un período moderado de tiempo. Pasado este tiempo, el bloqueo desaparecerá y los enemigos volverán a ser capaces de entrar en la habitación lateral correspondiente. La cantidad de madera que se puede obtener es ilimitada. 

#### Enemigos
**Los valores de los atributos asociados a cada pájaro son susceptibles de ser modificados durante la fase de desarrollo. Los números son provisionales y orientativos, siendo la relación entre ellos más importante que los valores aislados.**

Los enemigos en Crowfender son distintas aves, cada una con sus atributos y características. Todas las aves tienen un cierto número de golpes que pueden soportar antes de ser eliminadas (vida). Para las aves que pueden soportar más de un golpe, al recibir uno, además de restarse un punto de vida, huyen a la sala en la que hayan estado antes de entrar en la  que recibieron el golpe. De este modo, si un pájaro recibe un golpe por parte del jugador en la sala de la chimenea y éste no muere, regresaría al spawn, ya que es la habitación inmediatamente anterior en la que estuvieron.La electricidad ignora cuanta vida le quedan a los pájaros y los expulsa a todos los que estén en ese spawn.

Los pájaros tendrán un movimiento aleatorio (dependiendo de la dificultad cada 2 a 5 segundos en fácil, de 1 a 3 segundos en medio y cada 0,8 segundos en difícil) mientras estén en dicha sala, es decir se pueden mover en 1 de las 4 direcciones seleccionadas al azar. Al pasar el tiempo límite en la sala empezará a volar y no podrá ser golpeado hasta que llegue a la sala siguiente y complete la animación de cambio de sala. Éste volará hasta la siguiente sala mientras desaparece y aparece de nuevo en dicha sala situado en el suelo.

- Paloma:
Movimiento:  La paloma avanzará pasando de sala en sala cada 5-8 segundos elegidos de manera aleatoria entre ese intervalo de tiempo. 
Vida: 1 golpe de escoba. 
- Cuervo:
Movimiento:  El cuervo avanzará pasando de sala en sala cada 7-10 segundos elegidos de manera aleatoria entre ese intervalo de tiempo.
Vida: 3 golpes de escoba.
- Gaviota:
Movimiento:  La gaviota avanzará pasando de sala en sala cada 3-5 segundos elegidos de manera aleatoria entre ese intervalo de tiempo.
Vida: 2 golpes de escoba.

### CONTROLES
El jugador se controla con las teclas WASD del teclado. Se recogerán objetos (madera) con la tecla K al encontrarse cerca del cofre y se usarán también con esta misma tecla al encontrarse el jugador cerca de las entradas bloqueables de enemigos, es decir la chimenea, la puerta y la ventana. La tecla K se utilizará también para cambiar de habitación, al igual que acceder al sótano (al pulsarlo cerca de la trampilla presente en la sala central). Se le avisará al jugador visualmente de lo que podrá hacer al pulsar la letra k, cuando esté cerca de un elemento interactuable. Se golpeará con la escoba con la tecla J en la última dirección en la que se ha movido siendo posible pegar en la dirección izquierda o derecha. Tecla P para pausar el juego.
![Controles (2)](![e83b75a839c6a2e6d7d49e689f09feb0](https://user-images.githubusercontent.com/82498461/136593061-2fb864c7-c487-4bdd-8bb7-986eb26cfadc.jpg))


### CÁMARA
La cámara seguirá al jugador en algunas ocasiones pero será fija en otras, dependiendo de la habitación en la que se encuentre, así como de la posición del jugador dentro de la misma. Es decir la sala central tendrá la cámara fija en el centro, al igual que el sótano y la sala de la chimenea. Por el contrario, las salas laterales se mostrarán fijas hasta el fin de la mitad más próxima a la puerta por la que entra el jugador, momento en el cuál la cámara comenzará a seguir al jugador para así mostrar la zona de aparición de los pájaros, zona que no podríamos ver de otra manera debido a que es inaccesible para el jugador. 

### DINÁMICA
**Objetivo:** Sobrevivir cierto tiempo hasta que los pájaros dejen de aparecer, momento en el que podrá espantarlos y que no regresen, terminando la partida y ganando. Sin embargo, si cierto número de pájaros se acumulan en la sala central, el jugador perderá la partida. 

**Ganar:** Cuando el tiempo termine los pájaros dejarán de aparecer (este tiempo varía según la dificultad en la que se juegue). Cuando pasado este tiempo el jugador elimine a todos los pájaros, ganará la partida.

**Perder:** Si en algún momento de la partida se reúnen en la sala central un cierto número de pájaros concurrentes (se puede expulsar a los enemigos golpeándoles al igual que en las otras salas), la partida terminaría y el jugador habría perdido. El jugador pierde cuando cierto número de pájaros entran a la sala central, momento en el cual se lanzarán a por el jugador siempre y cuando este se encuentre en la sala central. En modo fácil, se pierde con 5 pájaros, en medio y difícil con 4.

**Castigo:** El juego castigará el estar estático esperando en la sala central, esperando a que los pájaros simplemente entren al centro. En ese caso, los pájaros se irán acumulando en las salas laterales, lo que provocará la entrada simultánea o en un corto periodo de tiempo de un número suficiente de enemigos como para hacerle perder la partida sin darle tiempo.

## ESTÉTICA
Se ha optado por una técnica basada en la composición de imágenes para crear un ambiente detallado y hasta cierto punto realista en los fondos y objetos interactuables. De una forma similar se han creado las animaciones del jugador y de los pájaros por frames. Se ha utilizado una paleta de tonos oscuros que en ocasiones se ignora para mostrar contraste (por ejemplo en la chimenea o los interruptores de la electricidad). En conjunto con la música y los efectos de sonido, se logra crear un ambiente de tensión que brilla especialmente en el nivel difícil de dificultad al verse reforzado por la presión que la amenaza constante de pájaros entrando a la casa genera.
 
### MENÚ Y MODOS DE JUEGO
El juego se dividirá en oleadas/niveles, las cuales serán independientes las unas de las otras e irán incrementando en dificultad al hacer aparecer más cantidad de pájaros cada vez, además de distintos tipos de pájaros.
Menú principal:
- Jugar: Selección de dificultad: El jugador podrá elegir la dificultad del nivel, variando tiempo de aparición de pájaros, tipo de enemigos... (fácil, medio, difícil).
- Pestaña de controles: desplegable que muestra los controles del juego y los tipos de pájaros con sus atributos resumidos.
Menú de ganar y menú de perder:
- Salir al menú principal: Devuelve al menú principal.
Menú de pausa:
- Volver a pulsar la tecla P para volver a la ejecución.
- Salir al menú principal.

## CONTENIDO
### MÚSICA
Música de tensión. El juego se centra en los efectos de sonido que, combinados con la música, generen cierta sensación de incomodidad en el jugador.

### SONIDOS
Los efectos de sonido tienen especial relevancia en Crowfender, ya que pueden servir de alerta al jugador de lo que sucede en otras habitaciones. Los efectos de sonido son:
- Sonidos al activar la electricidad (limpia el spawn de pájaros de esa habitación). Otro efecto de sonido cuando la electricidad vuelve a estar disponible para ser utilizada.
- Sonidos al coger madera y también al usarla para bloquear una entrada.
- Efectos de sonido cuando se apaga la hoguera o se rompe una ventana (cualquier punto de entrada para los pájaros debe tener un efecto de sonido asociado para cuando termine su efecto). De este modo, se alertará al jugador si está en otra habitación. El reconocimiento de este sonido por parte del jugador requiere cierta experiencia y tiempo jugando, por lo que jugar más tiempo tendrá su recompensa ya que permitirá mayor eficacia en la estrategia de defensa del jugador.
- Efectos de sonido al golpear a un pájaro y otro al acabar con él. Sonido del batir de alas cuando un pájaro cambia de sala.
- Sonido específico de cada tipo de pájaro cuando cambia a la sala central.
- Sonidos cuando el jugador cambia de sala bien usando una puerta o por la trampilla al sótano (y de vuelta).
- Sonidos de reloj que indican cuanto tiempo ha transcurrido de partida (por tanto también cuanto falta): un tick de reloj por cada hora transcurrida.
- Ocasionalmente se escucharán sonidos de tensión seleccionados de forma aleatoria, con el fin de recordarle al jugador que no sabe lo que puede estar pasando en las salas que no ve.

### IMÁGENES
-Sprites y animaciones para los objetos interactuables del juego, así como personaje y enemigos. 
-Sprites para el fondo (la casa) y los exteriores (zonas de spawn).

### HISTORIA
Un explorador se encontraba de excursión. Al verse atrapado bajo una tormenta nefasta, solo le quedaba una solución, refugiarse en la primera casa que vió para poder descansar. Para el explorador solo era una casa más y una zona de paso temporal. Al día siguiente, al despertarse, encontró una nota sujeta de la mano de un cadáver sobre unos pájaros salvajes y asesinos que se acercaban y le acechaban. Ignoró el mensaje, tratando de abandonar la casa para seguir con su excursión, pero fue brutalmente atacado por una bandada de pájaros. Volviendo exhausto a la casa, trató de esperar a que los pájaros se marcharan. Tras unos segundos de silencio, al explorador le sobresaltaron unos violentos graznidos y el crujir de la madera de la ventanas. El resto, es historia.

### NIVELES
El juego tiene un único nivel al que se aplican 3 grados de dificultad.

Cada nivel de dificultad aumentará la complejidad de la partida, agregando pájaros adicionales respecto de la ronda anterior o añadiendo nuevos tipos de pájaros. El primer nivel de dificultad, que sirve de introducción al juego, consta únicamente de palomas, las aves más fáciles de combatir. En los niveles posteriores, se añadirán gradualmente cuervos, y en oleadas más avanzadas, ataques con todos los tipos de ave.

### PERSONAJES
Los distintos personajes, ya comentados en el apartado de mecánica son:
- El explorador, como protagonista.
Como enemigos:
- Palomas.
- Cuervos.
- Gaviotas.

### Objetos e interactuables
Recogemos los objetos interactuables ya definidos en mecánicas.
Herramientas:
- Escoba.
Recursos:
-Madera.
Interactuables:
- Cofre: te da madera.
- Electricidad.
- Zonas de paso para los pájaros, bloqueables a cambio de madera.

## SISTEMA DE COMUNICACIÓN GRUPAL
- Discord: Aplicación de comunicación por voz para realizar reuniones.
- WhatsApp: Aplicación de comunicación por mensajes para poder hablar con nuestras compañeros y preguntar por ayuda o avisar de reuniones.

## PLATAFORMA DE GESTIÓN GRUPAL
- Pivotal Tracker: Aplicación para gestionar el trabajo de cada integrante y el restante, para gestionar los sprints y el rendimiento.

## SISTEMA DE CONTROL DE VERSIONES
- GitHub: Aplicación para guardar el progreso y tener una versión actualizada del proyecto donde puedan trabajar todos los integrantes y ver el progreso y cambios realizados constantemente.

## LENGUAJES DE PROGRAMACIÓN Y ENTORNOS DE DESARROLLO ASOCIADOS
- JavaScript.
- HTML5.
- Phaser.

# REFERENCIAS
- Saga Five Nights at Freddy’s: Utilizamos su sistema de estar atentos a varios caminos y evitar por diferentes medios que lleguen hasta ti. En nuestro caso, que lleguen a la habitación central. También hemos tomado la posibilidad de ahuyentar a los enemigos, aunque en nuestro caso, los enemigos si que pueden ser eliminados por el jugador.
- Saga Call of Duty, modo de juego de Zombies: Utilizamos un sistema de oleadas como los zombies y la posibilidad de tapiar puertas y ventanas en el tiempo real de la invasión.
- Los Pájaros (Película de 1963): Utilizamos su historia, siendo como en la escena de la película donde los pájaros intentan entrar por varios lugares y para pararles usan fuego o madera para tapiar ventanas y puertas, además de cuando hay un número grande de pájaros causan estragos a quien esté en dicha sala, nosotros basamos eso en nuestra manera de perder, ya que cuando se junten 5 pájaros en la zona central será devastador y perderá la partida.
- The Binding of Isaac: Nos inspiramos en la división por habitaciones y el scroll que realiza la cámara en las salas más grandes.
- Juegos como Golden Axe, Battletoads o Castle Crashers sirvieron de referencia para idear la vista 2.5 del juego.
