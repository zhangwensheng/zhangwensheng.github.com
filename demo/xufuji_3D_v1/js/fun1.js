var Target = function() {
    this.index = 0;
    this.position = new THREE.Vector3();
    this.find_textures = new THREE.Texture();
    this.hide_textures = new THREE.Texture();
};

var textureLoader = new THREE.TextureLoader();

function loadTexture(url) {
    total_load_texture_count++;
    return textureLoader.load(url,
        function() {
            loaded_texture_count++;
            if (total_load_texture_count == loaded_texture_count) {
                setTimeout(function() {
                    preLoadPanorama();
                }, 1000);
            }
        }, null,
        function() {
            loadTexture(url);
        }
    );
}
var total_panorama_texture_count = 0,
    loaded_panorama_texture_count = 0;

function loadPanoramaTexture(url, index) {
    total_panorama_texture_count++;
    return textureLoader.load(url,
        function(tex) {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(1, 1);

            loaded_panorama_texture_count++;
            if (total_panorama_texture_count == loaded_panorama_texture_count) {
                //                        loadBackgroundMusic();
                showStartButton();
                pageActivityInfoShow2();
            }
        }, null,
        function() {
            loadPanoramaTexture(url, index);
        }
    );
}

function showStartButton() {
    $("#loading-page").css({'visibility' : 'hidden'});
    // $(".rulePage").css({'visibility' : 'visible'});
    $("#start-page").css({'visibility' : 'visible'});
    $('#loading').css({'visibility' : 'hidden'});
    $('#start-button').css({'visibility' : 'visible'});
    $('.logo_img').css({'visibility' : 'visible'});
    
    $('#beginPage').attr({'src' : 'textures/page001/index-bg.jpg'});

    //第二次进入
    if(1){
        // $("#redPacket_page").show();
        // $("#end-page-rank-bt1").attr({'src' : 'textures/red_packet/getRedbag1.png'});
        //  $("#gotNow").attr({'src' : 'textures/red_packet/button5.png'});

        //  getNowUrl = 'http://www.baidu.com';
        // $("#end-page-rank-bt2").remove();
    }
}

function playGifShow(){
    $(".playPage").css({"visibility":"visible"});
}

function hiddenPlayShow(){
    $(".playPage").css({"visibility":"hidden"});
}
//微信初始化
// document.addEventListener("WeixinJSBridgeReady", function() {
    // var audio = document.getElementById('background-music');
    //construct(app_id, component_appid, request_url, jsApiList, share_timeline_data, share_app_data);
    //audio.play();
// }, false);
