const { client } = require('../db/client'); 

const addSuccessfulOperation = async (data) => {
    const { total_amount } = data.successful_payment;
    const { first_name, username } = data.from;

    const query = `INSERT INTO successful_operations (date, total_amount, name, username) VALUES (NOW(), $1, $2, $3)`;
    const values = [total_amount, first_name, username];

    try {
        await client.query(query, values);
        console.log('Transaction recorded successfully');
    } catch (e) {
        console.error('Error inserting transaction: ', e.stack);
    }
};

module.exports = addSuccessfulOperation; 