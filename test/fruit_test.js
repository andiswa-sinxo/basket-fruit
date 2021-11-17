let assert = require("assert");
let FruitBasket = require("../fruit-stript");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_basket';

const pool = new Pool({
    connectionString
});

describe('The fruit basket function', function () {
    beforeEach(async function () {
        await pool.query("delete from fruit_basket;");
    });

    it('should find all the fruit basket for given fruit type', async function () {
        let basket = FruitBasket(pool);

        await basket.insertFruit('Apple', 2, 4)

        assert.deepEqual([
            {
                fruit_name: 'Apple',
                price: '4.00',
                qauntity: 2
            }
        ]
            , await basket.fruitType('Apple'));

    })
    
    it('should insert into the table', async function (){
        let basket = FruitBasket (pool);


        assert.equal('Fruit', await basket.insertFruit('Mango', 1, 20.00));

    })

    it('should update the number of fruits in a given basket', async function () {
        let basket = FruitBasket(pool);

        await basket.insertFruit('Orange', 1, 2)
        await basket.updateFruit('Orange', 1)

        assert.deepEqual([
            {
                fruit_name: 'Orange',
                price: "2.00",
                qauntity: 1
            }
        ]

            , await basket.fruitType('Orange', 1));

    })
});


it('should show the total price for a given fruit basket', async function () {
    let basket = FruitBasket(pool);

    await basket.insertFruit('Pear', 3, 2)

    assert.deepEqual([{ sum: 6 }], await basket.totalFruitPrice('Pear'))



})

it('should show the sum of the total of the fruit baskets for a given fruit type', async function(){


    let basket = FruitBasket(pool);

    await basket.insertFruit('Pear', 3, 2)
    await basket.insertFruit('Pear', 3, 2)
    

    assert.deepEqual([{ sum: 9}], await basket.totalSumPrice('Pear'))
})

after(function () {
    pool.end();
})
