let elements = []

const selector = '#printer2-message';

const appConfig = (name, value, callbacks) => {
    OCP.AppConfig.setValue('printer2', name, value, callbacks)
}

const saveSettings = (key) => {
    const element = elements.get(key)
    let value
    let name

    if (jQuery(element).is('[data-checkbox]')) {
        name = jQuery(element).attr('data-name')
        const inputs = jQuery('input[name="' + name + '[]"]:checked')
        value = []

        inputs.each((i, v) => {
            value.push(v.value)
        })

        value = JSON.stringify(value)
    } else {
        name = jQuery(element).attr('name')
        value = jQuery(element).val()
    }

    const size = elements.length

    if (name === 'cache') {
        ++value
    }

    const callbacks = {
        success: () => {
            OC.msg.finishedSuccess(
                selector,
                t('printer2', (key + 1) + '/' + size)
            )

            if (key < size - 1) {
                saveSettings(++key)
            } else {
                OC.msg.finishedSuccess(selector, t('printer2', 'Saved'))
            }
        },
        error: () => {
            OC.msg.finishedError(selector, t('printer2', 'Error while saving "' + element + '"'))
        }
    }

    appConfig(name, value, callbacks)
}

jQuery(document).ready(() => {
    elements = jQuery('.printer2-setting')

    jQuery('#printer2-save').on('click', (event) => {
        event.preventDefault()
        OC.msg.startSaving(selector)

        saveSettings(0)
    });
});
