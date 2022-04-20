from django.contrib import admin

from backend.models import *


def has_group(user, group):
    return user.groups.filter(name=group).exists()


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('inn', 'name', 'status')
    search_fields = ['inn', 'name']
    list_filter = ('status',)


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super(OfferAdmin, self).get_queryset(request)
        if has_group(request.user, "oskabstaff"):
            return qs.filter(status__in=['sended', 'onreview', 'prerejected', 'accepted', 'rejected'])
        if has_group(request.user, "moderators"):
            return qs.filter(status__in=['onreview', 'prerejected', 'accepted', 'rejected'])

    def owner_email(self, obj):
        return obj.owner.email
    owner_email.short_description = 'Email'

    list_display = ('weight', 'supplier', 'price', 'created', 'status', 'owner_email')
    search_fields = ['status']
    list_filter = ('status', 'category')
    ordering = ['created']
    readonly_fields = ['supplier', 'category', 'weight', 'impurity', 'price', 'delivery_method',
    'removal_address', 'delivery_range_from', 'delivery_range_max',
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
                ('prerejected', 'Предварительно отклонено'),

            )
            if has_group(request.user, "moderators"):
                kwargs['choices'] = (
                    ('onreview', 'На рассмотрении'),
                    ('prerejected', 'Предварительно отклонено'),
                    ('accepted', 'Принято'),
                    ('rejected', 'Отклонено'),
                    )
        return super().formfield_for_choice_field(db_field, request, **kwargs)


admin.site.register(WasteCategory)

admin.site.site_header = 'OSKAB'
