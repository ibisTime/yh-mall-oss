$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'type',
        title: '类别',
        type: 'select',
        listCode: '808007',
        params: {
            parentCode: "0",
            type: "4",
            status: "1"
        },
        keyName: 'code',
        valueName: 'name',
        required: true,
        readonly: view
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
        maxlength: 50,
        readonly: view
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
        maxlength: 250,
        readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        single: true,
        required: true,
        readonly: view
    }, {
        field: 'pic',
        title: '展示图',
        type: 'img',
        required: true,
        readonly: view
    }, {
        field: 'originalPrice',
        title: '原价',
        amount: true,
        required: true,
        readonly: view
    }, {
        field: 'price',
        title: '价格',
        amount: true,
        required: true,
        formatter: function(v, data) {
            if (data.price1 != "0") {
                return moneyFormat(data.price1)
            } else if (data.price2) {
                return moneyFormat(data.price2)
            }
        }
    }, {
        field: 'deposit',
        title: '押金',
        amount: true,
        required: true,
        readonly: view
    }, {
        field: 'quantity',
        title: '库存',
        required: true,
        readonly: view
    }, {
        field: 'minRentDays',
        title: '最小租赁天数',
        number: true,
        required: true,
        readonly: view
    }, {
        field: 'dayOverdueFee',
        title: '日逾期费用(元)',
        amount: true,
        required: true,
        readonly: view
    }, {
        title: '商品详述',
        field: 'description',
        type: 'textarea',
        required: true,
        readonly: view
    }, {
        title: "单件重量（kg）",
        field: "weight",
        number: true,
        required: true,
        readonly: view
    }, {
        title: '包装清单',
        field: 'packsList',
        type: "o2m",
        required: true,
        editTable: true,
        addeditTable: true,
        readonly: view,
        columns: [{
            field: '',
            title: '',
            checkbox: true,
            hidden: true
        }, {
            field: 'name',
            title: '名称',
            required: true,
            maxlength: 32
        }, {
            field: 'quantity',
            title: '数量',
            number: true,
            required: true
        }]
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255,
        readonly: view
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '810026',

    };

    options.buttons = [{
            title: '确定新增',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    delete data["code"];
                    data["packsList"] = $('#packsListList').bootstrapTable('getData');
                    if (!data["packsList"].length) {
                        toastr.info("包装清单不能为空");
                        return;
                    }
                    $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                        var values = [];
                        var imgs = $(el).find('.img-ctn');
                        imgs.each(function(index, img) {
                            values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                        });

                        data[el.id] = values.join('||');
                    });
                    for (var i = 0, len = fields.length; i < len; i++) {
                        var item = fields[i];
                        if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                            data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                        } else if (item.emptyValue && !data[item.field]) {
                            data[item.field] = item.emptyValue;
                        } else if (item.readonly && item.pass) {
                            data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                        }
                        if (item.type == 'select' && item.passValue) {
                            data[item.field] = $('#' + item.field).find('option:selected').html();
                        }

                        if (item.type == "checkbox") {
                            data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                        }
                    }
                    reqApi({
                        code: "810010",
                        json: data
                    }).done(function() {
                        sucDetail();
                    });

                }
            }
        },
        {
            title: '返回',
            handler: function() {
                goBack();
            }
        }
    ];

    buildDetail(options);

});