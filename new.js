

class Person{
    constructor(c){
        this.crush = c
        this.brain = new Brain()
    }
    say(){
        let a = ["yes", "no"]
        return a[Math.floor(Math.random()*a.length-1)]
    }
    debug(person){
        //some magic 
        let magic = "waiting for mirical to happen"
        return magic
    }
}




let ramanika = new Person()
let me = new Person(ramanika)
me.crush = ramanika 

while(ramanika.say()=='yes'){
    me.debug(ramanika)
}
