//jQuery.noConflict();
(function($) {
    $(document).ready(function () {
        // Cambiamos el idioma por defecto al español
        moment.locale('es');
        var fechaActual = moment().format('LLLL');
        $(".HOYES p").append(fechaActual);
        // Obtenemos el dia actual con el formato de nombre de la semana
        var diaDeLaSemana = moment().format('dddd');
        // Accedemos a cada fila de la tabla
        $(".AGENDA tbody tr").
            // recorremos cada fila de manera individual
            each(function(){
                // accedemos a cada celda de la primera columna
                $(this).children("td").first()
                // filtramos las celdas que contengan el dia de la semana actual
                    .filter(":contains('"+ diaDeLaSemana.toUpperCase() + "')")
                // le agregamos la clase filaSeleccionada a todas las celdas de esa fila
                    .parent().children().addClass("filaSeleccionada")
            })
    });
})( jQuery );
