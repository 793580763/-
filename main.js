// Material 类定义
class Material {
    constructor(序号, 名称, 比重, 单价, 废料单价) {
        this.序号 = 序号;
        this.名称 = 名称;
        this.比重 = 比重;
        this.单价 = 单价;
        this.废料单价 = 废料单价;
    }

    // 修改单价方法
    修改单价(newPrice) {
        this.单价 = newPrice;
    }

    // 修改废料单价方法
    修改废料单价(newScrapPrice) {
        this.废料单价 = newScrapPrice;
    }

    // 获取材料信息方法
    获取信息() {
        return `${this.序号}. ${this.名称} 材料的比重为 ${this.比重}，单价为 ${this.单价}，废料价格为 ${this.废料单价}`;
    }

    // 获得比重
    比重() {
        this.比重 = newScrapPrice;
    }
}

// 创建材料实例
var 铝 = new Material(1, "铝", 2.7, 24, 14);
var 磷铜 = new Material(2, "磷铜", 8.95, 81.5, 60);
var 黄铜 = new Material(3, "黄铜", 8.95, 56, 41);
var 铁 = new Material(4, "铁", 7.85, 5.2, 2.3);
var 锰 = new Material(5, "锰", 7.85, 9, 2.3);
var 不锈钢2_304 = new Material(6, "不锈钢2.0 304", 7.85, 19.8, 8.6);
var 不锈钢02软料 = new Material(7, "不锈钢0.2 软料", 7.85, 26, 8.6);
var 不锈钢316L = new Material(8, "不锈钢316L", 7.85, 34, 8.6);
var 不锈钢拉伸DKU = new Material(9, "不锈钢拉伸DKU", 7.85, 20, 8.6);
var 马口铁 = new Material(10, "马口铁", 7.85, 16, 2.3);

var 材料库 = {
    '铝': 铝,
    '磷铜': 磷铜,
    '黄铜': 黄铜,
    '铁': 铁,
    '锰': 锰,
    '不锈钢2_304': 不锈钢2_304,
    '不锈钢02软料': 不锈钢02软料,
    '不锈钢316L': 不锈钢316L,
    '不锈钢拉伸DKU': 不锈钢拉伸DKU,
    '马口铁': 马口铁
};

// 在页面上显示材料信息
var materialInfoDiv = document.getElementById("materialInfo");
var materialInfoHTML = `<p>${铝.获取信息()}</p >
                        <p>${磷铜.获取信息()}</p >
                        <p>${黄铜.获取信息()}</p >
                        <p>${铁.获取信息()}</p >
                        <p>${锰.获取信息()}</p >
                        <p>${不锈钢2_304.获取信息()}</p >
                        <p>${不锈钢02软料.获取信息()}</p >
                        <p>${不锈钢316L.获取信息()}</p >
                        <p>${不锈钢拉伸DKU.获取信息()}</p >
                        <p>${马口铁.获取信息()}</p >`;
materialInfoDiv.innerHTML = materialInfoHTML;

document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取表单输入值
    var materialName = document.getElementById("materialName").value;
    var newMaterialPrice = parseFloat(document.getElementById("newMaterialPrice").value);
    var newScrapPrice = parseFloat(document.getElementById("newScrapPrice").value);

    // 根据名称找到对应的材料实例
    var materialToUpdate = 材料库[materialName];
    
    // 修改材料信息
    if (materialToUpdate) {
        if (!isNaN(newMaterialPrice)) {
            materialToUpdate.修改单价(newMaterialPrice);
        }
        if (!isNaN(newScrapPrice)) {
            materialToUpdate.修改废料单价(newScrapPrice);
        }
        // 更新页面显示
        var materialInfoHTML = Object.values(材料库).map(material => `<p>${material.获取信息()}</p >`).join("");
        materialInfoDiv.innerHTML = materialInfoHTML;
    } else {
        alert("无效的材料名称");
    }
});

// 工序成本修改
var 数据 = {
    'Y737Y大': 4.6,
    'Y737Y中': 3.8,
    'Y737Y小': 3,
    'K636K大': 2.4,
    'K636K中': 2.3,
    'K636K小': 2.1,
    '镀锡25': 25,
    '镀锡20': 20,
    '镀镍': 5,
    '镀锌': 2.5,
    '本色': 0,
    '攻牙': 0.03,
    'PIN脚': 0.024
};

