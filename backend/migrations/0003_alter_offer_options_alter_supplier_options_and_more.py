# Generated by Django 4.0.3 on 2022-03-16 15:58

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0002_alter_supplier_inn'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='offer',
            options={'ordering': ['created'], 'verbose_name': 'Предложение', 'verbose_name_plural': 'Предложения'},
        ),
        migrations.AlterModelOptions(
            name='supplier',
            options={'ordering': ['name'], 'verbose_name': 'Поставщик', 'verbose_name_plural': 'Поставщики'},
        ),
        migrations.AlterModelOptions(
            name='wastecategory',
            options={'verbose_name': 'Категория отходов', 'verbose_name_plural': 'Категории отходов'},
        ),
        migrations.AddField(
            model_name='offer',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='offers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='supplier',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='offers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='offer',
            name='delivery_range_max',
            field=models.PositiveSmallIntegerField(default='', validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5000)]),
        ),
        migrations.AlterField(
            model_name='offer',
            name='delivery_range_price',
            field=models.PositiveSmallIntegerField(default=''),
        ),
        migrations.AlterField(
            model_name='offer',
            name='impurity',
            field=models.PositiveSmallIntegerField(default=''),
        ),
        migrations.AlterField(
            model_name='offer',
            name='price',
            field=models.PositiveIntegerField(default=''),
        ),
        migrations.AlterField(
            model_name='offer',
            name='weight',
            field=models.PositiveIntegerField(default=''),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='inn',
            field=models.CharField(max_length=12, unique=True, verbose_name='ИНН'),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Наименование'),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='status',
            field=models.CharField(choices=[('unverified', 'Не проверен'), ('verified', 'Проверен'), ('blocked', 'Заблокирован')], default='unverified', max_length=20, verbose_name='Статус'),
        ),
    ]
