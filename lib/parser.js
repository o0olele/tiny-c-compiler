/******************************************** 语法分析 *******************************************/
//产生式
const Productions = new Array(
    "Pro State_str",
    "State_str State A",
    "A State_str",
    "A @",
    "State int ID State_type",
    "State void ID State_type",
    "State_type Var_state",
    "State_type Fun_state",
    "Var_state ;",
    "Fun_state ( Form_par ) Block",
    "Form_par Par_list",
    "Form_par void",
    "Par_list Par B",
    "B , Par B",
    "B @",
    "Par int ID",
    "Block { Iner_state Sent_str }",
    "Iner_state @",
    "Iner_state Iner_par_state Iner_state",
    "Iner_par_state int ID ;",
    "Sent_str Sent C",
    "C @",
    "C Sent_str",
    "Sent Sent_if",
    "Sent Sent_while",
    "Sent Sent_return",
    "Sent Sent_eval",
    "Sent_eval ID = Exp ;",
    "Sent_return return D",
    "D Exp ;",
    "D ;",
    "Sent_while while ( Exp ) Block",
    "Sent_if if ( Exp ) Block E",//
    "E else Block",
    "E @",
    "Exp Exp_add F",//
    "F relop Exp_add F",
    "F @",
    "Exp_add Nape G",
    "G - Nape G",
    "G + Nape G",
    "G @",
    "Nape Div H",
    "H * Div H",
    "H / Div H",
    "H @",
    "Div num",
    "Div ( Exp )",//
    "Div ID Ftype",
    "Ftype Call",
    "Ftype @",
    "Call ( Act )",
    "Act Act_list",
    "Act @",
    "Act_list Exp I",
    "I , Exp I",
    "I @");
Array.prototype.top = function () {
    return this[this.length - 1];
}

