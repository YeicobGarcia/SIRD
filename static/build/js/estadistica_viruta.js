/* FETCHDATA */
function init_data(fechaActual, fechaActualFinal, FilterId) {
    console.log('init_data');
    var dataRegXFilter;
    fetch(
        `${FilterId}/?fecha_actual=${fechaActual}&fecha_actual_final=${fechaActualFinal}`
      )
        .then((response) => response.json())
        .then((dataAtom) => {
          if(dataAtom.message == 'Success_Chart'){
            dataRegXFilter = dataAtom.RegXday;
            init_highcharts(dataRegXFilter);
          }else{
            //optionEchart(dataRegXFilter, FilterId);
            new PNotify({
              title: "Sin Datos",
              text: "Consulte los Registros",
              styling: "bootstrap3",
            });
            //console.log(dataAtom.message);
            return false;
          }
              
        })
        .catch((error) => console.error("Error fetching data:", error));
    
  }

  function data_from_day(init_url) {
    // Obtener la fecha actual
    var fechaActual = moment();
  
    var fechaInicialDia = moment(fechaActual).startOf("day");
    // Obtener la fecha al final del día
    var fechaFinalDia = moment(fechaActual).endOf("day");
  
    // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
    var formatoFecha = "YYYY-MM-DD HH:mm:ss";
  
    var fechActualFormt = fechaInicialDia.format(formatoFecha);
    var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
  
    init_data(fechActualFormt, fechFinalDiaForm, init_url);
  }  


