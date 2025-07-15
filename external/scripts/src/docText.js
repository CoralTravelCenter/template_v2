const docButton = document.querySelectorAll('[name="documentRecognitionButton"]');

if (docButton.length) {
    docButton.forEach(button => {
        button.addEventListener('click', (e) => {
            setTimeout(() => {
                const title = document.querySelector('.ant-modal-title');

                if (title) {
                    const createDiv = document.createElement('div');

                    createDiv.innerHTML = `
                        <p style="font-size: 14px; margin-bottom: 0;">
                            Загрузите скан или фото паспорта, и система распознает ваши данные автоматически и внесет в форму бронирования на сайте. <br>
                            Обязательно проверьте корректность данных! <br>
                            Загруженные фото паспортов не хранятся на сайте. <br>
                            Вы также можете внести паспортные данные вручную без использования функции распознавания. <br>
                        </p>
                    `;

                    title.insertAdjacentElement('afterend', createDiv);
                }
            }, 100);
        });
    });
}