function compiler(arr) {
    this.non_terminal = new Array();//存放非终结符集合
    this.non_terminal_first = new Array();//存放非终结符first集合
    this.non_terminal_follow = new Array();//存放非终结符follow集合

    this.right = new Array();//产生式右部集合
    this.right_first = new Array();//产生式右部first集合

    this.analyse_table = new Array();//预测分析表
    this.terminal_array = arr;

    /**
 * @param {关键字} key
 * @func 判断关键字是否为终结符
 */
    this.Is_terminal = function (key) {
        if (key == "ID" || key == "num" || key == "relop")
            return true;
        else if (KEY_WORD.indexOf(key) > -1 || SYMBOL.indexOf(key) > -1)
            return true;
        else
            return false;
    }

    /**
     * @param {关键字} key 
     * @func 判断关键字是否为比较符
     */
    this.Is_relop = function (key) {
        if (key == "<" || key == "<=" || key == ">" || key == ">=" || key == "==" || key == "!=")
            return true;
        else
            return false;
    }

    /**
     * @param {关键字：非终结符} key 
     * @func 获取非终结符在Non_terminal_X数组中的位置
     * @return 找到则返回position,否则返回-1
     */
    this.Get_non_i = function (key) {

        return this.non_terminal.indexOf(key);
    }

    /**
     * @param {关键字：非终结符} key 
     * @func 获取非终结符在Terminal数组中的位置
     * @return 找到则返回position,否则返回-1
     */
    this.Get_ter_i = function (key) {
        if (this.Is_relop(key))
            return 13;

        return TERMINAL.indexOf(key);
    }

    /**
     * @param {非终结符} key 
     * @func 根据产生式判断非终结符是否可以推出空@
     */
    this.Is_to_null = function (key) {
        if (this.Is_terminal(key))
            return false;
        else if (key == "@")
            return true;

        var temp_t = false

        for (i = 0; i < Productions.length; i++) {
            var Split_r = Productions[i].split(" ");
            if (Split_r[0] != key)
                continue;

            for (j = 1; j < Split_r.length; j++)
                if (this.Is_to_null(Split_r[j]))
                    temp_t = true;
                else {
                    temp_t = false;
                    break;
                }

            if (temp_t)
                break;
        }
        if (temp_t)
            return true;
        else
            return false;
    }

    /**
     * @func 初始化
     */
    this.Init = function () {
        //初始化非终结符数组、Alpha数组
        this.non_terminal[0] = "";
        this.non_terminal_first[0] = "";
        this.non_terminal_follow[0] = "";

        for (i = 0, j = 0; i < Productions.length; i++) {
            var Split_r = Productions[i].split(" ");
            if (this.non_terminal[j] != Split_r[0]) {
                this.non_terminal[++j] = Split_r[0];//非终结符，产生式右部
                this.non_terminal_first[j] = "";//非终结符first集，初始化
                this.non_terminal_follow[j] = "";//非总结符follow集，初始化
            }
            this.right[i] = "";

            for (k = 0; k < Split_r.length; k++)
                if (k > 0)
                    this.right[i] += " " + Split_r[k];//产生式右部初始化
        }

        /*for (var i in Register)
            Register[i] = '';*/
    }

    /**
     * @func 求first(x) 非终结符的first集合
     */
    this.FIRSTX = function () {
        for (s = this.non_terminal.length - 1; s > 0; s--) {

            for (jj = Productions.length - 1; jj >= 0; jj--) {
                var Split_r = Productions[jj].split(" ");

                for (kk = 2; kk < Split_r.length; kk++)
                    if (Split_r[kk] == this.non_terminal[s] && this.Is_terminal(Split_r[kk - 1]) && this.non_terminal_first[s].indexOf(Split_r[kk - 1]) < 0)
                        this.non_terminal_first[s] += " " + Split_r[kk - 1];

                if (Split_r[0] == this.non_terminal[s]) {
                    if (Split_r[1] == "@" && this.non_terminal_first[s].indexOf("@") < 0) {
                        this.non_terminal_first[s] += " @";
                        continue;
                    }

                    for (h = 1; h < Split_r.length; h++) {
                        if (this.Is_terminal(Split_r[h]) && this.non_terminal_first[s].indexOf(Split_r[h]) == -1)
                            this.non_terminal_first[s] += " " + Split_r[h];
                        if (this.Is_terminal(Split_r[h]))
                            break;

                        var Split_t = (this.non_terminal_first[this.Get_non_i(Split_r[h])] || "").split(" ");
                        for (k = 0; k < Split_t.length; k++)
                            if ((this.non_terminal_first[s] || "").indexOf(Split_t[k]) == -1 && Split_t[k] != "@")
                                this.non_terminal_first[s] += " " + Split_t[k];

                        if (this.Is_to_null(Split_r[h])) {
                            if (h == Split_r.length - 1 && this.non_terminal_first[s].indexOf("@") < 0)
                                this.non_terminal_first[s] += " @";
                        }
                        else
                            break;
                    }
                }
            }
        }
    }

    /**
     * @param {*} First_alpha_t 
     * @func 求first(alpha)
     */
    this.FIRST_ALPHA = function (First_alpha_t) {
        var Split_r = First_alpha_t.split(" ");//分割Alpha
        var bool_null = 0;
        var First_alpha_First_t = "";
        for (j = 1; j < Split_r.length; j++) {
            if (Split_r[j] == "@")
                continue;

            if (this.Is_terminal(Split_r[j])) {
                First_alpha_First_t += " " + Split_r[j];
                break;
            }

            var Split_t = this.non_terminal_first[this.Get_non_i(Split_r[j])].split(" ");
            //获取Alpha首字符的FIRST集合并分割

            if (Split_t.indexOf("@") >= 0)
                bool_null = 1;
            else
                bool_null = 0;

            for (k = 0; k < Split_t.length; k++)
                if (Split_t[k] != "@" && First_alpha_First_t.indexOf(Split_t[k]) == -1)
                    First_alpha_First_t += " " + Split_t[k];//置 FIRST(α) = FIRST (X1) - {ε};

            if (bool_null == 0)
                break;

            if (bool_null == 1 && j == Split_r.length - 1)
                First_alpha_First_t += " @";
        }

        return First_alpha_First_t;
    }

    /**
     * @func 求所有产生式的首字符集
     */
    this.FIRST_ALPHA_ALL = function () {
        for (i = this.right.length - 1; i >= 0; i--) {
            this.right_first[i] = "";
            this.right_first[i] += this.FIRST_ALPHA(this.right[i]);
        }
    }

    /**
     * @func 求FOLLOWX
     */
    this.FOLLOWX = function () {
        if (this.non_terminal_follow[1].indexOf("#") < 0)
            this.non_terminal_follow[1] += " #";

        for (u = this.non_terminal.length - 1; u >= 0; u--) {
            for (w = Productions.length - 1; w >= 0; w--) {
                var Split_r = Productions[w].split(" ");
                for (z = 1; z < Split_r.length; z++)
                    if (Split_r[z] == this.non_terminal[u]) {
                        break;
                    }

                if (this.Is_terminal(Split_r[z + 1]) && (this.non_terminal_follow[u].indexOf(Split_r[z + 1]) < 0)) {
                    this.non_terminal_follow[u] += " " + Split_r[z + 1];
                    continue;
                }

                var temp_s = false;
                if (z >= 1 && z < Split_r.length - 1) {
                    var temp = "";

                    for (q = z + 1; q < Split_r.length; q++)
                        temp += " " + Split_r[q];

                    for (q = z + 1; q < Split_r.length; q++)
                        if (this.Is_to_null(Split_r[q]))
                            temp_s = true;
                        else {
                            temp_s = false;
                            break;
                        }
                    var follow_t = (this.FIRST_ALPHA(temp) || "").split(" ");
                    for (e = 0; e < follow_t.length; e++)
                        if (this.non_terminal_follow[u].indexOf(follow_t[e]) < 0)
                            this.non_terminal_follow[u] += " " + follow_t[e];
                }
                if (z == Split_r.length - 1 || temp_s) {
                    var Split_t = (this.non_terminal_follow[this.Get_non_i(Split_r[0])] || "").split(" ");
                    for (p = 0; p < Split_t.length; p++)
                        if (this.non_terminal_follow[u].indexOf(Split_t[p]) < 0 && Split_t[p] != "@")
                            this.non_terminal_follow[u] += " " + Split_t[p];
                }
            }
        }
    }

    /**
     * @func 初始化分析预测表
     */
    this.InitTable = function () {
        this.Init();

        var MAX = 0;
        while (1) {
            this.FIRSTX();
            var count = 0;
            for (y = 0; y < this.non_terminal.length; y++)
                count += (this.non_terminal_first[y] || "").length;

            if (count > MAX)
                MAX = count;
            else
                break;
        }

        this.FIRST_ALPHA_ALL();

        MAX = 0;
        while (1) {
            this.FOLLOWX();
            var count = 0;
            for (x = 0; x < this.non_terminal.length; x++)
                count += (this.non_terminal_follow[x] || "").length;

            if (count > MAX)
                MAX = count;
            else
                break;
        }


        for (r = 0; r < this.non_terminal.length; r++) {
            this.analyse_table[r] = new Array();

            for (v = 0; v < TERMINAL.length; v++)
                this.analyse_table[r][v] = "";

            for (f = 0; f < Productions.length; f++) {
                var Split_r = Productions[f].split(" ");
                if (Split_r[0] != this.non_terminal[r])
                    continue;
                if (Split_r[1] == "@") {
                    var Split_t = this.non_terminal_follow[r].split(" ");
                    for (b = 1; b < Split_t.length; b++)
                        this.analyse_table[r][this.Get_ter_i(Split_t[b])] += f + 1;
                }
                else {
                    var Split_t = this.right_first[f].split(" ");
                    for (b = 1; b < Split_t.length; b++)
                        this.analyse_table[r][this.Get_ter_i(Split_t[b])] += f + 1;
                }

            }
        }
    }

    this.ArrayX = new Array();
    this.ThreeAddressCode = new Array();
    this.AimCode = new Array();

    this.Analyse_Stack = "<div class=\"table-responsive\"><table class=\"table table-striped\"><thead>"
        + "<tr><td>Analyse Stack</td><td>top</td><td>bottom</td><td>productions</td></tr></thead><tbody>";

    /**
     * 语法分析+语法制导翻译
     */
    this.Check = function () {
        var cnt = 0;

        //倒置
        this.terminal_array.reverse();

        while (this.terminal_array.length > 0) {

            //如果栈顶为语义动作，则执行
            if (this.ArrayX.top().str == "action_end") {
                semantic_end(this.ArrayX.top().production_id, this.ArrayX.top());
                if (this.ArrayX.top().code.length > 0) {
                    this.ThreeAddressCode = this.ArrayX.top().code;
                    this.AimCode = this.ArrayX.top().aimcode;
                }
                this.ArrayX.pop();
                continue;
            } else if (this.ArrayX.top().str == "action_child") {
                semantic_child(this.ArrayX.top().production_id, this.ArrayX.top().child_id, this.ArrayX.top().parent.children[this.ArrayX.top().child_id]);
                if (this.ArrayX.top().code.length > 0) {
                    this.ThreeAddressCode = this.ArrayX.top().code;
                    this.AimCode = this.ArrayX.top().aimcode;
                }
                this.ArrayX.pop();
                continue;
            }

            if (this.ArrayX.top().str == this.terminal_array.top().str && this.ArrayX.top().str == "#") {
                return true;
            }
            else if ((this.ArrayX.top().str == this.terminal_array.top().str && this.ArrayX.top().str != "#")
                || (this.ArrayX.top().str == "relop" && this.Is_relop(this.terminal_array.top().str))) {
                cnt++;
                this.Analyse_Stack += "<tr><td>" + cnt + "</td><td>" + "..." + this.ArrayX.top().str
                    + "</td><td>" + this.terminal_array.top().str + "..." + "</td><td>REDUCED<td></tr>";

                //将TE_Array的lexical复制
                this.ArrayX.top().lexical = this.terminal_array.top().data;

                if (this.ArrayX.top().str == "relop") {
                    this.ArrayX.top().op = this.terminal_array.top().data;
                }

                this.ArrayX.pop();
                this.terminal_array.pop();
            }
            else if (!this.Is_terminal(this.ArrayX.top().str)) {
                if (this.analyse_table[this.Get_non_i(this.ArrayX.top().str)][this.Get_ter_i(this.terminal_array.top().str)] == "")
                    return false;
                else {
                    //从预测分析表中获取产生式ID
                    var Production_G_ID = this.analyse_table[this.Get_non_i(this.ArrayX.top().str)][this.Get_ter_i(this.terminal_array.top().str)] - 1;
                    var Split_r = (Productions[Production_G_ID] || "").split(" ");

                    if (Split_r[1] == "@") {
                        cnt++;
                        this.Analyse_Stack += "<tr><td>" + cnt + "</td><td>" + "..."
                            + this.ArrayX.top().str + "</td><td>" + this.terminal_array.top().str
                            + "..." + "</td><td>@</td></tr>";

                        this.ArrayX.top().str = "action_end";
                        this.ArrayX.top().production_id = Production_G_ID;

                        //this.ArrayX.pop();
                        continue;

                    }

                    //执行start 语义
                    semantic_start(Production_G_ID, this.ArrayX.top());

                    //语法数生长
                    for (jj = 1; jj < Split_r.length; jj++) {
                        this.ArrayX.top().children.push(new Node(Split_r[jj], Split_r[jj], this.ArrayX.top()));
                    }

                    //弹出栈顶
                    var _top = this.ArrayX.pop();

                    //将end 语义入栈
                    _top.str = "action_end"; //将类型改变为动作 Action
                    _top.production_id = Production_G_ID;
                    this.ArrayX.push(_top);


                    //界面相关
                    cnt++;
                    this.Analyse_Stack += "<tr><td>" + cnt + "</td><td>" + "..."
                        + Split_r[0] + "</td><td>" + this.terminal_array.top().str + "..."
                        + "</td><td>" + Split_r[0] + "→";

                    //_top的孩子节点反序入栈
                    for (ii = 1; ii < Split_r.length; ii++) {
                        _top.children[Split_r.length - ii - 1].production_id = Production_G_ID;
                        _top.children[Split_r.length - ii - 1].child_id = Split_r.length - ii - 1;
                        this.ArrayX.push(_top.children[Split_r.length - ii - 1]);

                        //将孩子节点的语义动作压入栈
                        var _action_child = new Node(Split_r[Split_r.length - ii], "action_child", _top);
                        _action_child.production_id = Production_G_ID;//产生式ID
                        _action_child.child_id = Split_r.length - ii - 1;//孩子序号
                        this.ArrayX.push(_action_child);

                        this.Analyse_Stack += Split_r[ii] + "&nbsp;&nbsp;";
                    }

                    this.Analyse_Stack += "</td></tr>";
                }
            }
            else
                return false;
        }
        return false;
    }
}