// 获取 HTML 元素
var optionsPanel = document.getElementById('optionsPanel');
var selectData = document.getElementById('selectData');
var newValueInput = document.getElementById('newValue');
var infoPanel = document.getElementById('infoPanel');

// 函数：显示/隐藏选项面板
function toggleOptions() {
    if (optionsPanel.style.display === 'none') {
        optionsPanel.style.display = 'block';
        populateSelectOptions(); // 显示时动态生成下拉菜单选项
    } else {
        optionsPanel.style.display = 'none';
    }
}

// 函数：动态生成下拉菜单选项
function populateSelectOptions() {
    // 清空原有选项
    selectData.innerHTML = '';

    // 遍历数据对象，创建选项并添加到下拉菜单中
    for (var key in 数据) {
        var option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectData.appendChild(option);
    }
}

// 函数：修改数据值
function updateValue() {
    var selectedKey = selectData.value;
    var newValue = parseFloat(newValueInput.value);

    if (!isNaN(newValue)) {
        数据[selectedKey] = newValue;
        updateInfoPanel(); // 更新信息面板内容
        console.log('修改后的数据：', 数据);
    } else {
        console.log('请输入有效的数值。');
    }
}

// 函数：更新信息面板内容
function updateInfoPanel() {
    infoPanel.innerHTML = ''; // 清空原有内容

    // 遍历数据对象，创建信息并添加到信息面板中
    for (var key in 数据) {
        var info = document.createElement('p');
        info.textContent = `${key}单价：${数据[key]}元`;
        infoPanel.appendChild(info);
    }
}
// 初始加载时更新信息面板内容
updateInfoPanel();




// 检查废料收入计算方法
// 获取所有单选框
const radio产品净重 = document.getElementById('radio产品净重');
const radio展开长和宽 = document.getElementById('radio展开长和宽');
const radio展开面积 = document.getElementById('radio展开面积');

// 获取需要显示/隐藏的输入框组
const 展开长输入框 = document.getElementById('展开长');
const 展开宽输入框 = document.getElementById('展开宽');
const 展开长宽信息提示 = document.getElementById('展开长宽信息提示');
const 展开面积输入框 = document.getElementById('展开面积');
const 产品净重输入框 = document.getElementById('产品净重');

radio产品净重.checked = true; // 将产品净重的radio按钮设为勾选状态
展开长输入框.style.display = 'none'; // 隐藏展开长输入框组
展开宽输入框.style.display = 'none'; // 隐藏展开宽输入框组
展开长宽信息提示.style.display = 'none'; // 隐藏展开长宽信息提示
展开面积输入框.style.display = 'none'; // 隐藏展开面积输入框


// 监听单选框的变化
radio产品净重.addEventListener('change', () => {
    if (radio产品净重.checked) {
        展开长输入框.style.display = 'none'; // 隐藏展开长输入框组
        展开宽输入框.style.display = 'none'; // 隐藏展开宽输入框组
        展开长宽信息提示.style.display = 'none'; // 隐藏展开长宽信息提示
        展开面积输入框.style.display = 'none'; // 隐藏展开面积输入框
        产品净重输入框.style.display = 'inline-block'; // 显示产品净重输入框
    }
});

radio展开长和宽.addEventListener('change', () => {
    if (radio展开长和宽.checked) {
        展开长输入框.style.display = 'inline-block'; // 显示展开长输入框组
        展开宽输入框.style.display = 'inline-block'; // 显示展开宽输入框组
        展开长宽信息提示.style.display = 'inline-block'; // 显示展开长宽信息提示
        展开面积输入框.style.display = 'none'; // 隐藏展开面积输入框
        产品净重输入框.style.display = 'none'; // 隐藏产品净重输入框
    }
});

radio展开面积.addEventListener('change', () => {
    if (radio展开面积.checked) {
        展开长输入框.style.display = 'none'; // 隐藏展开长输入框组
        展开宽输入框.style.display = 'none'; // 隐藏展开宽输入框组
        展开长宽信息提示.style.display = 'none'; // 隐藏展开长宽信息提示
        展开面积输入框.style.display = 'inline-block'; // 显示展开面积输入框
        产品净重输入框.style.display = 'none'; // 隐藏产品净重输入框
    }
});



