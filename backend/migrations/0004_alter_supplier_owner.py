# Generated by Django 4.0.3 on 2022-03-19 23:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0003_alter_offer_options_alter_supplier_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='suppliers', to=settings.AUTH_USER_MODEL),
        ),
    ]
