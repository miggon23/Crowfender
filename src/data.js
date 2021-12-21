
const Data = {
    // Array que contiene las rutas de los pájaros
    routes: 
        [
            [0, 5, 3], 
            [1, 4, 3], 
            [2, 6, 3]
        ],
    basementZones:
    {
        middle: {
            x: 230,
            y: 405,
            scaleX: 220, 
            scaleY: 180, 
            scrollCamera: true, 
            sprite: 'sotano_trampilla'
        },
        down: {
            x: 270,
            y: 850, 
            scaleX: 300, 
            scaleY: 500, 
            scrollCamera: false,
            sprite: 'sotano_escalera'
        }
    },
    rooms:
    {
        main:{
            x: 500,
            y: 300,
            scaleX: 1000,
            scaleY: 600,
            sprite: 'fondo_central'
        },
        upper:{
            x: 490,
            y: -300,
            scaleX: 1000,
            scaleY: 600,
            sprite: 'fondo_puerta'
        },
        east:{
            x: 1500,
            y: 300,
            scaleX: 1000,
            scaleY: 600,
            sprite: 'fondo_ventana'
        },
        west:{
            x: -500,
            y: 400,
            scaleX: 1000,
            scaleY: 400,
            sprite: 'fondo_chimenea'
        },
        basement:{
            x: 500,
            y: 900,
            scaleX: 1000,
            scaleY: 600,
            sprite: 'fondo_sotano'
        }
    },
    player:{
        x: 500,
        y: 400,
        scaleX: 256,
        scaleY: 384,
        sprite: 'player',
        depth: 10
    },
    chest:{
       x: 740, 
       y: 1000, 
       scaleX: 500, 
       scaleY: 400,  
    },
    blockable:{
        window:{
            x: 1920,
            y: 295,
            sprite: 'ventana_block',
            blockedSprite: 'ventana_block_tabla'
        },
        door:{
            x: 60,
            y: -270,
            sprite: 'puerta_block',
            blockedSprite: 'puerta_block_tabla'
        },
        fireplace:{
            x: -780,
            y: 440,
            sprite: 'chimenea',
            blockedSprite: 'chimenea_tabla'
        }
    },
    spawnZone:{
        upper: {
            x: -185,
            y: -300,
            scaleX: 350,
            scaleY: 600,
            limitOfBirds: 6,
            sprite: 'spawn_puerta'
        },
        east: {
            x: 2190,
            y: 300,
            scaleX: 380,
            scaleY: 600,
            limitOfBirds: 6,
            sprite: 'spawn_ventana' 
        },
        west: {
            x: -500,
            y: 110,
            scaleX: 1000,
            scaleY: 180,
            limitOfBirds: 6,
            sprite: 'spawn_chimenea'
        }
    },
    electricity: {
        sprite: 'electricidad_verde',
        cooldownSprite: 'electricidad_rojo',
        spriteK: 'electricidad_verde_k',

        west: {
            x: -352,
            y: 380
        },
        upper: {
            x: 276,
            y: -300
        },
        east: {
            x: 1700,
            y: 304
        }
    }

    
};
export default Data;