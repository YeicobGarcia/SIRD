/**
 * Resize function without multiple trigger
 *
 * Usage:
 * $(window).smartresize(function(){
 *     // code here
 * });
 */

document.addEventListener('DOMContentLoaded', function () {
  var fullscreenBtn = document.getElementById('fullscreen-btn');
  var lockBtn = document.getElementById('lock-btn');

  // Verificar si la aplicación estaba en modo de pantalla completa antes
  var isFullscreen = localStorage.getItem('fullscreen');

  if (isFullscreen === 'true') {
    document.documentElement.requestFullscreen();
  }

  fullscreenBtn.addEventListener('click', function () {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else {
      console.error('FullScreen mode is not supported in this browser.');
    }
  });

  lockBtn.addEventListener('click', function () {
    // Aquí puedes agregar la lógica para el botón Lock
    console.log('Lock button clicked.');
  });
});

(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
        args = arguments;

      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }

      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  // smartresize
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
  };
})(jQuery, "smartresize");

/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split("#")[0].split("?")[0],
  $BODY = $("body"),
  $MENU_TOGGLE = $("#menu_toggle"),
  $SIDEBAR_MENU = $("#sidebar-menu"),
  $SIDEBAR_FOOTER = $(".sidebar-footer"),
  $LEFT_COL = $(".left_col"),
  $RIGHT_COL = $(".right_col"),
  $NAV_MENU = $(".nav_menu"),
  $FOOTER = $("footer");

// Sidebar


let Dashboard = (() => {

	let sidebarChangeWidth = () => {
		let $menuItemsTitle = $("li .menu-item__title");

		$("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
		$(".hamburger-toggle").toggleClass("is-opened");

    $(".hamburger-toggle").click(function(e) {
      e.preventDefault();
      $(".left_col").toggleClass("toggled");
   });
   /*
   $("#menu-toggle-2").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled-2");
      $('#menu ul').hide();
   });
   */
		/*
		if ($("body").hasClass("sidebar-is-expanded")) {
			$('[data-toggle="tooltip"]').tooltip("destroy");
		} else {
			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}*/
		
	};

	return {
		init: () => {
			$(".js-hamburger").on("click", sidebarChangeWidth);
/*
			$(".js-menu li").on("click", e => {
				menuChangeActive(e.currentTarget);
			});
*/
			//$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}
	};
})();



/**/
function init_sidebar() {
  Dashboard.init();
  // TODO: This is some kind of easy fix, maybe we can improve this
  var setContentHeight = function () {
    // reset height
    $RIGHT_COL.css("auto", $(window).height());

    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass("footer_fixed") ? -10 : $FOOTER.height(),
      leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;
    $RIGHT_COL.css("auto", contentHeight);
  };

  $SIDEBAR_MENU.find("a").on("click", function (ev) {
    console.log("clicked - sidebar_menu");
    var $li = $(this).parent();

    if ($li.is(".active")) {
      $li.removeClass("active active-sm");
      $("ul:first", $li).slideUp(function () {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is(".child_menu")) {
        $SIDEBAR_MENU.find("li").removeClass("active active-sm");
        $SIDEBAR_MENU.find("li ul").slideUp();
      } else {
        if ($BODY.is(".nav-sm")) {
          $SIDEBAR_MENU.find("li").removeClass("active active-sm");
          $SIDEBAR_MENU.find("li ul").slideUp();
        }
      }
      $li.addClass("active");

      $("ul:first", $li).slideDown(function () {
        setContentHeight();
      });
    }
  });
/**/
  // toggle small or large menu
  $MENU_TOGGLE.on("click", function () {
    console.log("clicked - menu toggle");

    if ($BODY.hasClass("nav-md")) {
      $SIDEBAR_MENU.find("li.active ul").hide();
      $SIDEBAR_MENU
        .find("li.active")
        .addClass("active-sm")
        .removeClass("active");
    } else {
      $SIDEBAR_MENU.find("li.active-sm ul").show();
      $SIDEBAR_MENU
        .find("li.active-sm")
        .addClass("active")
        .removeClass("active-sm");
    }

    $BODY.toggleClass("nav-md nav-sm");

    setContentHeight();
  });

  // check active menu
  $SIDEBAR_MENU
    .find('a[href="' + CURRENT_URL + '"]')
    .parent("li")
    .addClass("current-page");

  $SIDEBAR_MENU
    .find("a")
    .filter(function () {
      return this.href == CURRENT_URL;
    })
    .parent("li")
    .addClass("current-page")
    .parents("ul")
    .slideDown(function () {
      setContentHeight();
    })
    .parent()
    .addClass("active");

  // recompute content when resizing
  $(window).smartresize(function () {
    setContentHeight();
  });

  setContentHeight();

  // fixed sidebar
  if ($.fn.mCustomScrollbar) {
    $(".menu_fixed").mCustomScrollbar({
      autoHideScrollbar: true,
      theme: "minimal",
      mouseWheel: { preventDefault: true },
    });
  }
}

// /Sidebar

// TAMU

$(".btn-toggle .btn").click(function () {
  // Obtén el botón actual que se hizo clic
  var clickedButton = $(this);

  // Encuentra el grupo de botones al que pertenece el botón clicado
  var buttonGroup = clickedButton.closest(".btn-toggle");

  // Desactiva todos los botones dentro del grupo
  buttonGroup
    .find(".btn")
    .removeClass("active btn-primary")
    .addClass("btn-default");

  // Activa solo el botón clicado
  clickedButton.addClass("active btn-primary").removeClass("btn-default");
});

const dataLinea = async (idArea) => {
  try {
    const response = await fetch(`./Linea/${idArea}`);
    const data = await response.json();

    if (data.message == "Success") {
      let opciones = ``;
      data.linea.forEach((linea) => {
        opciones += `<option id='selectLinea' value='${linea.id}'>${linea.nombre}</option>`;
      });
      cboLinea.innerHTML = opciones;
      //cboLinea.innerHTML(data.area[0].id);
    } else {
      alert("Area no encontrada");
    }
  } catch (error) {}
};

const dataSeccion = async (idArea) => {
  try {
    const response = await fetch(`./Seccion/${idArea}`);
    const data = await response.json();

    if (data.message == "Success") {
      let opciones = ``;
      data.seccion.forEach((seccion) => {
        opciones += `<option id='selectSeccion' value='${seccion.id}'>${seccion.nombre}</option>`;
      });
      cboSeccion.disabled = false;
      cboSeccion.innerHTML = opciones;
    } else {
      let opciones = ``;
      data.seccion.forEach((seccion) => {
        opciones += `<option id='selectSeccion' value='${seccion.id}'>${seccion.nombre}</option>`;
      });
      cboSeccion.innerHTML = opciones;
      cboSeccion.disabled = true;
    }
  } catch (error) {}
};

let allSKU = [];

let mostrarValorSKU = (Datobjetivo) => {
  let SKUSelect = allSKU.filter((sku) => sku.id == Datobjetivo)[0];

  let descripcion = SKUSelect.descripcion;
  let peso_objetivo = SKUSelect.peso_objetivo;
  let temperatura_objetiva = SKUSelect.temperatura_objetiva;
  let humedad_objetiva = SKUSelect.humedad_objetiva;
  let id_SKU = SKUSelect.id;
  
  console.log('allSKU.id:', id_SKU);
  document.getElementById('id_SKU').value = id_SKU;

  txtDescSKU.innerHTML = `${descripcion}`;
  txtPeso.innerText = `${peso_objetivo}`;
  txtTemperatura.innerText = `${temperatura_objetiva}`;
  txtHumedad.innerText = `${humedad_objetiva}`;
};

const dataSKU = async (idArea) => {
  try {
    const response = await fetch(`./SKU/${idArea}`);
    const data = await response.json();

    if (data.message == "Success") {
      allSKU = data.sku;
      let opciones = ``;
      allSKU.forEach((sku) => {
        opciones += `<option id='selectSKU' value='${sku.id}'>${sku.codigoSKU}</option>`;
      });
      cboSKU.innerHTML = opciones;
      // Obtener el valor seleccionado actualmente
      const selectedValue = cboSKU.value;
      // Llamar a la función mostrarValorSKU con el valor actual
      mostrarValorSKU(selectedValue);
    } else {
      opciones += `<option value=''></option>`;
      $(cboSKU).append(opciones);
    }
  } catch (error) {}
  $(".js-example-basic-single").on("select2:select", function (event) {
    mostrarValorSKU(event.params.data.id);
  });
};

let AreaId;

const cargaInicial = async () => {
  lavanderia.addEventListener("click", async function () {
    await dataLinea(1);
    await dataSeccion(1);
    await dataSKU(1);
    AreaId = 1;
  });

  tocador.addEventListener("click", async function () {
    await dataLinea(2);
    await dataSeccion(2);
    await dataSKU(2);
    AreaId = 2;
  });
};

window.addEventListener("load", async () => {
  await cargaInicial();
});

$("#btnGuardarTAMU").on("click", function () {
  var lineaId = $("#cboLinea").val();
  var seccionId = $("#cboSeccion").val();
  var skuId = $("#cboSKU").val();
  var peso_obtenido = $("#imputPeso").val();
  var txtPeso = $("#txtPeso").text();
  var temperatura_obtenida = $("#imputTemperatura").val();
  var txtTemperatura = $("#txtTemperatura").text();
  var humedad_obtenida = $("#imputHumedad").val();
  var txtHumedad = $("#txtHumedad").text();

  var sinLlenar = []; // Array para almacenar vacios
  var obligatorio = [];

  if (lineaId == "" || lineaId == null) {
    obligatorio.push("Linea");
  }

  if (AreaId != 2) {
    if (seccionId == "" || seccionId == null) {
      obligatorio.push("Seccion");
    }
  }

  if (skuId == "" || skuId == null) {
    obligatorio.push("SKU");
  }

  if (peso_obtenido == "") {
    sinLlenar.push("Peso");
    peso_obtenido = 0;
  }

  if (temperatura_obtenida == "") {
    sinLlenar.push("Temperatura");
    temperatura_obtenida = 0;
  }

  if (humedad_obtenida == "") {
    sinLlenar.push("Humedad");
    humedad_obtenida = 0;
  }

  if (obligatorio.length > 0) {
    var mensaje =
      "Los campos: " + obligatorio.join(", ") + ", son obligatorios";
    Swal.fire({
      icon: "warning",
      title: "¡Sin Especificar!",
      text: mensaje,
    });
    return false;
  }

  if (sinLlenar.length == 3) {
    var mensaje =
      "Debe de existir al menos: " +
      sinLlenar.join(", ") +
      " en un registro para guardar";
    Swal.fire({
      icon: "warning",
      title: "Campos Requeridos!",
      text: mensaje,
    });
    return false;
  }

  function SaveTamu() {
    const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    $.ajax({
      type: "POST",
      data: {
        idArea: AreaId,
        lineaId: lineaId,
        seccionId: seccionId,
        skuId: skuId,
        peso_obtenido: peso_obtenido,
        peso_objetivo: txtPeso,
        temperatura_obtenida: temperatura_obtenida,
        temperatura_objetiva: txtTemperatura,
        humedad_obtenida: humedad_obtenida,
        humedad_objetiva: txtHumedad,
        csrfmiddlewaretoken: csrfToken,
      },
      url: "SaveTamu/",
      dataType: "json",
      success: function (data) {
        if (data.success) {
          Swal.fire({
            title: "Registro Completo!",
            text: "Se ha guardado exitosamente",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              $("#imputPeso").val("");
              $("#imputTemperatura").val("");
              $("#imputHumedad").val("");
              //location.reload();
            }
          }); /*
          setTimeout(function() {
            location.reload();
        }, 1000); */ // Espera 1 segundo antes de recargar
        } else {
          console.log("aqui se esta pércibiendo");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "!Algo salió mal!",
          });
        }
      },
      error: function (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "!Algo salió mal!",
        });
      },
    });
  }

  if (sinLlenar.length > 0) {
    // Hay errores, mostrar Sweet Alert
    var mensaje =
      "Los siguientes campos están vacíos: " +
      sinLlenar.join(", ") +
      " ¿Desea Continuar?";
    Swal.fire({
      title: "¡Campos sin especificar!",
      text: mensaje,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, continuar!",
    }).then((result) => {
      if (result.isConfirmed) {
        SaveTamu();
      }
    });
  } else {
    SaveTamu();
  }
});

var randNum = function () {
  return Math.floor(Math.random() * (1 + 40 - 20)) + 20;
};

