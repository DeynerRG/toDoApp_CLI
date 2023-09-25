import fs from 'fs'

const file = './db/data.json';

const saveDB = ( data )=>{    
    fs.writeFileSync( file, JSON.stringify(data) );
}

const readDB = ()=>{

    if( !fs.existsSync( file ) ){
        return null
    }

    const info =  fs.readFileSync( file, { encoding: 'utf-8'});
    // si el archivo existe pero esta vacio devuelve null y no realiza la conversión
    if(info === '') return null; 
    // si hay contenido en el archivo leido entonces realiza la conversión
    const data = JSON.parse(info);
    return data;
}

export {
    saveDB,
    readDB
}