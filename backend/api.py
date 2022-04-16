from rest_framework.response import Response

from backend.models import Supplier, WasteCategory, Offer
from rest_framework import viewsets, permissions
from backend.serializers import SupplierSerializer, OfferSerializer, WasteCategorySerializer


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = SupplierSerializer

    def get_queryset(self):
        return self.request.user.suppliers.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OfferSerializer

    def get_queryset(self):
        try:
            supplier = self.request.query_params['supplier']
            if supplier:
                return Offer.objects.filter(owner=self.request.user, supplier=self.request.query_params['supplier'])
            else:
                return Offer.objects.filter(owner=self.request.user)
        except:
            return Offer.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WasteCategoryViewSet(viewsets.ModelViewSet):
    queryset = WasteCategory.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = WasteCategorySerializer
