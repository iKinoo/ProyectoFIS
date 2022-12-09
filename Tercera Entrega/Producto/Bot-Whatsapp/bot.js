
const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');

const express = require('express');
const exceljs = require('exceljs');
const moment = require('moment')
const fs = require('fs');
const { captureRejections } = require('stream');

let viewCarState = true

let allMenu = new Map();

allMenu.set(1, 'Torta Asada');
allMenu.set(2, 'Torta Jamón y Queso');
allMenu.set(3, 'Torta de Empanizado');
allMenu.set(4, 'Torta Cubana');
allMenu.set(5, 'Torta de Relleno Negro')
allMenu.set(6, 'Empanadas');
allMenu.set(7, 'Hamburguesa');
allMenu.set(8, 'Pizza')

let clientMenu = new Map();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});


/**
 * Esta funcion se encargara de recibir los mensajes
 */

const listenMessage = () => {
    client.on('message', async msg => {
        const { from, to, body } = msg;


        console.log(from, to, body);
        chooseStep(from, body);
        saveHistorial(from, body);

    });

}

/**
 * Esta funcion se encargara de escoger el paso para poder escogher el mensaje a enviar
 */

const chooseStep = (to, message) => {
    switch (message) {
        case 'Hola':
            chooseMessage('STEP 1', to, message)
            break;
        case 'hola':
            chooseMessage('STEP 1', to, message)
            break;
        case 'ola':
            chooseMessage('STEP 1', to, message)
            break;
        case 'Buenos dias':
            chooseMessage('STEP 1', to, message)
            break;
        case 'Que tal':
            chooseMessage('STEP 1', to, message)
            break;
        case 'Hla':
            chooseMessage('STEP 1', to, message)
            break;
        case 'Hol':
            chooseMessage('STEP 1', to, message)
            break;
        case 'Hacer pedido':
            chooseMessage('STEP 2', to, message)
            break;
        case 'Aviso de privacidad':
            chooseMessage('STEP 0', to, message)
            break;
        case 'Remover':
            chooseMessage('STEP REMOVE', to, message)
            break;
        case 'Finalizar':
            chooseMessage('STEP PRE_FINAL', to, message)
            break;
        case 'Ordenar':
            chooseMessage('STEP FINAL', to, message)
            break;
        case 'Editar':
            chooseMessage('STEP EDIT', to, message)
            break;
        default:
            if (allMenu.has(parseInt(message))) {
                chooseMessage('STEP FOOD', to, message);
            } else if (checkEdit(message) == true) {
                chooseMessage('STEP DELETE', to, message);
            }
    }
}
/**
 * Esta funcion se encargara de escoger el mensaje a  enviar en base al paso
 */
const chooseMessage = (step, to, message) => {
    switch (step) {
        case 'STEP 0':
            sendMessage(to, 'Se utilizarán sus datos de pedidos para un fin estadístico, no se lucrará con su información🤝.')
            break;
        case 'STEP 1':
            let button = new Buttons('Bienvenido al servicio automatizado🤖 de pedidos de la cafetería FMAT.', [{ body: 'Hacer pedido' }, { body: 'Aviso de privacidad' }]);
            sendMessage(to, button);
            break;
        case 'STEP 2':
            let menuView = viewMenu();
            sendMessage(to, `Para seleccionar una comida, escriba el número que corresponda (Ej. *1* para torta de asada) ${menuView}`);
            break;
        case 'STEP FOOD':
            let btn = new Buttons(`Se ha agregado ${allMenu.get(parseInt(message))} al carrito🍴`, [{ body: 'Remover' }, { body: 'Finalizar' }]);
            addFoodToCar(parseInt(message))
            sendMessage(to, btn);
            break;
        case 'STEP REMOVE':
            sendMessage(to, 'Eliminando alimento del carrito')
            break;
        case 'STEP EDIT':
            var car = viewCar();
            var buttonListEdit = editMenu();
            var buttonEdit = new Buttons(`Pulse en cada comida que desea eliminar de su carrito. \nSu carrito es: ${car}`, buttonListEdit, 'Editando', 'Cuando termine de editar, pulse *Finalizar* para continuar con su pedido.')
            console.log(buttonListEdit)
            sendMessage(to, buttonEdit)
            break;
        case 'STEP DELETE':
            var btnStop = new Buttons(`Se ha eliminado ${message} de su carrito`, [{ body: 'Finalizar' }])
            sendMessage(to, btnStop)
            break;
        case 'STEP PRE_FINAL':
            var car = viewCar();
            if (viewCarState == true) {
                var btnConfirm = new Buttons(`Su carrito es: ${car}`, [{ body: 'Ordenar' }, { body: 'Editar' }], 'Carrito');
                sendMessage(to, btnConfirm)
            } else {
                sendMessage(to, car)
            }

            break;
        case 'STEP FINAL':
            sendMessage(to, 'Su pedido está en proceso que se confirme por parte de la cafeteria, agradecemos su preferencia! 😊')
            clientMenu.clear();
            break;

    }
}

