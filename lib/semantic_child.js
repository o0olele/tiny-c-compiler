/**
 * @func 执行孩子节点语义动作
 * @param {any} _id 产生式ID
 * @param {any} _child_id 产生式右侧作为孩子，从左至右编号
 * @param {any} _node 目标节点
 */
function semantic_child(_id, _child_id, _node) {

    //"State int ID State_type"
    if (_id == 4 && _child_id == 2) {
      _node.type = "int"
      _node.id = get_pre_brother(1, _node).lexical;
    }
    //"State void ID State_type"
    else if (_id == 5 && _child_id == 2) {
      _node.type = "void"
      _node.id = get_pre_brother(1, _node).lexical;

    }
    //"State_type Var_state"
    else if (_id == 6 && _child_id == 0) {
      _node.type = _node.parent.type;
      _node.id = _node.parent.id;
    }
    //"State_type Fun_state",//7
    else if (_id == 7 && _child_id == 0) {
      _node.type = _node.parent.type;
      _node.fun = _node.parent.id;
    }
    //"Var_state ;"
    else if (_id == 8) {

    }
    //"Fun_state ( Form_par ) Block"
    else if (_id == 9 && _child_id == 1) {
      _node.type = _node.parent.type;
      _node.fun = _node.parent.fun;
    }
    else if (_id == 9 && _child_id == 3) {
      _node.fun = _node.parent.fun;
    }
    //"Form_par Par_list"
    else if (_id == 10 && _child_id == 0) {
      _node.fun = _node.parent.fun;
    }
    //"Form_par void"
    else if (_id == 11) {

    }
    //"Par_list Par B"
    else if (_id == 12 && _child_id == 0) {
      _node.fun = _node.parent.fun;
    }
    else if (_id == 12 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    //"B , Par B"
    else if (_id == 13 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    else if (_id == 13 && _child_id == 2) {
      _node.fun = _node.parent.fun;
    }
    //"B @"
    else if (_id == 14) {

    }
    //"Par int ID"
    else if (_id == 15) {

    }
    //"Block { Iner_state Sent_str }"
    else if (_id == 16 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    else if (_id == 16 && _child_id == 2) {
      _node.fun = _node.parent.fun;
    }
    //"Iner_state @"
    else if (_id == 17) {

    }
    //"Iner_state Iner_par_state Iner_state"
    else if (_id == 18 && _child_id == 0) {
      _node.fun = _node.parent.fun;
    }
    else if (_id == 18 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    //"Iner_par_state int ID ;"
    else if (_id == 19) {

    }
    //"Sent_str Sent C"
    else if (_id == 20) {
      _node.fun = _node.parent.fun;
    }
    //"C @"
    else if (_id == 21) {

    }
    //"C Sent_str"
    else if (_id == 22) {
      _node.fun = _node.parent.fun;
    }
    //"Sent Sent_if"
    else if (_id == 23) {
      _node.fun = _node.parent.fun;
    }
    //"Sent Sent_while"
    else if (_id == 24) {
      _node.fun = _node.parent.fun;
    }
    //"Sent Sent_return"
    else if (_id == 25) {
      _node.fun = _node.parent.fun;
    }
    //"Sent Sent_eval",
    else if (_id == 26) {
      _node.fun = _node.parent.fun;
    }
    //"Sent_eval ID = Exp ;"
    else if (_id == 27 && _child_id == 2) {
      _node.fun = _node.parent.fun;
      _node.id = get_pre_brother(2, _node).lexical;

      //*NOTICE HERE
      _node.parent.id = _node.id;
    }
    //"Sent_return return D"
    else if (_id == 28 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    //"D Exp ;"
    else if (_id == 29 && _child_id == 0) {
      _node.fun = _node.parent.fun;
    }
    //"D ;"
    else if (_id == 30) {

    }
    //"Sent_while while ( Exp ) Block"
    else if (_id == 31 && _child_id == 2) {
      _node.fun = _node.parent.fun;
    }
    else if (_id == 31 && _child_id == 4) {
      _node.fun = _node.parent.fun;
      _node.inner = true;
    }
    //"Sent_if if ( Exp ) Block E"
    else if (_id == 32 && _child_id == 2) {
      _node.fun = _node.parent.fun;
      
    }
    else if (_id == 32 && _child_id == 4) {
      _node.fun = _node.parent.fun;
      _node.inner = true;
    }
    else if (_id == 32 && _child_id == 5) {
      _node.fun = _node.parent.fun;
    }
    //"E else Block"
    else if (_id == 33 && _child_id == 1) {
      _node.fun = _node.parent.fun;
      _node.inner = true;
    }
    //"E @"
    else if (_id == 34) {

    }
    //"Exp Exp_add F"
    else if (_id == 35) {
      _node.fun = _node.parent.fun;
    }
    //"F relop Exp_add F"
    else if (_id == 36 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    else if (_id == 36 && _child_id == 2) {
      _node.fun = _node.parent.fun;
    }
    //"F @"
    else if (_id == 37) {

    }
    //"Exp_add Nape G"
    else if (_id == 38) {
      _node.fun = _node.parent.fun;
    }
    //"G - Nape G"
    else if (_id == 39 && _child_id > 0) {
      _node.fun = _node.parent.fun;
    }
    //"G + Nape G"
    else if (_id == 40 && _child_id > 0) {
      _node.fun = _node.parent.fun;
    }
    //"G @"
    else if (_id == 41) {

    }
    //"Nape Div H"
    else if (_id == 42) {
      _node.fun = _node.parent.fun;
    }
    //"H * Div H"
    else if (_id == 43 && _child_id > 0) {
      _node.fun = _node.parent.fun;
    }
    //"H / Div H"
    else if (_id == 44 && _child_id > 0) {
      _node.fun = _node.parent.fun;
    }
    //"H @"
    else if (_id == 45) {

    }
    //"Div num"
    else if (_id == 46) {

    }
    //"Div ( Exp )"
    else if (_id == 47 && _child_id == 1) {
      _node.fun = _node.parent.fun;
    }
    //"Div ID Ftype"
    else if (_id == 48 && _child_id == 1) {
      _node.fun = _node.parent.fun;
      _node.id = get_pre_brother(1, _node).lexical;
    }
    //"Ftype Call"
    else if (_id == 49) {
      _node.fun = _node.parent.fun;
    }
    //"Ftype @"
    else if (_id == 50) {

    }
    //"Call ( Act )"
    else if (_id == 51 && _child_id == 1) {
      _node.id = _node.parent.id;
      _node.fun = _node.parent.fun;
    }
    //"Act Act_list"
    else if (_id == 52 && _child_id == 0) {
      _node.fun = _node.parent.fun;
    }
    //"Act @"
    else if (_id == 53) {

    }
    //"Act_list Exp I"
    else if (_id == 54) {
      _node.fun = _node.parent.fun;
    }
    //"I , Exp I"
    else if (_id == 55 && _child_id > 0) {
      _node.fun = _node.parent.fun;
    }
    //"I @"
  }

  