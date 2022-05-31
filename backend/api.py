from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from backend.models import Supplier, WasteCategory, Offer
from rest_framework import viewsets, permissions
from backend.serializers import SupplierSerializer, OfferSerializer, WasteCategorySerializer


class SetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 20


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
    pagination_class = SetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filter_fields = ['updated', 'created']
    ordering = '-updated'
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
