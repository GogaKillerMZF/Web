let table_area = document.getElementById('table_area')
let result_area = document.getElementById('result_area')
let result = document.getElementById('result')
let error_message = document.getElementById('error_message')


function get_rand_num(m, n) {
    return [Math.floor(Math.random() * m), Math.floor(Math.random() * n)]
}


function create_mass(m, n, max) {
    let nums = {}
    res = new Array(m)
    let x = 0
    let y = 0
    for (let i = 0; i < res.length; i++) {
        res[i] = new Array(n).fill(0)
    }
    for (let i = 1; i <= max; i++) {
        let args = get_rand_num(m, n)
        while (res[args[0]][args[1]] != 0)
            args = get_rand_num(m, n)
        res[args[0]][args[1]] = i
        nums[i] = args
    }
    return [res, nums]
}

function get_data() {

}

function find_answer(mas, dict, max) {
    res = 0
    const abs = Math.abs
    for (let i = 1; i < max; i++) {
        res += (abs(dict[i][0] - dict[i + 1][0]) + abs(dict[i][1] - dict[i + 1][1]))
    }
    create_table(mas)
    document.getElementById('input_res').innerHTML = res
    return res
}


function create_table(mas) {
    let table = document.getElementById('table')
    while (table.rows.length > 0)
        table.deleteRow(0)
    for (let i = 0; i < mas.length; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < mas[i].length; j++) {
            let td = document.createElement('td')
            td.innerHTML = mas[i][j]
            tr.append(td)
        }
        table.append(tr)
    }
    table_area.style.visibility = 'visible'
}


function is_massive(mas) {
    if (typeof(mas) == typeof([]))
        return true
    else
        return false
}


function is_Number(num) {
    if (typeof(num) == typeof(0))
        return true
    else
        return false
}


// находим кнопку для создания области с клетками в документе по id и добавляем событие при нажатии
document.getElementById('create_area').onclick = function() {
    // находим формы и считываем с них данные
    try {
        let m_str = document.getElementById('input_m').value
        let n_str = document.getElementById('input_n').value
        let max_str = document.getElementById('input_max_number').value
        if (n_str.length == 0 || m_str.length == 0 || max_str == 0)
            throw new Empty("Пустое значение поля.")
        let n = Number(n_str)
        let m = Number(m_str)
        let max = Number(max_str)
        if (max > m * n) {
            throw new TooMuch('Значение переменной max больше возможного (' + m * n + ').')
        }
        let mas = create_mass(m, n, max)
        find_answer(mas[0], mas[1], max)
    } catch (e) {
        errorMessage("Некорректные входные данные. " + e.message)
    }
}


function Empty(message) {
    this.message = message
    this.name = "Empty"
}


function TooMuch(message) {
    this.message = message
    this.name = "TooMuch"
}


function errorMessage(message) {
    error_message.textContent = message
    error_message.classList.toggle('visible')

    window.setTimeout(function() {
        error_message.classList.toggle('visible')
    }, 2400)
}