// Panel toolbox
$(document).ready(function () {
  $(".collapse-link").on("click", function () {
    var $BOX_PANEL = $(this).closest(".x_panel"),
      $ICON = $(this).find("i"),
      $BOX_CONTENT = $BOX_PANEL.find(".x_content");

    // fix for some div with hardcoded fix class
    if ($BOX_PANEL.attr("style")) {
      $BOX_CONTENT.slideToggle(200, function () {
        $BOX_PANEL.removeAttr("style");
      });
    } else {
      $BOX_CONTENT.slideToggle(200);
      $BOX_PANEL.css("height", "auto");
    }

    $ICON.toggleClass("fa-chevron-up fa-chevron-down");
  });

  $(".close-link").click(function () {
    var $BOX_PANEL = $(this).closest(".x_panel");

    $BOX_PANEL.remove();
  });
});
// /Panel toolbox

// Tooltip
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    container: "body",
  });
});
// /Tooltip

// Progressbar
if ($(".progress .progress-bar")[0]) {
  $(".progress .progress-bar").progressbar();
}
// /Progressbar

// Switchery
$(document).ready(function () {
  if ($(".js-switch")[0]) {
    var elems = Array.prototype.slice.call(
      document.querySelectorAll(".js-switch")
    );
    elems.forEach(function (html) {
      var switchery = new Switchery(html, {
        color: "#26B99A",
      });
    });
  }
});
// /Switchery

/* EX ECHRTS TAMU
const AllCharts = async (start_date, end_date, idChart) => {
  let vObtenido;
  let vObjetivo;
  let Ttitle = [];
  let legend = [];
  let dataX = [];
  let dataY1 = [];
  let dataY2 = [];
  let currentDataIdentifier = null;
  let dataChanged;

  const getDataLine = async (idLine, Vobtenido, Vobjetivo, start_date, end_date) => {
    try {
      const response = await fetch(
        `EstadisticaFilter/?idLine=${idLine.toString()[0]}&idLado=${idLine.toString()[1]}&start_date=${start_date}&end_date=${end_date}`
      );
      const newData = await response.json();

      if (newData.message === "Success") {
        // Calcula un identificador único para los nuevos datos
        const newDataIdentifier = JSON.stringify(newData);

        // Compara el identificador con el identificador actual
        dataChanged = currentDataIdentifier !== newDataIdentifier;

        // Si hay cambios, actualiza los datos y el gráfico
        if (dataChanged) {
          currentDataIdentifier = newDataIdentifier;
          dataX = [];
          dataY1 = [];
          dataY2 = [];

          newData.RegXlinea.forEach((RegXlinea) => {
            var fechaFormateada = moment(RegXlinea.fecha_registro).format(
              "MM-DD HH:mm"
            );
            dataX.push(fechaFormateada);
            dataY1.push(RegXlinea[Vobjetivo]);
            dataY2.push(RegXlinea[Vobtenido]);
          });
          console.log(dataX, dataY1, dataY2);
          updateChart();
        }
      } else {
        currentDataIdentifier = null;
        dataX = [];
        dataY1 = [];
        dataY2 = [];
        updateChart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateChart = () => {
    // Actualiza el gráfico con los datos actuales
    init_echarts(idChart, Ttitle, legend, dataX, dataY1, dataY2);
  };

  const Status = async () => {
    switch (idChart) {
      case "#pesEch":
        Ttitle = ["Peso", "Kg"];
        legend = ["P.Objetivo", "P.Obtenido"];
        vObjetivo = "peso_objetivo";
        vObtenido = "peso_obtenido";
        var radioId = $("input.flat:checked").attr("id");
        if (radioId) {
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        }

        $("input.flat").on("ifChecked", async function () {
          radioId = $(this).attr("id");
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        });

        if (dataChanged) {
          updateChart();
        }
        break;
      case "#tempEch":
        Ttitle = ["Temperatura", "°C"];
        legend = ["T.Objetiva", "T.Obtenida"];
        vObjetivo = "temperatura_objetiva";
        vObtenido = "temperatura_obtenida";
        var radioId = $("input.flat:checked").attr("id");
        if (radioId) {
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        }

        $("input.flat").on("ifChecked", async function () {
          radioId = $(this).attr("id");
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        });

        if (dataChanged) {
          updateChart();
        }
        break;
      case "#humEch":
        Ttitle = ["Humedad", "g"];
        legend = ["H.Objetiva", "H.Obtenida"];
        vObjetivo = "humedad_objetiva";
        vObtenido = "humedad_obtenida";
        var radioId = $("input.flat:checked").attr("id");
        if (radioId) {
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        }

        $("input.flat").on("ifChecked", async function () {
          radioId = $(this).attr("id");
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        });

        if (dataChanged) {
          updateChart();
        }
        break;
      default:
        var radioId = $("input.flat:checked").attr("id");
        if (radioId) {
          await getDataLine(radioId, vObtenido, vObjetivo, start_date, end_date);
        }
        legend = ["P.Objetivo", "P.Obtenido"];
        dataX = ["P1", "P2", "P3", "P4", "P5"];
        dataY1 = [2.0, 4.9, 6.0, 25.2, 30.6];
        dataY2 = [2.6, 5.9, 9.0, 20.4, 45.7];
        if (dataChanged) {
          updateChart();
        }
        break;
    }
  };

  await Status();
  //var status = setInterval(Status, 10000);
};
*/


// iCheck
$(document).ready(function () {
  if ($("input.flat")[0]) {
    $(document).ready(function () {
      $("input.flat").iCheck({
        checkboxClass: "icheckbox_flat-green",
        radioClass: "iradio_flat-green",
      });
    });
  }
});
// /iCheck

// Table
$("table input").on("ifChecked", function () {
  checkState = "";
  $(this).parent().parent().parent().addClass("selected");
  countChecked();
});
$("table input").on("ifUnchecked", function () {
  checkState = "";
  $(this).parent().parent().parent().removeClass("selected");
  countChecked();
});

var checkState = "";

$(".bulk_action input").on("ifChecked", function () {
  checkState = "";
  $(this).parent().parent().parent().addClass("selected");
  countChecked();
});
$(".bulk_action input").on("ifUnchecked", function () {
  checkState = "";
  $(this).parent().parent().parent().removeClass("selected");
  countChecked();
});
$(".bulk_action input#check-all").on("ifChecked", function () {
  checkState = "all";
  countChecked();
});
$(".bulk_action input#check-all").on("ifUnchecked", function () {
  checkState = "none";
  countChecked();
});

function countChecked() {
  if (checkState === "all") {
    $(".bulk_action input[name='table_records']").iCheck("check");
  }
  if (checkState === "none") {
    $(".bulk_action input[name='table_records']").iCheck("uncheck");
  }

  var checkCount = $(".bulk_action input[name='table_records']:checked").length;

  if (checkCount) {
    $(".column-title").hide();
    $(".bulk-actions").show();
    $(".action-cnt").html(checkCount + " Records Selected");
  } else {
    $(".column-title").show();
    $(".bulk-actions").hide();
  }
}

// Accordion
$(document).ready(function () {
  $(".expand").on("click", function () {
    $(this).next().slideToggle(200);
    $expand = $(this).find(">:first-child");

    if ($expand.text() == "+") {
      $expand.text("-");
    } else {
      $expand.text("+");
    }
  });
});

/* NProgress
if (typeof NProgress != "undefined") {
  $(document).ready(function () {
    NProgress.start();
  });

  $(window).load(function () {
    NProgress.done();
  });
}*/

/* hover and retain popover when on popover content
var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function (obj) {
  var self =
    obj instanceof this.constructor
      ? obj
      : $(obj.currentTarget)
          [this.type](this.getDelegateOptions())
          .data("bs." + this.type);
  var container, timeout;

  originalLeave.call(this, obj);

  if (obj.currentTarget) {
    container = $(obj.currentTarget).siblings(".popover");
    timeout = self.timeout;
    container.one("mouseenter", function () {
      // We entered the actual popover – call off the dogs
      clearTimeout(timeout);
      // Let's monitor popover content instead
      container.one("mouseleave", function () {
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    });
  }
};

$("body").popover({
  selector: "[data-popover]",
  trigger: "click hover",
  delay: {
    show: 50,
    hide: 400,
  },
});*/

function gd(year, month, day) {
  return new Date(year, month - 1, day).getTime();
}

function init_flot_chart() {
  if (typeof $.plot === "undefined") {
    return;
  }

  console.log("init_flot_chart");

  var arr_data1 = [
    [gd(2012, 1, 1), 17],
    [gd(2012, 1, 2), 74],
    [gd(2012, 1, 3), 6],
    [gd(2012, 1, 4), 39],
    [gd(2012, 1, 5), 20],
    [gd(2012, 1, 6), 85],
    [gd(2012, 1, 7), 7],
  ];

  var arr_data2 = [
    [gd(2012, 1, 1), 82],
    [gd(2012, 1, 2), 23],
    [gd(2012, 1, 3), 66],
    [gd(2012, 1, 4), 9],
    [gd(2012, 1, 5), 119],
    [gd(2012, 1, 6), 6],
    [gd(2012, 1, 7), 9],
  ];

  var arr_data3 = [
    [0, 1],
    [1, 9],
    [2, 6],
    [3, 10],
    [4, 5],
    [5, 17],
    [6, 6],
    [7, 10],
    [8, 7],
    [9, 11],
    [10, 35],
    [11, 9],
    [12, 12],
    [13, 5],
    [14, 3],
    [15, 4],
    [16, 9],
  ];

  var chart_plot_02_data = [];

  var chart_plot_03_data = [
    [0, 1],
    [1, 9],
    [2, 6],
    [3, 10],
    [4, 5],
    [5, 17],
    [6, 6],
    [7, 10],
    [8, 7],
    [9, 11],
    [10, 35],
    [11, 9],
    [12, 12],
    [13, 5],
    [14, 3],
    [15, 4],
    [16, 9],
  ];

  for (var i = 0; i < 30; i++) {
    chart_plot_02_data.push([
      new Date(Date.today().add(i).days()).getTime(),
      randNum() + i + i + 10,
    ]);
  }

  var chart_plot_01_settings = {
    series: {
      lines: {
        show: false,
        fill: true,
      },
      splines: {
        show: true,
        tension: 0.4,
        lineWidth: 1,
        fill: 0.4,
      },
      points: {
        radius: 0,
        show: true,
      },
      shadowSize: 2,
    },
    grid: {
      verticalLines: true,
      hoverable: true,
      clickable: true,
      tickColor: "#d5d5d5",
      borderWidth: 1,
      color: "#fff",
    },
    colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
    xaxis: {
      tickColor: "rgba(51, 51, 51, 0.06)",
      mode: "time",
      tickSize: [1, "day"],
      //tickLength: 10,
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: "Verdana, Arial",
      axisLabelPadding: 10,
    },
    yaxis: {
      ticks: 8,
      tickColor: "rgba(51, 51, 51, 0.06)",
    },
    tooltip: true,
  };

  var chart_plot_02_settings = {
    grid: {
      show: true,
      aboveData: true,
      color: "#3f3f3f",
      labelMargin: 10,
      axisMargin: 0,
      borderWidth: 0,
      borderColor: null,
      minBorderMargin: 5,
      clickable: true,
      hoverable: true,
      autoHighlight: true,
      mouseActiveRadius: 100,
    },
    series: {
      lines: {
        show: true,
        fill: true,
        lineWidth: 2,
        steps: false,
      },
      points: {
        show: true,
        radius: 4.5,
        symbol: "circle",
        lineWidth: 3.0,
      },
    },
    legend: {
      position: "ne",
      margin: [0, -25],
      noColumns: 0,
      labelBoxBorderColor: null,
      labelFormatter: function (label, series) {
        return label + "&nbsp;&nbsp;";
      },
      width: 40,
      height: 1,
    },
    colors: [
      "#96CA59",
      "#3F97EB",
      "#72c380",
      "#6f7a8a",
      "#f7cb38",
      "#5a8022",
      "#2c7282",
    ],
    shadowSize: 0,
    tooltip: true,
    tooltipOpts: {
      content: "%s: %y.0",
      xDateFormat: "%d/%m",
      shifts: {
        x: -30,
        y: -50,
      },
      defaultTheme: false,
    },
    yaxis: {
      min: 0,
    },
    xaxis: {
      mode: "time",
      minTickSize: [1, "day"],
      timeformat: "%d/%m/%y",
      min: chart_plot_02_data[0][0],
      max: chart_plot_02_data[20][0],
    },
  };

  var chart_plot_03_settings = {
    series: {
      curvedLines: {
        apply: true,
        active: true,
        monotonicFit: true,
      },
    },
    colors: ["#26B99A"],
    grid: {
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 1,
        left: 1,
      },
      borderColor: {
        bottom: "#7F8790",
        left: "#7F8790",
      },
    },
  };

  if ($("#chart_plot_01").length) {
    console.log("Plot1 - testing...");

    var stuff = $("#chart_plot_01").data("stuff");
    // alert(stuff);

    // console.log()

    $.plot($("#chart_plot_01"), [arr_data1, arr_data2], chart_plot_01_settings);
  }

  if ($("#chart_plot_02").length) {
    console.log("Plot2");

    $.plot(
      $("#chart_plot_02"),
      [
        {
          label: "Email Sent",
          data: chart_plot_02_data,
          lines: {
            fillColor: "rgba(150, 202, 89, 0.12)",
          },
          points: {
            fillColor: "#fff",
          },
        },
      ],
      chart_plot_02_settings
    );
  }

  if ($("#chart_plot_03").length) {
    console.log("Plot3");

    $.plot(
      $("#chart_plot_03"),
      [
        {
          label: "Registrations",
          data: chart_plot_03_data,
          lines: {
            fillColor: "rgba(150, 202, 89, 0.12)",
          },
          points: {
            fillColor: "#fff",
          },
        },
      ],
      chart_plot_03_settings
    );
  }
}

