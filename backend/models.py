from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


class Supplier(models.Model):
    STATUS_CHOICES = [
        ('unverified', 'Не проверен'),
        ('verified', 'Проверен'),
        ('blocked', 'Заблокирован')
    ]
    inn = models.CharField(max_length=12, unique=True, verbose_name='ИНН')
    name = models.CharField(max_length=100, verbose_name='Наименование')
    address = models.CharField(max_length=500)
    license = models.CharField(max_length=20)
    status = models.CharField(choices=STATUS_CHOICES, default='unverified', max_length=20, verbose_name='Статус')
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name='suppliers', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.name} ({self.get_status_display()})'

    class Meta:
        verbose_name = "Поставщик"
        verbose_name_plural = "Поставщики"
        ordering = ['name']


class WasteCategory(models.Model):
    name = models.CharField(max_length=70)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория отходов"
        verbose_name_plural = "Категории отходов"


class Offer(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Черновик'),
        ('sended', 'Отправлено'),
        ('onreview', 'На рассмотрении'),
        ('prerejected', 'Предварительно отклонено'),
        ('accepted', 'Принято'),
        ('rejected', 'Отклонено'),
        ('todelete', 'На удаление'),
        ('done', 'Реализовано')
    ]
    DELIVERY_CHOICES = [
        ('removal', 'Вывоз'),
        ('delivery', 'Доставка')
    ]
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, verbose_name='Поставщик')
    category = models.ForeignKey(WasteCategory, on_delete=models.CASCADE, verbose_name='Категория')
    weight = models.PositiveIntegerField(default='', verbose_name='Вес, кг')
    impurity = models.PositiveSmallIntegerField(default='', verbose_name='Засор, %')
    price = models.PositiveIntegerField(default='', verbose_name='Цена, ₽/кг')
    status = models.CharField(choices=STATUS_CHOICES, default='draft', max_length=20, verbose_name='Статус')
    delivery_method = models.CharField(choices=DELIVERY_CHOICES, max_length=20, verbose_name='Способ поставки')
    removal_address = models.CharField(max_length=300, verbose_name='Адрес вывоза', null=True, blank=True)
    delivery_range_from = models.CharField(max_length=500, verbose_name='Доставка из', null=True, blank=True)
    delivery_range_max = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5000)], verbose_name='Макс. расстояние доставки', null=True, blank=True)
    delivery_range_price = models.PositiveSmallIntegerField(default=0, verbose_name='Стоимость доставки, ₽/км', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated = models.DateTimeField(auto_now=True, verbose_name='Обновлено')
    owner = models.ForeignKey(User, related_name='offers', on_delete=models.CASCADE, null=True, verbose_name='Пользователь')
    comment = models.TextField(max_length=1000, null=True, blank=True, verbose_name='Комментарий')

    def __str__(self):
        return '%s %s %s кг' % (self.supplier, self.category, self.weight)

    class Meta:
        verbose_name = "Предложение"
        verbose_name_plural = "Предложения"
        ordering = ['-updated']


