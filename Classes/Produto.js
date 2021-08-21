class Product {
  constructor(id, description, purchasePrice, standardProfitMargin) {
    this.id = id;
    this.description = description;
    this.purchasePrice = purchasePrice;
    this.standardProfitMargin = standardProfitMargin;
  }
}

class ProductItem extends Product {
  constructor(
    id,
    description,
    purchasePrice,
    standardProfitMargin,
    quantity,
    additionalCost,
    taxes,
    sellingPrice
  ) {
    super(id, description, purchasePrice, standardProfitMargin);
    this.quantity = quantity;
    this.additionalCost = additionalCost;
    this.taxes = taxes;
    this.sellingPrice = sellingPrice;
  }
  sellingCost() {
    return (
      this.purchasePrice * this.quantity + this.additionalCost + this.taxes
    );
  }

  profit() {
    return this.sellingPrice - this.sellingCost();
  }
}
