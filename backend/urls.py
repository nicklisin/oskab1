from rest_framework import routers
from backend.api import SupplierViewSet, OfferViewSet, WasteCategoryViewSet

router = routers.DefaultRouter()
router.register('api/suppliers', SupplierViewSet, 'suppliers')
router.register('api/offers', OfferViewSet, 'offers')
# router.register('api/offers/<id:pk>', OfferViewSet, 'offer-update')
router.register('api/categories', WasteCategoryViewSet, 'categories')

urlpatterns = router.urls
