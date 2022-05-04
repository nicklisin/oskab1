from django.core.mail import send_mail
from django.contrib.auth.models import User


def send_status_email(new_status, supplier, instance, email):
    send_mail(
        f'Статус предложения изменен. Новый статус: {new_status}',
        f'Для вашего предложения от {supplier} ({instance}), был изменен статус. \nНовый статус: {new_status}',
        'no-reply@oskab.ru',
        [email],
        fail_silently=False
    )


def send_newoffer_email(instance):
    staff_emails = []
    staff_users = User.objects.filter(groups__name='oskabstaff')
    for person in staff_users:
        staff_emails.append(person.email)

    for email in staff_emails:
        send_mail(
            f'Добавлено новое предложение',
            f'В систему было добавлено новое предложение: {instance}',
            'no-reply@oskab.ru',
            [email],
            fail_silently=False
        )


def send_checkoffer_email(new_status_verbose, instance):
    moderator_emails = []
    moderator_users = User.objects.filter(groups__name='moderators')
    for person in moderator_users:
        moderator_emails.append(person.email)

    for email in moderator_emails:
        send_mail(
            f'Предложение требует проверки',
            f'Необходимо утвердить статус ({new_status_verbose}) для предложения: {instance}',
            'no-reply@oskab.ru',
            [email],
            fail_silently=False
        )
