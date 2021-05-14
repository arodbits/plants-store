const faker = require('faker')

let data = {
    inventory: [
        {
            plant_id: '1',
            quantity: 10,
            price: 20, 
        }
    ],
    plants: [
        {
            id: '1',
            name: 'Car1',
            scientific_name: 'fun fact'
        }
    ],
    orders:[]
}

module.exports = data


const saveOrder = ({order,plants})=>{
    let total = 0
    let id = data.orders[data.orders.length-1] && data.orders[data.orders.length-1].id + 1 || 1

    plants.forEach(plant=>{
        total += order.plants.find(orderPlant=>orderPlant.id === plant.id).quantity * plant.price
    })

    for(const orderItem of order.plants){
        const inventoryRecord = data.inventory.find(record=>{
            return record.plant_id = orderItem.id
        })
        
        inventoryRecord.quantity -= orderItem.quantity
    }
    
    data.orders.push(
        { 
            id, 'buyer_name': order.buyer_name, 'buyer_address' : order.buyer_address, total, 'plants': plants.map(plant => { 
                return { 
                    name: plant.name, 
                    price: plant.price, 
                    quantity_purchased: order.plants.find(item=>item.id == plant.id).quantity,
                    id: plant.id, 
                    scientific_name: plant.scientific_name
                }
            })
        }
    )
}

const migration = ()=>{
    //create plants
    for(let i=0; i<50; i++){
        data.plants.push({
            id: faker.datatype.uuid(),
            name: faker.vehicle.vehicle(),
            scientific_name: faker.vehicle.model()
        })
    }
    //create inventory
    for(let i=0; i<20; i++){
        for(const plant of data.plants){
            data.inventory.push({
                plant_id: plant.id,
                quantity: faker.datatype.number(50),
                price: faker.commerce.price(), 
            })        
        }
    }
}

module.exports= {migration, data, saveOrder}
