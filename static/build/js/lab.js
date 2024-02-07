$("#modalNewAnalisis").on("show.bs.modal", function (e) {
  // Obtener el elemento de selección
  var selectUser = $(".OpTurno");

  // Vaciar el elemento de selección
  selectUser.empty();

  // Inicializar Select2
  selectUser.select2({
    placeholder: "SELECCIONE USUARIO",
    dropdownParent: $("#modalNewAnalisis .modal-body"),
  });

  console.log("El modal se está abriendo");
  fetch(`./getUsers`)
    .then((response) => response.json())
    .then((dataUser) => {
      if (dataUser.message == "Success") {
        var users = dataUser.User;
        let opciones = ``;
        users.forEach((user) => {
          opciones += `<option id='selectUser' value='${user.id}'>${user.nombre} ${user.apellido}</option>`;
        });
        selectUser.html(opciones);
        console.log("Aca el if de users");
      } else {
        opciones += `<option value=''></option>`;
        selectUser.append(opciones);
        console.log("Aca sin nada de users");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});

$("#btnSaveUser").on("click", function () {
  var cmpFname = $("#cmpFname").val();
  var cmpLname = $("#cmpLname").val();
  console.log("aca se dio click al addUser");
  if (cmpFname == "" && cmpLname == "") {
    new PNotify({
      title: "Sin Datos",
      text: "Se requiere al menos un Nombre y un Apellido",
      type: "info",
      styling: "bootstrap3",
      addclass: "dark",
    });
    return false;
  } else if (cmpFname == "" || cmpLname == "") {
    new PNotify({
      title: "Datos Incompletos",
      text: "Finalizar registro para guardar",
      styling: "bootstrap3",
    });
    return false;
  }

  fetch(`./newUsers/?firstName=${cmpFname}&lastName=${cmpLname}`)
    .then((response) => response.json())
    .then((addUser) => {
      if (addUser.message == "Success") {
        new PNotify({
          title: "Confirmado",
          text: "Nuevo usuario registrado",
          type: "success",
          styling: "bootstrap3",
        });
        location.reload();
      } else {
        new PNotify({
          title: "Error de Sistema",
          text: "Incoveniente al guardar",
          type: "error",
          styling: "bootstrap3",
        });
      }
    })
    .catch((error) => console.error("Tipo de Error:", error));
  console.log("aca se addUser");
});

$("#btnCreateOrdenAnalisis").on("click", function () {
  var selectUser = $("#selectUser").val();
  var checkAlcalinidad = $("#checkAlcalinidad").prop("checked");
  var checkCloruro = $("#checkCloruro").prop("checked");
  var checkHumedad = $("#checkHumedad").prop("checked");
  var checkActivo = $("#checkActivo").prop("checked");
  var tagsOtros = $("#tags_1").val();

  var Solicitados = [];

  if (selectUser == "" || selectUser == null) {
    Swal.fire({
      icon: "warning",
      title: "¡Usuario Sin Especificar!",
      text: "Por favor seleccione o cree uno para continuar",
    });
    return false;
  }

  if (checkAlcalinidad) {
    Solicitados.push("alcalinidad");
  }
  if (checkCloruro) {
    Solicitados.push("cloruro");
  }
  if (checkHumedad) {
    Solicitados.push("humedad");
  }
  if (checkActivo) {
    Solicitados.push("activo");
  }
  if (tagsOtros) {
    Solicitados.push(tagsOtros);
  }

  console.log("aca los solicitados", Solicitados);

  if (Solicitados.length == 0) {
    Swal.fire({
      icon: "warning",
      title: "!Campos Requeridos!",
      text: "Ningun compuesto seleccionado, por favor especifique alguno",
    });
    return false;
  } else {
    Swal.fire({
      title: "Guardar Orden?",
      text: "Estos registros no son editables",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, continuar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`./newOrder/?selectUser=${selectUser}&alcalinidad=0
                &cloruro=0&humedad=0&activo=0&otros=None&solicitados=${Solicitados}`)
          .then((response) => response.json())
          .then((orderResponse) => {
            if (orderResponse.message == "Success") {
              Swal.fire({
                title: "Registro Completo",
                text: "Orden de Analisis en Proceso",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            } else {
              console.log("Respuesta del servidor:", orderResponse.error);
              Swal.fire({
                icon: "error",
                title: "Error del Sistema",
                text: "!Comunicar Incoveniente!",
              });
            }
          });
      }
    });
  }
});

function cancelarOrden(idOrden) {
  swal(
    {
      title: "Deshacer Orden?",
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
        fetch(`./cancelAnalisis/?idOrden=${idOrden}`)
          .then((response) => response.json())
          .then((orderResponse) => {
            if (orderResponse.message == "Success") {
              swal("Cancelado!", "Estado de orden anulado", "success");
              setTimeout(1000);
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
        swal("Abortado", "Continuando con el Analisis", "error");
        return false;
      }
    }
  );
  /*
  Swal.fire({
    title: "¿Cancelar Orden?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      
      
    } else {
      
    }
  });
*/
}

function entregarOrden(idOrden) {
  fetch(`./getAnalisis/?idOrden=${idOrden}`)
    .then((response) => response.json())
    .then((orderResponse) => {
      if (orderResponse.message == "Success") {
        // Obtener el contenedor del modal
        var contenidoModal = document.getElementById("contenidoModalOrdenes");
        contenidoModal.innerHTML = "";
        var campos;
        const getData = orderResponse.data;

        getData.forEach((analisis) => {
          campos = analisis.solicitud_total;
        });

        inputs = campos.split(",");

        //Crear inputs dinámicamente y agregarlos al contenido del modal

        console.log("test 1:", inputs);

        inputs.forEach(function (campo) {
          // Crear elemento div para cada campo
          var divCampo = document.createElement("div");
          divCampo.classList.add("col");

          // Crear elemento div para el segmento
          var divSegmento = document.createElement("div");
          divSegmento.classList.add("segment");
          divSegmento.innerHTML = "<h3>" + campo + "</h3>";

          // Agregar el div del segmento al div del campo
          divCampo.appendChild(divSegmento);

          // Crear elemento input para cada campo
          var inputCampo = document.createElement("input");
          inputCampo.classList.add("text-center");
          inputCampo.type = "number";
          inputCampo.placeholder = "%";
          inputCampo.id = campo;

          // Agregar el input al div del campo
          divCampo.appendChild(inputCampo);

          // Agregar el div del campo al contenido del modal
          contenidoModal.appendChild(divCampo);
        });

        // Crear elemento input para id
        var inputId = document.createElement("input");
        inputId.classList.add("d-none");
        inputId.id = "id";
        inputId.value = idOrden;
        // Agregar el div del campo al contenido del modal
        contenidoModal.appendChild(inputId);

        // Mostrar el modal
        $("#modalOrdenes").modal("show");
      } else {
        console.log("Respuesta del servidor:", orderResponse.error);
        Swal.fire({
          icon: "error",
          title: "Error del Sistema",
          text: "!Comunicar Incoveniente!",
        });
      }
    });
}

$("#btnSaveOrdenAnalisis").on("click", function () {
  var resultados = {};
  const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  $("#contenidoModalOrdenes input").each(function () {
    var inputId = $(this).attr("id");
    var inputValue = $(this).val();
    resultados[inputId] = inputValue;
  });

  function validarCampos(objeto) {
    return !Object.values(objeto).includes("");
  }

  if (validarCampos(resultados)) {
    // Enviar los datos por fetch
    fetch("./saveResultados/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(resultados),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "Success") {
          Swal.fire({
            title: "Registro Completo",
            text: "Orden de Analisis en Proceso",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        } else {
          console.log("Respuesta del servidor:", result.error);
          Swal.fire({
            icon: "error",
            title: "Error del Sistema",
            text: "!Comunicar Incoveniente!",
          });
        }
      });
  } else {
    new PNotify({
      title: "Campos Incompletos",
      text: "Completar el registro para guardar",
      styling: "bootstrap3",
    });
    return false;
  }
});

/*
function abrirModal(idOrden) {
  fetch(`./getAnalisis/?idOrden=${idOrden}`)
    .then((response) => response.json())
    .then((orderResponse) => {
      if (orderResponse.message == "Success") {
      } else {
        console.log("Respuesta del servidor:", orderResponse.error);
        Swal.fire({
          icon: "error",
          title: "Error del Sistema",
          text: "!Comunicar Incoveniente!",
        });
      }
    });
}
*/
function move(card, index) {
  setTimeout(function () {
    card.classList.toggle("loaded");
  }, 100 * index);
}

function fade(card, index) {
  setTimeout(function () {
    card.querySelector(".content").classList.toggle("loaded");
  }, 100 * index);
}

function load() {
  // converting nodelist to array for some browsers
  const cards = [].slice.call(document.querySelectorAll(".card"));
  cards.forEach(move);
  setTimeout(function () {
    cards.forEach(fade);
  }, 100 * cards.length);
}

window.addEventListener("load", function (event) {
  console.log("aca se abrio los resultados");
  load();
});
