// Dinamik olan alanlarda kullanacağımız tüm html nesnelerini tanımlıyoruz.
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const stop_btn = document.querySelector(".stop_btn");
const back_btn = document.querySelector(".back_btn");

// Testi başlat butonuna tıklanıldığında
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //bilgi alanını göster

    // back_btn gizle
    back_btn.classList.remove("show");

    
}

// Testi bitir butonuna tıklanıldığında
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //bilgi alanını gizle
    // index html sayfasına dön ama önce sor

    if(confirm("Testi Bitirmek İstiyor musunuz?")){
        window.location.href = "../index.html";
    }

    else{
        info_box.classList.add("activeInfo"); //bilgi alanını göster
    }

            
}

// Teste devam et butonuna tıklanıldığında
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //bilgi alanını gizle
    quiz_box.classList.add("activeQuiz"); //soru çerçevesini yükle
    showQuetions(0); //soruları yazdıracak fonksiyonu çağırıyoruz
    queCounter(1); // 1.soruyu yazdırıyoruz
    startTimer(15); // zaman sayacını başlatıyoruz
    startTimerLine(0); // süre ilerlemesini başlatıyoruz
}


let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


// stop butonuna tıklandığında
stop_btn.onclick = ()=>{
    

    // stop_btn.classList.add("show"); //Durdur butonunu göster


     if(confirm("Test Durdurulsun mu?")){
         clearInterval(counter);
         clearInterval(counterLine);
         startTimer(timeValue);
         startTimerLine(widthValue);
        
         // soru ekranını gizle
            quiz_box.classList.remove("activeQuiz");
            // sonuç ekranını göster
            result_box.classList.add("activeResult");
            // sonuç ekranının içerisindeki sonuçları yazdır
            result_box.querySelector(".complete_text").textContent = "Test Durduruldu";
            result_box.querySelector(".score_text").textContent = "Skorunuz: " + userScore;
            result_box.querySelector(".score_text").style.color = "red";
            result_box.querySelector(".score_text").style.fontSize = "20px";
            result_box.querySelector(".score_text").style.fontWeight = "bold";
            result_box.querySelector(".score_text").style.marginTop = "20px";
            result_box.querySelector(".score_text").style.marginBottom = "20px";
            result_box.querySelector(".score_texte").style.textAlign = "center";
            result_box.querySelector(".score_text").style.fontFamily = "Arial";

            

     }else{

        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);






    

     }



    

}




// Teste Yeniden Başlat butonuna tıklanıldığında
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // Soru çerçevesini yükle
    result_box.classList.remove("activeResult"); //Sonuç alanını gizle
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // soruları yazdıracak fonksiyonu çağırıyoruz
    queCounter(que_numb); // soru sırasını yazdıracak fonksiyonu çağırıyoruz
    clearInterval(counter); // soru sırası takibini temizle
    clearInterval(counterLine); // zaman  takibini temizle
    startTimer(timeValue); // zaman sayacını başlatıyoruz
    startTimerLine(widthValue); // süre ilerlemesini başlatıyoruz
    timeText.textContent = "Kalan Süre"; //Süre kısmında default yazan değeri değiştiriyoruz.
    next_btn.classList.remove("show"); //İlerle butonunu gizle
    stop_btn.classList.remove("show"); //Durdur butonunu gizle
}

// Testi bitir butonuna tıklanıldığında
quit_quiz.onclick = ()=>{
    window.location.reload(); // geçerli sayfayı yenileyoruz
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// sonraki soru butonuna tıklandığında
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // soru sayısı toplam soru sayısından az ise
        que_count++; // sıra sayısını 1 artırıyoruz
        que_numb++; // soru sırasını 1 artırıyoruz
        showQuetions(que_count); //soruları yazdıracak fonksiyonu çağırıyoruz
        queCounter(que_numb); // soru sırasını yazdıracak fonksiyonu çağırıyoruz
        clearInterval(counter); // soru sırası takibini temizle
        clearInterval(counterLine); // zaman  takibini temizle
        startTimer(timeValue); // zaman sayacını başlatıyoruz
        startTimerLine(widthValue); // süre ilerlemesini başlatıyoruz
        timeText.textContent = "Kalan Süre"; //Süre kısmında default yazan değeri değiştiriyoruz.
        next_btn.classList.remove("show"); // İlerle butonunu gizle
    }else{
        clearInterval(counter); // soru sırası takibini temizle
        clearInterval(counterLine); // zaman  takibini temizle
        showResult(); // sonuç alanını gösteriyoruz
    }
}

