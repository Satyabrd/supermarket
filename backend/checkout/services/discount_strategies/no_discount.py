from .base import DiscountStrategy

class NoDiscountStrategy(DiscountStrategy):
    def apply_discount(self, quantity, unit_price, discount_data=None):
        return quantity * unit_price