/* DATERANGEPICKER */
function init_daterangepickerL1(FilterId) {
    /*
    if (typeof $.fn.daterangepicker === "undefined") {
      return;
    }*/
    console.log("init_daterangepicker en Secador1");
  
    var cb = function (start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
      $("#" + FilterId + " span").html(
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
    $("#"+ FilterId +" span").html(
      moment().subtract(0, "days").format("MMMM D, YYYY") +
        " - " +
        moment().format("MMMM D, YYYY")
    );*/
    $("#" + FilterId + " span").daterangepicker(optionSet1, cb);
    $("#" + FilterId + " span").on("show.daterangepicker", function () {
      console.log("show event fired");
    });
    $("#" + FilterId + " span").on("hide.daterangepicker", function () {
      console.log("hide event fired");
    });
  
    $("#" + FilterId + " span").on(
      "apply.daterangepicker",
      function (ev, picker) {
        var startDate = picker.startDate;
        var endDate = picker.endDate;
  
        var fechaInicialDia = moment(startDate).startOf("day");
        // Obtener la fecha al final del día
        var fechaFinalDia = moment(endDate).endOf("day");
        // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
        var formatoFecha = "YYYY-MM-DD HH:mm:ss";
        var fechActualFormt = fechaInicialDia.format(formatoFecha);
        var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
        init_data(fechActualFormt, fechFinalDiaForm, FilterId);
        
      }
    );
  
    $("#" + FilterId).on("cancel.daterangepicker", function (ev, picker) {
      console.log("cancel event fired");
      data_from_day(FilterId);
    });
    $("#options1").click(function () {
      $("#" + FilterId)
        .data("daterangepicker")
        .setOptions(optionSet1, cb);
    });
    $("#options2").click(function () {
      $("#" + FilterId)
        .data("daterangepicker")
        .setOptions(optionSet2, cb);
    });
    $("#destroy").click(function () {
      $("#" + FilterId)
        .data("daterangepicker")
        .remove();
    });
  }

/* HIGHCHARTS   */
function init_highcharts(dataRegXFilter){

    if(typeof Highcharts == 'undefined'){
        return;
    }
    console.log('init_highcharts');
    // Datos de Tiempo
    var data_X = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) => moment(record.t_stamp).format('MM-DD HH:mm'))
    : [];
    // Datos de Presiones
    var presion_jabon_i_atz = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_204_10_presion_jabon_y_entrada_atz)
      )
    : [];
    
    console.log('presion_jabon_i_atz:',presion_jabon_i_atz);

    var presion_extrusor = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_204_50_presion_extrusor)
      )
    : [];

    var presion_reactor = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_126_10_presion_reactor)
      )
    : [];

    // Datos de Densidad
    var densidad = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.dt_126_2_densidad_soda_c).toFixed(2)
      )
    : [];
    
    // Datos de Flujos
    var salmuera = Array.isArray(dataRegXFilter)
            ? dataRegXFilter.map((record) =>
                Number(record.fic_126_104_flujo_salmuera).toFixed(2)
            )
            : [];
    var less = Array.isArray(dataRegXFilter)
            ? dataRegXFilter.map((record) =>
                Number(record.fit_104_101_flujo_less).toFixed(2)
            )
            : [];
    var pko = Array.isArray(dataRegXFilter)
            ? dataRegXFilter.map((record) =>
                Number(record.fit_126_1a_flujo_pko).toFixed(2)
            )
            : [];
    var stearine = Array.isArray(dataRegXFilter)
            ? dataRegXFilter.map((record) =>
                Number(record.fit_126_1b_flujo_stearine).toFixed(2)
            )
            : [];
    var sebo = Array.isArray(dataRegXFilter)
            ? dataRegXFilter.map((record) =>
                Number(record.fit_126_1c_flujo_sebo).toFixed(2)
            )
            : [];
    var agua = Array.isArray(dataRegXFilter)
            ? dataRegXFilter.map((record) =>
                Number(record.fit_126_3_flujo_agua).toFixed(2)
            )
            : [];

    //var Flujos = [salmuera,less,pko,stearine,sebo,agua];
    // Crear encabezados (nombre de las columnas)
    var csvContent = "Time;Salmuera;Less;PKO;Stearine;sebo;agua\n";

    // Iterar sobre los datos para generar filas
    for (var i = 0; i < data_X.length; i++) {
        csvContent += `${data_X[i]};${salmuera[i]};${less[i]};${pko[i]};${stearine[i]};${sebo[i]};${agua[i]}\n`;
    }

    //console.log("csvContent",csvContent);
    /* -- GRAFICO DE FLUJOS -- */
    (function (H) {
        const animateSVGPath = (svgElem, animation, callback = void 0) => {
            if (!svgElem || !svgElem.element) {
                console.error('svgElem or svgElem.element is undefined');
                return;
            }
            const length = svgElem.element.getTotalLength();
            svgElem.attr({
                'stroke-dasharray': length,
                'stroke-dashoffset': length,
                opacity: 1
            });
            svgElem.animate({
                'stroke-dashoffset': 0
            }, animation, callback);
        };
    
        H.seriesTypes.line.prototype.animate = function (init) {
            const series = this,
                animation = H.animObject(series.options.animation);
            if (!init) {
                animateSVGPath(series.graph, animation);
            }
        };
    
        H.addEvent(H.Axis, 'afterRender', function () {
            const axis = this,
                chart = axis.chart,
                animation = H.animObject(chart.renderer.globalAnimation);
    
            axis.axisGroup
                // Init
                .attr({
                    opacity: 0,
                    rotation: -3,
                    scaleY: 0.9
                })
    
                // Animate
                .animate({
                    opacity: 1,
                    rotation: 0,
                    scaleY: 1
                }, animation);
            if (axis.horiz) {
                axis.labelGroup
                    // Init
                    .attr({
                        opacity: 0,
                        rotation: 3,
                        scaleY: 0.5
                    })
    
                    // Animate
                    .animate({
                        opacity: 1,
                        rotation: 0,
                        scaleY: 1
                    }, animation);
            } else {
                axis.labelGroup
                    // Init
                    .attr({
                        opacity: 0,
                        rotation: 3,
                        scaleX: -0.5
                    })
    
                    // Animate
                    .animate({
                        opacity: 1,
                        rotation: 0,
                        scaleX: 1
                    }, animation);
            }
    
            if (axis.plotLinesAndBands) {
                axis.plotLinesAndBands.forEach(plotLine => {
                    const animation = H.animObject(plotLine.options.animation);
    
                    // Init
                    plotLine.label.attr({
                        opacity: 0
                    });
    
                    // Animate
                    animateSVGPath(
                        plotLine.svgElem,
                        animation,
                        function () {
                            plotLine.label.animate({
                                opacity: 1
                            });
                        }
                    );
                });
            }
        });
    }(Highcharts));
    
    Highcharts.chart('chart-flujos', {
        chart: {
            type: 'spline'
        },
    
        title: {
            text: 'Niveles de Flujo en Materias Primas',
            align: 'left'
        },
    
        subtitle: {
            text: 'Registros recopilados cada 5 minutos',
            align: 'left'
        },
    
        data: {
            csv: csvContent
        },
    
        plotOptions: {
            series: {
                animation: {
                    duration: 3000
                },
                marker: {
                    enabled: false
                },
                lineWidth: 2
            }
        },

        exporting: {
            enabled: true  // Activa la funcionalidad de exportación
        },

        
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    yAxis: [{
                        tickAmount: 2,
                        title: {
                            x: 15,
                            reserveSpace: false
                        }
                    }, {
                        tickAmount: 2,
                        title: {
                            x: 20,
                            reserveSpace: false
                        }
                    }, {
                        tickAmount: 2,
                        title: {
                            x: -20,
                            reserveSpace: false
                        }
                    }, {
                        tickAmount: 2,
                        title: {
                            x: -20,
                            reserveSpace: false
                        }
                    }]
                }
            }]
        }
    });
    
    /* -- GRAFICO DE DENSIDAD(tipo linea con barra zoom) -- */

    const data_X_Y_Z = data_X.map((time, index)=> [time, densidad[index], densidad[index],]);

    const processedData  = data_X_Y_Z.map(item => {
        return[
            new Date(item[0]).getTime(),
            parseFloat(item[1])
        ];
    });

    console.log('processedData:',processedData);

        Highcharts.stockChart('chart-densidad', {
            chart: {
                zooming: {
                    type: 'x'
                }
            },
            title: {
                text: 'Densidad en la Soda Caustica',
                align: 'center'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'kg/m³'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    color: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgb(199, 113, 243)'],
                            [0.7, 'rgb(76, 175, 254)']
                        ]
                    },
                    states: {
                        hover: {
                            lineWidth: 3
                        }
                    },
                    threshold: null
                }
            },

            navigator: {
                maskInside: false,
                height: 30
            },

            rangeSelector: {
                selected: 2,
                enabled: false
            },
    
            series: [{
                type: 'area',
                name: 'Densidad',
                data: processedData
            }]
        });

        /* -- GRAFICO DE PRESIONES(tipo area en 3D) -- */

        var dom5 = document.getElementById("chart-presiones");

        var optionBarChart_Presiones;
    
        var myChart5 = echarts.init(dom5, null, {
        renderer: "canvas",
        useDirtyRect: false,
        });
    
        optionBarChart_Presiones = {
        title: {
            text: 'Presiones',
            subtext: 'Bares',
        },
        legend: {
            data: ['Extrusor','Jabon en entrada del atomizador','Reactor']
        },
        toolbox: {
            // y: 'bottom',
            feature: {
            magicType: {
                type: ['stack']
            },
            dataView: {},
            restore: {},
            saveAsImage: {
                pixelRatio: 2
            },
            }
        },
        tooltip: {
            axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#6a7985",
            },
            },
        },
        xAxis: {
            data: data_X,
            splitLine: {
            show: false
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '20%',
            containLabel: true,
        },
        yAxis: {},
        dataZoom: [
            {
            type: "inside",
            start: 0,
            end: 100,
            },
            {
            start: 0,
            end: 10,
            },
        ],
        series: [
            {
            name: 'Extrusor',
            type: 'bar',
            data: presion_extrusor,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#1CE6CE" },
                { offset: 0.5, color: "#1CE65D" },
                { offset: 1, color: "#1CE65D" },
                ]),
            },
            emphasis: {
                focus: 'series',
                itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#1DDD7D" },
                    { offset: 0.7, color: "#1CE6B8" },
                    { offset: 1, color: "#1CE6B8" },
                ]),
                },
            },
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
            },
            {
            name: 'Jabon en entrada del atomizador',
            type: 'bar',
            data: presion_jabon_i_atz,
            emphasis: {
                focus: 'series',
                itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                ]),
                },
            },
            animationDelay: function (idx) {
                return idx * 10;
            },
            },
            {
            name: 'Reactor',
            type: 'bar',
            data: presion_reactor,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFA200" },
                { offset: 0.5, color: "#FFC300" },
                { offset: 1, color: "#FFC300" },
                ]),
            },
            emphasis: {
                focus: 'series',
                itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#FFE400" },
                    { offset: 0.7, color: "#FFB200" },
                    { offset: 1, color: "#FFB200" },
                ]),
                },
            },
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
            }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
        };
    
        // Enable data zoom when user click bar.
        const zoomSize2 = 6;
        myChart5.on("click", function (params) {
        console.log(data_X[Math.max(params.dataIndex - zoomSize2 / 2, 0)]);
        myChart5.dispatchAction({
            type: "dataZoom",
            startValue: data_X[Math.max(params.dataIndex - zoomSize2 / 2, 0)],
            endValue:
            data_X[Math.min(params.dataIndex + zoomSize2 / 2, presion_jabon_i_atz.length - 1)],
        });
        });
        
        if (optionBarChart_Presiones && typeof optionBarChart_Presiones === "object") {
        myChart5.setOption(optionBarChart_Presiones);
        }
    
        window.addEventListener("resize", myChart5.resize);
    
    
}

window.addEventListener("load", function(event){
    if(typeof Highcharts !== 'undefined'){
        $(".PathFilter > div").each(function (){
            var FilterId = $(this).attr("id");
            
            console.log("FilterId:", FilterId);

            init_daterangepickerL1(FilterId);

            console.log("data_from_day");
            
            data_from_day(FilterId);
        })
    }
});