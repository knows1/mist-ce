define('app/controllers/metric_add_custom', ['app/models/metric', 'ember'],
    //
    //  Metric Add Custom Controller
    //
    //  @returns Class
    //
    function () {

        'use strict';

        return Ember.Object.extend({


            //
            //
            //  Properties
            //
            //


            view: null,
            machine: null,
            callback: null,
            formReady: null,
            addingMetric: null,

            metric: {
                name: null,
                unit: null,
                type: null,
                target: null,
                script: null,
                minValue: null,
                maxValue: null,
            },


            //
            //
            //  Methods
            //
            //


            open: function (machine, callback) {
                this.clear();
                this.set('machine', machine)
                    .set('callback', callback);
                this.view.open();
            },


            close: function () {
                this.clear();
                this.view.close();
            },


            clear: function () {
                this.view.clear();
                this.set('machine', null)
                    .set('callback', null)
                    .set('metric', Ember.Object.create({
                        'name': null,
                        'unit': null,
                        'type': null,
                        'target': null,
                        'script': null,
                        'minValue': null,
                        'maxValue': null,
                    }))
                    .set('addingMetric', null);
            },


            add: function () {

                var url = '/backends/' + this.machine.backend.id +
                          '/machines/' + this.machine.id + '/deploy_plugin';

                var that = this;
                this.set('addingMetric', true);
                Mist.ajax.POST(url, {
                    'name'          : this.metric.name,
                    'unit'          : this.metric.unit,
                    'plugin_type'   : this.metric.type,
                    'target'        : this.metric.target,
                    'read_function' : this.metric.script,
                    'min_value'     : this.metric.minValue,
                    'max_value'     : this.metric.maxValue,
                }).error(function (message) {
                    Mist.notificationController.notify('Failed to deploy ' +
                        'custom plugin: ' + message);
                }).complete(function (success, data) {
                    if (callback) callback(success, data);
                    that.set('addingMetric', false);
                    that.close();
                });
            },


            //
            //
            //  Observers
            //
            //


            formReadyObserver: function () {
                info('changed');
            }.observes('metric.name', 'metric.unit', 'metric.target', 'metric.script')
        });
    }
);
