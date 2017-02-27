var execute = new function(){

    this.run = function(){

        var seccion = "home";

        if(utils.getParameterByName("s")){
            seccion = utils.getParameterByName("s");
        }

        vistas.global();

        try{

            eval("vistas." + seccion + "()");

        }catch(err){

            console.log(err);
        }


    };

};

var validator = {

    startValidations : function(){

        $('.validation-form').submit(function(e){

            e.preventDefault();

            var validated = true;

            $(this).find('input').each(function(){
                try{
                    if(!validator.validateInput($(this).attr('class'),$(this).val(),$(this))){
                        validated = false;
                    }
                }catch(err){
                    console.log(err);
                }
            });

            if(validated){
                $(this).unbind().submit();
            }else{
                $("<div class='message-validation'>Valida todos los datos requeridos</div>").dialog({"modal" : true});
            }


        });

    },


    validateInput : function(type, val, selector){

        type = type.split(" ");
        var valid = true;
        for(var i = 0; i < type.length; i++){

            var tmp = type[i];
            tmp = tmp.split('validation-');

            if(tmp.length > 1){

                if(!validator.validator(tmp[1],val, selector)){
                    valid = false;

                }
            }
        }

        return valid;

    },

    validator : function(type, val, selector){

        var validated = true;

        switch(type){

            case "tel":
                var patt = new RegExp("^[1-9]{10}$");
                var telefono = val;
                if (!patt.test(telefono)){
                    validated = false;
                }
                break;

            default:
                if(typeof val === "undefined" || val == "" ){
                    validated = false;
                }

                break;
        }

        if(!validated){
            validator.changeColor(selector,"error");
        }else{
            validator.changeColor(selector,"regular");
        }

        return validated;

    },

    changeColor : function(selector, type){


        switch(type){

            case "error":
                $(selector).css({"color":"#cc0000"});
                $(selector).parent().parent().find('.input').find('.form-control').css({"border":"1px solid #cc0000"});
                break;
            case "regular":
                $(selector).css({"color":"inherit"});
                $(selector).parent().parent().find('.input').css({"color":"inherit"});

                break;

        }


    }

};


