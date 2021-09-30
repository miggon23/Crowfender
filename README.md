# Grupo08
# Crowfender
Nombre de los autores o la empresa: Daniel Martín Gómez, Miguel González Pérez, Javier Callejo Herrero, Ignacio Ligero Martín
Sitio web o correo electrónico de contacto: damart24@ucm.es, miggon23@ucm.es, iligero@ucm.es, jacall02@ucm.es 

Resumen: Pájaros intentan entrar en una casa que tienes que defender.
Géneros: Survival suspense.
Modos: Por oleadas.
Público objetivo:
Edad: adolescentes y/o fans de hitchcock de Europa y Estados Unidos
Plataformas: Navegador Web

# DESCRIPCIÓN
Crowfender es un juego de supervivencia y suspense con vista 2.5D (vista estilo battletoads). El jugador tendrá que bloquear la entrada de los pájaros usando madera, además de echar a los pájaros que hayan conseguido entrar golpeándolos con la escoba, antes de que consigan invadir el centro. Nuestro protagonista tendrá que aguantar 5 horas en combate con los pájaros antes de que se marchen al amanecer. Una hora en Crowfender equivale a un minuto de juego.

# ASPECTOS GENERALES
Crowfender trata de transmitir al jugador la angustia de una invasión voladora, al igual que en la película Los pájaros de Alfred Hitchcock. El juego se ambienta en una casa abandonada, a la que llega un explorador a pasar la noche tras una fuerte tormenta. Tras amaina la tormenta, bandadas de pájaros intentarán invadir la casa para acabar con el jugador. Después de pedir ayuda, el jugador deberá atrincherarse en la casa hasta que vengan a rescatarle, usando los recursos que encuentre en su estancia para defenderse.



# A QUÉ SE JUEGA
Al estilo FNAF, el jugador tendrá que ir de habitación en habitación, tapiando puertas y ventanas, encendiendo la chimenea... para evitar que los pájaros entren a la casa, además de ir espantando a los pájaros que hayan logrado entrar, para que no invadan la habitación central. El jugador se encontrará con varias oleadas de pájaros de creciente dificultad, así como con distintas herramientas y formas de espantar a las insistentes aves. Al contrario que en FNAF, el jugador podrá desplazarse libremente por las habitaciones en escenarios de 2.5D.

# RELATO BREVE
El jugador se encuentra en la sala central, el jugador decide encargarse primero de los pájaros de la izquierda, por tanto va a buscar madera para tapiar la puerta de la derecha y encender la hoguera, consiguiendo evitar que entren los pájaros por arriba. Con esto consigue retener a los pájaros el tiempo suficiente para ir a espantar todos los pájaros de la izquierda. Mientras esto sucede, un aviso en el minimapa y una alerta sonora (por ejemplo, el crujir de la puerta tapiada o el apagarse la hoguera) alertan al jugador de que los pájaros están entrando por otras habitaciones, obligándolo a moverse constantemente entre habitaciones y a gestionar el tiempo que emplea en disuadir cada flanco atacado por los pájaros, creando así una sensación de tensión constante.

# MECÁNICAS
Las mecánicas de Crowfender requieren interacción con el escenario mediante gestión de recursos, desplazamiento por el escenario por parte del jugador y ataque a los pájaros con el fin de ahuyentarlos, todo eso detallado en su correspondiente apartado de mecánicas.

# Mecánicas de jugador
Movimiento: Movimiento uniforme no acelerado, en el eje x, eje y, y en diagonal, siendo el escenario más reducido en el eje y, pues no puede moverse por toda la pantalla si no por la sección inferior únicamente, con el fin de dar sensación de profundidad. 

Ataque: Cuenta con una escoba que resta 1 de vida a los pájaros, espantándolos (haciéndolos retroceder una sala) o matándolos si a estos no les queda vida. Al existir cierta profundidad en el escenario, un pájaro puede estar colocado en una capa diferente a la del jugador, por lo que no lo golpearía a menos que antes de atacar se coloque frente al pájaro tanto en el eje x como en el eje y. 
  
Vida: No tiene vida, pues los enemigos no le atacan directamente. En cambio, el jugador pierde cuando la sala central supera el límite de pájaros. El límite de pájaros que puede haber en la sala de centro se detalla en mecánicas de escenario. 

