from django.urls import path
from checkout.views.cart_views import create_cart, add_to_cart, get_total
from checkout.views.product_views import ProductListView, ProductDetailView

urlpatterns = [
    path('create-cart/', create_cart),
    path('add-to-cart/', add_to_cart),
    path('get-total/', get_total),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<str:code>/', ProductDetailView.as_view(), name='product-detail')
]