var model_parser;

function StartCheck() {

    if (!model_parser)
        model_parser = new compiler(model_lexer.terminal_array);

    if (model_lexer.terminal_array[model_lexer.terminal_array.length - 1].str != "#") {
        alert("请在源程序最后加上 # 号");
        return;
    }

    model_parser.InitTable();

    model_parser.ArrayX.push(new Node("#", "#", null));
    model_parser.ArrayX.push(new Node("Pro", "Pro", null));

    if (model_parser.Check())
        alert("Success!");
    else
        alert("Fail!");


    $("#Code").html(model_parser.Analyse_Stack + "</tbody><table></div>");

    document.getElementById("btn_pro_show").disabled = false;
    document.getElementById("btn_symbol_show").disabled = false;
    document.getElementById("btn_itercode_show").disabled = false;
    document.getElementById("btn_aimcode_show").disabled = false;
}

/**
 * 界面显示
 */
function Production_Show() {

    if (!model_parser)
        model_parser = new compiler(model_lexer.terminal_array);

    model_parser.InitTable();

    var pro = "<div class=\"table-responsive\"><table class=\"table table-striped\"><tbody>";
    for (i = 1; i < Productions.length; i++) {
        var Split_r = Productions[i].split(" ");
        for (j = 0; j < Split_r.length; j++)
            if (j == 0)
                pro += "<tr><td>" + Split_r[j] + "</td><td>→</td><td>";
            else
                pro += "&nbsp;&nbsp;&nbsp;&nbsp;" + Split_r[j];
        pro += "</td></tr>";
    }
    pro += "</tbody><table></div>"

    $("#Grammer").html(pro);

    document.getElementById("btn_first_show").disabled = false;
    document.getElementById("btn_follow_show").disabled = false;
    document.getElementById("btn_table_show").disabled = false;
}

