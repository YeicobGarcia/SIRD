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

/* FETCHDATA */
function init_data(start_date, end_date) {

    $("input.flat").on("ifChecked", async function () {
      radioId = $(this).attr("id");
      getDataLine(radioId, start_date, end_date);
    });
  
    var radioId = $("input.flat:checked").attr("id");
    console.log('radioId:',radioId);
  
    if (radioId) {
      getDataLine(radioId, start_date, end_date);
    }
  
    function getDataLine(idLine, start_date, end_date){
    fetch(
      `EstadisticaFilter/?idLine=${idLine.toString()[0]}&idLado=${idLine.toString()[1]}&start_date=${start_date}&end_date=${end_date}`
      )
        .then((response) => response.json())
        .then((dataAtom) => {
          if(dataAtom.message == 'Success'){
            var dataRegXFilter = dataAtom.RegXlinea;
            echartTamu(dataRegXFilter);
            console.log(dataAtom.message);
          }else{
            echartTamu(dataRegXFilter);
            new PNotify({
              title: "Sin Datos",
              text: "Consulte los Registros",
              styling: "bootstrap3",
            });
            console.log(dataAtom.message);
            return false;
          }
              
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    
  }
  
  /* ECHRTS TAMU*/
  
  function echartTamu(data){
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
    //echart Bar Peso
  
    var dataX = Array.isArray(data)
      ? data.map((record) =>moment(record.fecha_registro).format("MM-DD HH:mm"))
      : [];
      
      var echartBar_P = echarts.init(
        document.getElementById('pesEch'),
        theme
      );
  
      echartBar_P.setOption({
        title: {
          text: "Peso",
          subtext: "Kg",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["P.Objetivo", "P.Obtenido"],
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
            name: "P.Objetivo",
            type: "bar",
            data: Array.isArray(data)
            ? data.map((record) =>
                Number(record.peso_objetivo).toFixed(2)
              )
            : [],
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
            name: "P.Obtenido",
            type: "bar",
            data: Array.isArray(data)
            ? data.map((record) =>
                Number(record.peso_obtenido).toFixed(2)
              )
            : [],
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
  
    //echart Bar Temperatura
  
    var echartBar_T = echarts.init(
      document.getElementById('tempEch'),
      theme
    );
  
    echartBar_T.setOption({
      title: {
        text: "Temperatura",
        subtext: "°C",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["T.Objetiva", "T.Obtenida"],
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
          name: "T.Objetiva",
          type: "bar",
          data: Array.isArray(data)
          ? data.map((record) =>
              Number(record.temperatura_objetiva).toFixed(2)
            )
          : [],
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
          name: "T.Obtenida",
          type: "bar",
          data: Array.isArray(data)
          ? data.map((record) =>
              Number(record.temperatura_obtenida).toFixed(2)
            )
          : [],
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
  
    //echart Bar Humemdad
  
    var echartBar_H = echarts.init(
      document.getElementById('humEch'),
      theme
    );
  
    echartBar_H.setOption({
      title: {
        text: "Humedad",
        subtext: "g",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["H.Objetiva", "H.Obtenida"],
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
          name: "H.Objetiva",
          type: "bar",
          data: Array.isArray(data)
          ? data.map((record) =>
              Number(record.humedad_objetiva).toFixed(2)
            )
          : [],
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
          name: "H.Obtenida",
          type: "bar",
          data: Array.isArray(data)
          ? data.map((record) =>
              Number(record.humedad_obtenida).toFixed(2)
            )
          : [],
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

function data_from_day() {
    // Obtener la fecha actual
    var fechaActual = moment();
  
    var fechaInicialDia = moment(fechaActual).startOf("day");
    // Obtener la fecha al final del día
    var fechaFinalDia = moment(fechaActual).endOf("day");
  
    // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
    var formatoFecha = "YYYY-MM-DD HH:mm:ss";
  
    var fechActualFormt = fechaInicialDia.format(formatoFecha);
    var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
    init_data(fechActualFormt, fechFinalDiaForm);
    //AllCharts(fechActualFormt, fechFinalDiaForm, init_url);
    //filter_data_django(fechActualFormt, fechFinalDiaForm);
  }

/* DATERANGEPICKER */

moment.locale("es");

function init_daterangepicker() {
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }
  console.log("init_daterangepicker");

  var cb = function (start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $("#reportrange span").html(
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
/*
  $("#reportrange span").html(
    moment().subtract(29, "days").format("MMMM D, YYYY") +
      " - " +
      moment().format("MMMM D, YYYY")
  );*/
  $("#reportrange").daterangepicker(optionSet1, cb);
  $("#reportrange").on("show.daterangepicker", function () {
    console.log("show event fired");
  });
  $("#reportrange").on("hide.daterangepicker", function () {
    console.log("hide event fired");
  });
  $("#reportrange").on("apply.daterangepicker", function (ev, picker) {
      var startDate = picker.startDate;
      var endDate = picker.endDate;

      var fechaInicialDia = moment(startDate).startOf("day");
      // Obtener la fecha al final del día
      var fechaFinalDia = moment(endDate).endOf("day");
      // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
      var formatoFecha = "YYYY-MM-DD HH:mm:ss";
      var fechActualFormt = fechaInicialDia.format(formatoFecha);
      var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
      console.log('reportange:', fechActualFormt, fechFinalDiaForm);
      init_data(fechActualFormt, fechFinalDiaForm);
      
  });
  $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
    console.log("cancel event fired");
    data_from_day();
  });
  $("#options1").click(function () {
    $("#reportrange").data("daterangepicker").setOptions(optionSet1, cb);
  });
  $("#options2").click(function () {
    $("#reportrange").data("daterangepicker").setOptions(optionSet2, cb);
  });
  $("#destroy").click(function () {
    $("#reportrange").data("daterangepicker").remove();
  });
}

$(document).ready(function () {
    if(typeof $.fn.daterangepicker !== "undefined") {
        init_daterangepicker();
      }
    //Iteracion para obtener id de echarts (graficos)
    if (typeof echarts != "undefined") {
        data_from_day();
      /*$(".Graphics > div").each(function () {
        var divId = $(this).attr("id");
      });*/
    }
  });