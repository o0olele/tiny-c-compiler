/******************************************** 语义动作 *******************************************/

//符号表
var SymbolTable = {
  local_symbol_tables: [],
  global_symbol_table: [],
  func_table: []
}

/**
 * @func 根据函数名获取局部变量表
 * @param {any} name
 */
function GetFunLocalTable(name) {
  for (var i in SymbolTable.local_symbol_tables)
    if (SymbolTable.local_symbol_tables[i].name == name) {
      return SymbolTable.local_symbol_tables[i];
    }
}

/**
 * @func 根据函数名获取函数表
 * @param {any} name
 */
function GetFuncTable(name) {
  for (var i in SymbolTable.func_table) {
    if (SymbolTable.func_table[i].name == name)
      return SymbolTable.func_table[i];
  }
}

/**
 * 
 * @param {函数名} name 
 * @func 根据函数名从局部变量表中获取参数数量
 */
function GetFunParamNum(name) {
  var n = 0;
  for (var i in SymbolTable.local_symbol_tables) {
    if (SymbolTable.local_symbol_tables[i].name == name) {
      for (var j in SymbolTable.local_symbol_tables[i].local_var) {
        if (SymbolTable.local_symbol_tables[i].local_var[j].is_param)
          n++;
      }
      break;
    }
  }

  return n;
}


var global_block_id = 0;
var global_var_id = 0;

/********************************************/
//Node 对象
function Node(data, type, parent) {
  this.data = data;//
  this.str = type;//节点的类型
  this.children = [];//子节点
  this.parent = parent;//父节点

  this.code = [];//三地址代码
  this.aimcode = [];//目标代码
  this.names = [];
  this.lexical = "";//词法分析
  this.type = "";
  this.id = "";
  this.fun = "";
  this.op = "";
  this.name = "";
  this.reg = "";
  this.bool = false;
  this.add = false;
  this.mul = false;
  this.call = false;
  this.inner = false;//是否为内部块
  this.length = 0;

  this.production_id = 0;//产生式ID
  this.child_id = 0;
}

//
function get_pre_brother(index, node) {
  if (node.parent)
    return node.parent.children[node.child_id - index];
}

//全局变量对象
function GlobalVar(name, type, width) {
  this.name = name;
  this.type = type;
  this.width = width;
}

//局部变量对象
function LocalVar(name, type, width, is_param) {
  this.name = name;
  this.type = type;
  this.width = width;
  this.is_param = is_param;
}

//局部变量表对象
function LocalVarTable(name) {
  this.name = name;
  this.local_var = [];
}

//函数对象
function FunObj(name, return_type, local_var_table) {
  this.name = name;
  this.return_type = return_type;
  this.local_var_table = local_var_table;

  this.params = [];
}

/********************************************/
function get_temp_block_name() {
  global_block_id++;
  return "__b" + global_block_id;
}

function get_temp_var_name() {
  global_var_id++;
  return "_v" + global_var_id;
}

/********************************************/