Bloqueo: El jugador puede coger madera en el sótano con la que podrá bloquear ventanas, puertas o prender la chimenea. Sólo puede llevar una unidad de madera cada vez, y tendrá que gastarla para recoger más. 

# Recursos
-Madera: La madera se consigue al visitar la habitación del sótano. Ésta se puede invertir en encender la hoguera o tapiar una ventana o puerta. La madera no es acumulable, solo se puede llevar una unidad de madera al mismo tiempo, y es ésta la cantidad que se invierte cuando se gasta, por lo que el jugador tendrá que visitar tantas veces el sótano como acciones con madera quiera realzar

# Mecánicas de escenario
Esquema de la zona de juego
![Esquema Zona de Juego](https://user-images.githubusercontent.com/82326243/134644498-b26d2520-5295-4dc0-b4a1-fd46a808252d.png)
-Los post-it en azul representan las zonas de spawn de los pájaros. Son zonas visibles para el jugador pero no accesibles para él.

-Los post-it en naranja son las entradas para los pájaros. En estas zonas el jugador puede realizar una determinada acción a cambio de madera para bloquear temporalmente el paso a los pájaros, a cambio del recurso madera. Estas zonas separan el spawn del interior de la casa, por donde sí se puede mover el jugador. 

-El post-it rosa, la zona del sótano, es una zona pacífica, donde no entran los cuervos. Aquí se consigue la madera.

-El post-it amarillo donde pone Jugador, representa al jugador. El resto de post-it amarillos corresponden a los pájaros.

SPAWN: Punto de congregación de los pájaros que sirve para alertar al jugador del número potencial de pájaros que pueden entrar en la casa en un determinado momento. Los spawns son zonas no accesibles para el jugador, pero sí visibles e interactuables (mediante el uso de la electricidad en este último caso). 

Cada spawn tiene un límite fijo de pájaros que puede generar, y son 6. Para poder generar un pájaro después de haber superado el límite del spawn, debe haber muerto alguno de los pájaros que haya generado, aún siendo dentro de la casa. Esto se hace para poder devolver los pájaros que entren en la casa y no hayan muerto al spawn y no haya conflictos con los pájaros nuevos que se puedan generar (y se acumulen muchos pájaros en el spawn que no puedan ser representados gráficamente).

Electrocutar: Hay un paneles de electricidad en cada sala lateral con los que el jugador podrá eliminar a los pájaros que haya en las salas donde aparecen los pájaros, haciendo que desaparezcan permanentemente. Esta tendrá un enfriamiento común para todas las salas.

Entradas de pájaros: Los pájaros pasan de la zona de aparición a las salas laterales a través de entradas como la chimenea, la puerta o la ventana. Todas estas entradas pueden ser bloqueadas durante un periodo de tiempo utilizando madera (y gastándola).

Cofre con madera: El jugador puede coger madera en un cofre situado en el sótano con la que podrá bloquear las entradas de los pájaros: bloquear la ventana o la puerta, así como prender la chimenea. Este bloqueo impide totalmente la entrada de pájaros durante un período moderado de tiempo. Pasado este tiempo, el bloqueo desaparecerá y los enemigos volverán a ser capaces de entrar en la habitación lateral correspondiente. La cantidad de madera que se puede obtener es ilimitada. 

# REFERENCIAS
Saga Five Nights at Freddy’s: Utilizamos su sistema de estar atentos a varios caminos y evitar por diferentes medios, en su caso linternas o máscaras para alejarlos o evitar golpes, en nuestro caso una escoba o madera para pegarles y alejarles/matarles y para tapiar puertas, ventanas o encender la chimenea.

Saga Call of Duty, modo de juego de Zombies: Utilizamos un sistema de oleadas como los zombies, pero sin ser ilimitado, aunque cada oleada aparecen más pájaros y más variados hasta un número limitado de oleadas.

Los Pájaros (Película de 1963): Utilizamos su historia, siendo como en la escena de la película donde los pájaros intentan entrar por varios lugares y para pararles usan fuego o madera para tapiar ventanas y puertas, además de cuando hay un número grande de pájaros causan estragos a quien esté en dicha sala, nosotros basamos eso en nuestra manera de perder, ya que cuando se junten 5 pájaros en la zona central será devastador y perderá la partida.

![Pajarotto 1](https://user-images.githubusercontent.com/82326243/133884687-167a3170-8f85-46ae-924e-9b43d3867d3b.png)
