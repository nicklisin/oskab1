from rest_framework import serializers
from backend.models import Supplier, WasteCategory, Offer


class SupplierSerializer(serializers.ModelSerializer):
    status_name = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Supplier
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    status_name = serializers.CharField(source='get_status_display', read_only=True)
    supplier_name = serializers.ReadOnlyField(source='supplier.name')
    category_name = serializers.ReadOnlyField(source='category.name')
    delivery_method_name = serializers.CharField(source='get_delivery_method_display', read_only=True)

    class Meta:
        model = Offer
        fields = ('id', 'category', 'supplier', 'weight', 'impurity', 'price', 'status', 'delivery_method', 'removal_address', 'delivery_range_from', 'delivery_range_max', 'delivery_range_price', 'created', 'updated', 'owner', 'supplier_name', 'category_name', 'status_name', 'delivery_method_name')
        extra_kwargs = {'removal_address': {'required': False, 'allow_null': True}, 'delivery_range_from': {'required': False, 'allow_null': True}, 'delivery_range_max': {'required': False, 'allow_null': True}, 'delivery_range_price': {'required': False, 'allow_null': True}}


class WasteCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteCategory
        fields = '__all__'
