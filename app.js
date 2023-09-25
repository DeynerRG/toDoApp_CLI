import { showMenu, pause, readInput, menuDeleteTask, confirm, menuCompleteTask  } from './helpers/inquirer.js'
import colors from 'colors';
import Task from './models/task.js';
import Tasks from './models/tasks.js';
import { saveDB, readDB } from './helpers/saveFile.js';



const app = async ()=>{
    
    let option = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if( tasksDB ){
        tasks.loadTaskDB( tasksDB );
    }

    
    do{
        option = await showMenu();
        
        switch(option){
            case '1':
                
                // Add task
                const description = await readInput('Descripción:\t');
                tasks.addTask( description );
                break;

            case '2':
                // show tasks
                tasks.showTasks();
                break;
            case '3':
                // show completed tasks
                tasks.showStateTasks();
                break;
            case '4':
                // show pending tasks
                tasks.showStateTasks(false);
                break;
            case '5':
                // complete task
                const ids = await menuCompleteTask( tasks.arrayTasks );
                tasks.completeTasks( ids );
                break;
            case '6':
                // delete task
                // Obtengo el id de la tarea a eliminar
                const id = await menuDeleteTask( tasks.arrayTasks );
                
                if( id !== '0' ){
                    // Confirmo la eliminacion de la tarea
                    const ok = await confirm('¿Estas seguro que deseas eliminar la tarea?');
                    // elimino la tarea si se confirma su eliminación
                    if( ok ) tasks.deleteTask( id );
                    if( ok ) console.log('Tarea eliminada correctamente')
                };
                break;
            
        }
        saveDB(tasks.arrayTasks);

        
        if(option !== '0') await pause();
    } while( option !== '0' );

}

app();
