from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
    @abstractmethod
    def apply_discount(self, quantity: int, unit_price: float, discount_data) -> float:
        pass
