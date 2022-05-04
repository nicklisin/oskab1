from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Offer
from backend.emails import send_status_email, send_checkoffer_email
import threading


@receiver(post_save, sender=Offer)
def post_offer_save(update_fields, created, **kwargs):
    instance = kwargs['instance']
    if update_fields is not None:
        if not created:
            if 'status' in update_fields:
                new_status = instance.status
                new_status_verbose = instance.get_status_display()
                supplier = instance.supplier
                email = instance.owner.email
                threading.Thread(target=send_status_email, args=(new_status_verbose, supplier, instance, email)).start()
                if new_status == 'prerejected' or new_status == 'onreview':
                    threading.Thread(target=send_checkoffer_email, args=(new_status_verbose, instance)).start()
