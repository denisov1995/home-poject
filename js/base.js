function SRV_RelianceGroup(){
 
    let post = getXmlHttp();

    if (post){
        var g = document.referrer.match(/(\w+)\.\w{2,3}\//);
        post.open('POST','https://sales.bemark.ru/service/refer.php',true);
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        post.send('d=' + (g === null ? '': g[1])); 
    }  

    /* Отключен таймер запроса проверки создания целей в метрике
    setInterval(function(){
        if (window.srv_counter == null) return;
        let xh = getXmlHttp();
        if (xh){
            xh.open('POST','https://sales.bemark.ru/service/goals.php',true);
            xh.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xh.send('yClid=' + get_yCid());
            xh.onreadystatechange = function(){
                if(xh.readyState == 4){
                    if(xh.status == 200){
                        let data = JSON.parse(xh.responseText);
                        data.forEach(function(goal){
                            try {
                                switch (goal){
                                    case 1:
                                        if (window.srv_g1 != null){
                                            try {
                                                ym(window.srv_counter,'reachGoal',window.srv_g1);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }   
                                    break;
                                    case 2:
                                        if (window.srv_g2 != null){
                                            try {
                                                ym(window.srv_counter,'reachGoal',window.srv_g2);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        } 
                                    break;
                                    case 3:
                                        if (window.srv_g3 != null){
                                            try {
                                                ym(window.srv_counter,'reachGoal',window.srv_g3);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        } 
                                    break;
                                }                                
                            } catch (error) {
                                console.log(error);
                            }
                        });
                    }                         
                }            
            }
        }
    },1000);
    */

    /**
     * send data
     * @returns XMLHttpRequest
     */
   function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') xmlhttp = new XMLHttpRequest();
        return xmlhttp;
    }

    /**
     * Создание лида в вашу CRM систему
     * @param {int} typeCRM
     * Тип CRM:
     * 1 - amoCRM
     * @param {string} caption
     * Наименование лида
     * @param {string} user_name 
     * Имя пользователя
     * @param {string} user_phone
     * Телефон пользователя 
     * @param {string} user_email 
     * E-mail пользователя
     * @param {string} description 
     * Примечание к созданию лида
     * @param {function} response 
     * Функция для обработки данных результата запроса 
     */
    function createLid(typeCRM,caption,user_name,user_phone,user_email,description,response){
        let post = getXmlHttp();
        if (post) {
            post.open('POST','https://sales.bemark.ru/service/amoCRM/createLid.php',true);
            post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            let dCount = description.indexOf('?');
            if (dCount > 0) description = description.substring(0,dCount);
            post.send('data=' + JSON.stringify({
                typeCRM: typeCRM,
                caption: caption,
                user_name: user_name,
                user_phone: user_phone,
                user_email: user_email,
                description: description,
                key: window.srv_key,
                yClid : get_yCid()
            }));
            post.onreadystatechange = function(){
                if (response) {
                    if(post.readyState == 4){
                        if(post.status == 200) response.call(this, post.responseText);
                        else response.call(this,JSON.stringify({error: 1, message: 'Запрос к серверу завершился ошибкой: status=' + post.status + ' - ' + post.statusText}));
                    } 
                }
            }
        }else {
            if (response) response.call(this,JSON.stringify({error: 1, message: 'Не удалось отправить запрос'}));
        }
    }

    function get_yCid(){
        try {
            return document.cookie.match(/_ym_uid=(\d+)/)[1];
        } catch (err) {
            return null;
        }
    }

    return Object.freeze({
        createLid:  createLid
    });
}

var srv_Reliance = SRV_RelianceGroup();

