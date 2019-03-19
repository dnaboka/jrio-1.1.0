jrio.config({
    server: "/jrio",
    scripts: "/jrio-client/optimized-scripts",
    theme: {
        href: "/jrio-client/themes/default"
    },
    locale: "en_US"
});

jrio(function(jrioClient) {
    var executionIdParam = "executionId",
        reportUriParam = "jr_report_uri",
        ignorePaginationParam = "ignorePagination",
        reportLocaleParam = "reportLocale",
        reportTimeZoneParam = "reportTimeZone",
        pageParam = "page",
        anchorParam = "anchor",

        report,
        pagesNo = null,
        currentPage = 1,
        urlParams = {},
        reportParams = {},
        finalParams = {},
        scale_index = 1;

    // extract URL parameters & prepare the report ones
    if (window.location.search) {
        urlParams = _.chain(decodeURIComponent(window.location.search.substring(1)))
            .split("&")
            .map(_.partial(_.split, _, "=", 2))
            .reduce(function(r, p) {
                if (r[p[0]]) {
                    if (!_.isArray(r[p[0]])) {
                        r[p[0]] = [ r[p[0]] ];
                    }
                    r[p[0]].push(p[1]);
                } else {
                    r[p[0]] = p[1];
                }
                return r;
            }, {})
            .value();

        reportParams = _.omit(urlParams,[
            executionIdParam,
            reportUriParam,
            ignorePaginationParam,
            reportLocaleParam,
            reportTimeZoneParam,
            pageParam,
            anchorParam]);
    }

    var reportConfig = {
        container: "#reportContainer",

        error: failHandler,
        events: {
            changeTotalPages: totalPagesHandler,
            changePagesState: pageStateChangeHandler,
            canUndo: undoHandler,
            canRedo: redoHandler
        },

        linkOptions: {
            events: { click: clickHandler }
        }
    };

    if (urlParams[executionIdParam]) {
        reportConfig.resource = {
            executionId: urlParams[executionIdParam]
        }
    } else {
        // convert non-array key values to array
        if (!_.isEmpty(reportParams)) {
            _.each(reportParams, function(val, key) {
                finalParams[key] = _.isArray(val) ? val : [ val ];
            });
        }

        reportConfig.resource = urlParams[reportUriParam];
        reportConfig.params = finalParams;

        if (urlParams[ignorePaginationParam] == "true") {
            reportConfig.ignorePagination = true;
        } else if (urlParams[ignorePaginationParam] == "false") {
            reportConfig.ignorePagination = false;
        }//ignore other ignorePaginationParam values

        if (urlParams[reportLocaleParam]) {//TODO default to userLocale?
            reportConfig.reportLocale = urlParams[reportLocaleParam];
        }
        if (urlParams[reportTimeZoneParam]) {
            reportConfig.reportTimeZone = urlParams[reportTimeZoneParam];
        }

        if (urlParams[pageParam] && urlParams[anchorParam]) {
            currentPage = urlParams[pageParam];
            reportConfig.pages = {
                pages: urlParams[pageParam],
                anchor: urlParams[anchorParam]
            };
        } else if (urlParams[pageParam]) {
            currentPage = urlParams[pageParam];
            reportConfig.pages = urlParams[pageParam];
        } else if (urlParams[anchorParam]) {
            reportConfig.pages = {
                anchor: urlParams[anchorParam]
            };
        }
    }

    report = jrioClient.report(reportConfig);

    function totalPagesHandler(totalPages) {
        if (totalPages == null || totalPages == 0) {
            alert("The report is empty!");
        }

        pagesNo = totalPages;
        updatePaginationButtons();
    }

    function pageStateChangeHandler(pageIndex) {
        currentPage = pageIndex;
        updatePaginationButtons();
    }

    function undoHandler(undoPossible) {
        if (undoPossible) {
            $("#undo").prop("disabled", false);
            $("#undoAll").prop("disabled", false);
        } else {
            $("#undo").prop("disabled", true);
            $("#undoAll").prop("disabled", true);
        }
    }

    function redoHandler(redoPossible) {
        if (redoPossible) {
            $("#redo").prop("disabled", false);
        } else {
            $("#redo").prop("disabled", true);
        }
    }

    function clickHandler(ev, hyperlinkData) {
        if ("ReportExecution" === hyperlinkData.type) {
            var hParams = hyperlinkData.parameters,
                hReportParam = "_report";
            if (hParams && hParams[hReportParam]) {
                var href = "viewer.html?" + reportUriParam + "=" + hParams[hReportParam],
                    urlParams = _.omit(hParams, hReportParam);

                _.each(urlParams, function(value, key) {
                    href += "&" + key + "=" + value;
                });

                if ("Self" === hyperlinkData.target) {
                    window.location = href;
                } else if ("Blank" === hyperlinkData.target) {
                    window.open(href, "_blank");
                }
            }
        } else if ("LocalAnchor" === hyperlinkData.type) {
            if ("Self" === hyperlinkData.target) {
                changeCurrentReportPage({ anchor: hyperlinkData.anchor });
            } else if ("Blank" === hyperlinkData.target) {
                window.open(buildViewerUrl({ anchor: hyperlinkData.anchor }), "_blank");
            }
        } else if ("LocalPage" === hyperlinkData.type) {
            if ("Self" === hyperlinkData.target) {
                currentPage = hyperlinkData.pages;
                changeCurrentReportPage(currentPage);
            } else if ("Blank" === hyperlinkData.target) {
                window.open(buildViewerUrl({ page: currentPage }), "_blank");
            }
        } else if ("Reference" === hyperlinkData.type) {
            if ("Self" === hyperlinkData.target) {
                window.location.href = hyperlinkData.href;
            } else if ("Blank" === hyperlinkData.target) {
                window.open(hyperlinkData.href, "_blank");
            }
        } else if ("RemoteAnchor" === hyperlinkData.type) {
            if ("Self" === hyperlinkData.target) {
                window.location.href = hyperlinkData.href;
            } else if ("Blank" === hyperlinkData.target) {
                window.open(hyperlinkData.href, "_blank");
            }
        }
    }

    function changeCurrentReportPage(pagesParam) {
        report.pages(pagesParam)
            .run()
            .done(updatePaginationButtons)
            .fail(failHandler);
    }

    function buildViewerUrl(params) {
        var href = "viewer.html?" + reportUriParam + "=" + urlParams[reportUriParam];
        _.each(params, function(value, key) {
            href += "&" + key + "=" + value;
        });

        return href;
    }

    function failHandler(err) {
        alert(err);
    }

    function updatePaginationButtons() {
        if (pagesNo == null) {
            $("#page_next, #page_last").prop("disabled", true);
        }
        else if (pagesNo > 1 && currentPage < pagesNo) {
            $("#page_next, #page_last").prop("disabled", false);
        } else {
            $("#page_next, #page_last").prop("disabled", true);
        }

        if (pagesNo == null || pagesNo == 0) {
            $("#totalPagesNo").text("0");
            $("#page_current").prop("disabled", true);
            $("#page_current").val("");

            $("#export").prop("disabled", true);

            $("#zoom_in").prop("disabled", true);
            $("#zoom_out").prop("disabled", true);
            $("#zoom_value_button").prop("disabled", true);
        } else {
            $("#totalPagesNo").text(pagesNo);
            $("#page_current").prop("disabled", false);
            $("#page_current").val(currentPage);

            $("#export").prop("disabled", false);

            $("#zoom_in").prop("disabled", false);
            $("#zoom_out").prop("disabled", false);
            $("#zoom_value_button").prop("disabled", false);
        }

        if (currentPage == 1) {
            $("#page_first, #page_prev").prop("disabled", true);
        } else {
            $("#page_first, #page_prev").prop("disabled", false);
        }
    }

    $("#viewerToolbar").on("mousedown", ".button", function() {
        !$(this).is(":disabled") && $(this).addClass("pressed");
    }).on("mouseup", ".button", function() {
        $(this).removeClass("pressed");
    }).on("mouseenter", ".button", function() {
        !$(this).is(":disabled") && $(this).addClass("over");
    }).on("mouseleave", ".button", function() {
        $(this).removeClass("pressed over");
    });

    $("#viewerElements .menu .button").hover(function() {
        $(this).addClass("over");
    }, function() {
        $(this).removeClass("over");
    });

    $("#export, #exportMenu").on({
        mouseenter: function() {
            var $exp = $("#export"),
                $expM = $("#exportMenu");

            $expM.removeClass("hidden");
            $expM.css({
                position: "absolute",
                top: $exp.offset().top + $exp.height(),
                left: $exp.offset().left
            });
        },
        mouseleave: function() {
            $("#exportMenu").addClass("hidden");
        }
    });

    $("#zoom_value_button, #zoomMenu").on({
        mouseenter: function() {
            var $zoomVal = $("#zoom_value"),
                $zoomM = $("#zoomMenu");

            $zoomM.removeClass("hidden");
            $zoomM.css({
                position: "absolute",
                top: $zoomVal.offset().top + $zoomVal.outerHeight(),
                left: $zoomVal.offset().left
            });
        },
        mouseleave: function() {
            $("#zoomMenu").addClass("hidden");
        }
    });

    $("#exportMenu").on("click", ".button", function() {
        var $selected = $(this),
            outputFormat = $selected.data("val"),
            $expBtn = $("#export");

        $expBtn.prop("disabled", true);
        $("#exportMenu").addClass("hidden");

        report.export({
            outputFormat: outputFormat
        }).done(function (link) {
            $expBtn.prop("disabled", false);
            window.open(link.href);
        }).fail(failHandler);
    });

    $("#zoomMenu").on("click", ".button", function() {
        var $selected = $(this),
            scale = $selected.data("val");

        $("#zoomMenu").addClass("hidden");

        report.scale(scale).run();
        updateScaleValue();
    });

    $("#zoom_in").click(function () {
        report.scale(scale_index += 0.1).render();
        updateScaleValue();
    });

    $("#zoom_out").click(function () {
        if (Math.round((scale_index - 0.1) * 100) > 0) {
            report.scale(scale_index -= 0.1).render();
            updateScaleValue();
        }
    });

    function updateScaleValue() {
        scale_index = report.scale();
        $("#zoom_value").val(Math.round(scale_index * 100) + "%");
    }

    $("#undo").on("click", function (evt) {
        report.undo().fail(failHandler);
    });

    $("#undoAll").on("click", function (evt) {
        report.undoAll().fail(failHandler);
    });

    $("#redo").on("click", function (evt) {
        report.redo().fail(failHandler);
    });

    $("#page_first").on("click", function (evt) {
        currentPage = 1;
        report.pages(1)
                .run()
                .done(updatePaginationButtons)
                .fail(failHandler);
    });

    $("#page_prev").on("click", function (evt) {
        report.pages(--currentPage)
                .run()
                .done(updatePaginationButtons)
                .fail(failHandler);
    });

    $("#page_next").on("click", function (evt) {
        report.pages(++currentPage)
                .run()
                .done(updatePaginationButtons)
                .fail(failHandler);
    });

    $("#page_last").on("click", function (evt) {
        currentPage = pagesNo;
        report.pages(pagesNo)
                .run()
                .done(updatePaginationButtons)
                .fail(failHandler);
    });

    $("#page_current").on("change", function() {
        var intReg = /^\d+$/,
            val = this.value;

        if (intReg.exec(val)) {
            var parsed = parseInt(val);
            if (parsed > 0 && parsed <= pagesNo) {
                currentPage = parsed;
                report.pages(val)
                    .run()
                    .done(updatePaginationButtons)
                    .fail(failHandler)
            }
        }
    });
});