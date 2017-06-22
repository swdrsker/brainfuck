window.onload = function() {
    // ASCII文字。制御文字は単なる文字列で代用
    var chars   = [
  	'<NUL>','<SOH>','<STX>','<ETX>','<EOT>','<ENQ>','<ACK>','<BEL>',
  	'<BS>' ,'<HT>' ,'<LF>' ,'<VT>' ,'<NP>' ,'<CR>' ,'<SO>' ,'<SI>' ,
  	'<DLE>','<DC1>','<DC2>','<DC3>','<DC4>','<NAK>','<SYN>','<ETB>',
  	'<CAN>','<EM>' ,'<SUB>','<ESC>','<FS>' ,'<GS>' ,'<RS>' ,'<US>' ,
  	' ', '!', '"', '#', '$', '%', '&', '\'',
  	'(', ')', '*', '+', ',', '-', '.', '/',
  	'0', '1', '2', '3', '4', '5', '6', '7',
  	'8', '9', ':', ';', '<', '=', '>', '?',
  	'@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
  	'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  	'P', 'Q', 'L', 'S', 'T', 'U', 'V', 'W',
  	'X', 'Y', 'Z', '[', '\\' ,']', '^', '_',
  	'`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
  	'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  	'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
  	'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
    ];

    var pointer = 0;  // ポインタ。メモリのインデックス
    var memory  = []; // メモリに見せかけた単なる配列

    var braces      = []; // 括弧の対応
    var brace_stack = []; // 括弧の対応チェック用

    var input  = document.getElementById('input');  // 入力欄
    var output = document.getElementById('output'); // 出力欄

    // メモリを初期化
    var release = function() {
    	for(var i = 0; i < 256; ++i) {
    	    memory[i] = 0;
    	}
    	pointer     = 0;
    	braces      = [];
    	brace_stack = [];
    };

    // 入力を括弧の対応を取って配列に格納
    var check_brace = function(input) {
    	for(var i=0; i<input.length; i+=2) {
    	  var command = input[i] + input[i+1];

      	  if(command == 'クズ') {
      		    var j = i;
          		while(true) {
          		    if(input.length <= j) {
          			       throw 'invalid brace pare';
          		    }
          		    if(input[j] + input[j+1] == 'クズ') {
          			       brace_stack.push(1);
          		    }
          		    else if(input[j] + input[j+1] == 'クソ') {
          			       brace_stack.pop();
          		    }
          		    if(brace_stack.length == 0) {
          			       break;
          		    }
          		    j += 2;
          		}
      		braces[i - 0] = j - 0;
      		braces[j - 0] = i - 0;
    	    }
    	}
    };

    // 入力を評価
    var eval_input = function(input) {
    	var output = '';

    	for(var i = 0; i < input.length; i+=2) {
    	    var command = input[i] + input[i+1];
    	    switch(command) {
    	    case 'バカ': pointer++; break;
    	    case 'ボケ': pointer--; break;
    	    case '死ね': memory[pointer]++; break;
    	    case '殺す': memory[pointer]--; break;
    	    case 'カス': output += chars[memory[pointer]]; break;
    	    case 'クズ': memory[pointer] == 0 && (i = braces[i] + 1); break;
    	    case 'クソ': memory[pointer] != 0 && (i = braces[i]); break;
    	    }

    	    if(pointer < 0 || memory.length <= pointer) {
    		      throw 'pointer out of range (' + pointer + ')';
    	    }
    	}

    	return output;
    };

    // 開始
    document.getElementById('exec').addEventListener('click', function() {
    	try {
    	    check_brace(input.value);
    	    output.value = eval_input(input.value);
    	} catch(e) {
    	    output.value = e;
    	}
	     release();
    }, false);

    release();
};