/**
 * 界面显示
 */
function First_Show() {
    var pro = "<div class=\"table-responsive\"><table class=\"table table-striped\"><tbody>";

    for (i = 0; i < Productions.length; i++) {
        var Split_r = Productions[i].split(" ");
        if (Split_r[1] == "@")
            continue;
        pro += "<tr><td>"
        for (j = 1; j < Split_r.length; j++)
            pro += "&nbsp;&nbsp;" + Split_r[j];
        pro += "</td><td>";

        var Split_t = model_parser.right_first[i].split(" ");
        for (j = 1; j < Split_t.length; j++)
            pro += "&nbsp;&nbsp;" + Split_t[j];

        pro += "</td></tr>"
    }
    pro += "</tbody><table></div>"

    $("#Grammer").html(pro);

}

/**
 * 界面显示
 */
function Follow_Show() {
    var pro = "<div class=\"table-responsive\"><table class=\"table table-striped\"><tbody>";

    for (i = 1; i < model_parser.non_terminal.length; i++) {
        pro += "<tr><td>" + model_parser.non_terminal[i] + "</td><td>";

        var Split_r = model_parser.non_terminal_follow[i].split(" ");
        for (j = 1; j < Split_r.length; j++)
            pro += "&nbsp;&nbsp;" + Split_r[j];
        pro += "</td></tr>"
    }
    pro += "</tbody><table></div>"

    $("#Grammer").html(pro);

}