/* STARRR */

function init_starrr() {
  if (typeof starrr === "undefined") {
    return;
  }
  console.log("init_starrr");

  $(".stars").starrr();

  $(".stars-existing").starrr({
    rating: 4,
  });

  $(".stars").on("starrr:change", function (e, value) {
    $(".stars-count").html(value);
  });

  $(".stars-existing").on("starrr:change", function (e, value) {
    $(".stars-count-existing").html(value);
  });
}

function init_JQVmap() {
  //console.log('check init_JQVmap [' + typeof (VectorCanvas) + '][' + typeof (jQuery.fn.vectorMap) + ']' );

  if (typeof jQuery.fn.vectorMap === "undefined") {
    return;
  }

  console.log("init_JQVmap");

  if ($("#world-map-gdp").length) {
    $("#world-map-gdp").vectorMap({
      map: "world_en",
      backgroundColor: null,
      color: "#ffffff",
      hoverOpacity: 0.7,
      selectedColor: "#666666",
      enableZoom: true,
      showTooltip: true,
      values: sample_data,
      scaleColors: ["#E6F2F0", "#149B7E"],
      normalizeFunction: "polynomial",
    });
  }

  if ($("#usa_map").length) {
    $("#usa_map").vectorMap({
      map: "usa_en",
      backgroundColor: null,
      color: "#ffffff",
      hoverOpacity: 0.7,
      selectedColor: "#666666",
      enableZoom: true,
      showTooltip: true,
      values: sample_data,
      scaleColors: ["#E6F2F0", "#149B7E"],
      normalizeFunction: "polynomial",
    });
  }
}

function init_skycons() {
  if (typeof Skycons === "undefined") {
    return;
  }
  console.log("init_skycons");

  var icons = new Skycons({
      color: "#73879C",
    }),
    list = [
      "clear-day",
      "clear-night",
      "partly-cloudy-day",
      "partly-cloudy-night",
      "cloudy",
      "rain",
      "sleet",
      "snow",
      "wind",
      "fog",
    ],
    i;

  for (i = list.length; i--; ) icons.set(list[i], list[i]);

  icons.play();
}

function init_chart_doughnut() {
  if (typeof Chart === "undefined") {
    return;
  }

  console.log("init_chart_doughnut");

  if ($(".canvasDoughnut").length) {
    var chart_doughnut_settings = {
      type: "doughnut",
      tooltipFillColor: "rgba(51, 51, 51, 0.55)",
      data: {
        labels: ["Symbian", "Blackberry", "Other", "Android", "IOS"],
        datasets: [
          {
            data: [15, 20, 30, 10, 30],
            backgroundColor: [
              "#BDC3C7",
              "#9B59B6",
              "#E74C3C",
              "#26B99A",
              "#3498DB",
            ],
            hoverBackgroundColor: [
              "#CFD4D8",
              "#B370CF",
              "#E95E4F",
              "#36CAAB",
              "#49A9EA",
            ],
          },
        ],
      },
      options: {
        legend: false,
        responsive: false,
      },
    };

    $(".canvasDoughnut").each(function () {
      var chart_element = $(this);
      var chart_doughnut = new Chart(chart_element, chart_doughnut_settings);
    });
  }
}

function init_gauge() {
  if (typeof Gauge === "undefined") {
    return;
  }

  console.log("init_gauge [" + $(".gauge-chart").length + "]");

  console.log("init_gauge");

  var chart_gauge_settings = {
    lines: 12,
    angle: 0,
    lineWidth: 0.4,
    pointer: {
      length: 0.75,
      strokeWidth: 0.042,
      color: "#1D212A",
    },
    limitMax: "false",
    colorStart: "#1ABC9C",
    colorStop: "#1ABC9C",
    strokeColor: "#F0F3F3",
    generateGradient: true,
  };

  if ($("#chart_gauge_01").length) {
    var chart_gauge_01_elem = document.getElementById("chart_gauge_01");
    var chart_gauge_01 = new Gauge(chart_gauge_01_elem).setOptions(
      chart_gauge_settings
    );
  }

  if ($("#gauge-text").length) {
    chart_gauge_01.maxValue = 6000;
    chart_gauge_01.animationSpeed = 32;
    chart_gauge_01.set(3200);
    chart_gauge_01.setTextField(document.getElementById("gauge-text"));
  }

  if ($("#chart_gauge_02").length) {
    var chart_gauge_02_elem = document.getElementById("chart_gauge_02");
    var chart_gauge_02 = new Gauge(chart_gauge_02_elem).setOptions(
      chart_gauge_settings
    );
  }

  if ($("#gauge-text2").length) {
    chart_gauge_02.maxValue = 9000;
    chart_gauge_02.animationSpeed = 32;
    chart_gauge_02.set(2400);
    chart_gauge_02.setTextField(document.getElementById("gauge-text2"));
  }
}

/* SPARKLINES */

function init_sparklines() {
  if (typeof jQuery.fn.sparkline === "undefined") {
    return;
  }
  console.log("init_sparklines");

  $(".sparkline_one").sparkline(
    [
      2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5, 4, 5, 4, 5, 4, 3, 4, 5,
      6, 7, 5, 4, 3, 5, 6,
    ],
    {
      type: "bar",
      height: "125",
      barWidth: 13,
      colorMap: {
        7: "#a1a1a1",
      },
      barSpacing: 2,
      barColor: "#26B99A",
    }
  );

  $(".sparkline_two").sparkline(
    [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6],
    {
      type: "bar",
      height: "40",
      barWidth: 9,
      colorMap: {
        7: "#a1a1a1",
      },
      barSpacing: 2,
      barColor: "#26B99A",
    }
  );

  $(".sparkline_three").sparkline(
    [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6,2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, -6,2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6],
    {
      type: "line",
      width: "100%",
      height: "40",
      lineColor: "#26B99A",
      fillColor: "rgba(223, 223, 223, 0.57)",
      lineWidth: 2,
      spotColor: "#26B99A",
      minSpotColor: "#26B99A",
      spotRadius: 2
    }
  );
  

  $(".sparkline11").sparkline(
    [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3],
    {
      type: "bar",
      height: "40",
      barWidth: 8,
      colorMap: {
        7: "#a1a1a1",
      },
      barSpacing: 2,
      barColor: "#26B99A",
    }
  );

  $(".sparkline22").sparkline(
    [2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6],
    {
      type: "line",
      height: "40",
      width: "230",
      lineColor: "#26B99A",
      fillColor: "#ffffff",
      lineWidth: 3,
      spotColor: "#34495E",
      minSpotColor: "#34495E",
      fillColor: "rgba(38, 185, 154, 0.31)"
    }
  );

  $(".sparkline_bar").sparkline(
    [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5],
    {
      type: "bar",
      colorMap: {
        7: "#a1a1a1",
      },
      barColor: "#26B99A",
    }
  );

  $(".sparkline_area").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
    type: "line",
    lineColor: "#26B99A",
    fillColor: "#26B99A",
    spotColor: "#4578a0",
    minSpotColor: "#728fb2",
    maxSpotColor: "#6d93c4",
    highlightSpotColor: "#ef5179",
    highlightLineColor: "#8ba8bf",
    spotRadius: 2.5,
    width: 85,
  });

  $(".sparkline_line").sparkline(
    [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5],
    {
      type: "line",
      lineColor: "#26B99A",
      fillColor: "#ffffff",
      width: 85,
      spotColor: "#34495E",
      minSpotColor: "#34495E",
    }
  );

  $(".sparkline_pie").sparkline([1, 1, 2, 1], {
    type: "pie",
    sliceColors: ["#26B99A", "#ccc", "#75BCDD", "#D66DE2"],
  });

  $(".sparkline_discreet").sparkline(
    [4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 2, 4, 3, 7, 8, 9, 7, 6, 4, 3],
    {
      type: "discrete",
      barWidth: 3,
      lineColor: "#26B99A",
      width: "85",
    }
  );
}

/* AUTOCOMPLETE */

function init_autocomplete() {
  if (typeof autocomplete === "undefined") {
    return;
  }
  console.log("init_autocomplete");

  var countries = {
    AD: "Andorra",
    A2: "Andorra Test",
    AE: "United Arab Emirates",
    AF: "Afghanistan",
    AG: "Antigua and Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AN: "Netherlands Antilles",
    AO: "Angola",
    AQ: "Antarctica",
    AR: "Argentina",
    AS: "American Samoa",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "Åland Islands",
    AZ: "Azerbaijan",
    BA: "Bosnia and Herzegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgium",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barthélemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "British Antarctic Territory",
    BR: "Brazil",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvet Island",
    BW: "Botswana",
    BY: "Belarus",
    BZ: "Belize",
    CA: "Canada",
    CC: "Cocos [Keeling] Islands",
    CD: "Congo - Kinshasa",
    CF: "Central African Republic",
    CG: "Congo - Brazzaville",
    CH: "Switzerland",
    CI: "Côte d’Ivoire",
    CK: "Cook Islands",
    CL: "Chile",
    CM: "Cameroon",
    CN: "China",
    CO: "Colombia",
    CR: "Costa Rica",
    CS: "Serbia and Montenegro",
    CT: "Canton and Enderbury Islands",
    CU: "Cuba",
    CV: "Cape Verde",
    CX: "Christmas Island",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DD: "East Germany",
    DE: "Germany",
    DJ: "Djibouti",
    DK: "Denmark",
    DM: "Dominica",
    DO: "Dominican Republic",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egypt",
    EH: "Western Sahara",
    ER: "Eritrea",
    ES: "Spain",
    ET: "Ethiopia",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falkland Islands",
    FM: "Micronesia",
    FO: "Faroe Islands",
    FQ: "French Southern and Antarctic Territories",
    FR: "France",
    FX: "Metropolitan France",
    GA: "Gabon",
    GB: "United Kingdom",
    GD: "Grenada",
    GE: "Georgia",
    GF: "French Guiana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Greenland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Equatorial Guinea",
    GR: "Greece",
    GS: "South Georgia and the South Sandwich Islands",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hong Kong SAR China",
    HM: "Heard Island and McDonald Islands",
    HN: "Honduras",
    HR: "Croatia",
    HT: "Haiti",
    HU: "Hungary",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IM: "Isle of Man",
    IN: "India",
    IO: "British Indian Ocean Territory",
    IQ: "Iraq",
    IR: "Iran",
    IS: "Iceland",
    IT: "Italy",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    JT: "Johnston Island",
    KE: "Kenya",
    KG: "Kyrgyzstan",
    KH: "Cambodia",
    KI: "Kiribati",
    KM: "Comoros",
    KN: "Saint Kitts and Nevis",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KY: "Cayman Islands",
    KZ: "Kazakhstan",
    LA: "Laos",
    LB: "Lebanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lithuania",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Morocco",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MF: "Saint Martin",
    MG: "Madagascar",
    MH: "Marshall Islands",
    MI: "Midway Islands",
    MK: "Macedonia",
    ML: "Mali",
    MM: "Myanmar [Burma]",
    MN: "Mongolia",
    MO: "Macau SAR China",
    MP: "Northern Mariana Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldives",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mozambique",
    NA: "Namibia",
    NC: "New Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Netherlands",
    NO: "Norway",
    NP: "Nepal",
    NQ: "Dronning Maud Land",
    NR: "Nauru",
    NT: "Neutral Zone",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PC: "Pacific Islands Trust Territory",
    PE: "Peru",
    PF: "French Polynesia",
    PG: "Papua New Guinea",
    PH: "Philippines",
    PK: "Pakistan",
    PL: "Poland",
    PM: "Saint Pierre and Miquelon",
    PN: "Pitcairn Islands",
    PR: "Puerto Rico",
    PS: "Palestinian Territories",
    PT: "Portugal",
    PU: "U.S. Miscellaneous Pacific Islands",
    PW: "Palau",
    PY: "Paraguay",
    PZ: "Panama Canal Zone",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russia",
    RW: "Rwanda",
    SA: "Saudi Arabia",
    SB: "Solomon Islands",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Sweden",
    SG: "Singapore",
    SH: "Saint Helena",
    SI: "Slovenia",
    SJ: "Svalbard and Jan Mayen",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    ST: "São Tomé and Príncipe",
    SU: "Union of Soviet Socialist Republics",
    SV: "El Salvador",
    SY: "Syria",
    SZ: "Swaziland",
    TC: "Turks and Caicos Islands",
    TD: "Chad",
    TF: "French Southern Territories",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tajikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turkey",
    TT: "Trinidad and Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraine",
    UG: "Uganda",
    UM: "U.S. Minor Outlying Islands",
    US: "United States",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Vatican City",
    VC: "Saint Vincent and the Grenadines",
    VD: "North Vietnam",
    VE: "Venezuela",
    VG: "British Virgin Islands",
    VI: "U.S. Virgin Islands",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis and Futuna",
    WK: "Wake Island",
    WS: "Samoa",
    YD: "People's Democratic Republic of Yemen",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "South Africa",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    ZZ: "Unknown or Invalid Region",
  };

  var countriesArray = $.map(countries, function (value, key) {
    return {
      value: value,
      data: key,
    };
  });

  // initialize autocomplete with custom appendTo
  $("#autocomplete-custom-append").autocomplete({
    lookup: countriesArray,
  });
}

