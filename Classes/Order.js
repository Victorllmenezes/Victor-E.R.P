class Order {
  constructor(id, date, items, status = "Pending") {
    this.id = id;
    this.date = date;
    this.items = items;
    this.status = status;
  }
}

class SellingOrder extends Order {
  constructor(id, date, items, status = "Pending", costumer) {
    super(id, date, items, status);
    this.costumer = costumer;
  }
}

class BuyingOrder extends Order {
  constructor(id, date, items, status = "Pending", provider) {
    super(id, date, items, status);
    this.provider = provider;
  }
}