/**
 * 界面显示
 */
function Table_Show() {
    var pro = "<div class=\"table-responsive\"><table class=\"table table-striped\">";

    pro += "<thead><tr><td></td>"
    for (i = 0; i < TERMINAL.length; i++)
        pro += "<td>" + TERMINAL[i] + "</td>";
    pro += "</tr></thead><tbody>";

    for (i = 1; i < model_parser.non_terminal.length; i++) {
        pro += "<tr><td>" + model_parser.non_terminal[i] + "</td>";

        for (j = 0; j < TERMINAL.length; j++)
            if (model_parser.analyse_table[i][j] == "")
                pro += "<td></td>"
            else
                pro += "<td>" + model_parser.analyse_table[i][j] + "</td>"
        pro += "</tr>";
    }
    pro += "</tbody><table></div>"
    $("#Grammer").html(pro);
}

/**
 * 界面显示
 */
function Show_Symbol_Table() {
    console.log(SymbolTable);

    var inner_html = "<div class=\"table-responsive\">";

    inner_html += "<h3>全局变量表</h3><table class=\"table\"><thead><tr><td>变量名</td><td>类型</td></tr></thead><tbody>";
    for (i = 0; i < SymbolTable.global_symbol_table.length; i++) {
        inner_html += "<tr><td>" + SymbolTable.global_symbol_table[i].name + "</td><td>" + SymbolTable.global_symbol_table[i].type + "</td></tr>";
    }
    inner_html += "</tbody><table></div>";

    inner_html += "<h3>局部变量表</h3>";
    for (i = 0; i < SymbolTable.local_symbol_tables.length; i++) {
        inner_html += "<h4>" + SymbolTable.local_symbol_tables[i].name + "</h4>";
        inner_html += "<table class=\"table\"><thead><tr><td>变量名</td><td>类型</td><td>是否为函数参数</td></tr></thead><tbody>";
        for (j = 0; j < SymbolTable.local_symbol_tables[i].local_var.length; j++) {
            inner_html += "<tr><td>" + SymbolTable.local_symbol_tables[i].local_var[j].name + "</td><td>" + SymbolTable.local_symbol_tables[i].local_var[j].type + "</td><td>" + SymbolTable.local_symbol_tables[i].local_var[j].is_param + "</td></tr>";
        }
        inner_html += "</tbody><table>";
    }

    inner_html += "<h3>函数表</h3><table class=\"table\"><thead><tr><td>函数名</td><td>返回类型</td><td>参数列表</td></tr></thead><tbody>";
    for (i = 0; i < SymbolTable.func_table.length; i++) {
        inner_html += "<tr><td>" + SymbolTable.func_table[i].name + "</td><td>" + SymbolTable.func_table[i].return_type + "</td><td>" + SymbolTable.func_table[i].params + "</td></tr>";
    }

    inner_html += "</tbody><table></div>";

    $("#Code").html(inner_html);
}

