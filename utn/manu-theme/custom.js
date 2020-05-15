//jQuery.noConflict();
(function($) {
    $(document).ready(function () {
        // Cambiamos el idioma por defecto al español
        moment.locale('es');
        var fechaActual = moment().format('LLLL');
        var horaActual = moment('hh:mm');
        $(".HOYES p").append(fechaActual);
        // Obtenemos el dia actual con el formato de nombre de la semana
        var diaDeLaSemana = moment().format('dddd');

        diaDeLaSemana = "jueves"; // dato temporal

        // Accedemos a cada fila de la tabla
        $(".AGENDA tbody tr").
            // recorremos cada fila de manera individual
            each(function(){
                // accedemos a cada celda de la primera columna
                lista = $(this).children("td").first()
                // filtramos las celdas que contengan el dia de la semana actual
                    .filter(":contains('"+ diaDeLaSemana.toUpperCase() + "')")
                // retomamos la fila
                    .parent().children();

                // obtenemos las celdas de la segunda columna
                var rangoHorario = lista.eq(1).text();
                // separamos su contenido en un array, usando como criterio
                // que son dos cadenas separadas por el simbolo -
                var rangoHorarioArray = _.split(rangoHorario, "-");

                // obtenemos ambas cadenas y las formateamos
                var rangoHorarioInicio = moment(_.nth(rangoHorarioArray, 0)  , 'hh:mm');
  	            var rangoHorarioFin = moment(_.nth(rangoHorarioArray, 1), 'hh:mm');

                horaActual = moment('14:30', 'hh:mm'); // dato temporal

                // evaluamos si la hora actual es acorde con alguna de la lista
		            if(horaActual.isBetween(rangoHorarioInicio, rangoHorarioFin)){
                    // le agregamos la clase filaSeleccionada a todas las celdas de esa fila
                    $(this).children().addClass('filaSeleccionada');
		            }
            })

    });
})( jQuery );
