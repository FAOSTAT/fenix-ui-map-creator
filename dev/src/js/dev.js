define([
    'loglevel',
    'jquery',
    'underscore',
    '../../../src/js/index',
    'dev/src/models/UNECA_Population.json',
    'dev/src/models/UNECA_Education.json'
], function (log, $, _, MapCreator, ModelPop, ModelEdu) {

    'use strict';

    var Model = ModelEdu;

    var s = {
        STANDARD: "#standard",
        TOOLBAR: "#toolbar"
    };

    function Dev() {
        console.log("Dev Started");
        log.setLevel('trace');
        this.start();
    }

    Dev.prototype.start = function () {

        window.mapCreator = new MapCreator({
            el: s.STANDARD,
            model: Model,
            fenix_ui_map: {
                guiController: {
                    container: s.TOOLBAR,
                    wmsLoader: false
                },
                baselayers: {
                    cartodb: {
                        title_en: "CartoDB light",
                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                        subdomains: 'abcd',
                        maxZoom: 19
                    },
                    esri_grayscale: {
                        url: "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        title_en: "Esri WorldGrayCanvas",
                        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
                        maxZoom: 16
                    }
                },
                labels: true,
                highlightCountry: ['TCD','MLI','NER']
            }
        });

        mapCreator.on('ready', _.bind(function() {

            mapCreator.addLayer( new L.TileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
                subdomains: 'abcd',
                maxZoom: 19
            }) );

            $.get('dataset/bangkok.json', function (model) {

                //mapCreator.addLayer(model, { colorramp: 'Reds' });
            });

        }, this));

    };

    return new Dev();

});