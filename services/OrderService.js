const PlantService = require('./PlantService')
const db = require('../db')

const Service = {

    buy(order){
        const plants = PlantService.getPlants(order.plants.map(plant=>plant.id))
        
        const unavailable = order.plants.reduce((a,item)=>{
            if(!plants.find(plant=> plant.id == item.id)){
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
        return id !== undefined && db.data.orders.find(record=>record.id == id) || db.data.orders
    }
}
module.exports = Service