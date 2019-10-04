const search_all_cards = (req, res, next) =>{
    const jampads = {
        jamcards: [
            {
                name: 'Bread and Jaam',
                location: 'Bangalore, Bannergatta road',
                price: '500-1000'
            },
            {
                name: 'Astral Studios',
                location: 'Bangalore, HSR Layout',
                price: '800-1500'
            }
        ]
        }
        res.status(200).json(jampads);
}

module.exports = {search_all_cards};