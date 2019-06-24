/**
 * @func 执行end语义动作
 * @param {any} _id 产生式ID
 * @param {any} _node 目标节点
 */
function semantic_end(_id, _node) {

  var reg1 = "", reg2 = "", reg3 = "";
  //"Pro State_str"
  if (_id == 0) {
    _node.code = _node.code.concat(_node.children[0].code);

    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"State_str State A"
  else if (_id == 1) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.code = _node.code.concat(_node.children[1].code);

    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
  }
  //"A State_str"
  else if (_id == 2) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"A @"
  else if (_id == 3) {
    _node.code = [];

    _node.aimcode = [];
  }
  //"State int ID State_type"
  else if (_id == 4) {
    _node.code = _node.code.concat(_node.children[2].code);

    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
  }
  //"State void ID State_type"
  else if (_id == 5) {
    _node.code = _node.code.concat(_node.children[2].code);

    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
  }
  //"State_type Var_state"
  else if (_id == 6) {
    //填入符号表-全局变量表
    if (_node.children[0].type == 'int') {
      SymbolTable.global_symbol_table.push(new GlobalVar(_node.id, 'int', 4));
    }
  }
  //"State_type Fun_state“
  else if (_id == 7) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Var_state ;"
  else if (_id == 8) {
    _node.type = "int";//节点类型-> 变量
  }
  //"Fun_state ( Form_par ) Block"
  else if (_id == 9) {
    _node.code = _node.code.concat(_node.children[3].code);
    _node.aimcode = _node.aimcode.concat(_node.children[3].aimcode);
  }
  //"Form_par Par_list"
  else if (_id == 10) {

  }
  //"Form_par void"
  else if (_id == 11) {

  }
  //"Par_list Par B"
  else if (_id == 12) {
    if (_node.children[0].type == 'int') {
      var table = GetFunLocalTable(_node.fun);
      table.local_var.push(new LocalVar(_node.children[0].name, _node.children[0].type, 4, true));

      var ftable = GetFuncTable(_node.fun);
      ftable.params.push(_node.children[0].name);
    }
  }
  //"B , Par B"
  else if (_id == 13) {
    if (_node.children[1].type == 'int') {
      var table = GetFunLocalTable(_node.fun);
      table.local_var.push(new LocalVar(_node.children[1].name, _node.children[1].type, 4, true));

      var ftable = GetFuncTable(_node.fun);
      ftable.params.push(_node.children[1].name);
    }
  }
  //"B @"
  else if (_id == 14) {

  }
  //"Par int ID"
  else if (_id == 15) {
    _node.name = _node.children[1].lexical;
    _node.type = "int";

  }
  //"Block { Iner_state Sent_str }"
  else if (_id == 16) {
    if (!_node.inner) {
      _node.code.push(_node.fun + " :");
      _node.aimcode.push(_node.fun + " :");//在call 调用时将参数存入$4-$7
    }

    _node.code = _node.code.concat(_node.children[2].code);
    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
  }
  //"Iner_state @"
  else if (_id == 17) {

  }
  //"Iner_state Iner_par_state Iner_state"
  else if (_id == 18) {
    if (_node.children[0].type == 'int') {
      var table = GetFunLocalTable(_node.fun);
      table.local_var.push(new LocalVar(_node.children[0].name, _node.children[0].type, 4, false));
    }
  }
  //"Iner_par_state int ID ;"
  else if (_id == 19) {
    _node.name = _node.children[1].lexical;
    _node.type = "int";
  }
  //"Sent_str Sent C"
  else if (_id == 20) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.code = _node.code.concat(_node.children[1].code);

    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
  }
  //"C @"
  else if (_id == 21) {
    _node.code = [];
    _node.aimcode = [];
  }
  //"C Sent_str"
  else if (_id == 22) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Sent Sent_if"
  else if (_id == 23) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Sent Sent_while"
  else if (_id == 24) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Sent Sent_return"
  else if (_id == 25) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Sent Sent_eval"
  else if (_id == 26) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Sent_eval ID = Exp ;"
  else if (_id == 27) {
    //if (_node.children[0].type == "int") {
    _node.code = _node.code.concat(_node.children[2].code);
    _node.code.push(_node.id + ' := ' + _node.children[2].name);

    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
    reg1 = GetRegister('existed', _node.fun, _node.id);
    reg2 = GetRegister('existed', _node.fun, _node.children[2].name);

    _node.aimcode.push("move " + reg1 + ", " + reg2);

    _node.aimcode.push()
    CleanValueRegister(reg1); CleanValueRegister(reg2);

    //}
  }
  //"Sent_return return D",
  else if (_id == 28) {
    _node.code = _node.code.concat(_node.children[1].code);
    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
  }
  //"D Exp ;",
  else if (_id == 29) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.code.push("return " + _node.children[0].name);

    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);

    reg1 = GetRegister('existed', _node.fun, _node.children[0].name);
    _node.aimcode.push("move $28, " + reg1);
    if(_node.fun != 'main')
    _node.aimcode.push("jr $31");
    CleanValueRegister('$3');
    CleanValueRegister('$2');
    CleanLocalRegister();
    //Register[28] = _node.fun;//记录返回值的位置

  }
  //"D ;",
  else if (_id == 30) {
    _node.code.push("return ")
  }
  //"Sent_while while ( Exp ) Block"
  else if (_id == 31) {
    var judge_block = get_temp_block_name();
    var iteration_block = get_temp_block_name();
    var next_block = get_temp_block_name();

    _node.code.push(judge_block + ':');
    _node.code = _node.code.concat(_node.children[2].code);

    _node.code.push('if ' + _node.children[2].name + ' goto ' + iteration_block);
    _node.code.push('goto ' + next_block);
    _node.code.push(iteration_block + ':');

    _node.code = _node.code.concat(_node.children[4].code);

    _node.code.push('goto ' + judge_block);
    _node.code.push(next_block + ':');

    //
    _node.aimcode.push(judge_block + ':');
    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);

    /*if (Register.indexOf(_node.children[2].name))
      reg1 = '$' + Register.indexOf(_node.children[2].name);*/
    _node.aimcode.push('bne $0, ' + _node.children[2].reg + ', ' + iteration_block);
    _node.aimcode.push('j ' + next_block);
    _node.aimcode.push(iteration_block + ':');

    _node.aimcode = _node.aimcode.concat(_node.children[4].aimcode);

    _node.aimcode.push('j ' + judge_block);
    _node.aimcode.push(next_block + ':');

  }
  //"Sent_if if ( Exp ) Block E"
  else if (_id == 32) {
    _node.code = _node.code.concat(_node.children[2].code);

    var if_block = get_temp_block_name();
    var else_block = get_temp_block_name();
    var next_block = get_temp_block_name();

    _node.code.push('if ' + _node.children[2].name + ' goto ' + if_block);
    _node.code.push(else_block + ':');

    _node.code = _node.code.concat(_node.children[5].code);

    _node.code.push('goto ' + next_block);
    _node.code.push(if_block + ':');

    _node.code = _node.code.concat(_node.children[4].code);

    _node.code.push('goto ' + next_block);
    _node.code.push(next_block + ':');

    //
    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
    /*if (Register.indexOf(_node.children[2].name))
      reg1 = '$' + Register.indexOf(_node.children[2].name);*/
    _node.aimcode.push('bne $0, ' + _node.children[2].reg + ', ' + if_block);
    _node.aimcode.push(else_block + ':');

    _node.aimcode = _node.aimcode.concat(_node.children[5].aimcode);

    _node.aimcode.push('j ' + next_block);
    _node.aimcode.push(if_block + ':');

    _node.aimcode = _node.aimcode.concat(_node.children[4].aimcode);

    _node.aimcode.push('j ' + next_block);
    _node.aimcode.push(next_block + ':');

  }
  //"E else Block",
  else if (_id == 33) {
    _node.code = _node.code.concat(_node.children[1].code);

    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
  }
  //"E @"
  else if (_id == 34) {
    _node.code = [];

    _node.aimcode = [];
  }
  //"Exp Exp_add F"
  else if (_id == 35) {
    _node.bool = _node.children[1].bool
    if (_node.children[1].bool) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[0].code);
      _node.code = _node.code.concat(_node.children[1].code);

      _node.code.push(_node.name + ' := ' + _node.children[0].name + ' '
        + _node.children[1].op + ' ' + _node.children[1].name);

      _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[0].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[1].name);
      TransformOp(_node.aimcode, _node.children[1].op, reg1, reg2, reg3);
      _node.reg = reg1;
      CleanValueRegister(reg1);


    }
    else {
      _node.name = _node.children[0].name;
      _node.code = _node.code.concat(_node.children[0].code);

      _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
    }

  }
  //"F relop Exp_add F",
  else if (_id == 36) {
    _node.bool = true;
    _node.op = _node.children[0].op
    _node.name = _node.children[1].name

    _node.code = _node.code.concat(_node.children[1].code);
    _node.code = _node.code.concat(_node.children[2].code);

    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
  }
  //"F @"
  else if (_id == 37) {
    _node.bool = false;
    _node.code = [];

    _node.aimcode = [];
  }
  //"Exp_add Nape G",
  else if (_id == 38) {
    if (_node.children[1].add) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[0].code);
      _node.code = _node.code.concat(_node.children[1].code);

      _node.code.push(_node.name + ' := ' + _node.children[0].name + ' ' + _node.children[1].op
        + ' ' + _node.children[1].name);

      _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);

      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[0].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[1].name);
      TransformOp(_node.aimcode, _node.children[1].op, reg1, reg2, reg3);

    }
    else {
      _node.name = _node.children[0].name;
      _node.code = _node.code.concat(_node.children[0].code);

      _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
    }

  }
  //"G - Nape G",
  else if (_id == 39) {
    _node.add = true;
    _node.op = "-";
    if (_node.children[2].add) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[1].code);
      _node.code = _node.code.concat(_node.children[2].code);

      _node.code.push(_node.name + ' := ' + _node.children[1].name + ' ' + _node.children[2].op
        + ' ' + _node.children[2].name);

      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[1].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[2].name);
      TransformOp(_node.aimcode, _node.children[2].op, reg1, reg2, reg3);

    }
    else {
      _node.name = _node.children[1].name;
      _node.code = _node.code.concat(_node.children[1].code);

      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    }

  }
  //"G + Nape G"
  else if (_id == 40) {
    _node.add = true;
    _node.op = "+";
    if (_node.children[2].add) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[1].code);
      _node.code = _node.code.concat(_node.children[2].code);

      _node.code.push(_node.name + ' := ' + _node.children[1].name + ' ' + _node.children[2].op
        + ' ' + _node.children[2].name);

      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);

      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[1].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[2].name);
      TransformOp(_node.aimcode, _node.children[2].op, reg1, reg2, reg3);
    }
    else {
      _node.name = _node.children[1].name;
      _node.code = _node.code.concat(_node.children[1].code);
      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    }
  }
  //"G @",
  else if (_id == 41) {
    _node.add = false;
    _node.code = [];
    _node.aimcode = [];
  }
  //"Nape Div H"
  else if (_id == 42) {
    if (_node.children[1].mul) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[0].code);
      _node.code = _node.code.concat(_node.children[1].code);

      _node.code.push(_node.name + ' := ' + _node.children[0].name + ' ' + _node.children[1].op
        + ' ' + _node.children[1].name);

      _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[0].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[1].name);

      TransformOp(_node.aimcode, _node.children[1].op, reg1, reg2, reg3);
    } else {
      _node.name = _node.children[0].name;

      _node.code = _node.code.concat(_node.children[0].code);
      _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
    }

  }
  //"H * Div H"
  else if (_id == 43) {
    _node.mul = true;
    _node.op = "*";
    if (_node.children[2].mul) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[1].code);
      _node.code = _node.code.concat(_node.children[2].code);

      _node.code.push(_node.name + ' := ' + _node.children[1].name + ' ' + _node.children[2].op
        + ' ' + _node.children[2].name);

      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[1].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[2].name);

      TransformOp(_node.aimcode, _node.children[2].op, reg1, reg2, reg3);
    }
    else {
      _node.name = _node.children[1].name;

      _node.code = _node.code.concat(_node.children[1].code);
      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    }
  }
  //"H / Div H"
  else if (_id == 44) {
    _node.mul = true;
    _node.op = "/";
    if (_node.children[2].mul) {
      _node.name = get_temp_var_name();

      _node.code = _node.code.concat(_node.children[1].code);
      _node.code = _node.code.concat(_node.children[2].code);

      _node.code.push(_node.name + ' := ' + _node.children[1].name + ' ' + _node.children[2].op
        + ' ' + _node.children[2].name);

      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
      _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
      reg1 = GetRegister('temp', null, _node.name);
      reg2 = GetRegister('existed', _node.fun, _node.children[1].name);
      reg3 = GetRegister('existed', _node.fun, _node.children[2].name);

      TransformOp(_node.aimcode, _node.children[2].op, reg1, reg2, reg3);
    }
    else {
      _node.name = _node.children[1].name;
      _node.code = _node.code.concat(_node.children[1].code);

      _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    }
  }
  //"H @"
  else if (_id == 45) {
    _node.mul = false;
    _node.code = [];

    _node.aimcode = [];
  }
  //"Div num"
  else if (_id == 46) {
    _node.name = get_temp_var_name();
    _node.code.push(_node.name + ' := ' + _node.children[0].lexical);

    reg1 = GetRegister('temp', null, _node.name);
    _node.aimcode.push("addi " + reg1 + ", $0, " + _node.children[0].lexical);
  }
  //"Div ( Exp )"
  else if (_id == 47) {
    _node.name = _node.children[1].name;
    _node.code = _node.code.concat(_node.children[1].code);

    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
  }
  //"Div ID Ftype"
  else if (_id == 48) {
    _node.code = _node.code.concat(_node.children[1].code);
    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    if (_node.children[1].call) {
      _node.code.push("call " + _node.children[0].lexical + ", " + GetFunParamNum(_node.children[0].lexical));
      _node.aimcode.push('jal ' + _node.children[0].lexical);
      Register[28] = _node.children[0].lexical;

    }
    _node.name = _node.children[0].lexical;
  }
  //"Ftype Call"
  else if (_id == 49) {
    _node.call = true;
    _node.code = _node.code.concat(_node.children[0].code);
    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Ftype @"
  else if (_id == 50) {
    _node.call = false;
    _node.code = [];

    _node.aimcode = [];
  }
  //"Call ( Act )"
  else if (_id == 51) {
    _node.code = _node.code.concat(_node.children[1].code);
    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
  }
  //"Act Act_list"
  else if (_id == 52) {
    _node.code = _node.code.concat(_node.children[0].code);
    _node.num = _node.children[0].num;

    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
  }
  //"Act @"
  else if (_id == 53) {
    _node.code = [];
    _node.num = 0;

    _node.aimcode = [];
  }
  //"Act_list Exp I"
  else if (_id == 54) {
    _node.num = 1 + _node.children[1].num;

    _node.code = _node.code.concat(_node.children[0].code);
    _node.code = _node.code.concat(_node.children[1].code);

    _node.aimcode = _node.aimcode.concat(_node.children[0].aimcode);
    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);

    _node.code.push('param ' + _node.children[0].name);
    _node.aimcode.push('move $4, ' + GetRegister('existed', _node.fun, _node.children[0].name));

    for (i = 0; i < _node.children[1].names.length; i++) {
      _node.code.push('param ' + _node.children[1].names[i]);
      _node.aimcode.push('move $' + parseInt(4 + i + 1) + ', ' + GetRegister('existed', _node.fun, _node.children[1].names[i]))
    }
    //参数传递
  }
  //"I , Exp I"
  else if (_id == 55) {
    _node.num = 1 + _node.children[2].num;

    _node.code = _node.code.concat(_node.children[1].code);
    _node.code = _node.code.concat(_node.children[2].code);

    _node.names.push(_node.children[1].name);
    _node.names = _node.names.concat(_node.children[2].names);

    _node.aimcode = _node.aimcode.concat(_node.children[1].aimcode);
    _node.aimcode = _node.aimcode.concat(_node.children[2].aimcode);
  }
  //"I @"
  else if (_id == 56) {
    _node.num = 0;
    _node.names = [];
    _node.code = [];

    _node.aimcode = [];
  }
}

