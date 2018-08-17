describe('price calculator', () => {
	it('should throw error if no config is provided', () => {
		const priceCalculator = function() { new CalculatePrice() };
		expect(priceCalculator).to.throwException();
	});

	it('should return the correct product type price', () => {
		const productType = 1;
		const expectedPrice = 35;

		const priceCalculator = new CalculatePrice({
            productType
        });

        const actual = priceCalculator.getProductPriceType();
		expect(expectedPrice).to.equal(actual);
	});

	it('should calculate discount to be 10 if today', () => {
		const publishedDate = moment();
		const expectedDiscount = 10;

		const priceCalculator = new CalculatePrice({
            publishedDate
        });

		const actual = priceCalculator.calculateTodayDiscount();
		expect(expectedDiscount).to.equal(actual);
	});

	it('should calculate discount to be 5 if company user but not today', () => {
		const userType = 1;
		const publishedDate = moment().add('5', 'days');

		const expectedDiscount = 5;

		const priceCalculator = new CalculatePrice({
            publishedDate,
            userType
        });

		const actual = priceCalculator.calculateDiscount();
		expect(expectedDiscount).to.equal(actual);
	});

	it('should calc price right', () => {
		const userType = 0;
		const productType = 0;
		const price = 1;
		const publishedDate = moment();

		const expected = 16;

		const priceCalculator = new CalculatePrice({
            userType,
            productType,
            price,
            publishedDate
        });

		const actual = priceCalculator.calculatePrice();
		expect(expected).to.equal(actual);
	});
});