/* AUTOSIZE */

function init_autosize() {
  if (typeof $.fn.autosize !== "undefined") {
    autosize($(".resizable_textarea"));
  }
}

/* PARSLEY 

function init_parsley() {
  if (typeof parsley === "undefined") {
    return;
  }
  console.log("init_parsley");

  $( "parsley:field:validate", function () {
    validateFront();
  });
  $("#demo-form .btn").on("click", function () {
    $("#demo-form").parsley().validate();
    validateFront();
  });
  var validateFront = function () {
    if (true === $("#demo-form").parsley().isValid()) {
      $(".bs-callout-info").removeClass("hidden");
      $(".bs-callout-warning").addClass("hidden");
    } else {
      $(".bs-callout-info").addClass("hidden");
      $(".bs-callout-warning").removeClass("hidden");
    }
  };

  $("parsley:field:validate", function () {
    validateFront();
  });
  $("#demo-form2 .btn").on("click", function () {
    $("#demo-form2").parsley().validate();
    validateFront();
  });
  var validateFront = function () {
    if (true === $("#demo-form2").parsley().isValid()) {
      $(".bs-callout-info").removeClass("hidden");
      $(".bs-callout-warning").addClass("hidden");
    } else {
      $(".bs-callout-info").addClass("hidden");
      $(".bs-callout-warning").removeClass("hidden");
    }
  };

  try {
    hljs.initHighlightingOnLoad();
  } catch (err) {}
}
*/
/* INPUTS */

function onAddTag(tag) {
  alert("Added a tag: " + tag);
}

function onRemoveTag(tag) {
  alert("Removed a tag: " + tag);
}

function onChangeTag(input, tag) {
  alert("Changed a tag: " + tag);
}

// tags input
function init_TagsInput() {
  if (typeof $.fn.tagsInput !== "undefined") {
    $("#tags_1").tagsInput({
      width: "auto",
    });
  }
}

/* SELECT2 

$(document).ready(function () {
  $(".js-example-basic-single").select2({
    placeholder: "SELECCIONE SKU",
  });
});
*/

function init_select2() {
  if (typeof $.fn.select2 === "undefined") {
    return;
  }
  console.log("init_toolbox");

  $(".select2_single").select2({
    placeholder: "Select a state",
    allowClear: true,
  });
  $(".js-example-basic-single").select2({
    placeholder: "CÓDIGO SKU",
  });

  $(".select2_group").select2({});
  $(".select2_multiple").select2({
    maximumSelectionLength: 4,
    placeholder: "With Max Selection limit 4",
    allowClear: true,
  });
}

/* WYSIWYG EDITOR */

function init_wysiwyg() {
  if (typeof $.fn.wysiwyg === "undefined") {
    return;
  }
  console.log("init_wysiwyg");

  function init_ToolbarBootstrapBindings() {
    var fonts = [
        "Serif",
        "Sans",
        "Arial",
        "Arial Black",
        "Courier",
        "Courier New",
        "Comic Sans MS",
        "Helvetica",
        "Impact",
        "Lucida Grande",
        "Lucida Sans",
        "Tahoma",
        "Times",
        "Times New Roman",
        "Verdana",
      ],
      fontTarget = $("[title=Font]").siblings(".dropdown-menu");
    $.each(fonts, function (idx, fontName) {
      fontTarget.append(
        $(
          '<li><a data-edit="fontName ' +
            fontName +
            '" style="font-family:\'' +
            fontName +
            "'\">" +
            fontName +
            "</a></li>"
        )
      );
    });
    $("a[title]").tooltip({
      container: "body",
    });
    $(".dropdown-menu input")
      .click(function () {
        return false;
      })
      .change(function () {
        $(this)
          .parent(".dropdown-menu")
          .siblings(".dropdown-toggle")
          .dropdown("toggle");
      })
      .keydown("esc", function () {
        this.value = "";
        $(this).change();
      });

    $("[data-role=magic-overlay]").each(function () {
      var overlay = $(this),
        target = $(overlay.data("target"));
      overlay
        .css("opacity", 0)
        .css("position", "absolute")
        .offset(target.offset())
        .width(target.outerWidth())
        .height(target.outerHeight());
    });

    if ("onwebkitspeechchange" in document.createElement("input")) {
      var editorOffset = $("#editor").offset();

      $(".voiceBtn")
        .css("position", "absolute")
        .offset({
          top: editorOffset.top,
          left: editorOffset.left + $("#editor").innerWidth() - 35,
        });
    } else {
      $(".voiceBtn").hide();
    }
  }

  function showErrorAlert(reason, detail) {
    var msg = "";
    if (reason === "unsupported-file-type") {
      msg = "Unsupported format " + detail;
    } else {
      console.log("error uploading file", reason, detail);
    }
    $(
      '<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
        "<strong>File upload error</strong> " +
        msg +
        " </div>"
    ).prependTo("#alerts");
  }

  $(".editor-wrapper").each(function () {
    var id = $(this).attr("id"); //editor-one

    $(this).wysiwyg({
      toolbarSelector: '[data-target="#' + id + '"]',
      fileUploadError: showErrorAlert,
    });
  });

  window.prettyPrint;
  prettyPrint();
}

/* CROPPER */

