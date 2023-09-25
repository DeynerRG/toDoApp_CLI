
import inquirer from 'inquirer';
import colors from 'colors';


const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.magenta } Nueva tarea`
            },
            {
                value: '2',
                name: `${ '2.'.magenta } Mostrar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.magenta } Mostrar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.magenta } Mostrar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.magenta } Completar tarea`
            },
            {
                value: '6',
                name: `${ '6.'.magenta } Eliminar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.magenta } Salir`
            },
        ]
    }
];


const showMenu = async ()=>{

    console.clear();
    console.log('============================');
    console.log('     Selecciona una opción');
    console.log('============================');

    const { option } = await inquirer.prompt(menuOptions);
    return option;

};

const pause = async ()=>{
    const pauseOptions = [
        {
            type: 'input',
            name: 'option',
            message: `Presiona ${'ENTER'.magenta} para continuar`
        }
    ];
    
    const { option } = await inquirer.prompt(pauseOptions);
    return option;
    
};

const readInput = async ( message )=>{
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { description } = await inquirer.prompt(question);
    return description
};


const menuDeleteTask = async( tasks = [] )=>{

    const choices = tasks.map((task, index)=>{

        let num = (index + 1).toString();

        return {
            value: task.id,
            name: `${ num }. ${task.description}`
        }
    })

    choices.unshift({
        value: '0',
        name: `0. Cancelar`
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            loop: false,
            message: 'Selecciona la tarea a eliminar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;

};


const menuCompleteTask = async( tasks = [] )=>{

    const choices = tasks.map((task, index)=>{

        let num = (index + 1).toString();

        return {
            value: task.id,
            name: `${ num }. ${task.description}`,
            checked: (task.done !== null)
        }
    })


    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            loop: false,
            message: 'Selecciona la tarea a completar',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);
    return ids;

};


const confirm = async ( message = '¿Deseas continuar?' )=>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            default: false,
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok
};




export { 
    showMenu,
    pause, 
    readInput,
    menuDeleteTask,
    confirm,
    menuCompleteTask,
};

