import formattDate from '../helpers/dateFormatter.js';
import Task from './task.js'
class Tasks{

    _listTasks = {};

    get arrayTasks(){
        const listado = [];
        Object.keys(this._listTasks).forEach(( key )=> {
            listado.push( this._listTasks[key] );
        });
        return listado;
    }

    constructor(){
        this._listTasks = {};
    }


    loadTaskDB( tasks = [] ){
        tasks.forEach(( task )=>{
            this._listTasks[task.id] = task;
        })
    }


    addTask( description = ''){
        const task = new Task( description );
        this._listTasks[task.id] = task;
    };
   

    deleteTask( id = ''){
        if( this._listTasks[id] ){
            delete this._listTasks[id];
        }
    };


    showTasks(){

        this.arrayTasks.forEach((task, index)=>{
            
            let num = index + 1;
            console.log(`${ (num.toString() + '.').magenta } ${ task.done !== null ? 'Completa  '.green : 'Incompleta'.red}  ${'::'.magenta} ${task.description}`)
        
        })
    };


    showStateTasks( completed = true ){

        let tasksCompleted = this.arrayTasks.filter(( task )=> task.done !== null );
        let tasksPending = this.arrayTasks.filter(( task )=> task.done === null );

        let tasks = completed ? tasksCompleted : tasksPending;

        tasks.forEach(( task, index )=>{
            let num = (index + 1).toString();
            num = ( num + '.' ).magenta;
            let done = task.done !== null ? `Completado el ${formattDate( task.done )}`.green : 'Incompleta'.red;
            console.log(`${ num } ${done} ${'::'.magenta} ${task.description}`)
        })

    };


    completeTasks( ids = []){

        ids.forEach(id => {
            
            const task = this._listTasks[id];
            if( !task.done ){
                task.done = new Date().toISOString();
            }

        });

        this.arrayTasks.forEach(( task )=>{
            if( !ids.includes(task.id) ){
                this._listTasks[task.id].done = null;                
            }
        });

    }


};


export default Tasks;