
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
    }

};
export default Data;