function init_cropper() {
  if (typeof $.fn.cropper === "undefined") {
    return;
  }
  console.log("init_cropper");

  var $image = $("#image");
  var $download = $("#download");
  var $dataX = $("#dataX");
  var $dataY = $("#dataY");
  var $dataHeight = $("#dataHeight");
  var $dataWidth = $("#dataWidth");
  var $dataRotate = $("#dataRotate");
  var $dataScaleX = $("#dataScaleX");
  var $dataScaleY = $("#dataScaleY");
  var options = {
    aspectRatio: 16 / 9,
    preview: ".img-preview",
    crop: function (e) {
      $dataX.val(Math.round(e.x));
      $dataY.val(Math.round(e.y));
      $dataHeight.val(Math.round(e.height));
      $dataWidth.val(Math.round(e.width));
      $dataRotate.val(e.rotate);
      $dataScaleX.val(e.scaleX);
      $dataScaleY.val(e.scaleY);
    },
  };

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Cropper
  $image
    .on({
      "build.cropper": function (e) {
        console.log(e.type);
      },
      "built.cropper": function (e) {
        console.log(e.type);
      },
      "cropstart.cropper": function (e) {
        console.log(e.type, e.action);
      },
      "cropmove.cropper": function (e) {
        console.log(e.type, e.action);
      },
      "cropend.cropper": function (e) {
        console.log(e.type, e.action);
      },
      "crop.cropper": function (e) {
        console.log(
          e.type,
          e.x,
          e.y,
          e.width,
          e.height,
          e.rotate,
          e.scaleX,
          e.scaleY
        );
      },
      "zoom.cropper": function (e) {
        console.log(e.type, e.ratio);
      },
    })
    .cropper(options);

  // Buttons
  if (!$.isFunction(document.createElement("canvas").getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Download
  if (typeof $download[0].download === "undefined") {
    $download.addClass("disabled");
  }

  // Options
  $(".docs-toggles").on("change", "input", function () {
    var $this = $(this);
    var name = $this.attr("name");
    var type = $this.prop("type");
    var cropBoxData;
    var canvasData;

    if (!$image.data("cropper")) {
      return;
    }

    if (type === "checkbox") {
      options[name] = $this.prop("checked");
      cropBoxData = $image.cropper("getCropBoxData");
      canvasData = $image.cropper("getCanvasData");

      options.built = function () {
        $image.cropper("setCropBoxData", cropBoxData);
        $image.cropper("setCanvasData", canvasData);
      };
    } else if (type === "radio") {
      options[name] = $this.val();
    }

    $image.cropper("destroy").cropper(options);
  });

  // Methods
  $(".docs-buttons").on("click", "[data-method]", function () {
    var $this = $(this);
    var data = $this.data();
    var $target;
    var result;

    if ($this.prop("disabled") || $this.hasClass("disabled")) {
      return;
    }

    if ($image.data("cropper") && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== "undefined") {
        $target = $(data.target);

        if (typeof data.option === "undefined") {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case "scaleX":
        case "scaleY":
          $(this).data("option", -data.option);
          break;

        case "getCroppedCanvas":
          if (result) {
            // Bootstrap's Modal
            $("#getCroppedCanvasModal")
              .modal()
              .find(".modal-body")
              .html(result);

            if (!$download.hasClass("disabled")) {
              $download.attr("href", result.toDataURL());
            }
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });

  // Keyboard
  $(document.body).on("keydown", function (e) {
    if (!$image.data("cropper") || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper("move", -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper("move", 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper("move", 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper("move", 0, 1);
        break;
    }
  });

  // Import image
  var $inputImage = $("#inputImage");
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data("cropper")) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          $image
            .one("built.cropper", function () {
              // Revoke when load complete
              URL.revokeObjectURL(blobURL);
            })
            .cropper("reset")
            .cropper("replace", blobURL);
          $inputImage.val("");
        } else {
          window.alert("Please choose an image file.");
        }
      }
    });
  } else {
    $inputImage.prop("disabled", true).parent().addClass("disabled");
  }
}

/* CROPPER --- end */

/* KNOB */

function init_knob() {
  if (typeof $.fn.knob === "undefined") {
    return;
  }
  console.log("init_knob");

  $(".knob").knob({
    change: function (value) {
      //console.log("change : " + value);
    },
    release: function (value) {
      //console.log(this.$.attr('value'));
      console.log("release : " + value);
    },
    cancel: function () {
      console.log("cancel : ", this);
    },
    /*format : function (value) {
         return value + '%';
         },*/
    draw: function () {
      // "tron" case
      if (this.$.data("skin") == "tron") {
        this.cursorExt = 0.3;

        var a = this.arc(this.cv), // Arc
          pa, // Previous arc
          r = 1;

        this.g.lineWidth = this.lineWidth;

        if (this.o.displayPrevious) {
          pa = this.arc(this.v);
          this.g.beginPath();
          this.g.strokeStyle = this.pColor;
          this.g.arc(
            this.xy,
            this.xy,
            this.radius - this.lineWidth,
            pa.s,
            pa.e,
            pa.d
          );
          this.g.stroke();
        }

        this.g.beginPath();
        this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
        this.g.arc(
          this.xy,
          this.xy,
          this.radius - this.lineWidth,
          a.s,
          a.e,
          a.d
        );
        this.g.stroke();

        this.g.lineWidth = 2;
        this.g.beginPath();
        this.g.strokeStyle = this.o.fgColor;
        this.g.arc(
          this.xy,
          this.xy,
          this.radius - this.lineWidth + 1 + (this.lineWidth * 2) / 3,
          0,
          2 * Math.PI,
          false
        );
        this.g.stroke();

        return false;
      }
    },
  });

  // Example of infinite knob, iPod click wheel
  var v,
    up = 0,
    down = 0,
    i = 0,
    $idir = $("div.idir"),
    $ival = $("div.ival"),
    incr = function () {
      i++;
      $idir.show().html("+").fadeOut();
      $ival.html(i);
    },
    decr = function () {
      i--;
      $idir.show().html("-").fadeOut();
      $ival.html(i);
    };
  $("input.infinite").knob({
    min: 0,
    max: 20,
    stopper: false,
    change: function () {
      if (v > this.cv) {
        if (up) {
          decr();
          up = 0;
        } else {
          up = 1;
          down = 0;
        }
      } else {
        if (v < this.cv) {
          if (down) {
            incr();
            down = 0;
          } else {
            down = 1;
            up = 0;
          }
        }
      }
      v = this.cv;
    },
  });
}

/* INPUT MASK */

function init_InputMask() {
  if (typeof $.fn.inputmask === "undefined") {
    return;
  }
  console.log("init_InputMask");

  $(":input").inputmask();
}

/* COLOR PICKER */

function init_ColorPicker() {
  if (typeof $.fn.colorpicker === "undefined") {
    return;
  }
  console.log("init_ColorPicker");

  $(".demo1").colorpicker();
  $(".demo2").colorpicker();

  $("#demo_forceformat").colorpicker({
    format: "rgba",
    horizontal: true,
  });

  $("#demo_forceformat3").colorpicker({
    format: "rgba",
  });

  $(".demo-auto").colorpicker();
}

/* ION RANGE SLIDER */

function init_IonRangeSlider() {
  if (typeof $.fn.ionRangeSlider === "undefined") {
    return;
  }
  console.log("init_IonRangeSlider");

  $("#range_27").ionRangeSlider({
    type: "double",
    min: 1000000,
    max: 2000000,
    grid: true,
    force_edges: true,
  });
  $("#range").ionRangeSlider({
    hide_min_max: true,
    keyboard: true,
    min: 0,
    max: 5000,
    from: 1000,
    to: 4000,
    type: "double",
    step: 1,
    prefix: "$",
    grid: true,
  });
  $("#range_25").ionRangeSlider({
    type: "double",
    min: 1000000,
    max: 2000000,
    grid: true,
  });
  $("#range_26").ionRangeSlider({
    type: "double",
    min: 0,
    max: 10000,
    step: 500,
    grid: true,
    grid_snap: true,
  });
  $("#range_31").ionRangeSlider({
    type: "double",
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    from_fixed: true,
  });
  $(".range_min_max").ionRangeSlider({
    type: "double",
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    max_interval: 50,
  });
  $(".range_time24").ionRangeSlider({
    min: +moment().subtract(12, "hours").format("X"),
    max: +moment().format("X"),
    from: +moment().subtract(6, "hours").format("X"),
    grid: true,
    force_edges: true,
    prettify: function (num) {
      var m = moment(num, "X");
      return m.format("Do MMMM, HH:mm");
    },
  });
}

/* DATERANGEPICKER, se usa en las vistas para mostrar las fechas para los filtros*/
moment.locale("es");

function init_daterangepicker_right(dataTableId) {
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }
  console.log("init_daterangepicker_right");

  var cb = function (start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $("#reportrange_right span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
  };

  var optionSet1 = {
    startDate: moment().subtract(0, "days"),
    endDate: moment(),
    minDate: "01/01/2023",
    maxDate: "31/12/2040",
    dateLimit: {
      days: 365,
    },
    showDropdowns: true,
    showWeekNumbers: true,
    timePicker: false,
    timePickerIncrement: 1,
    timePicker12Hour: true,
    ranges: {
      Hoy: [moment(), moment()],
      Ayer: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Hace 7 Dias": [moment().subtract(6, "days"), moment()],
      "Hace 30 Dias": [moment().subtract(29, "days"), moment()],
      "Este Mes": [moment().startOf("month"), moment().endOf("month")],
      "Ultimo Mes": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
    opens: "left",
    buttonClasses: ["btn btn-default"],
    applyClass: "btn-sm btn-outline-info",
    cancelClass: "btn-sm",
    format: "DD/MM/YYYY",
    separator: " to ",
    locale: {
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
      fromLabel: "Desde",
      toLabel: "Hasta",
      customRangeLabel: "Personalizado",
      daysOfWeek: ["Dom", "Lun", "Mar", "Mar", "Jue", "Vie", "Sab"],
      monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ],
      firstDay: 1,
    },
  };
  $("#reportrange_right span").html(
    moment().subtract(29, "days").format("MMMM D, YYYY") +
      " - " +
      moment().format("MMMM D, YYYY")
  );

  $("#reportrange_right").daterangepicker(optionSet1, cb);
  //----------------
  $("#reportrange_right").on("show.daterangepicker", function () {
    console.log("show event fired");
  });
  $("#reportrange_right").on("hide.daterangepicker", function () {
    console.log("hide event fired");
  });
  //---------------

  // funcion para reutilizar filas
function reutilizarFilas(registrosF) {
  var table = $(dataTableId).DataTable();
  table.clear();
  registrosF.forEach(function (registro, index) {
    // Aqui registro.fecha_registro seria "14 de noviembre de 2023 a las 07:41"
    var fechaFormateada = moment(registro.fecha_registro).format(
      "DD/MM/YYYY HH:MM:SS"
    );
    console.log("aca el registro en el for", registro);
    var nuevaFila = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${registro.tamu_firstname} ${registro.tamu_lastname}</td>
                        <td>${fechaFormateada}</td>
                        <td>${registro.areaId}</td>
                        <td>${registro.lineaId}</td>
                        <td>${registro.seccionId}</td>
                        <td>${registro.skuID}</td>
                        <td>${registro.peso_obtenido}</td>
                        <td>${registro.peso_objetivo}</td>
                        <td>${registro.humedad_obtenida}</td>
                        <td>${registro.humedad_objetiva}</td>
                        <td>${registro.temperatura_obtenida}</td>
                        <td>${registro.temperatura_objetiva}</td>
                        <td>${registro.id}</td>
                    </tr>
                `;
    table.row.add($(nuevaFila)).draw();
  });
}
// fin de funcion

// funcion para filtrar los datos por fecha en la vista de registros
  // se lee la fecha que viene del date picker
  $("#reportrange_right").on("apply.daterangepicker", function (ev, picker) {
    var startDate = picker.startDate;
    var endDate = picker.endDate;

    // Formatear fechas en el formato deseado
    var startDateFormatted = startDate.format("YYYY-MM-DD");
    var endDateFormatted = endDate.format("YYYY-MM-DD");

    console.log(
      "Fecha a buscar entre " + startDateFormatted + " a " + endDateFormatted
    );

    const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    $.ajax({
      type: "POST",
      data: {
        startDateFormatted: startDateFormatted,
        endDateFormatted: endDateFormatted,
        csrfmiddlewaretoken: csrfToken,
      },
      url: "DateFilter/",
      dataType: "json",

      success: function (data) {
        // `response` contiene los registros filtrados\
        console.log(data);
        //var registrosFiltrados = JSON.parse(data.registros_filtrados);
        var registrosFiltrados = data.registros_filtrados;

        if (registrosFiltrados.length > 0) {
          reutilizarFilas(registrosFiltrados);
        } else {
          // Si no hay registros, limpiamos la tabla
          table.clear().draw();
        }
      },
      error: function (error) {
        console.error("Error al filtrar registros:", error);
        console.log("Error de datos");
      },
    });
  });
  $("#reportrange_right").on("cancel.daterangepicker", function (ev, picker) {
    console.log("cancel event fired");
    const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;
    $.ajax({
      type: "POST",
      data: {
        startDateFormatted: "",
        csrfmiddlewaretoken: csrfToken,
      },
      url: "DateFilter/",
      dataType: "json",
      success: function (data) {
        // `response` contiene los registros filtrados\
        console.log(data);
        //var registrosFiltrados = JSON.parse(data.registros_filtrados);
        var registrosFiltrados = data.registros_filtrados;

        reutilizarFilas(registrosFiltrados);
      },
      error: function (error) {
        console.error("Error al filtrar registros:", error);
      },
    });
  });
// fin de funcion de filtrar por fechas

  $("#options1").click(function () {
    $("#reportrange_right").data("daterangepicker").setOptions(optionSet1, cb);
  });

  $("#options2").click(function () {
    $("#reportrange_right").data("daterangepicker").setOptions(optionSet2, cb);
  });

  $("#destroy").click(function () {
    $("#reportrange_right").data("daterangepicker").remove();
  });
}

function init_daterangepicker_single_call() {
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }
  console.log("init_daterangepicker_single_call");

  $("#single_cal1").daterangepicker(
    {
      singleDatePicker: true,
      singleClasses: "picker_1",
    },
    function (start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    }
  );
  $("#single_cal2").daterangepicker(
    {
      singleDatePicker: true,
      singleClasses: "picker_2",
    },
    function (start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    }
  );
  $("#single_cal3").daterangepicker(
    {
      singleDatePicker: true,
      singleClasses: "picker_3",
    },
    function (start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    }
  );
  $("#single_cal4").daterangepicker(
    {
      singleDatePicker: true,
      singleClasses: "picker_4",
    },
    function (start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    }
  );
}

function init_daterangepicker_reservation() {
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }
  console.log("init_daterangepicker_reservation");

  $("#reservation").daterangepicker(null, function (start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
  });

  $("#reservation-time").daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: "MM/DD/YYYY h:mm A",
    },
  });
}

/* SMART WIZARD */

function init_SmartWizard() {
  if (typeof $.fn.smartWizard === "undefined") {
    return;
  }
  console.log("init_SmartWizard");

  $("#wizard").smartWizard();

  $("#wizard_verticle").smartWizard({
    transitionEffect: "slide",
  });

  $(".buttonNext").addClass("btn btn-success");
  $(".buttonPrevious").addClass("btn btn-primary");
  $(".buttonFinish").addClass("btn btn-default");
}

/* VALIDATOR */

function init_validator() {
  if (typeof validator === "undefined") {
    return;
  }
  console.log("init_validator");

  // initialize the validator function
  validator.message.date = "not a real date";

  // validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
  $("form")
    .on(
      "blur",
      "input[required], input.optional, select.required",
      validator.checkField
    )
    .on("change", "select.required", validator.checkField)
    .on("keypress", "input[required][pattern]", validator.keypress);

  $(".multi.required").on("keyup blur", "input", function () {
    validator.checkField.apply($(this).siblings().last()[0]);
  });

  $("form").submit(function (e) {
    e.preventDefault();
    var submit = true;

    // evaluate the form using generic validaing
    if (!validator.checkAll($(this))) {
      submit = false;
    }

    if (submit) this.submit();

    return false;
  });
}

/* PNotify 

function init_PNotify() {
  if (typeof PNotify === "undefined") {
    return;
  }
  console.log("init_PNotify");

  new PNotify({
    title: "PNotify",
    type: "info",
    text: "Welcome. Try hovering over me. You can click things behind me, because I'm non-blocking.",
    nonblock: {
      nonblock: true,
    },
    addclass: "dark",
    styling: "bootstrap3",
    hide: false,
    before_close: function (PNotify) {
      PNotify.update({
        title: PNotify.options.title + " - Enjoy your Stay",
        before_close: null,
      });

      PNotify.queueRemove();

      return false;
    },
  });
}
*/
/* CUSTOM NOTIFICATION */

function init_CustomNotification() {
  console.log("run_customtabs");

  if (typeof CustomTabs === "undefined") {
    return;
  }
  console.log("init_CustomTabs");

  var cnt = 10;

  TabbedNotification = function (options) {
    var message =
      "<div id='ntf" +
      cnt +
      "' class='text alert-" +
      options.type +
      "' style='display:none'><h2><i class='fa fa-bell'></i> " +
      options.title +
      "</h2><div class='close'><a href='javascript:;' class='notification_close'><i class='fa fa-close'></i></a></div><p>" +
      options.text +
      "</p></div>";

    if (!document.getElementById("custom_notifications")) {
      alert("doesnt exists");
    } else {
      $("#custom_notifications ul.notifications").append(
        "<li><a id='ntlink" +
          cnt +
          "' class='alert-" +
          options.type +
          "' href='#ntf" +
          cnt +
          "'><i class='fa fa-bell animated shake'></i></a></li>"
      );
      $("#custom_notifications #notif-group").append(message);
      cnt++;
      CustomTabs(options);
    }
  };

  CustomTabs = function (options) {
    $(".tabbed_notifications > div").hide();
    $(".tabbed_notifications > div:first-of-type").show();
    $("#custom_notifications").removeClass("dsp_none");
    $(".notifications a").click(function (e) {
      e.preventDefault();
      var $this = $(this),
        tabbed_notifications =
          "#" + $this.parents(".notifications").data("tabbed_notifications"),
        others = $this.closest("li").siblings().children("a"),
        target = $this.attr("href");
      others.removeClass("active");
      $this.addClass("active");
      $(tabbed_notifications).children("div").hide();
      $(target).show();
    });
  };

  CustomTabs();

  var tabid = (idname = "");

  $(document).on("click", ".notification_close", function (e) {
    idname = $(this).parent().parent().attr("id");
    tabid = idname.substr(-2);
    $("#ntf" + tabid).remove();
    $("#ntlink" + tabid)
      .parent()
      .remove();
    $(".notifications a").first().addClass("active");
    $("#notif-group div").first().css("display", "block");
  });
}

/* EASYPIECHART */

function init_EasyPieChart() {
  if (typeof $.fn.easyPieChart === "undefined") {
    return;
  }
  console.log("init_EasyPieChart");

  $(".chart").easyPieChart({
    easing: "easeOutElastic",
    delay: 3000,
    barColor: "#26B99A",
    trackColor: "#fff",
    scaleColor: false,
    lineWidth: 20,
    trackWidth: 16,
    lineCap: "butt",
    onStep: function (from, to, percent) {
      $(this.el).find(".percent").text(Math.round(percent));
    },
  });
  var chart = (window.chart = $(".chart").data("easyPieChart"));
  $(".js_update").on("click", function () {
    chart.update(Math.random() * 200 - 100);
  });

  //hover and retain popover when on popover content
  var originalLeave = $.fn.popover.Constructor.prototype.leave;
  $.fn.popover.Constructor.prototype.leave = function (obj) {
    var self =
      obj instanceof this.constructor
        ? obj
        : $(obj.currentTarget)
            [this.type](this.getDelegateOptions())
            .data("bs." + this.type);
    var container, timeout;

    originalLeave.call(this, obj);

    if (obj.currentTarget) {
      container = $(obj.currentTarget).siblings(".popover");
      timeout = self.timeout;
      container.one("mouseenter", function () {
        //We entered the actual popover – call off the dogs
        clearTimeout(timeout);
        //Let's monitor popover content instead
        container.one("mouseleave", function () {
          $.fn.popover.Constructor.prototype.leave.call(self, self);
        });
      });
    }
  };

  $("body").popover({
    selector: "[data-popover]",
    trigger: "click hover",
    delay: {
      show: 50,
      hide: 400,
    },
  });
}

function init_charts() {
  console.log("run_charts  typeof [" + typeof Chart + "]");

  if (typeof Chart === "undefined") {
    return;
  }

  console.log("init_charts");

  Chart.defaults.global.legend = {
    enabled: false,
  };

  if ($("#canvas_line").length) {
    var canvas_line_00 = new Chart(document.getElementById("canvas_line"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
    });
  }

  if ($("#canvas_line1").length) {
    var canvas_line_01 = new Chart(document.getElementById("canvas_line1"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
    });
  }

  if ($("#canvas_line2").length) {
    var canvas_line_02 = new Chart(document.getElementById("canvas_line2"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
    });
  }

  if ($("#canvas_line3").length) {
    var canvas_line_03 = new Chart(document.getElementById("canvas_line3"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
    });
  }

  if ($("#canvas_line4").length) {
    var canvas_line_04 = new Chart(document.getElementById("canvas_line4"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
    });
  }

  // Line chart

  if ($("#lineChart").length) {
    var ctx = document.getElementById("lineChart");
    var lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2],
          },
        ],
      },
    });
  }

  // Bar chart

  if ($("#mybarChart").length) {
    var ctx = document.getElementById("mybarChart");
    var mybarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "# of Votes",
            backgroundColor: "#26B99A",
            data: [51, 30, 40, 28, 92, 50, 45],
          },
          {
            label: "# of Votes",
            backgroundColor: "#03586A",
            data: [41, 56, 25, 48, 72, 34, 12],
          },
        ],
      },

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  // Doughnut chart

  if ($("#canvasDoughnut").length) {
    var ctx = document.getElementById("canvasDoughnut");
    var data = {
      labels: [
        "Dark Grey",
        "Purple Color",
        "Gray Color",
        "Green Color",
        "Blue Color",
      ],
      datasets: [
        {
          data: [120, 50, 140, 180, 100],
          backgroundColor: [
            "#455C73",
            "#9B59B6",
            "#BDC3C7",
            "#26B99A",
            "#3498DB",
          ],
          hoverBackgroundColor: [
            "#34495E",
            "#B370CF",
            "#CFD4D8",
            "#36CAAB",
            "#49A9EA",
          ],
        },
      ],
    };

    var canvasDoughnut = new Chart(ctx, {
      type: "doughnut",
      tooltipFillColor: "rgba(51, 51, 51, 0.55)",
      data: data,
    });
  }

  // Radar chart

  if ($("#canvasRadar").length) {
    var ctx = document.getElementById("canvasRadar");
    var data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(3, 88, 106, 0.2)",
          borderColor: "rgba(3, 88, 106, 0.80)",
          pointBorderColor: "rgba(3, 88, 106, 0.80)",
          pointBackgroundColor: "rgba(3, 88, 106, 0.80)",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(38, 185, 154, 0.2)",
          borderColor: "rgba(38, 185, 154, 0.85)",
          pointColor: "rgba(38, 185, 154, 0.85)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    };

    var canvasRadar = new Chart(ctx, {
      type: "radar",
      data: data,
    });
  }

  // Pie chart
  if ($("#pieChart").length) {
    var ctx = document.getElementById("pieChart");
    var data = {
      datasets: [
        {
          data: [120, 50, 140, 180, 100],
          backgroundColor: [
            "#455C73",
            "#9B59B6",
            "#BDC3C7",
            "#26B99A",
            "#3498DB",
          ],
          label: "My dataset", // for legend
        },
      ],
      labels: ["Dark Gray", "Purple", "Gray", "Green", "Blue"],
    };

    var pieChart = new Chart(ctx, {
      data: data,
      type: "pie",
      otpions: {
        legend: false,
      },
    });
  }

  // PolarArea chart

  if ($("#polarArea").length) {
    var ctx = document.getElementById("polarArea");
    var data = {
      datasets: [
        {
          data: [120, 50, 140, 180, 100],
          backgroundColor: [
            "#455C73",
            "#9B59B6",
            "#BDC3C7",
            "#26B99A",
            "#3498DB",
          ],
          label: "My dataset",
        },
      ],
      labels: ["Dark Gray", "Purple", "Gray", "Green", "Blue"],
    };

    var polarArea = new Chart(ctx, {
      data: data,
      type: "polarArea",
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

/* COMPOSE */

function init_compose() {
  if (typeof $.fn.slideToggle === "undefined") {
    return;
  }
  console.log("init_compose");

  $("#compose, .compose-close").click(function () {
    $(".compose").slideToggle();
  });
}

/* CALENDAR */

function init_calendar() {
  if (typeof $.fn.fullCalendar === "undefined") {
    return;
  }
  console.log("init_calendar");

  var date = new Date(),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear(),
    started,
    categoryClass;

  var calendar = $("#calendar").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay,listMonth",
    },
    selectable: true,
    selectHelper: true,
    select: function (start, end, allDay) {
      $("#fc_create").click();

      started = start;
      ended = end;

      $(".antosubmit").on("click", function () {
        var title = $("#title").val();
        if (end) {
          ended = end;
        }

        categoryClass = $("#event_type").val();

        if (title) {
          calendar.fullCalendar(
            "renderEvent",
            {
              title: title,
              start: started,
              end: end,
              allDay: allDay,
            },
            true // make the event "stick"
          );
        }

        $("#title").val("");

        calendar.fullCalendar("unselect");

        $(".antoclose").click();

        return false;
      });
    },
    eventClick: function (calEvent, jsEvent, view) {
      $("#fc_edit").click();
      $("#title2").val(calEvent.title);

      categoryClass = $("#event_type").val();

      $(".antosubmit2").on("click", function () {
        calEvent.title = $("#title2").val();

        calendar.fullCalendar("updateEvent", calEvent);
        $(".antoclose2").click();
      });

      calendar.fullCalendar("unselect");
    },
    editable: true,
    events: [
      {
        title: "All Day Event",
        start: new Date(y, m, 1),
      },
      {
        title: "Long Event",
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
      },
      {
        title: "Meeting",
        start: new Date(y, m, d, 10, 30),
        allDay: false,
      },
      {
        title: "Lunch",
        start: new Date(y, m, d + 14, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false,
      },
      {
        title: "Birthday Party",
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false,
      },
      {
        title: "Click for Google",
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: "http://google.com/",
      },
    ],
  });
}

/* DATA TABLES */

function init_DataTables(tableId, responsiveOption, columnFilterIndices) {
  console.log("run_datatables");

  if (typeof $.fn.DataTable === "undefined") {
    return;
  }
  console.log("init_DataTables");

  var handleDataTableGeneral = function () {
    if ($(tableId).length) {
      init_daterangepicker_right(tableId);
      $(tableId).DataTable({
        dom: "Bftlip",
        order: [[1, 'desc']],
        buttons: [
          {
            extend: "csv",
            className: "btn-sm btn-outline-info",
          },
          {
            extend: "excel",
            className: "btn-sm btn-outline-success",
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm btn-outline-danger",
            orientation: "landscape",
            pageSize: "LEGAL",
          },
        ],
        responsive: responsiveOption,
        initComplete: function () {
          var api = this.api();
          api.columns().every(function (index) {
            if (columnFilterIndices.includes(index)) {
              let column = this;

              // Create select element
              let select = document.createElement("select");
              select.add(new Option(""));
              column.footer().replaceChildren(select);

              // Apply listener for user change in value
              select.addEventListener("change", function () {
                var val = DataTable.util.escapeRegex(select.value);

                column.search(val ? "^" + val + "$" : "", true, false).draw();
                updateSum(api);
              });

              // Add list of options
              column
                .data()
                .unique()
                .sort()
                .each(function (d, j) {
                  select.add(new Option(d));
                });
            }
          });

          var pageInfo = api.page.info();
          var totalRows = pageInfo.recordsTotal;

          // Actualizar el footer con la suma total de filas
          api.columns(".sum").every(function () {
            var column = this;
            $(column.footer()).html("# " + totalRows);
          });
          // Calcular y mostrar la suma total de filas
          function updateSum(api) {
            api.on("draw.dt", function () {
              var pageInfo = api.page.info();
              var totalRows = pageInfo.recordsTotal;

              // Actualizar el footer con la suma total de filas
              api.columns(".sum").every(function () {
                var column = this;
                $(column.footer()).html("# " + totalRows);
              });
            });
          }
          updateSum(api);
        },
      });
    }
  };

  TableManageButtons = (function () {
    "use strict";
    return {
      init: function () {
        handleDataTableGeneral();
      },
    };
  })();

  $("#datatable").dataTable();

  $("#datatable-keytable").DataTable({
    keys: true,
  });

  $("#datatable-responsive").DataTable();

  $("#datatable-scroller").DataTable({
    ajax: "js/datatables/json/scroller-demo.json",
    deferRender: true,
    scrollY: 380,
    scrollCollapse: true,
    scroller: true,
  });

  $("#datatable-fixed-header").DataTable({
    fixedHeader: true,
  });

  var $datatable = $("#datatable-checkbox");

  $datatable.dataTable({
    order: [[2, "desc"]],
    columnDefs: [{ orderable: false, targets: [0] }],
  });
  $datatable.on("draw.dt", function () {
    $("checkbox input").iCheck({
      checkboxClass: "icheckbox_flat-green",
    });
  });
  TableManageButtons.init();
  
}


// Scrolling and Bootstrap tabs

// Listen for Bootstrap tab change
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((el) => {
  el.addEventListener("shown.bs.tab", () => {
    DataTable.tables({ visible: true, api: true }).columns.adjust();
  });
});

/* CHART - MORRIS  */

function init_morris_charts() {
  if (typeof Morris === "undefined") {
    return;
  }
  console.log("init_morris_charts");

  if ($("#graph_bar").length) {
    Morris.Bar({
      element: "graph_bar",
      data: [
        { device: "iPhone 4", geekbench: 380 },
        { device: "iPhone 4S", geekbench: 655 },
        { device: "iPhone 3GS", geekbench: 275 },
        { device: "iPhone 5", geekbench: 1571 },
        { device: "iPhone 5S", geekbench: 655 },
        { device: "iPhone 6", geekbench: 2154 },
        { device: "iPhone 6 Plus", geekbench: 1144 },
        { device: "iPhone 6S", geekbench: 2371 },
        { device: "iPhone 6S Plus", geekbench: 1471 },
        { device: "Other", geekbench: 1371 },
      ],
      xkey: "device",
      ykeys: ["geekbench"],
      labels: ["Geekbench"],
      barRatio: 0.4,
      barColors: ["#26B99A", "#34495E", "#ACADAC", "#3498DB"],
      xLabelAngle: 35,
      hideHover: "auto",
      resize: true,
    });
  }

  if ($("#graph_bar_group").length) {
    Morris.Bar({
      element: "graph_bar_group",
      data: [
        { period: "2016-10-01", licensed: 807, sorned: 660 },
        { period: "2016-09-30", licensed: 1251, sorned: 729 },
        { period: "2016-09-29", licensed: 1769, sorned: 1018 },
        { period: "2016-09-20", licensed: 2246, sorned: 1461 },
        { period: "2016-09-19", licensed: 2657, sorned: 1967 },
        { period: "2016-09-18", licensed: 3148, sorned: 2627 },
        { period: "2016-09-17", licensed: 3471, sorned: 3740 },
        { period: "2016-09-16", licensed: 2871, sorned: 2216 },
        { period: "2016-09-15", licensed: 2401, sorned: 1656 },
        { period: "2016-09-10", licensed: 2115, sorned: 1022 },
      ],
      xkey: "period",
      barColors: ["#26B99A", "#34495E", "#ACADAC", "#3498DB"],
      ykeys: ["licensed", "sorned"],
      labels: ["Licensed", "SORN"],
      hideHover: "auto",
      xLabelAngle: 60,
      resize: true,
    });
  }

  if ($("#graphx").length) {
    Morris.Bar({
      element: "graphx",
      data: [
        { x: "2015 Q1", y: 2, z: 3, a: 4 },
        { x: "2015 Q2", y: 3, z: 5, a: 6 },
        { x: "2015 Q3", y: 4, z: 3, a: 2 },
        { x: "2015 Q4", y: 2, z: 4, a: 5 },
      ],
      xkey: "x",
      ykeys: ["y", "z", "a"],
      barColors: ["#26B99A", "#34495E", "#ACADAC", "#3498DB"],
      hideHover: "auto",
      labels: ["Y", "Z", "A"],
      resize: true,
    }).on("click", function (i, row) {
      console.log(i, row);
    });
  }

  if ($("#graph_area").length) {
    Morris.Area({
      element: "graph_area",
      data: [
        { period: "2014 Q1", iphone: 2666, ipad: null, itouch: 2647 },
        { period: "2014 Q2", iphone: 2778, ipad: 2294, itouch: 2441 },
        { period: "2014 Q3", iphone: 4912, ipad: 1969, itouch: 2501 },
        { period: "2014 Q4", iphone: 3767, ipad: 3597, itouch: 5689 },
        { period: "2015 Q1", iphone: 6810, ipad: 1914, itouch: 2293 },
        { period: "2015 Q2", iphone: 5670, ipad: 4293, itouch: 1881 },
        { period: "2015 Q3", iphone: 4820, ipad: 3795, itouch: 1588 },
        { period: "2015 Q4", iphone: 15073, ipad: 5967, itouch: 5175 },
        { period: "2016 Q1", iphone: 10687, ipad: 4460, itouch: 2028 },
        { period: "2016 Q2", iphone: 8432, ipad: 5713, itouch: 1791 },
      ],
      xkey: "period",
      ykeys: ["iphone", "ipad", "itouch"],
      lineColors: ["#26B99A", "#34495E", "#ACADAC", "#3498DB"],
      labels: ["iPhone", "iPad", "iPod Touch"],
      pointSize: 2,
      hideHover: "auto",
      resize: true,
    });
  }

  if ($("#graph_donut").length) {
    Morris.Donut({
      element: "graph_donut",
      data: [
        { label: "Jam", value: 25 },
        { label: "Frosted", value: 40 },
        { label: "Custard", value: 25 },
        { label: "Sugar", value: 10 },
      ],
      colors: ["#26B99A", "#34495E", "#ACADAC", "#3498DB"],
      formatter: function (y) {
        return y + "%";
      },
      resize: true,
    });
  }

  if ($("#graph_line").length) {
    Morris.Line({
      element: "graph_line",
      xkey: "year",
      ykeys: ["value"],
      labels: ["Value"],
      hideHover: "auto",
      lineColors: ["#26B99A", "#34495E", "#ACADAC", "#3498DB"],
      data: [
        { year: "2012", value: 20 },
        { year: "2013", value: 10 },
        { year: "2014", value: 5 },
        { year: "2015", value: 5 },
        { year: "2016", value: 20 },
      ],
      resize: true,
    });

    $MENU_TOGGLE.on("click", function () {
      $(window).resize();
    });
  }
}


/* ECHRTS */
function init_echarts(idChart, Ttitle, legend, dataX, dataY1, dataY2) {
  if (typeof echarts === "undefined") {
    return;
  }
  console.log("init_echarts");

  var theme = {
    color: [
      "#26B99A",
      "#34495E",
      "#BDC3C7",
      "#3498DB",
      "#9B59B6",
      "#8abb6f",
      "#759c6a",
      "#bfd3b7",
    ],

    title: {
      itemGap: 8,
      textStyle: {
        fontWeight: "normal",
        color: "#408829",
      },
    },

    dataRange: {
      color: ["#1f610a", "#97b58d"],
    },

    toolbox: {
      color: ["#408829", "#408829", "#408829", "#408829"],
    },

    tooltip: {
      backgroundColor: "rgba(0,0,0,0.5)",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#408829",
          type: "dashed",
        },
        crossStyle: {
          color: "#408829",
        },
        shadowStyle: {
          color: "rgba(200,200,200,0.3)",
        },
      },
    },

    dataZoom: {
      dataBackgroundColor: "#eee",
      fillerColor: "rgba(64,136,41,0.2)",
      handleColor: "#408829",
    },
    grid: {
      borderWidth: 0,
    },

    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: "#408829",
        },
      },
      splitLine: {
        lineStyle: {
          color: ["#eee"],
        },
      },
    },

    valueAxis: {
      axisLine: {
        lineStyle: {
          color: "#408829",
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"],
        },
      },
      splitLine: {
        lineStyle: {
          color: ["#eee"],
        },
      },
    },
    timeline: {
      lineStyle: {
        color: "#408829",
      },
      controlStyle: {
        normal: { color: "#408829" },
        emphasis: { color: "#408829" },
      },
    },

    k: {
      itemStyle: {
        normal: {
          color: "#68a54a",
          color0: "#a9cba2",
          lineStyle: {
            width: 1,
            color: "#408829",
            color0: "#86b379",
          },
        },
      },
    },
    map: {
      itemStyle: {
        normal: {
          areaStyle: {
            color: "#ddd",
          },
          label: {
            textStyle: {
              color: "#c12e34",
            },
          },
        },
        emphasis: {
          areaStyle: {
            color: "#99d2dd",
          },
          label: {
            textStyle: {
              color: "#c12e34",
            },
          },
        },
      },
    },
    force: {
      itemStyle: {
        normal: {
          linkStyle: {
            strokeColor: "#408829",
          },
        },
      },
    },
    chord: {
      padding: 4,
      itemStyle: {
        normal: {
          lineStyle: {
            width: 1,
            color: "rgba(128, 128, 128, 0.5)",
          },
          chordStyle: {
            lineStyle: {
              width: 1,
              color: "rgba(128, 128, 128, 0.5)",
            },
          },
        },
        emphasis: {
          lineStyle: {
            width: 1,
            color: "rgba(128, 128, 128, 0.5)",
          },
          chordStyle: {
            lineStyle: {
              width: 1,
              color: "rgba(128, 128, 128, 0.5)",
            },
          },
        },
      },
    },
    gauge: {
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: true,
        lineStyle: {
          color: [
            [0.2, "#86b379"],
            [0.8, "#68a54a"],
            [1, "#408829"],
          ],
          width: 8,
        },
      },
      axisTick: {
        splitNumber: 10,
        length: 12,
        lineStyle: {
          color: "auto",
        },
      },
      axisLabel: {
        textStyle: {
          color: "auto",
        },
      },
      splitLine: {
        length: 18,
        lineStyle: {
          color: "auto",
        },
      },
      pointer: {
        length: "90%",
        color: "auto",
      },
      title: {
        textStyle: {
          color: "#333",
        },
      },
      detail: {
        textStyle: {
          color: "auto",
        },
      },
    },
    textStyle: {
      fontFamily: "Arial, Verdana, sans-serif",
    },
  };

  //echart Bar

  if ($(idChart).length) {
    var echartBar = echarts.init(
      document.getElementById(idChart.substring(1)),
      theme
    );

    echartBar.setOption({
      title: {
        text: Ttitle[0],
        subtext: Ttitle[1],
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: legend,
      },
      toolbox: {
        show: false,
      },
      calculable: false,
      xAxis: [
        {
          type: "category",
          data: dataX,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: legend[0],
          type: "bar",
          data: dataY1,
          markPoint: {
            data: [
              {
                type: "max",
                name: "maximo",
              },
              {
                type: "min",
                name: "minimo",
              },
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "Promedio",
              },
            ],
          },
        },
        {
          name: legend[1],
          type: "bar",
          data: dataY2,
          markPoint: {
            data: [
              {
                type: "max",
                name: "maximo",
              },
              {
                type: "min",
                name: "minimo",
              },
              /*
              {
                name: legend[0],
                value: 182.2,
                xAxis: 7,
                yAxis: 183,
              },
              {
                name: legend[1],
                value: 2.3,
                xAxis: 11,
                yAxis: 3,
              },*/
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "Promedio",
              },
            ],
          },
        },
      ],
    });
  }

  //echart Radar

  if ($("#echart_sonar").length) {
    var echartRadar = echarts.init(
      document.getElementById("echart_sonar"),
      theme
    );

    echartRadar.setOption({
      title: {
        text: "Budget vs spending",
        subtext: "Subtitle",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        x: "right",
        y: "bottom",
        data: ["Allocated Budget", "Actual Spending"],
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      polar: [
        {
          indicator: [
            {
              text: "Sales",
              max: 6000,
            },
            {
              text: "Administration",
              max: 16000,
            },
            {
              text: "Information Techology",
              max: 30000,
            },
            {
              text: "Customer Support",
              max: 38000,
            },
            {
              text: "Development",
              max: 52000,
            },
            {
              text: "Marketing",
              max: 25000,
            },
          ],
        },
      ],
      calculable: true,
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    });
  }

  //echart Funnel

  if ($("#echart_pyramid").length) {
    var echartFunnel = echarts.init(
      document.getElementById("echart_pyramid"),
      theme
    );

    echartFunnel.setOption({
      title: {
        text: "Echart Pyramid Graph",
        subtext: "Subtitle",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}%",
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      legend: {
        data: [
          "Something #1",
          "Something #2",
          "Something #3",
          "Something #4",
          "Something #5",
        ],
        orient: "vertical",
        x: "left",
        y: "bottom",
      },
      calculable: true,
      series: [
        {
          name: "漏斗图",
          type: "funnel",
          width: "40%",
          data: [
            {
              value: 60,
              name: "Something #1",
            },
            {
              value: 40,
              name: "Something #2",
            },
            {
              value: 20,
              name: "Something #3",
            },
            {
              value: 80,
              name: "Something #4",
            },
            {
              value: 100,
              name: "Something #5",
            },
          ],
        },
      ],
    });
  }

  //echart Gauge

  if ($("#echart_gauge").length) {
    var echartGauge = echarts.init(
      document.getElementById("echart_gauge"),
      theme
    );

    echartGauge.setOption({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      series: [
        {
          name: "Performance",
          type: "gauge",
          center: ["50%", "50%"],
          startAngle: 140,
          endAngle: -140,
          min: 0,
          max: 100,
          precision: 0,
          splitNumber: 10,
          axisLine: {
            show: true,
            lineStyle: {
              color: [
                [0.2, "lightgreen"],
                [0.4, "orange"],
                [0.8, "skyblue"],
                [1, "#ff4500"],
              ],
              width: 30,
            },
          },
          axisTick: {
            show: true,
            splitNumber: 5,
            length: 8,
            lineStyle: {
              color: "#eee",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            show: true,
            formatter: function (v) {
              switch (v + "") {
                case "10":
                  return "a";
                case "30":
                  return "b";
                case "60":
                  return "c";
                case "90":
                  return "d";
                default:
                  return "";
              }
            },
            textStyle: {
              color: "#333",
            },
          },
          splitLine: {
            show: true,
            length: 30,
            lineStyle: {
              color: "#eee",
              width: 2,
              type: "solid",
            },
          },
          pointer: {
            length: "80%",
            width: 8,
            color: "auto",
          },
          title: {
            show: true,
            offsetCenter: ["-65%", -10],
            textStyle: {
              color: "#333",
              fontSize: 15,
            },
          },
          detail: {
            show: true,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "#ccc",
            width: 100,
            height: 40,
            offsetCenter: ["-60%", 10],
            formatter: "{value}%",
            textStyle: {
              color: "auto",
              fontSize: 30,
            },
          },
          data: [
            {
              value: 50,
              name: "Performance",
            },
          ],
        },
      ],
    });
  }

  //echart Line

  if ($("#echart_line").length) {
    var echartLine = echarts.init(
      document.getElementById("echart_line"),
      theme
    );

    echartLine.setOption({
      title: {
        text: "Line Graph",
        subtext: "Subtitle",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        x: 220,
        y: 40,
        data: ["Intent", "Pre-order", "Deal"],
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            title: {
              line: "Line",
              bar: "Bar",
              stack: "Stack",
              tiled: "Tiled",
            },
            type: ["line", "bar", "stack", "tiled"],
          },
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Deal",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: "default",
              },
            },
          },
          data: [10, 12, 21, 54, 260, 830, 710],
        },
        {
          name: "Pre-order",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: "default",
              },
            },
          },
          data: [30, 182, 434, 791, 390, 30, 10],
        },
        {
          name: "Intent",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: "default",
              },
            },
          },
          data: [1320, 1132, 601, 234, 120, 90, 20],
        },
      ],
    });
  }

  //echart Scatter

  if ($("#echart_scatter").length) {
    var echartScatter = echarts.init(
      document.getElementById("echart_scatter"),
      theme
    );

    echartScatter.setOption({
      title: {
        text: "Scatter Graph",
        subtext: "Heinz  2003",
      },
      tooltip: {
        trigger: "axis",
        showDelay: 0,
        axisPointer: {
          type: "cross",
          lineStyle: {
            type: "dashed",
            width: 1,
          },
        },
      },
      legend: {
        data: ["Data2", "Data1"],
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      xAxis: [
        {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} cm",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: "{value} kg",
          },
        },
      ],
      series: [
        {
          name: "Data1",
          type: "scatter",
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              if (params.value.length > 1) {
                return (
                  params.seriesName +
                  " :<br/>" +
                  params.value[0] +
                  "cm " +
                  params.value[1] +
                  "kg "
                );
              } else {
                return (
                  params.seriesName +
                  " :<br/>" +
                  params.name +
                  " : " +
                  params.value +
                  "kg "
                );
              }
            },
          },
          data: [],
          markPoint: {
            data: [
              {
                type: "max",
                name: "Max",
              },
              {
                type: "min",
                name: "Min",
              },
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "Mean",
              },
            ],
          },
        },
        {
          name: "Data2",
          type: "scatter",
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              if (params.value.length > 1) {
                return (
                  params.seriesName +
                  " :<br/>" +
                  params.value[0] +
                  "cm " +
                  params.value[1] +
                  "kg "
                );
              } else {
                return (
                  params.seriesName +
                  " :<br/>" +
                  params.name +
                  " : " +
                  params.value +
                  "kg "
                );
              }
            },
          },
          data: [],
          markPoint: {
            data: [
              {
                type: "max",
                name: "Max",
              },
              {
                type: "min",
                name: "Min",
              },
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "Mean",
              },
            ],
          },
        },
      ],
    });
  }

  //echart Bar Horizontal

  if ($("#echart_bar_horizontal").length) {
    var echartBar = echarts.init(
      document.getElementById("echart_bar_horizontal"),
      theme
    );

    echartBar.setOption({
      title: {
        text: "Bar Graph",
        subtext: "Graph subtitle",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        x: 100,
        data: ["2015", "2016"],
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "value",
          boundaryGap: [0, 0.01],
        },
      ],
      yAxis: [
        {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
      ],
      series: [
        {
          name: "2015",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        {
          name: "2016",
          type: "bar",
          data: [19325, 23438, 31000, 121594, 134141, 681807],
        },
      ],
    });
  }

  //echart Pie Collapse

  if ($("#echart_pie2").length) {
    var echartPieCollapse = echarts.init(
      document.getElementById("echart_pie2"),
      theme
    );

    echartPieCollapse.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        x: "center",
        y: "bottom",
        data: ["rose1", "rose2", "rose3", "rose4", "rose5", "rose6"],
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ["pie", "funnel"],
          },
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      calculable: true,
      series: [
        {
          name: "Area Mode",
          type: "pie",
          radius: [25, 90],
          center: ["50%", 170],
          roseType: "area",
          x: "50%",
          max: 40,
          sort: "ascending",
          data: [
            {
              value: 10,
              name: "rose1",
            },
            {
              value: 5,
              name: "rose2",
            },
            {
              value: 15,
              name: "rose3",
            },
            {
              value: 25,
              name: "rose4",
            },
            {
              value: 20,
              name: "rose5",
            },
            {
              value: 35,
              name: "rose6",
            },
          ],
        },
      ],
    });
  }

  //echart Donut

  if ($("#echart_donut").length) {
    var echartDonut = echarts.init(
      document.getElementById("echart_donut"),
      theme
    );

    echartDonut.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      calculable: true,
      legend: {
        x: "center",
        y: "bottom",
        data: [
          "Direct Access",
          "E-mail Marketing",
          "Union Ad",
          "Video Ads",
          "Search Engine",
        ],
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ["pie", "funnel"],
            option: {
              funnel: {
                x: "25%",
                width: "50%",
                funnelAlign: "center",
                max: 1548,
              },
            },
          },
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      series: [
        {
          name: "Access to the resource",
          type: "pie",
          radius: ["35%", "55%"],
          itemStyle: {
            normal: {
              label: {
                show: true,
              },
              labelLine: {
                show: true,
              },
            },
            emphasis: {
              label: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "14",
                  fontWeight: "normal",
                },
              },
            },
          },
          data: [
            {
              value: 335,
              name: "Direct Access",
            },
            {
              value: 310,
              name: "E-mail Marketing",
            },
            {
              value: 234,
              name: "Union Ad",
            },
            {
              value: 135,
              name: "Video Ads",
            },
            {
              value: 1548,
              name: "Search Engine",
            },
          ],
        },
      ],
    });
  }

  //echart Pie

  if ($("#echart_pie").length) {
    var echartPie = echarts.init(document.getElementById("echart_pie"), theme);

    echartPie.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        x: "center",
        y: "bottom",
        data: [
          "Direct Access",
          "E-mail Marketing",
          "Union Ad",
          "Video Ads",
          "Search Engine",
        ],
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ["pie", "funnel"],
            option: {
              funnel: {
                x: "25%",
                width: "50%",
                funnelAlign: "left",
                max: 1548,
              },
            },
          },
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      calculable: true,
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "48%"],
          data: [
            {
              value: 335,
              name: "Direct Access",
            },
            {
              value: 310,
              name: "E-mail Marketing",
            },
            {
              value: 234,
              name: "Union Ad",
            },
            {
              value: 135,
              name: "Video Ads",
            },
            {
              value: 1548,
              name: "Search Engine",
            },
          ],
        },
      ],
    });

    var dataStyle = {
      normal: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    };

    var placeHolderStyle = {
      normal: {
        color: "rgba(0,0,0,0)",
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      emphasis: {
        color: "rgba(0,0,0,0)",
      },
    };
  }

  //echart Mini Pie

  if ($("#echart_mini_pie").length) {
    var echartMiniPie = echarts.init(
      document.getElementById("echart_mini_pie"),
      theme
    );

    echartMiniPie.setOption({
      title: {
        text: "Chart #2",
        subtext: "From ExcelHome",
        sublink: "http://e.weibo.com/1341556070/AhQXtjbqh",
        x: "center",
        y: "center",
        itemGap: 20,
        textStyle: {
          color: "rgba(30,144,255,0.8)",
          fontFamily: "微软雅黑",
          fontSize: 35,
          fontWeight: "bolder",
        },
      },
      tooltip: {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: 170,
        y: 45,
        itemGap: 12,
        data: ["68%Something #1", "29%Something #2", "3%Something #3"],
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true,
          },
          dataView: {
            show: true,
            title: "Text View",
            lang: ["Text View", "Close", "Refresh"],
            readOnly: false,
          },
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      series: [
        {
          name: "1",
          type: "pie",
          clockWise: false,
          radius: [105, 130],
          itemStyle: dataStyle,
          data: [
            {
              value: 68,
              name: "68%Something #1",
            },
            {
              value: 32,
              name: "invisible",
              itemStyle: placeHolderStyle,
            },
          ],
        },
        {
          name: "2",
          type: "pie",
          clockWise: false,
          radius: [80, 105],
          itemStyle: dataStyle,
          data: [
            {
              value: 29,
              name: "29%Something #2",
            },
            {
              value: 71,
              name: "invisible",
              itemStyle: placeHolderStyle,
            },
          ],
        },
        {
          name: "3",
          type: "pie",
          clockWise: false,
          radius: [25, 80],
          itemStyle: dataStyle,
          data: [
            {
              value: 3,
              name: "3%Something #3",
            },
            {
              value: 97,
              name: "invisible",
              itemStyle: placeHolderStyle,
            },
          ],
        },
      ],
    });
  }

  //echart Map

  if ($("#echart_world_map").length) {
    var echartMap = echarts.init(
      document.getElementById("echart_world_map"),
      theme
    );

    echartMap.setOption({
      title: {
        text: "World Population (2010)",
        subtext:
          "from United Nations, Total population, both sexes combined, as of 1 July (thousands)",
        x: "center",
        y: "top",
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          var value = (params.value + "").split(".");
          value =
            value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") +
            "." +
            value[1];
          return params.seriesName + "<br/>" + params.name + " : " + value;
        },
      },
      toolbox: {
        show: true,
        orient: "vertical",
        x: "right",
        y: "center",
        feature: {
          mark: {
            show: true,
          },
          dataView: {
            show: true,
            title: "Text View",
            lang: ["Text View", "Close", "Refresh"],
            readOnly: false,
          },
          restore: {
            show: true,
            title: "Restore",
          },
          saveAsImage: {
            show: true,
            title: "Save Image",
          },
        },
      },
      dataRange: {
        min: 0,
        max: 1000000,
        text: ["High", "Low"],
        realtime: false,
        calculable: true,
        color: ["#087E65", "#26B99A", "#CBEAE3"],
      },
      series: [
        {
          name: "World Population (2010)",
          type: "map",
          mapType: "world",
          roam: false,
          mapLocation: {
            y: 60,
          },
          itemStyle: {
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          data: [],
        },
      ],
    });
  }
}

$(document).ready(function () {
  init_sparklines();
  init_flot_chart();
  init_sidebar();
  init_wysiwyg();
  init_InputMask();
  init_JQVmap();
  init_cropper();
  init_knob();
  init_IonRangeSlider();
  init_ColorPicker();
  init_TagsInput();
  //init_parsley();
  //init_daterangepicker();
  //init_daterangepicker_right();
  init_daterangepicker_single_call();
  init_daterangepicker_reservation();
  init_SmartWizard();
  init_EasyPieChart();
  init_charts();
  //init_echarts();
  init_morris_charts();
  init_skycons();
  init_select2();
  init_validator();
  //nit_DataTables();
  init_chart_doughnut();
  init_gauge();
  //init_PNotify();
  init_starrr();
  init_calendar();
  init_compose();
  init_CustomNotification();
  init_autosize();
  init_autocomplete();
  //Iteracion para obtener id de dataTables existintes
  $("table").each(function () {
    var tableId = $(this).attr("id");
    switch (tableId) {
      case "datatable-General":
        init_DataTables("#" + tableId, false, [3, 4, 5]);
        break;
      case "datatable-Tamu":
        init_DataTables("#" + tableId, true, [1, 3, 4, 5, 6]);
        break;
      case "datatable-Secadores":
        init_DataTables("#" + tableId, true, []);
        break;
      case "datatable-Analisis":
        init_DataTables("#" + tableId, true, []);
        break;
      case "datatable-AnalisisFinalizados":
        init_DataTables("#" + tableId, true, [2, 3]);
        break;
      case "datatable-AnalisisCancelados":
        init_DataTables("#" + tableId, true, []);
        break;
      case "datatable-sku":
        init_DataTables("#" + tableId, true, [2]);
        break;
      case "datatable-viruta":
        init_DataTables("#" + tableId, true, []);
        break;
      default:
        init_DataTables("#" + tableId, true, [3, 4, 5]);
        break;
    } /*
    if (tableId != "datatable-General") {
      init_DataTables('#' + tableId, true, [3, 4, 5]);
    }else{
      init_DataTables('#' + tableId, false, [3, 4, 5]);
    }*/
  });
  //Iteracion para obtener id de echarts (graficos)
 /* if (typeof echarts != "undefined") {
      data_from_day();
    $(".Graphics > div").each(function () {
      var divId = $(this).attr("id");
    });
  }*/
});
