// buat close button & terapkan di tial list items
// fungsi dibawah mengambil elemen dengan tag name li. kemudian menambahkan elemen span sebagai tempat untuk menaruh close button
var myNodelist = document.getElementsByTagName("LI"); //inisiasi variabel dengan fungsi untuk mengambil elemen berdasarkan tag name "List Item" dari dokumen
var i;                                                //inisiasi i
for (i = 0; i < myNodelist.length; i++) {             //buat looping dimana i adalah 0, jika i kurang dari panjang array myNodeList, maka tambahkan i dengan 1
  var span = document.createElement("SPAN");          //inisiasi variabel dengan fungsi untuk membuat elemen SPAN
  var txt = document.createTextNode("\u00D7");        //inisiasi variabel dengan fungsi untuk membuat element text node tanda tutup / x | /u00D7 merupakan representasi unicode dari tanda tutup (x)
  span.className = "close";                           //beri variabel span dengan properti className close
  span.appendChild(txt);                              //tambahkan txt kedalam elemen span
  myNodelist[i].appendChild(span);                    //tambahkan elemen span kedalam child dari elemen myNodeList setiap iterai index dari myNodeList
}

// buat fungsi agar closs button dapat berfungsi untuk menutup list item
var close = document.getElementsByClassName("close");   //inisiasi variabel close dengan fungsi untuk mengambil elemen dari nama class close
var i;                                                  //inisiasi variabel i
for (i = 0; i < close.length; i++) {                    //buat perulangan untuk setiap kondisi close.lenght
  close[i].onclick = function () {                      //disini merupakan event handler dimana setiap index dari close di click maka akan mengaktifkan function()    |untuk event handler bisa dilihat di google
    var div = this.parentElement;                       //inisiasi div dengan fungsi untuk mengambil parent elemen dari elemen yang di klik, disini elemen yang diambil yaitu elemen span
    div.style.display = "none";                         //kemudian membuat elemen li disembunyikan dengan style display none
  };
}

//tambahkan simbol check ketika mengklik list item
var list = document.querySelector("ul");                //inisiasi list dengan fungsi untuk mengambil selector ul
list.addEventListener(
  "click",
  function (ev) {                                   //tambahkan event listener click ke list, kemudian tambahkan fungsi callback saat event terjadi, disini (ev) mewakili event
    if (ev.target.tagName === "LI") {               //buat kondisi jika event yang ditargetkan tagname merupakan LI
      ev.target.classList.toggle("checked");        //maka targetkan classList dengan tanda checked
    }
  }, false                                          //jika kondisi tidak terpenuhi false
); 

// buat list item baru & simpan dengan local storage ketika tombol add ditekan
function newElement() {                   //buat fungsi newElemen
  var li = document.createElement("li");  //inisiasi li dengan fungsi untuk membuat elemen li di dokumen
  var inputValue = document.getElementById("myInput").value;  //inisiasi variabel dengan fungsi mengambil elemen dengan id "myInput di dokumen. kemudian nilai tersebut diambil dengan .value"
  var t = document.createTextNode(inputValue);                //inisiasi variabel dengan fungsi untuk membuat text node dengan nilai dari variabel inputValue | value node text bisa dimasukkan kedalam html
  li.appendChild(t);                                          //menyisipkan nodeText milik variabel t kedalam variabel li

  if (inputValue === "") {                    //buat percabangan dengan kondisi jika inputValue berisi value kosong
    alert("You must add / write something");  //maka tambahkan alert / pemberitahuan
  } else {                  //sebaliknya
    document.getElementById("myUL").appendChild(li);  //ambil elemen dengan id "myUL" kemudian tambahkan variabel/elemen li sebagai child dari elemen dengan id myUL

    //simpan value ke local storage
    var todoValue = JSON.parse(localStorage.getItem("todoValue")) || [];
    todoValue.push(inputValue);
    localStorage.setItem("todoValue", JSON.stringify(todoValue));
  }
  document.getElementById("myInput").value = "";  //ambil elemen dengan id myInput. kemudian akses value,selanjutnya atur nilai value sebagai string kosong

  var span = document.createElement("SPAN");    //inisiasi span dengan fungsi untuk menambahkan elemen SPAN
  var txt = document.createTextNode("\u00D7");  //inisiasi txt dengan membuat textNode tanda tutup (x)
  span.className = "close";                     //mengatur properti dengan className span dengan close
  span.appendChild(txt);                        //tambahkan child nodeTxt (txt) kedalam elemen span
  li.appendChild(span);                         //tambahkan child elemen span kedalam parent li

  span.onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";

    //hapus dari local list item dari localStorage
    var todoValue = JSON.parse(localStorage.getItem("todoValue")) || [];
    var i = todoValue.indexOf(inputValue);
    if (i != -1) {
      todoValue.splice(i, 1);
      localStorage.setItem("todoValue", JSON.stringify(todoValue));
    }
  };
}

// muat ulang list item dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  var todoValue = JSON.parse(localStorage.getItem("todoValue")) || [];
  var ul = document.getElementById("myUL");
  todoValue.forEach(function (todo) {
    var li = document.createElement("li");
    var t = document.createTextNode(todo);
    li.appendChild(t);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    //tambah event listener untuk close button
    span.onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";

      //hapus dari localStorage
      var todoValue = JSON.parse(localStorage.getItem("todoValue")) || [];
      var i = todoValue.indexOf(todo);
      if (i !== -1) {
        todoValue.splice(i, 1);
        localStorage.setItem("todoValue", JSON.stringify(todoValue));
      }
    };

    ul.appendChild(li);
  });
});
