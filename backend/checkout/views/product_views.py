from rest_framework import generics
from checkout.models.product import Product
from checkout.serializers.product_serializers import ProductSerializer

# List all products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Retrieve single product by ID or code
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'code'  # You can also use 'id' if preferred
