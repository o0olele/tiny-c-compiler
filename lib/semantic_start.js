/**
 * @func start语义动作
 * @param {any} _id 产生式ID
 * @param {any} _node 目标节点
 */
function semantic_start(_id, _node) {

    //"Pro State_str"
    if (_id == 0) {
      //初始化符号表
    }
    //"State_str State A"
    else if (_id == 1) {

    }
    //"A State_str"
    else if (_id == 2) {

    }
    //"A @"
    else if (_id == 3) {

    }
    //"State int ID State_type"
    else if (_id == 4) {
      //_node.type = "int";
    }
    //"State void ID State_type"
    else if (_id == 5) {
      //_node.type = "void";
    }
    //"State_type Var_state"
    else if (_id == 6) {
      //错误处理，查找符号表
    }
    //"State_type Fun_state"
    else if (_id == 7) {
      //错误处理，查找符号
    }
    //"Var_state ;"
    else if (_id == 8) {

    }
    //"Fun_state ( Form_par ) Block"
    else if (_id == 9) {
      SymbolTable.local_symbol_tables.push(new LocalVarTable(_node.fun));
      SymbolTable.func_table.push(new FunObj(_node.fun, _node.type, GetFunLocalTable(_node.fun)));
    }
    //"Form_par Par_list"
    else if (_id == 10) {
      
    }
    //"Form_par void"
    else if (_id == 11) {

    }
    //"Par_list Par B"
    else if (_id == 12) {

    }
    //"B , Par B"
    else if (_id == 13) {

    }
    //"B @"
    else if (_id == 14) {

    }
    //"Par int ID"
    else if (_id == 15) {
      _node.type = "int";
    }
    //"Block { Iner_state Sent_str }",//16
    else if (_id == 16) {

    }

  }
