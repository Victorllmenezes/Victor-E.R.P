class Order {
  constructor(id, date, items, entity, status = "Pending") {
    this.id = id;
    this.date = date;
    this.items = items;
    this.entity = entity;
    this.status = status;
  }
}

class SellingOrder extends Order {
  constructor(id, date, items, entity, status = "Pending") {
    super(id, date, items, entity, status);
  }
}

class BuyingOrder extends Order {
  constructor(id, date, items, entity, status = "Pending") {
    super(id, date, items, entity, status);
  }
}
