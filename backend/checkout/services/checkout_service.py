from checkout.models.cart import Cart
from checkout.services.discount_strategies.quantity_discount import QuantityDiscountStrategy
from checkout.services.discount_strategies.no_discount import NoDiscountStrategy

class CheckoutService:
    def __init__(self, cart: Cart):
        self.cart = cart

    def total(self):
        total = 0

        for item in self.cart.items.select_related('product'):
            product = item.product
            quantity = item.quantity
            unit_price = float(product.price)
            discounts = product.discounts.order_by('-quantity')

            if discounts.exists():
                discount = discounts.first()
                strategy = QuantityDiscountStrategy()
                total += strategy.apply_discount(
                    quantity,
                    unit_price,
                    {
                        'quantity': discount.quantity,
                        'discount_price': float(discount.discount_price),
                    }
                )
            else:
                strategy = NoDiscountStrategy()
                total += strategy.apply_discount(quantity, unit_price)

        return total
