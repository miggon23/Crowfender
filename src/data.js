
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
    chest:{
       x: 740, 
       y: 1000, 
       scaleX: 500, 
       scaleY: 400,  
    }
    
};
export default Data;