// 运算数据字典
var 报价产品 = {};


var checkbox = document.getElementById("includeCalculation");
var expandInfo = document.getElementById("expandInfo");

// 监听复选框的变化
checkbox.addEventListener("change", function() {
    // 如果复选框被选中，则显示展开信息栏，否则隐藏
    if (checkbox.checked) {
        expandInfo.style.display = "block";
    } else {
        expandInfo.style.display = "none";
    }
});

function 计算材料成本() {
    // 获取用户输入的数据
    报价产品["料宽"] = parseFloat(document.getElementById('料宽').value);
    if (isNaN(报价产品["料宽"])) {
        报价产品["料宽"] = 0;
    }
    报价产品["步距"] = parseFloat(document.getElementById('步距').value);
    if (isNaN(报价产品["步距"])) {
        报价产品["步距"] = 0;
    }
    报价产品["厚度"] = parseFloat(document.getElementById('厚度').value);
    if (isNaN(报价产品["厚度"])) {
        报价产品["厚度"] = 0;
    }
    报价产品["使用原料"] = document.getElementById('使用原料').value;
    报价产品["比重"] = 材料库[报价产品["使用原料"]].比重;
    报价产品["材料单价"] = 材料库[报价产品["使用原料"]].单价;
    报价产品["废料单价"] = 材料库[报价产品["使用原料"]].废料单价;
    // 计算产品用料体积
    报价产品["用料体积"] = 报价产品["料宽"] * 报价产品["步距"] * 报价产品["厚度"] / 1000;
    // 计算产品用料重量
    报价产品["用料重量"] = 报价产品["用料体积"] * 报价产品["比重"];


    var 计算方式 = document.querySelector('input[name="计算方式"]:checked').value;
    // 如果用户勾选了减去废料收入
    if (checkbox.checked) {
        // 根据选择的计算方式，获取产品净重
        if (计算方式 === "产品净重") {
            报价产品["产品净重"] = parseFloat(document.getElementById('产品净重').value);
            if (isNaN(报价产品["产品净重"])) {
                报价产品["产品净重"] = 0;
            }
            报价产品["废料净重"] = 报价产品["用料重量"]-报价产品["产品净重"];
        } else if (计算方式 === "展开长和宽") {
            // 根据展开长和宽计算产品净重和废料净重
            // 注意：此处需要同时输入展开长和展
            报价产品["展开长"] = parseFloat(document.getElementById('展开长').value);
            if (isNaN(报价产品["展开长"])) {
                报价产品["展开长"] = 0;
            }
            报价产品["展开宽"] = parseFloat(document.getElementById('展开宽').value);
            if (isNaN(报价产品["展开宽"])) {
                报价产品["展开宽"] = 0;
            }
            报价产品["产品净重"] = 报价产品["展开长"] * 报价产品["展开宽"] * 报价产品["厚度"] / 1000 * 报价产品["比重"];
            报价产品["废料净重"] = 报价产品["用料重量"]-报价产品["产品净重"];
        } else if (计算方式 === "展开面积") {
            // 根据展开面积计算产品净重和废料净重
            报价产品["展开面积"] = parseFloat(document.getElementById('展开面积').value);
            if (isNaN(报价产品["展开面积"])) {
                报价产品["展开面积"] = 0;
            }
            报价产品["产品净重"] = 报价产品["展开面积"] * 报价产品["厚度"] / 1000 * 报价产品["比重"];
            报价产品["废料净重"] = 报价产品["用料重量"]-报价产品["产品净重"];
        }
    } else {
        报价产品["产品净重"] = 0;
        报价产品["废料净重"] = 0;
    }

    if (报价产品["产品净重"] > 报价产品["用料重量"]) {
        报价产品["产品净重"] = 报价产品["用料重量"]
    }
    报价产品["产品用料价钱"] = 报价产品["用料重量"] * 报价产品["材料单价"] / 1000;
    报价产品["废料价钱"] = 报价产品["废料净重"] * 报价产品["废料单价"] / 1000;
    报价产品["产品材料成本"] = 报价产品["产品用料价钱"] - 报价产品["废料价钱"];
}

