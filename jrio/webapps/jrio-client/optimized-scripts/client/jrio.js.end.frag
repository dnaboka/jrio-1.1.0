    jQuery.noConflict(true);
    jasper.noConflict(true);
    _.noConflict();

    //Expose __jrsConfigs__ as a property of visualize to be able to configure it
    jrio.__jrsConfigs__ = __jrsConfigs__;

    // jrio namespace
    global.__jrio__ = __jrio__;
}(this));
