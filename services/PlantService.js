const db = require("../db")

const Service = {

    listPlants(ids){
        const available_plants = db.data.inventory.filter(inventory=>{
            if(ids){
                return inventory.quantity > 0 && ids.includes(String(inventory.plant_id))
            }
            return inventory.quantity > 0
        })
        console.log(available_plants)
        const plantIds = available_plants.reduce((ob, item)=>{
            ob[item.plant_id] = item
            return ob
        }, {})
        
        const plants = db.data.plants.filter(plant=>{
            return plantIds[plant.id] !== undefined
        }).map(plant=>{
            return {...plant, ...plantIds[plant.id]}
        })
        
        return plants
    },

    getPlants(ids){
        return Service.listPlants(ids)
    }

}

module.exports = Service