// 显示材料成本
function 显示材料成本() {
    // 在页面上显示结果之前清空旧的结果
    var 计算结果 = document.getElementById('材料成本');
    计算结果.innerHTML = '';

    // 在页面上显示结果
    if (报价产品["废料净重"] === 0) {
        计算结果.innerHTML = `
        产品用料体积：${报价产品["用料体积"]}cm2<br>
        产品用料重量：${报价产品["用料重量"]}g<br>
        产品材料成本：${报价产品["产品材料成本"]}元
    `;
    } else {
        计算结果.innerHTML = `
        产品净重：${报价产品["产品净重"]}g<br>
        废料净重：${报价产品["废料净重"]}g<br>
        产品用料体积：${报价产品["用料体积"]}cm2<br>
        产品用料重量：${报价产品["用料重量"]}g<br>
        废料价钱：${报价产品["废料价钱"] }元<br>
        产品材料成本：${报价产品["产品材料成本"]}元
    `;
    }
}






// 计算工序成本
function 计算工序成本() {
    // 获取用户输入的数据
    报价产品["表面处理市价"] = 数据[document.getElementById('表面处理方式').value];
    报价产品["冲压费"] = parseFloat(document.getElementById('冲压费').value);
    if (isNaN(报价产品["冲压费"])) {
        报价产品["冲压费"] = 0;
    }
    报价产品["攻牙个数"] = parseInt(document.getElementById('攻牙个数').value);
    if (isNaN(报价产品["攻牙个数"])) {
        报价产品["攻牙个数"] = 0;
    }
    报价产品["PIN脚个数"] = parseInt(document.getElementById('PIN脚个数').value);
    if (isNaN(报价产品["PIN脚个数"])) {
        报价产品["PIN脚个数"] = 0;
    }
    报价产品["使用纸箱单价"] = 数据[document.getElementById('纸箱型号').value];
    报价产品["装箱个数"] = parseInt(document.getElementById('装箱个数').value);
    if (isNaN(报价产品["装箱个数"])) {
        报价产品["使用纸箱单价"] = 0;
        报价产品["装箱个数"] = 0;
        报价产品["包装费"] = 0;
    } else {
        报价产品["包装费"] = 报价产品["使用纸箱单价"] / 报价产品["装箱个数"];
    }
    if (报价产品["产品净重"] === 0) {
        报价产品["表面处理费"] = 报价产品["表面处理市价"] * 报价产品["用料重量"] /1000
    } else {
        报价产品["表面处理费"] = 报价产品["表面处理市价"] * 报价产品["产品净重"] /1000
    }
    报价产品["攻牙费"] = 报价产品["攻牙个数"] * 数据['攻牙'];
    报价产品["PIN脚费"] = 报价产品["PIN脚个数"] * 数据['PIN脚'];
    报价产品["运输费"] = parseFloat(document.getElementById('运输费').value);
    if (isNaN(报价产品["运输费"])) {
        报价产品["运输费"] = 0;
    }
    报价产品["工序成本"] = 报价产品["表面处理费"] + 报价产品["冲压费"] + 报价产品["攻牙费"] + 报价产品["PIN脚费"] + 报价产品["包装费"] + 报价产品["运输费"]
};

// 显示工序成本
function 显示工序成本() {
    // 在页面上显示结果之前清空旧的结果
    var 计算工序成本结果 = document.getElementById('工序成本');
    计算工序成本结果.innerHTML = '';

    // 在页面上显示结果
    计算工序成本结果.innerHTML = `
        表面处理费：${报价产品["表面处理费"]}元<br>
        冲压费：${报价产品["冲压费"]}元<br>
        攻牙费：${报价产品["攻牙费"]}元<br>
        PIN脚费：${报价产品["PIN脚费"]}元<br>
        包装费：${报价产品["包装费"]}元<br>
        运输费：${报价产品["运输费"] }元<br>
        产品工序成本：${报价产品["工序成本"]}元
    `;
}



var 利润复选框 = document.getElementById("计算利润");
var 利润率填写窗口 = document.getElementById("利润率");

利润复选框.addEventListener("change", function() {
    if (利润复选框.checked) {
        利润率填写窗口.style.display = "block";
    } else {
        利润率填写窗口.style.display = "none";
    }
});

var 税额复选框 = document.getElementById("计算税额");
var 税额填写窗口 = document.getElementById("税率");

