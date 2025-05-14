from .base import DiscountStrategy

class QuantityDiscountStrategy(DiscountStrategy):
    def apply_discount(self, quantity, unit_price, discount_data):
        discount_qty = discount_data['quantity']
        discount_price = discount_data['discount_price']

        num_discounts = quantity // discount_qty
        remaining = quantity % discount_qty

        return (num_discounts * discount_price) + (remaining * unit_price)
