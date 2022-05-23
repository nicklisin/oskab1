import React, {Component} from 'react';

class Help extends Component {

    render() {

    return (
        <div className="mb-5">
        <h1>Справка</h1>

        <h2>Начало работы</h2>
            <p>Сайт lk.oskab.ru предназначен для работы с юридическими лицами, которые хотят поставлять свинецсодержащее сырье ГК МАГЛЮГ. Обязательным условием является наличие действующей лицензии и согласие с <a href="#/help/legal">уловиями</a>.</p>

            <p>Для начала работы требуется пройти процедуру <a href="#/register">регистрации</a>. При регистрации необходимо указывать работающий адрес электронной почты, в противном случае работа с системой будет невозможна. На данную почту будут приходить уведомления о смене статусов рассмотрения заявок (Предложений). После входа в личный кабинет, необходимо добавить компанию, указав актуальные данные компании, начиная с ИНН. Для одной компании может быть создан только один аккаунт. После создания, компании-поставщику присваивается статус "Не проверен". После проверки модератором данных компании, статус будет изменен на "Проверен".</p>

        <h2>Создание и отправка предложений</h2>
        <p>В разделе Сделки нажмите кнопку "Добавить предложение", после чего заполните категорию сырья, вес (брутто) в кг, засор (в %), цену (в рублях за кг), длительность отсрочки платежа после отгрузки (в банковских днях, минимум – 5), а также укажите предпочитаемый способ поставки. На данный момент доступны два варианта поставки сырья – самовывоз нашим транспортом с площадки поставщика и доставка вашим транспортом на наш пункт приема. После ввода всех данных, нажмите кнопку "Добавить" для сохранения предложения.
        После этого предложение получает статус "Черновик".</p>

        <p>В списке предложений нажмите на иконку с карандашом в строке нужного предложения. После отправки предложение нельзя редактировать, поэтому еще раз проверьте правильность введенной информации, затем выберите статус "К отправке" и нажмите кнопку "Отправить на проверку".</p>

        <p>Статус предложения изменится на "Отправлено".
        Далее последует процедура проверки предложения. По мере его рассмотрения, вы можете получить уведомления на почту со сменой статуса на: "На проверке", "Принято", "Предварительно отклонено", "Отклонено".</p>


        <h2>Статусы предложений</h2>
        <p>Черновик – предложение находится на стадии подготовки и редактирования.<br />
        Отправлено – предложение отправлено и в ближайшее время будет рассмотрено (срок рассмотрения – не более 24 часов).<br />
        На проверке – предложение получено и рассматривается.<br />
        Принято – предложение принято, ожидайте письма от менеджера для заключения договора поставки. При переписке, обязательно ставьте в копию адрес copy@oskab.ru.<br />
        Предварительно отклонено – предложение находится на дополнительном согласовании.<br />
        Отклонено – предложение отклонено. Попробуйте отправить предложение с иными условиями.<br />
        Реализовано – статус для предложений, по которым был осуществлен прием и расчет.
        </p>

        <p><a href="#/help/legal">Условия оказания услуг Пользователям Сайта oskab.ru</a> (редакция от 07.05.22)</p>

        </div>
    )
    }
}

export default Help;