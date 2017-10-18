$(function() {


    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '订单编号',
            search: true
        }, {
            field: 'applyUser',
            title: '下单用户',
            search: true,
            formatter: function(v, data) {
                return data.user.mobile;
            },
            type: 'select',
            search: true,
            pageCode: '805120',
            params: {
                kind: 'C',
                updater: '',
                companyCode: OSS.company
            },
            keyName: 'userId',
            valueName: 'mobile',
            searchName: 'mobile',
        }, {
            field: 'productName',
            title: '商品名称',
            formatter: function(v, data) {
                if (data.productOrderList[0].product) {
                    return data.productOrderList[0].product.name;
                } else {
                    return ""
                }

            }
        }, {
            field: 'payType',
            title: '买单方式',
            key: 'pay_type',
            formatter: Dict.getNameForList("pay_type"),
            type: 'select',
            search: true,
        }, {
            field: 'amount1',
            title: '人民币总价',
            formatter: moneyFormat
        }, {
            field: 'amount2',
            title: '积分总价',
            formatter: moneyFormat
        }, {
            field: 'yunfei',
            title: '运费',
            formatter: moneyFormat
        }, {
            field: 'receiver',
            title: '收件人',
            search: true
        }, {
            field: 'reMobile',
            title: '收件人电话',
            search: true
        }, {
            field: 'applyDatetime',
            title: '下单时间',
            formatter: dateTimeFormat,
            // field1: 'dateStart',
            // title1: '下单时间',
            // type: 'date',
            // field2: 'dateEnd',
            // twoDate: true,
            // search: true,
        },
        {
            title: "下单时间",
            field: "dateStart",
            type: "date",
            search: true,
            visible: false,
        }, {
            title: "~",
            field: "dateEnd",
            type: "date",
            search: true,
            visible: false,
        },
        {
            field: "payDatetime",
            title: "支付时间",
            formatter: dateTimeFormat,
            // field1: 'payDatetimeStart',
            // title1: '支付时间',
            // type: 'date',
            // field2: 'payDatetimeEnd',
            // twoDate: true,
            // search: true,
        }, {
            field: 'status',
            title: '订单状态',
            type: "select",
            // key: "order_status",
            data: {
                "91": "用户异常",
                "92": "商户异常",
                "93": "快递异常",
                "5": "已完成",
            },
            search: true,
        }, {
            title: "支付时间",
            field: "payDatetimeStart",
            type: "date",
            search: true,
            visible: false,
        }, {
            title: "~",
            field: "payDatetimeEnd",
            type: "date",
            search: true,
            visible: false,
        }, {
            field: 'promptTimes',
            title: '催货次数',
            readonly: true
        }, {
            title: "备注",
            field: "remark"
        }
    ];
    buildList({
        columns: columns,
        pageCode: '808065',
        searchParams: {
            statusList: ["5", "91", "92", "93"]
        },
        beforeDetail: function(data) {
            if (data.toUser == OSS.SYS_USER) {
                window.location.href = "order_addedit.html?&v=1&code=" + data.code;
            } else {
                window.location.href = "storeOrder_addedit.html?&v=1&code=" + data.code;
            }
        }
    });
    //流水查询
    $("#ledgerBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        window.location.href = "order_ledger.html?refNo=" + selRecords[0].code;
    });
});