'use strict'

// userType, 0 = normal, 1 = company
// productType, 0 = new product, 1 = old product
// price, the price of the product

class CalculatePrice {
	/**
	 * @param  {Number} userType
	 * @param  {Number} productType
	 * @param  {Number} price
	 * @param  Object | moment
	 */
	constructor({
		userType = 0,
		productType = 0,
		price = 1,
		publishedDate = moment()
	}= {}) {
		if (!arguments.length) {
			throw {
				name: 'TypeError',
				message: 'Please provide a configuration for the calculator'
			}
		}

		this.userType = userType;
		this.productType = productType;
		this.price = price;
		this.publishedDate = publishedDate;
	}

	/**
	 * @return String | the user type selected
	 */
	getUserType() {
		return this.userType ? CalculatePrice.USER_TYPES[this.userType] : CalculatePrice.USER_TYPES[0];
	}

	/**
	 * @return String | the product type
	 */
	getProductType() {
		return this.productType ? CalculatePrice.PRODUCT_TYPES[this.productType] : CalculatePrice.PRODUCT_TYPES[0];
	}

	/**
	 * @return Boolean | if product is published today 
	 */
	publishedToday() {
		return moment(this.publishedDate).isSame(moment(), 'day');
	}

	/**
	 * @return Number | if published today we return a discount value
	 */
	calculateTodayDiscount() {
		return this.publishedToday() ? 10 : 0;
	}

	/**
	 * @param Object | we set one or more new values for the calculator
	 */
	setNewCalculatorData(data) {
		if (!data || !Object.keys(data).length) return;

		Object.keys(data).forEach(el => {
			if (typeof data[el] !== 'function') {
				this[el] = data[el];
			}
		});
	}

	/**
	 * @return Number | depending on the product type we return a specific value
	 */
	getProductPriceType() {
		let productTypePrice = null;

		switch(this.getProductType()) {
			case 'new product':
				productTypePrice = 25;
				break;
			case 'old product':
				productTypePrice = 35;
				break;
		}

		return productTypePrice;
	}

	/**
	 * @return Number | we calculate and return the discount according to data specified
	 */
	calculateDiscount() {
		const todayDiscount = this.calculateTodayDiscount();
		let discount = 0;

		switch(this.getUserType()) {
			case 'normal':
				discount = todayDiscount;
				break;
			case 'company':
				discount = todayDiscount + 5;
				break;
		}

		return discount;
	}

	/**
	 * @return Number | the final calculated price depending on the values provided
	 */
	calculatePrice() {
		const discount = this.calculateDiscount();
		const productTypePrice = this.getProductPriceType();

		return this.price + productTypePrice - discount;
	}
} 

CalculatePrice.USER_TYPES = {
	0: 'normal',
	1: 'company'
}

CalculatePrice.PRODUCT_TYPES = {
	0: 'new product',
	1: 'old product'
}
