const PlantService = require('./PlantService')
const db = require('../db')

const Service = {

    buy(order){
        const plants = PlantService.getPlants(order.plants.map(plant=>plant.id))
        
        const unavailable = order.plants.reduce((a,item)=>{
            if(!plants.find(plant=> {console.log(plant.quantity, item.quantity); return plant.id == item.id && plant.quantity >= item.quantity})){
                a.push(item)
            }
            return a
        },[])

        //abort
        if(unavailable.length >0)
            return {unavailable, plants}
        //save
        db.saveOrder({order, plants})
        return {unavailable, plants}
    },

    getOrder(id){
        if(id!==undefined)
            return db.data.orders.find(record=> record.id == id)
        return db.data.orders
    }
}
module.exports = Service