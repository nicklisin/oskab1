from django.contrib import admin
from rangefilter.filters import DateRangeFilter, DateTimeRangeFilter
from admin_totals.admin import ModelAdminTotals
from django.db.models import Sum, Avg
from django.db.models.functions import Round
from django.db.models.functions import Coalesce

from backend.models import *


def has_group(user, group):
    return user.groups.filter(name=group).exists()


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('inn', 'name', 'status')
    search_fields = ['inn', 'name']
    list_filter = ('status',)


@admin.register(Offer)
class OfferAdmin(ModelAdminTotals):
    def get_queryset(self, request):
        qs = super(OfferAdmin, self).get_queryset(request)
        if has_group(request.user, "oskabstaff"):
            return qs.filter(status__in=['sended', 'onreview', 'prerejected', 'cancelled', 'accepted', 'rejected', 'done'])
        if has_group(request.user, "moderators"):
            return qs.filter(status__in=['onreview', 'prerejected', 'cancelled', 'accepted', 'rejected', 'done'])
        return qs

    def owner_email(self, obj):
        return obj.owner.email

    owner_email.short_description = 'Email'

    def supplier_status(self, obj):
        return obj.supplier.get_status_display()

    supplier_status.short_description = 'Статус поставщика'

    def offer_sum(self, obj):
        return obj.price * obj.weight

    offer_sum.short_description = 'Сумма'

    list_display = (
        'created', 'status', 'weight', 'price', 'supplier', 'supplier_status', 'offer_sum', 'delivery_date', 'determent', 'owner_email')
    search_fields = ['supplier__name', 'supplier__inn']
    list_filter = (('created', DateRangeFilter), ('delivery_date', DateRangeFilter), 'status', 'category')
    list_totals = [('weight', Sum), ('price', lambda price: Round(Avg(price), 2))]
    ordering = ['-created']
    readonly_fields = ['supplier', 'category', 'weight', 'impurity', 'price', 'determent', 'delivery_method',
                       'removal_address', 'delivery_range_from', 'delivery_range_max', 'delivery_date',
                       'delivery_range_price', 'created', 'updated', 'owner', 'owner_email']

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser:
            return []
        return self.readonly_fields

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == "status":
            kwargs['choices'] = (
                ('draft', 'Черновик'),
                ('sended', 'Отправлено'),
                ('onreview', 'На рассмотрении'),
                ('cancelled', 'Отозвано поставщиком'),
                ('prerejected', 'Предварительно отклонено'),
                ('done', 'Реализовано')
            )
            if has_group(request.user, "moderators"):
                kwargs['choices'] = (
                    ('onreview', 'На рассмотрении'),
                    ('cancelled', 'Отозвано поставщиком'),
                    ('prerejected', 'Предварительно отклонено'),
                    ('accepted', 'Принято'),
                    ('rejected', 'Отклонено'),
                    ('done', 'Реализовано')
                )
        return super().formfield_for_choice_field(db_field, request, **kwargs)

    def save_model(self, request, obj, form, change):
        if change:
            update_fields = []
            if form.initial['status'] != form.cleaned_data['status']:
                update_fields.append('status')
            obj.save(update_fields=update_fields)
        obj.save()


admin.site.register(WasteCategory)

admin.site.site_header = 'OSKAB'
