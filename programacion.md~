COMANDOS IMPORTANTES
C+g (Cancelar accion)

ATAJOS
C (Ctrl)
X (Alt)


EDICION
C+w (Cortar)
C+w (Pegar)
C+w (Copiar)
C+w u (Deshacer accion)
C+X C+S (Guardar)


DESPLAZAMIENTOS
C+s (Busqueda incremental, hacia adelante)
C+r (Busqueda decremental, hacia atras)
C+g (Finaliza búsqueda)
C+u 8 * (Escribe el asterisco 8 veces)
M+Delback (Borra por palabras)

C+k (Borra desde el puntero hasta el final de linea)
M+k (Elimina texto hasta final del texto, parrafos)

C+v  (Avanzar sig. Página)
M+v (Retroceder, anterior página)
M+< (Retroceder por palabras)
M+> (Avanzar por palabras)
C+a (Principio de linea)
C+e (Final de linea)


ACCIONES
M+x dired (Listar directorio)
M+x dired C+x C+f (listar directorio->crear archivo)

M+x (Abre la terminal)
M+x list-packages (Lista todos los paquetes)


ARCHIVOS
C+x C+b (Listar buffers)


BUFFERS
C+x 1 Cierras las otras ventanas que no son la actual
C+x 2 Divide la ventana en 2
C+x o Mueve el cursor a la otra ventana
C+x b Cambiar a otro buffer


OBSERVACIONES
M+x dired
    d (Agregar a la lista de acciones. Ej. Borrar, Modificar)
    x (Ejecutar la accion)


CONFIGURACION PERSONALIZADA
1. Abrir IDE desde la terminal sin entorno gráfico (GUI)
> emacs -nw

2. Configurar la indentación del código (tabulación)
;; Set Indentation (tabs)
;;https://www.gnu.org/software/emacs/manual/html_node/efaq/Changing-the-length-of-a-Tab.html
;https://www.emacswiki.org/emacs/IndentationBasics 
(setq-default tab-width 2)

3. Autoindentación
;; https://www.emacswiki.org/emacs/AutoIndentation 
(add-hook 'lisp-mode-hook '(lambda ()
  (local-set-key (kbd "RET") 'newline-and-indent)))


INFORMACION ADICIONAL
1. Como usar C+x b (Cambiar de buffer)
Puede continuar usando C-x o para cambiar entre las ventanas.  Cada ventana tiene su propia posición del cursor, pero únicamente una ventana actual muestra el cursor.  Todos los comandos de edición comunes se aplican a la ventana en que está el cursor.  Llamaremos esto la "ventana seleccionada".
El comando C-M-v es muy útil cuando está editando un texto en una ventana y usando la otra ventana como referencia.  Puede mantener el cursor siempre en la ventana donde está editando, y avanzar a la otra ventana secuencialmente con C-M-v.

2. Guardar
“Esto copia el texto dentro de Emacs al archivo.  La primera vez que haga esto, Emacs renombrará el archivo original con un nuevo nombre para que éste no se pierda.  El nuevo nombre se hace agregando "~" al final del nombre del archivo original. Cuando guardar haya terminado, Emacs mostrará el nombre del archivo escrito.  Deberá guardar frecuentemente, para que no pierda mucho
trabajo si el sistema falla.” Puede encontrar un archivo existente, para verlo o editarlo.  También puede hacerlo con un archivo que no exista.Ésta es la forma de crear un archivo en Emacs: encuentre el archivo, que comenzará vacío, luego comience a insertar el texto para ese archivo.  Cuando invoque "guardar" el archivo, Emacs creará realmente el archivo con el texto que ha insertado.  De ahí en adelante, puede considerarse estar editando un archivo existente.

3. Buffers (Ventanas)
CUALQUIER texto que vea en una ventana de Emacs siempre es parte de un buffer.  Algunos buffers no corresponden a un archivo.  Por ejemplo, el buffer llamado "*Buffer List*" no tiene ningún archivo.  Es el buffer que contiene la lista de buffers que ha creado con C-x C-b.  El buffer llamado "*Messages*" tampoco tiene un archivo correspondiente; contiene los mensajes que han aparecido en la línea de abajo durante su sesión de Emacs.

4. Auto guardado
Si ha hecho cambios en un archivo, pero no los ha guardado, éstos podrían perderse si su computadora falla.  Para protegerlo de esto, Emacs periódicamente escribe un archivo "auto guardado" para cada archivo que está editando.  El nombre del archivo auto guardado tiene un # al principio y al final; por ejemplo, si su archivo se llama "hola.c", su archivo auto guardado es "#hola.c#".  Cuando guarda por la vía normal, Emacs borra su archivo de auto guardado.
Si la computadora falla, puede recuperar su edición de auto guardado encontrando el archivo normal (el archivo que estuvo editando, no el archivo de auto guardar) y entonces tecleando M-x recover file<Return>.  Cuando le pregunte por la confirmación, teclee yes<Return> para ir y recuperar la información del auto guardado.