// Soruları ve seçenekleri yazdırıyoruz
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // yeni bir div ve span oluşturuyoruz
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // sıra sayısına göre soru yazdırıyoruz
    option_list.innerHTML = option_tag; // seçenekleri yazdırıyoruz
    
    const option = option_list.querySelectorAll(".option");

    // tıklama fonksiyonunu hepsine ayarlıyoruz
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// İkon ve simgeler için yeni div açıyoruz
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// kullanıcı bir seçeği seçtiğinde
function optionSelected(answer){
    clearInterval(counter); // soru sırası takibini temizle
    clearInterval(counterLine); // zaman  takibini temizle
    let userAns = answer.textContent; // kullanıcının seçtiği seçenek
    let correcAns = questions[que_count].answer; // sorunun doğru cevabı
    const allOptions = option_list.children.length; // tüm seçeneklerin sayısı
    
    if(userAns == correcAns){ // kullanıcının seçimi doğru seçime eşitse
        userScore += 1; // kullanıcının skor sayısını 1 artırıyoruz
        answer.classList.add("correct"); // doğru alanın arkasını yeşil yapıyoruz
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Tik işareti atıyoruz
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); // Yanlış seçeğin arkasını kırmızı yapıyoruz
        answer.insertAdjacentHTML("beforeend", crossIconTag); // İkon işareti atıyoruz
        console.log("Yanlış Cevap");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // doğru cevabının seçeneği buluyoruz 
                option_list.children[i].setAttribute("class", "option correct"); // doğru cevabının seçeneği yeşil yapıyoruz
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Tik işareti atıyoruz
                console.log("Otomatik Olarak Doğru Cevabı Seçiyorum.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // seçenekleri pasif yapıyoruz
    }
    next_btn.classList.add("show"); // İlerle butonunu gösteriyoruz
    stop_btn.classList.add("show"); // Durdur butonunu gösteriyoruz
}

function showResult(){
    info_box.classList.remove("activeInfo"); // info boxının aktif olmasını kaldırıyoruz
    quiz_box.classList.remove("activeQuiz"); // quiz boxının aktif olmasını kaldırıyoruz
    result_box.classList.add("activeResult"); // sonuç boxının aktif olmasını sağlıyoruz
    const scoreText = result_box.querySelector(".score_text");
 
    // kullanıcının skorunu  çözdüğü toplam soru sayısını ve yanlış sayısını yazıyoruz
    scoreText.textContent = "Skorunuz = " + userScore + " / " + questions.length + "Geçen Süre = " + timeTest;
}
    

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // zamanın yazdırılmasını sağlıyoruz
        time--; // zamanın 1 saniye azaltılmasını sağlıyoruz
        if(time < 9){ // zamanın 9 saniye kadar ise
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; // zamanının 0'ının önüne ekleyip yazdırıyoruz
        }
        if(time < 0){ // zamanın 0'dan küçükse
            clearInterval(counter); // zamanının süresini temizle
            timeText.textContent = "Zaman Doldu"; // zamanının yazdırılmasını sağlıyoruz
            const allOptions = option_list.children.length; // tüm seçeneklerin sayısı
            let correcAns = questions[que_count].answer; // sorunun doğru cevabı
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ // doğru cevabının seçeneği buluyoruz
                    option_list.children[i].setAttribute("class", "option correct"); // doğru cevabının seçeneği yeşil yapıyoruz
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //  Tick işareti atıyoruz
                    console.log("Time Off: Otomatik Olarak Doğru Cevabı Seçiyorum.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // seçenekleri pasif yapıyoruz
            }
            next_btn.classList.add("show"); // İlerle butonunu gösteriyoruz
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //   zamanın 1 saniye azaltılmasını sağlıyoruz
        time_line.style.width = time + "px"; // zamanının yazdırılmasını sağlıyoruz
        if(time > 549){ //  zamanın 549 saniye kadar ise
            clearInterval(counterLine); // zamanının süresini temizle
        }
    }
}

function queCounter(index){
    //  soru sayacının yazdırılmasını sağlıyoruz
    let totalQueCounTag = '<span><p>'+ index +'</p> - <p>'+ questions.length +'</p> Soru</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // sonuç boxının içinde yazdırıyoruz
}