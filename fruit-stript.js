module.exports = (pool, FruitBasket) => {


    async function fruitType(type){
        try {
            let basket = await pool.query('SELECT fruit_name, qauntity, price FROM fruit_basket WHERE fruit_name = $1', [type])
        return basket.rows
        } catch (error) {
            console.log(error)
        }
        
    }

    async function insertFruit(fruit_name,qauntity,price){
        try {
            await pool.query('INSERT into fruit_basket (fruit_name, qauntity, price) values ($1, $2, $3)', [fruit_name,qauntity,price])
                return 'Fruit' 
        } catch (error) {
            console.log(error)
        }
        
    }

    async function updateFruit(fruit_name, qauntity){
        try {

        await pool.query('UPDATE fruit_basket set qauntity = qty + $2  WHERE fruit_name = $1' ,[fruit_name, qauntity])
        } catch (error) {
            console.log(error)
        }
    }

    async function totalFruitPrice(fruit_name){
        try {
           let total = await pool.query('SELECT sum(price * qauntity) from fruit_basket WHERE fruit_name = $1', [fruit_name])
           return total.rows;
        } catch (error) {
            console.log(error)
        }

    }

    async function totalSumPrice(fruit_name){
        try {
            let sum = await pool.query ('SELECT sum(qauntity) from fruit_basket WHERE fruit_name = $1', [fruit_name])
            return sum.rows;
        } catch (error) {
            console.log(error)
        }
    }


    return {
        fruitType,
        insertFruit,
        updateFruit,
        totalFruitPrice,
        totalSumPrice
    }
}