function Show_Middle_Code() {
    console.log(model_parser.ThreeAddressCode.toString());
    console.log(model_parser.AimCode);
    var text_ir = "";
    var inner_html = "<div class=\"table-responsive\"><table class=\"table\"><thead><tr><td>编号</td><td style=\"text-align:center\">三地址代码</td></tr></thead><tbody>";

    for (i = 1; i <= model_parser.ThreeAddressCode.length; i++) {
        text_ir += model_parser.ThreeAddressCode[i - 1] + '\n';
        if (model_parser.ThreeAddressCode[i - 1][model_parser.ThreeAddressCode[i - 1].length - 1] == ":")
            inner_html += "<tr><td>" + i + "</td><td>" + model_parser.ThreeAddressCode[i - 1] + "</td><td></td></tr>";
        else {
            var temp = model_parser.ThreeAddressCode[i - 1];
            var pos = model_parser.ThreeAddressCode[i - 1].indexOf(":=");
            if (pos == 1)
                temp = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + model_parser.ThreeAddressCode[i - 1];
            else if (pos == 2)
                temp = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + model_parser.ThreeAddressCode[i - 1];
            else if (pos == 3)
                temp = "&nbsp&nbsp&nbsp&nbsp" + model_parser.ThreeAddressCode[i - 1];
            else if (pos == 4)
                temp = "&nbsp&nbsp" + model_parser.ThreeAddressCode[i - 1];

            inner_html += "<tr><td>" + i + "</td><td></td><td>" + temp + "</td></tr>";
        }

    }
    $("#Code").html(inner_html + "</tbody><table></div>");
    exportRaw('intermediate_code.txt', text_ir);

}

function Show_Aim_Code() {

    var text_aim_code = "j main\n";
    for (i = 0; i < model_parser.AimCode.length; i++) {
        text_aim_code += model_parser.AimCode[i] + '\n';
    }
    $("#Code").html("<pre class=\"line-numbers\"><code id=\"SC\" class=\"language-clike\">" + text_aim_code + "</code></pre>");

    exportRaw('aim_code.asm', text_aim_code);
}