/**
 * 
 * Esta funcion retorna una lista de botones dependiendo del menu del cliente 
 */

const editMenu = () => {
    var buttonList = new Array()
    clientMenu.forEach(element => {
        buttonList.push({ body: element })
    })
    return buttonList
}

/**
 * 
 * Esta funcion devuelve un bool para saber si esta editando el mensaje
 */
const checkEdit = (message) => {
    var deleteState = false
    clientMenu.forEach((element, key) => {
        if (element == message) {
            deleteState = true
            clientMenu.delete(key);
        }
    })
    return deleteState
}

/**
 * 
 * Esta funcion devuelve el texto el menu de la cafeteria
 */

const viewMenu = () => {
    var text = '';
    allMenu.forEach((food, key) => {
        text = text + '\n' + `*${key}*. ${food}`
    })
    return text
}

/**
 * 
 * Esta funcion devuelve el texto del carrito del cliente
 */

const viewCar = () => {
    var text = ''
    if (clientMenu.size > 0) {
        viewCarState = true
        clientMenu.forEach((food, key) => {
            text = text + '\n' + `*${key}*. ${food}`
        })
        return text
    } else {
        viewCarState = false
        return text = "No se encuentra nada en su carrito. Para seleccionar una comida, escriba el numero que corresponda (Ej. *1* para torta de asada)"
    }
}

/**
 * 
 * Esta funcion permite guardar la comida en un carrito
 */

const addFoodToCar = (key) => {
    var food = allMenu.get(key);
    clientMenu.set(key, food);
    console.log('Comida añadida!')
}

/**
 * Esta funcion se encargara de mandar los mensajes
 */
const sendMessage = (to, message) => {
    client.sendMessage(to, message)

}

const saveHistorial = (number, message) => {
    const pathChat = `./chats/${number}.xlsx`;
    const workBook = new exceljs.Workbook();
    const today = moment().format('DD-MM-YY hh:mm')

    if (fs.existsSync(pathChat)) {
        workBook.xlsx.readFile(pathChat)
            .then(() => {

            })
    } else {
        const worksheet = workBook.addWorksheet('Chats');
        worksheet.columns = [
            { header: 'Fecha', key: 'date' },
            { header: 'Mensaje', key: 'message' },
        ]
        worksheet.addRow([today, message]);
        workBook.xlsx.writeFile(pathChat)
            .then(() => {
                console.log('Historial creado');
            })
            .catch(() => {
                console.log('Algo fallo');
            })
    }
}

const onCreate = () => {



    client.initialize();

    client.on('loading_screen', (percent, message) => {
        console.log('LOADING SCREEN', percent, message);
    });

    client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        console.log('QR RECEIVED', qr);
    });

    client.on('authenticated', () => {
        console.log('AUTHENTICATED');
    });

    client.on('auth_failure', msg => {
        // Fired if session restore was unsuccessful
        console.error('AUTHENTICATION FAILURE', msg);
    });

    client.on('ready', () => {
        console.log('READY');
        listenMessage();
    });
}

onCreate();


