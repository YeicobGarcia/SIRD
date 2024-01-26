$("#modalNewAnalisis").on("show.bs.modal", function (e) {
  $(".OpTurno").select2({
    placeholder: "USUARIO",
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
        selectUser.innerHTML = opciones;
        console.log("Aca el if de users");
      } else {
        opciones += `<option value=''></option>`;
        $(selectUser).append(opciones);
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

$("#btnSaveOrdenAnalisis").on("click", function () {
  var selectUser = $("#selectUser").val();
  var checkAlcalinidad = $("#checkAlcalinidad").prop("checked");
  var checkCloruro = $("#checkCloruro").prop("checked");
  var checkHumedad = $("#checkHumedad").prop("checked");
  var checkActivo = $("#checkActivo").prop("checked");
  var tagsOtros = $("#tags_1").val();

  var sinLlenar = [];

  if (selectUser == "" || selectUser == null) {
    Swal.fire({
      icon: "warning",
      title: "¡Usuario Sin Especificar!",
      text: "Por favor seleccione o cree uno para continuar",
    });
    return false;
  }

  if (!checkAlcalinidad) {
    sinLlenar.push("Usuario");
  }
  if (!checkCloruro) {
    sinLlenar.push("Cloruro");
  }
  if (!checkHumedad) {
    sinLlenar.push("Humedad");
  }
  if (!checkActivo) {
    sinLlenar.push("Activo");
  }
  if (!tagsOtros) {
    sinLlenar.push("Otros");
  }

  if (sinLlenar.length == 5) {
    Swal.fire({
      icon: "warning",
      title: "!Campos Requeridos!",
      text: "Ningun compuesto seleccionado, porfavor especifique alguno",
    });
    return false;
  }
  console.log(
    "aca variables:",
    selectUser,
    ":",
    checkAlcalinidad,
    ":",
    tagsOtros
  );
});
