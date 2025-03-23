// 変数の初期化
//変数は初期化しなくてもエラーが起きることはないが、一般的に初期化する
//複数人で作業するときに、他の人が見たときにこの変数にまだ何も入れていないと示すことができる
let untyped = '';　//span要素の中身
let typed = '';　　//span要素の中身
let score = 0;　//スコアは最初は0

//必要な要素の取得
//「untyped」というidを持つspan要素を取り出して「untypedfield」という名前をつける。
const untypedfield = document.getElementById('untyped');
//「typed」というidをもつspan要素を取り出して「typedfield」という名前をつける。
const typedfield = document.getElementById('typed');
//「wrap」というidをもつdiv要素を取り出して「wrap」という名前をつけるる。
const wrap = document.getElementById('wrap');
//「start」というidをもつbottan要素を取り出して「start」という名前を付ける
const start = document.getElementById('start');
//「count」というidをもつp要素を取り出して「count」という名前を付ける
const count = document.getElementById('count');
//kadai_001
const letter = document.getElementById('letter');


const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
  ];

//「createText」という関数では、
//randomはなぜ変数→処理の中で何度もrandomの中身が変わるから
  const createText = () => {
// 正タイプした文字列をクリア（最初は何も起こらない、２回目から作用）
 　 typed = '';
  　typedfield.textContent = typed;
//配列のインデックスのなかからランダムな数字をピックアップ
    let random = Math.floor(Math.random() * textLists.length);
//「untyped」という変数に、配列のなかからランダムに選ばれたインデックスをもつ要素を代入し、
    untyped = textLists[random];
//「untypedfield」の中身のテキストを、「untyped」にする
    untypedfield.textContent = untyped;
  };

// キー入力の判定
//「keyPress」という関数では、イベントが発生したときに
const keyPress = e => {
// 誤タイプの場合
//もし、押されたキーと文字列の１文字目が異なる場合は
   if(e.key !== untyped.substring(0, 1)) {
//「wrap」のクラスリストに「mistyped」を追加する
    wrap.classList.add('mistyped');
// 100ms後に背景色を元に戻す
      setTimeout(() => {
        wrap.classList.remove('mistyped');
      }, 100);
//処理を終了（return）する。returnの後に書いたコードは処理されない。
    return;
  }

// スコアのインクリメント（正タイプ時のみ作動）
score++;
//kadai_001
letter.textContent = score;
//「typed」の中身を、すでにある「typed」とuntypedの一文字目にする
    typed += untyped.substring(0, 1);
//「untyped」の中身を、untypedの２文字目以降にする（「typed」は変数なので、再代入できる）
  untyped = untyped.substring(1);
//「typedfield」の中身のテキストを「typed」にする
  typedfield.textContent = typed;
//「untypedfield」の中身のテキストを「untyped」にする
  untypedfield.textContent = untyped;
// テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
  };


// タイピングスキルのランクを判定
//rankCheckという関数では…
const rankCheck = score => {
    // テキストを格納する変数を作る
    let text = '';
 
    // スコアに応じて異なるメッセージを変数textに格納する\nは改行コード
    if(score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
    } else if(score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
    } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます!`;    
    }
   
    // 生成したメッセージと一緒に文字列を返す
    //`&{変数名}`と記述することで、文字列内に変数を埋め込むことができる。
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`; 
    };
  
  

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

   // OKボタンをクリックされたらリロードする
   if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
//「timer」」という関数では1000ミリ秒間隔で次の処理をします次の処理をします
const timer = () => {
// タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;
//「id」というのはsetIntervalの戻り値です
  const id = setInterval(() => {
//timeは1ずつ減る
    time--;
//countのテキストはtime
    count.textContent = time;
// カウントが0になったら、clearInterval()メソッドにidが渡され、タイマーが止まる
    if(time <= 0) {
    
//kadai_002
    typed = '';
    typedfield.textContent = typed;
    untypedfield.textContent = 'タイムアップ!';

     setTimeout(() => {
     gameOver(id);
     }, 10);  
    }
  }, 1000);
};


// ゲームスタート時の処理
//「start」をクリックしたら…
start.addEventListener('click', () => {
//タイマーを開始する
  timer();
// ランダムなテキストを表示する
  createText();
// 「スタート」ボタンを非表示にする
  start.style.display = 'none';
// キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';