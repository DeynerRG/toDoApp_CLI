import { v4 as generarID } from "uuid";


class Task{

    id = '';
    description = '';
    done = null;
    

    constructor( description ){
        
        this.id = generarID();
        this.description = description;
        this.done = null;

    }


}


export default Task;