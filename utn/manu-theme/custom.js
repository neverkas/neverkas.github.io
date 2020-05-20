//jQuery.noConflict();
const removerAcentos = (cadena) => {
    return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    // http://js.dokry.com/eliminar-acentos-signos-diacrticos-en-una-cadena-en-javascript.html
}

(function($) {
    $(document).ready(function () {
        // Cambiamos el idioma por defecto al español
        moment.locale('es');
        var fechaActual = moment().format('LLLL');
        var horaActual = moment('hh:mm');
        $(".HOYES p").append(fechaActual);
        // Obtenemos el dia actual con el formato de nombre de la semana
        var diaDeLaSemana = moment().format('dddd');
        // formateamos el dia de la semana
        diaDeLaSemana = removerAcentos(diaDeLaSemana);
        //diaDeLaSemana = "miercoles"; // dato temporal

        // Accedemos a cada fila de la tabla
        $(".AGENDA tbody tr").
            // recorremos cada fila de manera individual
            each(function(){
                // accedemos a cada celda de la primera columna
                lista = $(this).children("td").first()
                // filtramos las celdas que contengan el dia de la semana actual
                    .filter(":contains('"+ diaDeLaSemanaFormateada.toUpperCase() + "')")
                // retomamos la fila
                    .parent().children();

                // obtenemos las celdas de la segunda columna
                var rangoHorario = lista.eq(1).text();
                // separamos su contenido en un array, usando como criterio
                // que son dos cadenas separadas por el simbolo -
                var rangoHorarioArray = _.split(rangoHorario, "-");

                // obtenemos ambas cadenas y las formateamos
                var rangoHorarioInicio = moment(_.nth(rangoHorarioArray, 0),'hh:mm');
  	            var rangoHorarioFin = moment(_.nth(rangoHorarioArray, 1), 'hh:mm');

                // ampliamos el rango horario de inicio, para que nos avise antes de su comienzo
                rangoHorarioInicio = rangoHorarioInicio.subtract(1, 'hours')

                //horaActual = moment('18:10', 'hh:mm'); // dato temporal

                // evaluamos si la hora actual es acorde con alguna de la lista
		            if(horaActual.isBetween(rangoHorarioInicio, rangoHorarioFin)){
                    // le agregamos la clase filaSeleccionada a todas las celdas de esa fila
                    $(this).children().addClass('filaSeleccionada');
		            }
            })

    });
})( jQuery );
