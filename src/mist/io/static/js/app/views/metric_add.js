define('app/views/metric_add', ['app/views/popup'],
    //
    //  Metric Add View
    //
    //  @returns Class
    //
    function (PopupView) {

        'use strict';

        return PopupView.extend({


            //
            //
            //  Methods
            //
            //


            open: function () {
                this._super();
                Ember.run.later(this, function () {
                    $(this.popupId).popup('reposition', {
                        positionTo: '#add-metric-btn'
                    });
                }, 200);
            },


            clear: function () {
            },


            //
            //
            //  Actions
            //
            //


            actions: {

                customClicked: function () {
                    this.close();
                    var that = this;
                    Ember.run.later(function () {
                        Mist.metricAddCustomController.open(
                            this.machine,
                            function (success, metric) {
                                if (success)
                                    that.controller.close();
                            }
                        );
                    }, 400);
                }
            }
        });
    }
);