税额复选框.addEventListener("change", function() {
    if (税额复选框.checked) {
        税额填写窗口.style.display = "block";
    } else {
        税额填写窗口.style.display = "none";
    }
});



// 计算产品利润及税率
function 计算产品利润及税额() {
    if (利润复选框.checked) {
        报价产品["利润率"] = parseFloat(document.getElementById('利润率').value);
        if (isNaN(报价产品["利润率"])) {
        报价产品["利润率"] = 15;
        }
    } else {
        报价产品["利润率"] = 0;
    }

    if (税额复选框.checked) {
        报价产品["税率"] = parseFloat(document.getElementById('税率').value);
        if (isNaN(报价产品["税率"])) {
        报价产品["税率"] = 13;
        }
    } else {
        报价产品["税率"] = 0;
    }

    报价产品["利润额"] = 报价产品["利润率"] * (报价产品["产品材料成本"] + 报价产品["工序成本"]) / 100
    报价产品["税额"] = 报价产品["税率"] * (报价产品["产品材料成本"] + 报价产品["工序成本"]) / 100
};


// 显示产品利润及税额
function 显示产品利润及税额() {
    // 在页面上显示结果之前清空旧的结果
    var 计算产品利润及税额结果 = document.getElementById('利润额及税额');
    计算产品利润及税额结果.innerHTML = '';

    // 在页面上显示结果
    计算产品利润及税额结果.innerHTML = `
        利润额：${报价产品["利润额"]}元<br>
        税额：${报价产品["税额"]}元<br>
    `;
}



// 计算总成本
function 计算总成本() {
    报价产品["总成本"] = 报价产品["产品材料成本"] + 报价产品["工序成本"] + 报价产品["利润额"] + 报价产品["税额"]
};

// 显示总成本
function 显示总成本() {
    // 在页面上显示结果之前清空旧的结果
    var 计算总成本结果 = document.getElementById('总成本');
    计算总成本结果.innerHTML = '';

    // 在页面上显示结果
    计算总成本结果.innerHTML = `
        材料成本：${报价产品["产品材料成本"]}元<br>
        工序成本：${报价产品["工序成本"]}元<br>
        利润额：${报价产品["利润额"]}元<br>
        税额：${报价产品["税额"]}元<br>
        总成本：${报价产品["总成本"]}元<br>
    `;
}




function 将字典转为Excel(dictionary, filename) {
    // 将字典转换为一个包含键值对数组的数组
    const data = Object.entries(dictionary);
    // 提取键和值分别存储到不同的数组中
    const keys = data.map(entry => entry[0]); // 键数组
    const values = data.map(entry => entry[1]); // 值数组

    // 将键和值数组组合成一个二维数组
    const excelData = [keys, values];
    // 调用导出Excel函数
    导出Excel(excelData, filename);
}



function 导出Excel(data, filename) {
    // 存储最终导出的数据的数组
    const excelData = [];

    // 将数据按行排列，每个键值对分别存储到不同的行
    data.forEach(row => {
        const rowData = [];
        row.forEach(cell => {
            if (typeof cell === 'object' && cell !== null) {
                // 如果是键值对对象，则分别存储键和值到不同的单元格
                rowData.push(Object.keys(cell)[0]); // 键
                rowData.push(Object.values(cell)[0]); // 值
            } else {
                // 如果不是对象，则直接存储到单元格
                rowData.push(cell);
            }
        });
        excelData.push(rowData);
    });

    // 构建CSV格式的数据内容，并处理逗号
    const csvContent = "data:text/csv;charset=utf-8," 
                    + excelData.map(row => row.join("\t")).join("\n");
    // 将数据内容转换为URI
    const encodedUri = encodeURI(csvContent);

    // 创建一个链接元素
    const link = document.createElement("a");
    // 设置链接属性：href为URI，download为文件名
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    // 将链接元素添加到页面中
    document.body.appendChild(link);
    // 模拟用户点击下载链接
    link.click();
    // 下载完成后移除链接元素
    document.body.removeChild(link);
}





function 导出Excel文件() {
    计算材料成本(); 
    计算工序成本(); 
    计算产品利润及税额(); 
    计算总成本();
    将字典转为Excel(报价产品, "报价产品.xlsx");
}


