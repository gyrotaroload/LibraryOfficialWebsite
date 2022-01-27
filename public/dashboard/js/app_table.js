//const { default: fetch } = require("node-fetch")

var $table = $('#table')
var $remove = $('#remove')
var selections = []

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    })
}

function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.state = $.inArray(row.id, selections) !== -1
    })
    return res
}

function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
}

function operateFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="fa fa-pen"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>'
    ].join('')
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        window.open(
            `/main/add_periodical?EDITframeNumber=${Base64.encodeURI(row.placeNumber)}&EDITISSN=${Base64.encodeURI(row.issn)}&EDITbookName=${Base64.encodeURI(row.mainName)}&EDITeissn=${Base64.encodeURI(row.eissn)}&EDITSTAT=${Base64.encodeURI(row.stat)}&EDITES=${Base64.encodeURI(row.eSource)}&EDITPS=${Base64.encodeURI(row.pSource)}&EDITREMK=${Base64.encodeURI(row.someStuff)}&EDITLIVstart=${Base64.encodeURI(row.TIMEs)}&EDITLIVend=${Base64.encodeURI(row.TIMEe)}&EDITLIVx=${Base64.encodeURI(row.TIMEn)}&id=${row.id}`,
            "_blank");
    },
    'click .remove': function (e, value, row, index) {
        /*$table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })*/
        fetch(`/main/delJ?id=${row.id}`)
            .then((r) => { return r.text() })
            .then((t) => { console.log(t); });
    }
}

function totalTextFormatter(data) {
    return 'Total'
}

function totalNameFormatter(data) {
    return data.length
}

function totalPriceFormatter(data) {
    var field = this.field
    return '$' + data.map(function (row) {
        return +row[field].substring(1)
    }).reduce(function (sum, i) {
        return sum + i
    }, 0)
}

function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
        height: vh,
        locale: $('#locale').val(),
        columns: [
            [//{
                // field: 'state',
                // checkbox: true,
                //rowspan: 2,
                //align: 'center',
                //valign: 'middle'
                //},
                {
                    title: '架號',
                    field: 'placeNumber',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    searchable: false,
                    //footerFormatter: totalTextFormatter
                }
                , {
                    title: 'ISSN',
                    field: 'issn',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    //footerFormatter: totalTextFormatter
                }, {
                    title: 'E-ISSN',
                    field: 'eissn',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '刊名',
                    field: 'mainName',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    searchable: true,
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '狀況',
                    field: 'stat',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '電子資源',
                    field: 'eSource',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    //footerFormatter: totalTextFormatter
                }, {
                    title: '紙本資源',
                    field: 'pSource',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    //footerFormatter: totalTextFormatter
                }
                //, {
                //  title: '卷期-年代',
                //field: 'datas',
                //        rowspan: 2,
                //      align: 'center',
                //    valign: 'middle',
                //  sortable: true,
                //-footerFormatter: totalTextFormatter
                //}
                , {
                    title: '備註',
                    field: 'someStuff',
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle',
                    sortable: true, searchable: false,
                    //footerFormatter: totalTextFormatter
                }
                , {
                    title: '資料細節',
                    colspan: 4,
                    align: 'center',
                    visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
                }],
            [{
                field: 'updateTime',
                title: '更新日期',
                sortable: true,
                //footerFormatter: totalNameFormatter,
                align: 'center', searchable: false,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
            }, {
                field: 'existTime',
                title: '存在年分',
                sortable: true,
                align: 'center', searchable: false,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'id',
                title: '識別碼',
                sortable: true,
                align: 'center', searchable: false,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'operate',
                title: '管理操作',
                align: 'center', searchable: false,
                clickToSelect: false,
                events: window.operateEvents,
                formatter: operateFormatter,
                visible: (document.getElementById('isUSER').innerText === 'no') ? true : false
            }

                , {
                field: 'TIMEs',
                title: '年代紀錄(不顯示在使用者/管理端)[起始]',
                sortable: true,
                align: 'center', searchable: false,
                visible: false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'TIMEe',
                title: '年代紀錄(不顯示在使用者/管理端)[停止]',
                sortable: true,
                align: 'center', searchable: false,
                visible: false
                //footerFormatter: totalPriceFormatter
            }, {
                field: 'TIMEn',
                title: '年代紀錄(不顯示在使用者/管理端)[負面]',
                sortable: true,
                align: 'center', searchable: false,
                visible: false
                //footerFormatter: totalPriceFormatter
            }

            ]
        ]
    })
    $table.on('load-success.bs.table', function (e, name, args) {
        console.log("load-success.bs.table");
        if (document.querySelector(".bootstrap-table.semantic")) {
            document.querySelector(".bootstrap-table.semantic").setAttribute("style", "width:100%;");
            if (document.getElementsByClassName("fixed-table-toolbar")) {
                //document.getElementsByClassName("fixed-table-toolbar")[0].classList.add("ui");
                //document.getElementsByClassName("fixed-table-toolbar")[0].classList.add("menu");
            } else {
                console.log("[ERROR] <table> onevent:load-success.bs.table -> can't find **.bootstrap-table.semantic**");
            }
        } else {
            console.log("[ERROR] <table> onevent:load-success.bs.table -> can't find **class=fixed-table-toolbar**");
        }
        table_user();
    })
    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table',
        function () {
            $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

            // save your data, here just save the current page
            selections = getIdSelections()
            // push or splice the selections if you want to save all data selections
        })
    $table.on('all.bs.table', function (e, name, args) {
        console.log(name, args)
    })
    $remove.click(function () {
        var ids = getIdSelections()
        $table.bootstrapTable('remove', {
            field: 'id',
            values: ids
        })
        $remove.prop('disabled', true)
    })
}

$(function () {
    initTable()

    $('#locale').change(initTable)
})

/*TODO
下載按鈕無法收回
*/