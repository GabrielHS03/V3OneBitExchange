document.addEventListener('turbolinks:load', function() {
    document.getElementById('exchange_form').addEventListener('ajax:success', function(event) {
        let [result] = event.detail
        document.getElementById('result').value = result.value
    })
})

document.addEventListener('turbolinks:load', function() {
    exchange_coin()
    invert_coin()
})


function exchange_coin () {
    var source_currency = document.getElementById('source_currency')
    var amount = document.getElementById('amount')
    var target_currency = document.getElementById('target_currency')

    amount.addEventListener('blur', function() {
        var ajax = new XMLHttpRequest()

        ajax.open('GET', '/convert?source_currency=' + source_currency.value + '&amount=' + amount.value + '&target_currency=' + target_currency.value )
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

        ajax.send()

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var data = JSON.parse(ajax.response)
                document.getElementById('result').value = data.value
            }
        }

    })
}

function invert_coin () {
    document.getElementById('invert').addEventListener('click', function() {
        var target_currency = document.getElementById('target_currency')
        var source_currency = document.getElementById('source_currency')
        var aux

        aux = target_currency.value
        target_currency.value = source_currency.value
        source_currency.value = aux
        
    })
}