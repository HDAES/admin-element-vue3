/*
 * @Descripttion: 导出execl
 * @Author: Hades
 * @Date: 2021-09-06 22:35:25
 */
const ExportJsonExcel = require("js-export-excel");

export default function(options, data, name ){
    const option = {};
    option.fileName  = name
    
    let sheetFilter = []
    let sheetHeader = []
    let columnWidths = []
    let length = options.length
    options.forEach(item => {
        sheetFilter.push(item.dataIndex)
        sheetHeader.push(item.title)
        columnWidths.push(100/length)
    });


    option.datas = [{
        sheetData: data,
        sheetName: name || '默认名字',
        sheetFilter,
        sheetHeader,
        columnWidths
    }]
    
    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); 
}