var OregonH = OregonH || {};

class Caravan {

    init(stats){
        this.day = stats.day;
        this.distance = stats.distance;
        this.crew = stats.crew;
        this.food = stats.food;
        this.oxen = stats.oxen;
        this.money = stats.money;
        this.firepower = stats.firepower;
    };

    updateWeight(){
        var droppedFood = 0;
        var droppedGuns = 0;
       
        //how much can the caravan carry
        this.capacity = this.oxen * OregonH.WEIGHT_PER_OX + this.crew * OregonH.WEIGHT_PER_PERSON;
       
        //how much weight do we currently have
        this.weight = this.food * OregonH.FOOD_WEIGHT + this.firepower * OregonH.FIREPOWER_WEIGHT;
       
        //drop things behind if it's too much weight
        //assume guns get dropped before food
        while(this.firepower && this.capacity <= this.weight) {
          this.firepower--;
          this.weight -= OregonH.FIREPOWER_WEIGHT;
          droppedGuns++;
        }
       
        if(droppedGuns) {
          // We still need to create the UI object which will take care of showing things to the user.
          this.ui.notify('Left '+droppedGuns+' guns behind', 'negative');
        }
       
        while(this.food && this.capacity <= this.weight) {
          this.food--;
          this.weight -= OregonH.FOOD_WEIGHT;
          droppedFood++;
        }
       
        if(droppedFood) {
          this.ui.notify('Left '+droppedFood+' food provisions behind', 'negative');
        }
    };

    updateDistance() {
        //the closer to capacity, the slower
        var diff = this.capacity - this.weight;
        var speed = OregonH.SLOW_SPEED + diff/this.capacity * OregonH.FULL_SPEED;
        this.distance += speed;
    };

    consumeFood() {
        this.food -= this.crew * OregonH.FOOD_PER_PERSON;
        
        if(this.food < 0) {
            this.food = 0;
        }
    };
}

OregonH.Caravan = new Caravan();