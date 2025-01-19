import {Decimal} from 'decimal.js';

export default class BigDecimal {
	constructor(value, precision, rounding) {
		// Set the precision and rounding of the default Decimal constructor
		Decimal.set({precision: precision, rounding: rounding});
		this.d = new Decimal(value);
	}
}