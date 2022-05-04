from rest_framework import serializers
from backend.models import Supplier, WasteCategory, Offer
import threading
from backend.emails import send_newoffer_email, send_checkoffer_email


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

    def update(self, instance, validated_data):
        status = validated_data.get('status', instance.status)
        if status == 'sended':
            threading.Thread(target=send_newoffer_email, args={instance}).start()
        instance.supplier = validated_data.get('supplier', instance.supplier)
        instance.category = validated_data.get('category', instance.category)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.impurity = validated_data.get('impurity', instance.impurity)
        instance.price = validated_data.get('price', instance.price)
        instance.status = validated_data.get('status', instance.status)
        instance.delivery_method = validated_data.get('delivery_method', instance.delivery_method)
        instance.removal_address = validated_data.get('removal_address', instance.removal_address)
        instance.delivery_range_from = validated_data.get('delivery_range_from', instance.delivery_range_from)
        instance.delivery_range_max = validated_data.get('delivery_range_max', instance.delivery_range_max)
        instance.delivery_range_price = validated_data.get('delivery_range_price', instance.delivery_range_price)
        instance.created = validated_data.get('created', instance.created)
        instance.updated = validated_data.get('updated', instance.updated)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance

    class Meta:
        model = Offer
        fields = ('id', 'category', 'supplier', 'weight', 'impurity', 'price', 'status', 'delivery_method', 'removal_address', 'delivery_range_from', 'delivery_range_max', 'delivery_range_price', 'created', 'updated', 'owner', 'supplier_name', 'category_name', 'status_name', 'delivery_method_name')
        extra_kwargs = {'removal_address': {'required': False, 'allow_null': True}, 'delivery_range_from': {'required': False, 'allow_null': True}, 'delivery_range_max': {'required': False, 'allow_null': True}, 'delivery_range_price': {'required': False, 'allow_null': True}}


class WasteCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteCategory
        fields = '__all__'