var checkout = {

    addToCart: function(id, qty){

        //$.removeCookie('cart');
        var content = $('#' +  id).html();
        var cart = checkout.getCart();

        try{
            cart.cartitems["item-" + id].qty = parseInt(cart.cartitems["item-" + id].qty) + 1;
        }catch(err){
            console.log(err);
            cart.cartitems["item-" + id] = {qty:1,html:"<div>ITEM HTML</div>"};
        }

        checkout.setCart(cart);
        checkout.refreshCart();

        //console.log(cart);
    },

    getCart: function(){

        if($.cookie('cart')){
            return JSON.parse($.cookie('cart'));
        }else{
            $.cookie('cart', JSON.stringify({cartitems:{}}));
            return JSON.parse($.cookie('cart'));
        }

    },

    setCart: function(cart){
        var newCart = JSON.stringify(cart);
        $.cookie('cart', newCart);
    },

    getCartItemCount: function(){
        var cart = checkout.getCart().cartitems;
        var howmany = 0;
        for(key in cart){
           howmany += parseInt(cart[key].qty);
        }
        return howmany;
    },

    refreshCart: function(){
        var howmany = checkout.getCartItemCount();
        $('#cart-qty').html("<span>" + howmany + "</span>");
    },
    getSolucionesData: function(){

        var soluciones = {
            dolcegusto: {
                nombre: 'Dolcegusto',
                costotaza:'$8.00 - $16.00',
                preparacion:'Cápsulas',
                tipobebida:'Café, té y chocolate',
                variedades: '24',
                imagen: '/bootstrap/assets/images/solucion/producto-stick.jpg'
            },
            testerchoice: {
                nombre: 'Tester Choice',
                costotaza:'$8.00 - $16.00',
                preparacion:'Cápsulas',
                tipobebida:'Café, té y chocolate',
                variedades: '24',
                imagen: '/bootstrap/assets/images/solucion/producto-stick.jpg'
            },
            Milano: {
                nombre: 'Milano',
                costotaza:'$8.00 - $16.00',
                preparacion:'Cápsulas',
                tipobebida:'Café, té y chocolate',
                variedades: '24',
                imagen: '/bootstrap/assets/images/solucion/producto-stick.jpg'
            },
            alegria: {
                nombre: 'Alegría',
                costotaza:'$8.00 - $16.00',
                preparacion:'Cápsulas',
                tipobebida:'Café, té y chocolate',
                variedades: '24',
                imagen: '/bootstrap/assets/images/solucion/producto-stick.jpg'
            }
        }

        return soluciones;

    },

    getNegociosData: function(){

        var negocios = {
            Oficinas:{
                nombre: 'Oficinas'
            },
            Hoteles:{
                nombre: 'Hoteles'
            },
            Restaurantes:{
                nombre: 'Restaurantes'
            },
            edu:{
                nombre: 'Centros educativos'
            },
            health:{
                nombre: 'Centros de salud'
            },
            cafe:{
                nombre: 'Bares/Café'
            },
            stores:{
                nombre: 'Tiendas de conveniencia'
            },
            spa:{
                nombre: 'SPAs'
            },
            enter:{
                nombre: 'Entretenimiento'
            },
            travel:{
                nombre: 'Travel'
            }
        };

        return negocios;


    },

    getUbicacionesData: function(){

        var rooms = {

            room:{
                nombre: 'Habitación'
            },
            restaurant:{
                nombre: 'Restaurante'
            },
            meeting:{
                nombre: 'Sala de juntas'
            },
            pool:{
                nombre: 'Alberca'
            },
            bar:{
                nombre: 'Bar'
            },
            dining:{
                nombre: 'Comedor de empleados'
            },
            office:{
                nombre: 'Oficina'
            },
            reception:{
                nombre: 'Recepción'
            }

        };

        return rooms;

    },


    getMainData: function(){

        var ubicaciones = {

            Oficinas: {
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
            Hoteles: {
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }

            },
            Restaurantes: {
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
           'Centros educativos':{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
           },
            'Centros de salud':{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
            'Café | Bar':{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
            'Tiendas de conveniencia':{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
            'Spa':{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
            Entretenimiento:{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            },
            Travel:{
                room: {
                    dolcegusto: ["12208487", "1000131805","1000024568","1000154731"],
                    testerchoice: ["12208487", "1000131805","1000024568","1000154731"]
                },
                restaurant: {
                    Milano: ["140746", "140749","140747","140748"],
                    alegria: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                meeting: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                pool: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                bar: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                dining: {
                    Milano: ["140746", "140749","140747","140748"]
                },
                office: {
                    Milano: ["140746", "140749","140747","140748"]
                }
            }

        };

        return ubicaciones;

    },
    getNegocios: function(){
        var data = checkout.getMainData();
        return utils.getSolucionKeys(data);
    },
    getUbicaciones: function(negocios){
        var data = checkout.getMainData()[negocios];
        return utils.getSolucionKeys(data);
    },
    getSoluciones: function(negocios, ubicaciones){
        var data = checkout.getMainData()[negocios][ubicaciones];
        return utils.getSolucionKeys(data);
    },
    getProductos: function(negocios, ubicaciones, soluciones){
        return checkout.getMainData()[negocios][ubicaciones][soluciones];
    }

}

var utils = {

    getSolucionKeys: function(obj){

        var res = [];
        for(key in obj){
            res.push(key);
        }
        return res;
    },
    getParameterByName: function(name){

        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

    },

    createTable: function(selector, objects, data, column){


        try{
            var table = "<table id='rand'>";

            var headFoot = "";

            for(var i = 0; i < column.length; i++){

                headFoot+="<th>" + column[i] + "</th>";

            }

            table+= "<thead><tr>" + headFoot + "</tr></thead>";
            table+= "<tfoot><tr>" + headFoot + "</tr></tfoot>";

            var body = "";

            for(var i = 0; i < data.length; i++){

                body+= "<tr>";

                for(var j = 0; j < objects.length; j++){


                    body+= "<td>" + data[i][j][objects[j]] + "</td>";

                }

                body+= "</tr>";
            }

            table += body;
            table += "</table>";
            $(selector).append(table);


            $("#rand").DataTable();
            return true;

        }catch(err){

            console.log(err);

        }



    }

}

function loadSection(seccion, params){

    try{

        ajaxData('secciones/' + seccion,'GET',params,false,function(e){
            $('#main-section-placeholder').html(e);
        })

    }catch(err){

    }

    
}

function printNegocios(){

    var negocios = checkout.getNegocios();
    var res = "";
    var cont = 9;
    var cont2 = 1;
    for(key in negocios){

        var item = '<div class="col-md-2">' +
            '<label for="checkbox-' + cont + '" class="checkbox-label " negocio="' + negocios[key] + '" >' +
            '<span class="' + negocios[key] + '"></span>' + negocios[key] + '</label>' +
            '<input type="checkbox" name="checkbox-' + cont + '" id="checkbox-' + cont + '" class="checkbox"/>' +
            '</div>';

        res += item;

        cont++;
        cont2++;

        if(cont2%6 == 0){
            res += '<div class="clearfix"></div><div class="col-md-1"></div>';
        }

    }

    res = '<div class="col-md-1"></div>' + res + '<div class="clearfix"></div><center><input id="select-negocios-button" class="continue" type="submit" value="SIGUIENTE" /></center>';
    return res;
}


function printUbicaciones(negocio){

    var ubicaciones = checkout.getUbicaciones(negocio);
    var ubicacionesData = checkout.getUbicacionesData();

    var cont = 1;
    var res = '';
    for(key in ubicaciones){

        var item = ' <div class="col-md-3">' +
            '<label ubicacion="' + ubicaciones[key] + '" for="checkbox-' + cont + '" class="checkbox-label ">' +
            '<span class="' + ubicaciones[key] + '"></span>' + ubicacionesData[ubicaciones[key]].nombre + '</label>' +
            '<input type="checkbox" name="checkbox-' + cont + '" id="checkbox-' + cont + '" class="checkbox"/>' +
            '</div>';

        res += item;

        cont++;
    }

    return '<div class="page-title-second"><span><p>¿En qué ubicación necesitas la solución?</p></span><div class="red-line"></div></div>' + res + '<div class="clearfix"></div><center><a onclick="returnHome();" class="continue" style="padding: 11px 40px; background-color: #8a8a8a; margin-right: 10px; cursor:pointer; text-decoration:none;">REGRESAR</a><input id="select-ubicaciones-button" class="continue" type="submit" value="CONTINUAR" /></center>';

}
function loggedIn(){
    $("#loginLink,#loginSpan").css("display","none");
    $("#loggedLink,#loggedSpan").css("display","inline");
    $("#loginDrop").toggleClass('slideOutUp').toggleClass('slideInDown').toggleClass('open');
    //aqui sería ideal cambiar la bandera de cuando el usuario esté loggeado
}
function loggedOut(){
    $("#loginLink,#loginSpan").css("display","inline");
    $("#loggedLink,#loggedSpan").css("display","none");
    $("#loggedDrop").toggleClass('slideOutUp').toggleClass('slideInDown').toggleClass('open');
    //aqui sería ideal cambiar la bandera de cuando el usuario esté loggeado
}

function homeInit(){

    $(document).ready(function(){
        $('#select-ubicaciones').hide();
        var htmlHome = '<div class="page-title-second"><span><p>¿Qué tipo de negocio eres?</p></span><div class="red-line"></div></div>' + printNegocios();
        $('#select-negocios').html(htmlHome);

        $(".form-negocios .checkbox").click(function(){

            $('.ui-checkboxradio-checked').removeClass('ui-checkboxradio-checked');
            $(this).parent().find('label').toggleClass('ui-checkboxradio-checked');

        });
        //login despliegue
        var flag = false;
        $("#loginLink").click(function(){
            $("#loginDrop").css("display","block")
            .addClass("animated")
            .toggleClass('slideOutUp')
            .toggleClass('slideInDown').toggleClass('open');
            if($("#loginDrop").hasClass('open')){
                $("#loginDrop").bind("clickoutside", function(){
                    if(flag){
                        $("#loginDrop").addClass('slideOutUp')
                        .removeClass('slideInDown')
                        .removeClass('open');
                        $("#loginDrop").unbind("clickoutside");
                        flag = false;
                    }else{
                        flag = true;
                    }
                });
            }
        });
        //logged despliegue
        var flag2 = false;
        $("#loggedLink").click(function(){
            $("#loggedDrop").css("display","block").addClass("animated").toggleClass('slideOutUp').toggleClass('slideInDown').toggleClass('open');
            if($("#loggedDrop").hasClass('open')){
                $("#loggedDrop").bind("clickoutside", function(){
                    if(flag2){
                        $("#loggedDrop").addClass('slideOutUp')
                        .removeClass('slideInDown')
                        .removeClass('open');
                        $("#loggedDrop").unbind("clickoutside");
                        flag2 = false;
                    }else{
                        flag2 = true;
                    }
                });
            }
        });

        //func search
        flag3 = false;
         $("#searchText").bind('keyup', function() {
             var numChars = $(this).val().length;
             if(numChars>=3){
               $("#resultsContent").slideDown(300);
                $("#resultsContent").bind("clickoutside", function(){
                    if(flag3){
                       $("#resultsContent").slideUp(300);
                        $("#resultsContent").unbind("clickoutside");
                        flag3 = false;
                   }else{
                       flag3 = true;
                    }
                });
             }else{
                $("#resultsContent").slideUp(300);
             }
         });
$('#select-negocios input[type="checkbox"]').click(function(){
            $('#select-negocios-button').click();
         });
        $('#select-negocios-button').click(function(e){
            // SCROLLL PAGE
             $("html, body").animate({ scrollTop: 200 }, "slow");
 
            e.preventDefault();
            var negocios = [];

            $('#select-negocios').find('.ui-checkboxradio-checked').each(function(){

              negocios.push($(this).attr('negocio'));

            });

            var ubicacionesHtml = '';

            for(key in negocios){
                ubicacionesHtml += printUbicaciones(negocios[key]);
            }

            $('#select-ubicaciones').html(ubicacionesHtml);

            $("#select-ubicaciones .checkbox").click(function(){
                $(this).parent().find('label').toggleClass('ui-checkboxradio-checked');
            });

            //console.log(checkout.getSoluciones(checkout.getNegocios()[0],checkout.getUbicaciones(checkout.getNegocios()[0])[0]));


            $('#select-negocios').hide();
            $('#select-ubicaciones').show();

            console.log(negocios);

        });
        $('#select-ubicaciones').submit(function(e){

            e.preventDefault();

            // ubicaciones = [];
            // $('#select-ubicaciones').find('.ui-checkboxradio-checked').each(function(){

            //     ubicaciones.push($(this).attr('ubicacion'));

            // });

            // var sendVars = {
            //     negocios: negocios,
            //     ubicaciones: ubicaciones
            // };

            // utils.setGlobalData(JSON.stringify(sendVars));
            loadSection('solucion.html',{});
            $("html, body").animate({ scrollTop: 150 }, 500);


        });

    });

}
function returnHome(){
    $('#select-negocios').show();
    $('#select-ubicaciones').hide();
}
function catalogoInit(){


    /*SCRIPT DE DIANA*/
    $("#tabs").tabs();
    $("#accordion").accordion();
    $("#accordionRes").accordion();
    // SLIDE NUM DE HABITACIONES
    $(".slider").slider();
    var handle = $("#custom-handle");
    $(".slider").slider({
        create: function () {
            handle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle.text(ui.value);
        }
    });
    // SELECT NUM DE PRODUCTOS
    var spinner = $(".spinner").spinner({
        min: 1
    });

    $("#disable").on("click", function () {
        if (spinner.spinner("option", "disabled")) {
            spinner.spinner("enable");
        } else {
            spinner.spinner("disable");
        }
    });
    $("#destroy").on("click", function () {
        if (spinner.spinner("instance")) {
            spinner.spinner("destroy");
        } else {
            spinner.spinner();
        }
    });

// SOLUCION
    $('#cap').mouseover(function () {
        $('#variedades').css('display', 'block');
    });
    $('#cap').mouseout(function () {
        $('#variedades').css('display', 'none');
    });

    $('#selectProd').click(function () {
        $('#solucionSelected').addClass('overlay');
    });
    $('#selectProdMilano').click(function () {
        $('#solucionSelectedMilano').addClass('overlay');

    });

}
// DASHHBOARD
function dashInit(){
    $('#cap-dashboard').mouseover(function () {
        $('#variedades-dash').css('display', 'block');
    });
    $('#cap-dashboard').mouseout(function () {
        $('#variedades-dash').css('display', 'none');
    });

    $("#tabsDash").tabs();
            // SELECT NUM DE PRODUCTOS
    var spinner = $(".spinner").spinner();

    $("#disable").on("click", function () {
        if (spinner.spinner("option", "disabled")) {
            spinner.spinner("enable");
        } else {
            spinner.spinner("disable");
        }
    });
    $("#destroy").on("click", function () {
        if (spinner.spinner("instance")) {
            spinner.spinner("destroy");
        } else {
            spinner.spinner();
        }
    });
}

//function next solucion y prev solution
function nextSolution(){
    $("html, body").animate({ scrollTop: $("#tabs").offset().top - 10 }, 500,function(){
        $('#tabs ul li[aria-selected="true"]').next().children().click();
    });
    
}
function prevSolution(){
    $("html, body").animate({ scrollTop: $("#tabs").offset().top - 10 }, 500, function(){
        $('#tabs ul li[aria-selected="true"]').prev().children().click();
    });
}