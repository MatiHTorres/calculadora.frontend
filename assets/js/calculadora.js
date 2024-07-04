$(function() {
    
    var num1 = '0';
    var num2 = '0';
    var operador = '';
    var resultado = '';
    var mensaje = '';

    var displayPrimario = $('.displayPrincipal')
    var displaySecundario = $('.displaySuperior')

    display();

    $('.calculadora').on('click', function(e){

        switch(e.target.id){
            case 'borrarUno':
                borrarUno();
                break;
            case 'borrarDos':
                borrarAbajo();
                break;
            case 'borrarTodo':
                borrarTodo();
                break;
            case '1':
                agregarNumero('1');
                break;
            case '2':
                agregarNumero('2');
                break;
            case '3':
                agregarNumero('3');
                break;
            case '4':
                agregarNumero('4');
                break;
            case '5':
                agregarNumero('5');
                break;
            case '6':
                agregarNumero('6');
                break;
            case '7':
                agregarNumero('7');
                break;
            case '8':
                agregarNumero('8');
                break;
            case '9':
                agregarNumero('9');
                break;
            case '0':
                agregarNumero('0');
                break;
            case 'division':
                agregarOperador('/');
                break;
            case 'multiplicar':
                agregarOperador('*');
                break;
            case 'restar':
                agregarOperador('-');
                break;
            case 'sumar':
                agregarOperador('+');
                break;
            case 'punto':
                agregarPunto();
            case 'igual':
                calcular();

        }
        display();

    });

    function display() {
        
        if (mensaje !== '') {
            displayPrimario.val(mensaje);
            mensaje = '';
        } else if (resultado !== '') {
            displayPrimario.val(resultado);
        } else if (operador === '') {
            displaySecundario.val('')
            displayPrimario.val(num1);
        } else {  
            displaySecundario.val(num1 + ' ' + operador);
            displayPrimario.val(num2);
        }

        
    }

    function borrarUno() {
        if (operador === '') {
            num1 = borrarNumero(num1);
        } else {
            num2 = borrarNumero(num2);
        }
    }

    function borrarNumero(num) {
        if (num.length > 1) {
            return num.substring(0, num.length - 1);
        }
        return '0';
    }

    function borrarAbajo() {
        if (resultado !== '') {
            resultado = '';
        }
        if (operador === '') {
            num1 = '0';
        } else {
            num2 = '0';
        }
    }

    function borrarTodo() {
        num1 = '0';
        num2 = '0';
        operador = '';
        resultado = '';
    }

    function agregarNumero(digito) {
        if (resultado !== '') {
            resultado = '';
        }
        if (operador === '') {
            num1 = nuevoNumero(num1, digito);
            
        } else {
            num2 = nuevoNumero(num2, digito);
            
        }
    }

    function nuevoNumero(num, digito) {
        if (num === '0') {
            return digito;
        }
        return num + digito;
    }

    function agregarOperador(ope) {
        if (resultado !== '') {
            num1 = resultado;
            resultado = '';
        }
        if (operador === '') {
            operador = ope;
        } else if (parseFloat(num2) === 0) {
            operador = ope;
        } else {
            calcular();
            agregarOperador(ope);
        }
    }

    function agregarPunto() {
        if (operador === '') {
            num1 = numeroConPunto(num1);
        } else {
            num2 = numeroConPunto(num2);
        }
    }

    function numeroConPunto(num) {
        if (num.indexOf('.') === -1) {
            return num + '.';
        }
        return num;
    }

    function calcular() {
        if (num1 === '' || num2 === '' || operador === '') {
            return;
        }
        if (operador === '/') {
            dividir();
        } else {
            mostrarResultado(eval(num1 + operador + num2));
        }
    }

    function dividir() {
        if (parseFloat(num2) === 0) {
            borrarTodo();
            mensaje = 'Error al Dividir';
            return;
        }
        mostrarResultado(eval(num1 + operador + num2));
    }

    function mostrarResultado(res) {
        borrarTodo();
        resultado = res;
    }


});