from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from checkout.models.cart import Cart, CartItem
from checkout.models.product import Product
from checkout.services.checkout_service import CheckoutService

@csrf_exempt
def create_cart(request):
    cart = Cart.objects.create()
    return JsonResponse({'cart_id': cart.id})


@csrf_exempt
def add_to_cart(request):
    data = json.loads(request.body)
    cart = Cart.objects.get(id=data['cart_id'])
    product = Product.objects.get(code=data['product_code'])

    item, _ = CartItem.objects.get_or_create(cart=cart, product=product)
    item.quantity += data.get('quantity', 1)
    item.save()

    return JsonResponse({'message': 'Item added'})


@csrf_exempt
def get_total(request):
    data = json.loads(request.body)
    print(data)
    cart = Cart.objects.get(id=data['cart_id'])
    checkout = CheckoutService(cart)
    total = checkout.total()
    return JsonResponse({'total': total})
