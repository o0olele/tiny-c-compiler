//寄存器
var Register = new Array(32);
/*  reg_zero:"",    //0
    reg_one:"",     //1
    reg_value:[],   //2-3 返回值或表达式的值
    reg_argu:[],    //4-7 函数参数
    reg_temp:[],    //8-15 临时变量
    reg_static:[],  //16-23 静态值
    reg_ttemp:[],   //24-25 临时变量
    reg_break:[],   //26-27 中断返回值
    reg_gp:"",      //28 Global Point
    reg_sp:"",      //29 Stack Point
    reg_fp:"",      //30
    reg_ra:"",      //31 Return Address
*/
var failed_name = "";

/**
 * @func 翻译表达式
 * @param {any} code 目标代码栈
 * @param {any} op 操作码
 * @param {any} reg1 值
 * @param {any} reg2 操作数
 * @param {any} reg3 操作数
 */
function TransformOp(code, op, reg1, reg2, reg3) {
    if ((reg2 == '$2' && reg3 == '$3') || (reg2 == '$3' && reg3 == '$2')) {
        Register[3] = failed_name;
        failed_name = "";
        reg1 = '$3';
    }
    if (op == '+') {
        code.push('add ' + reg1 + ', ' + reg2 + ', ' + reg3);
    } else if (op == '-') {
        code.push('sub ' + reg1 + ', ' + reg2 + ', ' + reg3);
    } else if (op == '*') {
        code.push('mult ' + reg2 + ', ' + reg3);
        code.push('mflo ' + reg1);
    } else if (op == '/') {
        code.push('div ' + reg2 + ', ' + reg3);
        code.push('mflo ' + reg1);
    } else if (op == '>=') {
        var tname = get_temp_block_name();
        code.push('addi ' + reg1 + ', $0, 1');
        code.push('bge ' + reg2 + ', ' + reg3 + ', ' + tname);
        code.push('move ' + reg1 + ', $0');
        code.push(tname + ':');
    } else if (op == '>') {
        var tname = get_temp_block_name();
        code.push('addi ' + reg1 + ', $0, 1');
        code.push('bgt ' + reg2 + ', ' + reg3 + ', ' + tname);
        code.push('move ' + reg1 + ', $0');
        code.push(tname + ':');
    } else if (op == '<=') {
        var tname = get_temp_block_name();
        code.push('addi ' + reg1 + ', $0, 1');
        code.push('ble ' + reg2 + ', ' + reg3 + ', ' + tname);
        code.push('move ' + reg1 + ', $0');
        code.push(tname + ':');
    } else if (op == '<') {
        var tname = get_temp_block_name();
        code.push('addi ' + reg1 + ', $0, 1');
        code.push('blt ' + reg2 + ', ' + reg3 + ', ' + tname);
        code.push('move ' + reg1 + ', $0');
        code.push(tname + ':');
    } else if (op == '==') {
        var tname = get_temp_block_name();
        code.push('addi ' + reg1 + ', $0, 1');
        code.push('beq ' + reg2 + ', ' + reg3 + ', ' + tname);
        code.push('move ' + reg1 + ', $0');
        code.push(tname + ':');
    } else if (op == '!=') {
        var tname = get_temp_block_name();
        code.push('addi ' + reg1 + ', $0, 1');
        code.push('bne ' + reg2 + ', ' + reg3 + ', ' + tname);
        code.push('move ' + reg1 + ', $0');
        code.push(tname + ':');
    }

    //释放寄存器
    if ((reg2 == '$2' && reg3 == '$3') || (reg2 == '$3' && reg3 == '$2')) {
        Register[2] = '';
    } else if (reg2 && reg3) {
        if (reg2[1] == '2' || reg2[1] == '3')
            Register[parseInt(reg2[1])] = '';

        if (reg3[1] == '2' || reg3[1] == '3')
            Register[parseInt(reg3[1])] = '';
    }

}

function IsDigit (key) {
    if (key >= '0' && key <= '9')
      return true;
    else
      return false;
  }

/**
 * @func 获取寄存器
 * @param {any} type 获取类型，temp表示从2/3号寄存器申请， existed表示获取寄存器位置
 * @param {any} fun 函数名
 * @param {any} name 名
 */
function GetRegister(type, fun, name) {

    if (type == 'temp') {
        if (!Register[2]) {
            Register[2] = name;
            return '$2';
        }
        else if (!Register[3]) {
            Register[3] = name;
            return '$3';
        }
        failed_name = name;
    } else {
        var ftable = GetFuncTable(fun);
        var ltable = GetFunLocalTable(fun);

        var in_reg_pos = Register.indexOf(name);
        var in_params_pos = -1;
        var in_locals_pos = -1;

        if (ftable.params)
            in_params_pos = ftable.params.indexOf(name);

        for (var i in ltable.local_var) {
            if (ltable.local_var[i].name == name) {
                in_locals_pos = i;
                break;
            }
        }

        if (in_reg_pos >= 0) {
            return '$' + in_reg_pos;
        } else if (IsDigit(name)) {
            return name;
        } else if (in_params_pos >= 0) {
            return "$" + parseInt(ftable.params.length - in_params_pos + 4 - 1);
        } else if (in_locals_pos >= 0) {
            return "$" + parseInt(ltable.local_var.length - in_locals_pos + 8 - 1);
        }
    }
}

/**
 * @func 清空2/3号寄存器
 * @param {any} reg
 */
function CleanValueRegister(reg) {
    if (reg == '$2' || reg == '$3') {
        Register[parseInt(reg[1])] = '';
    }
}

/**
 * @func 清空局部变量寄存器
 */
function CleanLocalRegister() {
    for (i = 4; i < 32; i++)
        Register[i] = '';
}