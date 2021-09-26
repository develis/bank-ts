// // Validação login e cadastro

// //Email / O mesmo para cadastro
// $("#email").blur(function () {
//     var email = $('#email').val();
//     var email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//     var checagem = email_regex.test(email)
//     if (!checagem) {
//         $('#email').css('borderColor', 'red');
//     } else {
//         $('#email').css('borderColor', 'green');
//     }
// });

// //Senha / O mesmo para cadastro

// //Pelo menos uma letra maiúscula
// //Pelo menos uma letra minúscula
// //Pelo menos um dígito
// //Pelo menos um caractere especial

// $("#password").blur(function (){
//     var senha = $("#password").val();
//     var senha_regex = new RegExp (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/);
//     var checagem = senha_regex.test(senha)
//     if(!checagem){
//         $("#password").css("borderColor", "red");
//     }else{
//         $("#password").css("borderColor", "green");
//     }
// });

// // validação para cadastro

// // campo nome

// $("#name").blur(function () {
//     var nome = $("#name").val();
//     if (nome == '') {
//         $("#name").css('borderColor', 'red');
//     } else {
//         $("#name").css('borderColor', 'green');
//     }
// });

// // campo CPF

// $("#cpf").blur(function () {
//     var cpfCadastro = $('#cpf').val();
//     var cpf_regex = new RegExp(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/);
//     var checagem = cpf_regex.test(cpfCadastro)
//     if (!checagem) {
//         $('#cpf').css('borderColor', 'red');
//     } else {
//         $('#cpf').css('borderColor', 'green');
//     }
// });

// // campo conta

// $("#conta").blur(function () {
//     var conta = $("#conta").val();
//     if (conta.length < 4 ) {
//         $("#conta").css('borderColor', 'red');
//     } else {
//         $("#conta").css('borderColor', 'green');
//     }
// });

// // agencia

// $("#agencia").blur(function () {
//     var agenciaValida = $("#agencia").val();
//     var agencia_regex = new RegExp(/^([0-9]{4})$/);
//     var checagem = agencia_regex.test(agenciaValida)
//     if (!checagem) {
//         $('#agencia').css('borderColor', 'red');
//     } else {
//         $('#agencia').css('borderColor', 'green');
//     }
// });
