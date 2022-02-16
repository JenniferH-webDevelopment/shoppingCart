class Promotion {
    constructor() {
        this.promotionCodes = [
            {
                code: 'ABCD1',
                discount: 5
            },
            {
                code: 'ABCD2',
                discount: 10
            },
            {
                code: 'ABCD3',
                discount: 15
            },
            {
                code: 'ABCD4',
                discount: 50
            },
            {
                code: 'ABCD5'
            },
        ];
    }

    checkValidPromotionCode(promoCode) {
        return this.promotionCodes.find( ({ code }) => code === promoCode );
    }
}