// Configuraciones a medida (?
jQuery.noConflict();
(function( $ ) {
    $(function() {
        $(".table").addClass("table-striped table-bordered table-hover")
        $(".table thead").addClass("thead-dark")

        var arrowRight = "<span class='custom-breadcrum-arrow'>"
        arrowRight += "<svg class='bi bi-arrow-right-short' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>";
        arrowRight +="<path fill-rule='evenodd' d='M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z'></path>";
        arrowRight +="<path fill-rule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z'></path>";
        arrowRight +="</svg>";
        arrowRight += "</span>"

        // En cada elemento de navegacion del breadcrum
        // le agregamos la clase de bootstrap
        $(".wy-breadcrumbs").children("li")
            .addClass("badge badge-dark") // agregamos la clase de bootstrap
            .html(function(buscayreemplaza, reemplaza) { // borramos el caracter »
                return reemplaza.replace('»', '');
            });
        $(".wy-breadcrumbs").children("li")
            .not(".wy-breadcrumbs-aside") // filtro el que dice github
            .not(":eq(-1)") // filtramos el ultimo
            .append(arrowRight); // agregamos el icono de bootstrap de flecha

        var seccionNueva = "<span class='badge badge-danger'>Nuevo</span>";
        var seccionActualizada = "<span class='badge badge-primary'>Actualizado</span>";

        $(".section *").html(function(buscayreemplaza, reemplaza) { // reemplazamos
            return reemplaza.replace(/\[NUEVO\]/g, seccionNueva);
        });

        $(".section *").html(function(buscayreemplaza, reemplaza) { // reemplazamos
            return reemplaza.replace(/\[ACTUALIZADO\]/g, seccionActualizada);
        });

    });
})(jQuery);
