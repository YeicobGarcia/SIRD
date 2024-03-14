$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault(); // Evita la presentación del formulario
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado exitosamente',
                        confirmButtonColor: "#1ABB9C",
                        showConfirmButton: true,
                    }).then(() => {
                        window.location.reload(); // Opcional: recargar la página después de mostrar el Sweet Alert
                    });
                } else {
                    Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "!Algo salió mal!",
                    });
                }
            }
        });
    });
});

    /* Función para establecer el valor del campo oculto cuando se presiona un botón
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('button_pressed').value = this.value;
        });
    });*/

function borrarRegistro(id){
    swal(
        {
          title: "Eliminar SKU?",
          text: "Esta acción no se puede revertir!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Confirmar!",
          cancelButtonText: "No, cancelar!",
          closeOnConfirm: false,
          closeOnCancel: false,
        },
        function (isConfirm) {
          if (isConfirm) {
            fetch(`deleteSku/?idSKU=${id}`)
              .then((response) => response.json())
              .then((orderResponse) => {
                if (orderResponse.success) {
                  swal("Confirmado!", "Registro Eliminado", "success");
                  setTimeout(20000);
                  location.reload();
                } else {
                  console.log("Respuesta del servidor:", orderResponse.error);
                  Swal.fire({
                    icon: "error",
                    title: "Error del Sistema",
                    text: "!Comunicar Incoveniente!",
                  });
                }
              });
          } else {
            swal("Cancelado", "Puede continuar", "error");
            return false;
          }
        }
      );
}

function obtenerRegistro(id) {
    if(id){
    fetch(`GetSKU/?idSKU=${id}`)
        .then((response) => response.json())
        .then((data) => {
            var dataSKU = data.RegSKU;
            console.log('La data SKU', dataSKU);
            // Cargar datos del registro en el formulario de edición según el boton presionado
            var btn_pressed = document.getElementById('btnEdit').value;
            console.log('aca el btn_presed', btn_pressed);
            if(btn_pressed == 'SKUEdit'){
                document.getElementById('registro_id').value = dataSKU.id;
                document.getElementById('codigoSKU').value = dataSKU.codigoSKU;
                document.getElementById('descripcion').value = dataSKU.descripcion;
                document.getElementById('humedad_objetiva').value = dataSKU.humedad_objetiva;
                document.getElementById('peso_objetivo').value = dataSKU.peso_objetivo;
                document.getElementById('temperatura_objetiva').value = dataSKU.temperatura_objetiva;
                if (dataSKU.areaId_id == 1) {
                    console.log('aca lavandería');
                    document.getElementById('lavanderia').checked = true;
                } else if (dataSKU.areaId_id == 2) {
                    console.log('aca tocador');
                    document.getElementById('tocador').checked = true;
                }
            }else if(btn_pressed == 'TamuEdit'){
                document.getElementById('registro_id').value = dataSKU.id;
                document.getElementById('humedad_objetiva').value = dataSKU.humedad_objetiva;
                document.getElementById('peso_objetivo').value = dataSKU.peso_objetivo;
                document.getElementById('temperatura_objetiva').value = dataSKU.temperatura_objetiva;
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }else{
        var id_SKU = document.getElementById('id_SKU').value;
        if(id_SKU){
            obtenerRegistro(id_SKU);
        }else{
            new PNotify({
                title: "Sin Especificar",
                text: "No olvide seleccionar el Código",
                styling: "bootstrap3",
              });
              return false;
        }
        
    }
    
}
