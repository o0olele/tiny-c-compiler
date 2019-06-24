//0 开始
const KEY_WORD = ["int", "void", "if", "else", "while", "return"];
//30开始
const SYMBOL = ["+", "-", "*", "/", "=", "==", ">", ">=", "<", "<=", "!", "!=", ";", ",", "(", ")", "{", "}", "[", "]", "#"];
const TERMINAL = ["int", "void", "if", "else", "while", "return", "ID", "num", "+", "-", "*", "/", "=", "relop", ";", ",", "(", ")", "{", "}", "#"];

/**
 * 词法分析器
 * 对象
 */
function lexer() {

  this.terminal_array = new Array();//存放源代码中的终结符集
  this.id_array = new Array();//存放源代码中的ID集合

  this.code = "";//删除源代码中的注释
  this.token = "";
  this.p = 0;//code指针
  this.sync = -1;//TERMINAL指针，例如0指int,30指+

  this.aim = "";//词法分析结果

  /***
 * 功能：删除代码中的注释，无用制表符
 * src：源代码
 * return：处理后的代码
 * */
  this.del_note = function (src) {
    var count_note = 0;// "/*" 计数

    var lines = src.split("\n");

    for (i = 0; i < lines.length; i++) {

      //消去前导空格
      tmp = lines[i].replace(/(^\s*)|(\s*$)/g, "");

      for (j = 0; j < tmp.length; j++) {

        if (tmp[j] == '/' && tmp[j + 1] == '*' && count_note == 0) {
          count_note = 1;
          j++;
          continue;
        }

        if (tmp[j] == '*' && tmp[j + 1] == '/' && count_note == 1) {
          count_note = 0;
          j++;
          continue;
        }

        if (count_note == 1)
          continue;

        if (tmp[j] == '/' && tmp[j + 1] == '/') {
          break;
        }

        if (tmp[j] == ' ') {
          for (j = j + 1; j < tmp.length; j++)
            if (tmp[j] != ' ') {
              j--;
              break;
            }
        }

        this.code += tmp[j];
      }
      this.code += "\n";
    }
  }


  /**
   * 功能：查找关键字的位置
   * @param {any} key 关键字
   */
  this.SearchKeyWord = function (key) {
    for (i = 0; i < KEY_WORD.length; i++)
      if (KEY_WORD[i] == key)
        return i + 1;

    return -1;
  }

  /**
   * 功能：判断字符是否为字母
   * @param {any} key
   */
  this.IsLetter = function (key) {
    if (key >= 'a' && key <= 'z' || key >= 'A' && key <= 'Z')
      return true;
    else
      return false;
  }

  /**
   * 功能：判断字符是否为数字
   * @param {any} key
   */
  this.IsDigit = function (key) {
    if (key >= '0' && key <= '9')
      return true;
    else
      return false;
  }


  /**
  * 功能：扫描器
  * @param {any} code 删除注释后的代码
  * @token {any} token 
  */
  this.Scanner = function () {
    var ch = this.code[this.p];

    if (ch == '\n') {
      this.token = " ";
      this.p++;
      return;
    } else if (ch == '\t') {
      this.token = " ";
      this.p++;
      return;
    }

    if (ch == ' ') {
      this.p++;
      ch = this.code[this.p];
    }

    //ID
    if (this.IsLetter(this.code[this.p])) {
      this.token += this.code[this.p];
      this.p++;
      while (this.IsLetter(this.code[this.p]) || this.IsDigit(this.code[this.p])) {
        this.token += this.code[this.p];
        this.p++;
      }

      this.sync = this.SearchKeyWord(this.token);
      if (this.sync == -1)
        this.sync = 100;

      return;
    }
    //num
    else if (this.IsDigit(this.code[this.p])) {
      while (this.IsDigit(this.code[this.p])) {
        this.token += this.code[this.p];
        this.p++;
      }
      this.sync = 99;
    }
    //"+","-","*","/","=","==",">",">=","<","<=","!=",";",",","(",")","{","}","#"
    //31   32  33  34  35   36
    else if (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == ';' || ch == ',' || ch == '(' || ch == ')' || ch == '{' || ch == '}' || ch == '#') {
      this.token += this.code[this.p];
      for (i = 0; i < SYMBOL.length; i++)
        if (SYMBOL[i] == ch) {
          this.sync = 31 + i;
          break;
        }
      this.p++;
      return;
    }
    else if (this.code[this.p] == '=') {
      this.token += this.code[this.p];
      this.p++;
      if (this.code[this.p] == '=') {
        this.token += this.code[this.p];
        this.sync = 36;
      }
      else {
        this.p--;
        this.sync = 35;
      }
      this.p++;
      return;
    }
    else if (this.code[this.p] == '>') {
      this.token += this.code[this.p];
      this.p++;

      if (this.code[this.p] == '=') {
        this.sync = 38;
        this.token += this.code[this.p];
      }
      else {
        this.p--;
        this.sync = 37;
      }
      this.p++;
      return;
    }
    else if (this.code[this.p] == '<') {
      this.token += this.code[this.p];
      this.p++;
      if (this.code[this.p] == '=') {
        this.sync = 40;
        this.token += this.code[this.p];
      }
      else {
        this.p--;
        this.sync = 39;
      }
      this.p++;
      return;
    }
    else if (this.code[this.p] == '!') {
      this.token += this.code[this.p];
      this.p++;
      if (this.code[this.p] == '=') {
        this.sync = 42;
        this.token += this.code[this.p];
      }
      else {
        this.p--;
        this.sync = 41
      }
      this.p++;
      return;
    }
    else {
      this.sync = -1;
      return -1;
    }
  }

  /**
  * 功能：词法分析器
  */
  this.Analyser = function () {

    while (this.sync != 0) {

      this.token = "";
      if (this.p >= this.code.length)
        break;

      this.Scanner();

      if (this.token != " " && this.sync < 0 && this.p < this.code.length) {
        this.aim = "Erros！";
        break;
      }

      if (this.token == " ") {
        continue;
      }

      if (this.sync == 100) {
        this.aim += "< id  , " + this.token + " >\n";
        this.terminal_array.push(new Node(this.token, "ID", null));
        this.id_array.push(this.token);
      }
      else if (this.sync == 99) {
        this.aim += "< num  , " + this.token + " >\n";
        this.terminal_array.push(new Node(this.token, "num", null));
      }
      else if (this.sync > 0 && this.sync < 31) {
        this.aim += "< " + this.token + " , -- >\n";
        this.terminal_array.push(new Node(this.token, this.token, null));
      }
      else if (this.sync > 30 && this.sync < 81) {
        this.aim += "< " + this.token + " , -- >\n";
        this.terminal_array.push(new Node(this.token, this.token, null));
      }

    }

  }

}

var model_lexer;

/************
 * 以下为界面相关的函数
 ************/

function Clear() {
  $("#sourcecode").html("");
}

function ShowCode() {

  var SourceCode = $("#sourcecode").val();
  $("#Code").html("<pre class=\"line-numbers\"><code id=\"SC\" class=\"language-clike\">" + SourceCode + "</code></pre>");

  Prism.highlightAll();

  if (SourceCode != "") {
    $("#btn_delnote").removeAttr("disabled");
  }
}

function DelNote() {
  model_lexer = new lexer();
  model_lexer.del_note($("#sourcecode").val());

  $("#Code").html("<pre><code id=\"SC\" class=\"language-clike\">" + model_lexer.code + "</code></pre>");
  Prism.highlightAll();

  if (model_lexer.code != "")
    $("#btn_lex").removeAttr("disabled");
}

function Analyser() {
  
  model_lexer.Analyser();

  $("#Code").html("<pre><code id=\"SC\" class=\"language-clike\">" + model_lexer.aim + "</code></pre>");
  Prism.highlightAll();

  if (model_lexer.aim != "Erros！")
    document.getElementById("btn_parser").disabled = false;
}