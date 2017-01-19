var renderer, scene, camera, controls, effect, manager;

function initVR() {
    //Setup three.js WebGL renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    // Append the canvas element created by the renderer to document body element.
    document.body.appendChild(renderer.domElement);

    // Create a three.js scene.
    scene = new THREE.Scene();

    // Create a three.js camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    // Apply VR headset positional data to camera.
    controls = new THREE.VRControls(camera);

    // Apply VR stereo rendering to renderer.
    effect = new THREE.VREffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    // Create a VR manager helper to enter and exit VR mode.
    var params = {
        hideButton: true, // Default: false.
        isUndistorted: true // Default: false.
    };
    manager = new WebVRManager(renderer, effect, params);
}
initVR();

var isStart = false;
var start_countdown = 0;

var clock = new THREE.Clock();

var is_looking = false;
var is_fading_background = false;
var is_fadeout_white_sphere = false;
var fade_timer = 0;
var fade_time = 0.5;
var elements_index = 0;
var elements_background = [];
var elements_background_is_load = [];
var total_load_texture_count = 0;
var loaded_texture_count = 0;

function preLoadPanorama() {
    elements_background.push(loadPanoramaTexture("textures/360photos/3d_3216x1608.jpg"));
    // elements_background.push(loadPanoramaTexture("textures/360photos/nt-bg-02.jpg"));
    // elements_background.push(loadPanoramaTexture("textures/360photos/nt-bg-03.jpg"));
}
var target_in_elements = [];

function initTargets() {
    //element 01
    var target_in_element = [];
    var target = new Target();
    //element 01 target 01
    target.index = 0;
    target.position = new THREE.Vector3(-170, 25, -80);
    target.find_textures = loadTexture('textures/candy/a1.png');
    target.hide_textures = loadTexture('textures/candy/2.png');
    target_in_element.push(target);
    //element 01 target 02
    target = new Target();
    target.index = 1;
    target.position = new THREE.Vector3(175, 119, -15);
    target.find_textures = loadTexture('textures/candy/a2.png');
    target.hide_textures = loadTexture('textures/candy/2.png');
    target_in_element.push(target);
    //element 01 target 03
    target = new Target();
    target.index = 2;
    target.position = new THREE.Vector3(41, -150, -150);
    target.find_textures = loadTexture('textures/candy/a3.png');
    target.hide_textures = loadTexture('textures/candy/3.png');
    target_in_element.push(target);
    //element 01 target 04
    target = new Target();
    target.index = 3;
    target.position = new THREE.Vector3(135, -113, 90);
    target.find_textures = loadTexture('textures/candy/a4.png');
    target.hide_textures = loadTexture('textures/candy/4.png');
    target_in_element.push(target);
    target_in_elements.push(target_in_element);

    target = new Target();
    target.index = 4;
    target.position = new THREE.Vector3(175, -113, 90);
    target.find_textures = loadTexture('textures/candy/a5.png');
    target.hide_textures = loadTexture('textures/candy/5.png');
    target_in_element.push(target);
    target_in_elements.push(target_in_element);
    target = new Target();
    target.index = 5;
    target.position = new THREE.Vector3(205, -93, 20);
    target.find_textures = loadTexture('textures/candy/a6.png');
    target.hide_textures = loadTexture('textures/candy/6.png');
    target_in_element.push(target);
    target_in_elements.push(target_in_element);

    target = new Target();
    target.position = new THREE.Vector3(20, -450, -100);
    target.find_textures = loadTexture('textures/ninja/11.png');
    target.hide_textures = loadTexture('textures/ninja/22.png');
    target_in_element.push(target);
    target_in_elements.push(target_in_element);

    target = new Target();
    target.position = new THREE.Vector3(20, -400, -150);
    target.find_textures = loadTexture('textures/ninja/33.png');
    target.hide_textures = loadTexture('textures/ninja/44.png');
    target_in_element.push(target);
    target_in_elements.push(target_in_element);
}

var Global_mesh_1 = null;
var Global_target_1 = null;
var Global_mesh_2 = null;
var Global_target_2 = null;
function updateTargets() {
    var NJT_scale,geo;
    var target_in_element = target_in_elements[elements_index];
    for (var i = 0; i < target_in_element.length; i++) {
        if(i < 4){
            NJT_scale = 0.75;
            geo = new THREE.PlaneGeometry(18.8 * NJT_scale, 16 * NJT_scale, 1, 1);
        }else if(i < 6){
            NJT_scale = 0.35;
            geo = new THREE.PlaneGeometry(9.6 * NJT_scale, 16 * NJT_scale, 1, 1);
        }else{
            NJT_scale = 10;
            geo = new THREE.PlaneGeometry(20 * NJT_scale, 16 * NJT_scale, 1, 1);
        }
        var target = target_in_element[i];
        var target_mesh = targets[i];
        if (target_mesh) {
            target_mesh.material.map = target.hide_textures;
        } else {
            target_mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
                map: target.hide_textures,
                transparent: true,
                opacity: 1
            }));
            target_mesh.renderOrder = -1;
            scene.add(target_mesh);
            target.index!=undefined && hot_spot_raycaster_objects.push(target_mesh);
            targets.push(target_mesh);
        }

        if(i < 6){
            target_mesh.isFind = false;
        }else if(i==6){
            target_mesh.isFind = true;

            Global_mesh_1 = target_mesh;
            Global_target_1 = target;

        }else{
            target_mesh.isFind = true;

            Global_mesh_2 = target_mesh;
            Global_target_2 = target;
        }
        target_mesh.target_date = target;
        target_mesh.material.opacity = 1;
        target_mesh.position.copy(target.position);
        target_mesh.scale.set(1, 1, 1);
        target_mesh.lookAt(camera.position);

        target_mesh.foundAnimation = new targetFoundAnimation(target_mesh, camera, targets_icon[target_mesh.target_date.index]);
    }
    //Global_mesh_1.position.set(50,130,220);
    //Global_mesh_1.rotation.set(-2.9050015,0.088147589,3.1203704);
    Global_mesh_1.position.set(-374,130,74);
    Global_mesh_1.rotation.set(3.03226577,1.2940122,-2.992477);
    //Global_mesh_2.position.set(-284,-32,170);
    //Global_mesh_2.rotation.set(-3.1230311,0.8470734,2.784597);
    Global_mesh_2.position.set(-192,-32,-313);
    Global_mesh_2.rotation.set(-0.8359311,1.1623857,0.4649231);

    targets[4].position.set(205, -93, 20);
    targets[3].position.set(164,12,38);
    targets[3].rotation.set(2.5478948,-0.82939,-1.5957137);
    targets[5].position.set(107,12,200);
    targets[5].rotation.set(-2.95372,-0.314302,3.131771);
    targets[0].position.set(229,-5,-188);
    targets[0].rotation.set(-0.11451,-0.884362,-0.90299);
    targets[1].position.set(-145,-43,-174);
    targets[1].rotation.set(-0.191153,0.405743,-0.4715632);
    targets[2].position.set(-8,-4,-240);
    targets[2].rotation.set(-0.006998,-0.041470,-0.353447);
    resetTargetIcon();
}

var delta_time = 0;
var player_search_time = 0;

var hot_spot_raycaster = new THREE.Raycaster();
var hot_spot_raycaster_coords = new THREE.Vector2();
var hot_spot_raycaster_objects = [];
var hot_spot_timer = 0;
var lookingFocusTime = 1;

var panorama_sphere, fade_sphere, hot_spot_mesh;

var targets = [];
var targets_icon = [];
var looking_target;
var player_can_search = false;

var font, text_mesh;
var fade_sphere_max_opacity = 1;
var isVR = false;
var is_first = true;

function selected_vr(img) {
    // img.src = 'textures/page001/button-vr-clicked.png';
    // isVR = true;
    // if (is_first) {
    //     showHowToPlay();
    // } else {
    //     start_vr();
    // }
    // SiteMonitorButton('selected-vr', 1);
}

function selected_panorama(img) {
    img.src = 'textures/page001/button-360-clicked.png';
    // isVR = false;
    if (is_first) {
        showHowToPlay();
    } else {
        start_panorama();
    }
    // SiteMonitorButton('selected-panorama', 1);
}


function start_vr() {
    setTimeout(function() {
        manager.onVRClick_();
        start();
    }, 500);
}

function start_panorama() {
    setTimeout(function() {
        $('.logo_img').css({'visibility' : 'hidden'});
        $("#deviceOption").hide();
        start();
    }, 20);
}

function showHowToPlay() {
    $('.logo_img').css({'visibility' : 'hidden'});
    document.getElementById('tutorial-page').style.visibility = 'visible';
    document.getElementById('start-button').style.visibility = 'hidden';
    document.getElementById('start-page').style.visibility = "hidden";
    // document.getElementById('button-vr').src = 'textures/page001/button-vr.png';
    document.getElementById('button-360').src = 'textures/page001/button-360.png';
}

//回到上一层
//1 首页
//2 红包
var state = "2";
function backBefore(){

    if(state == "1"){
        $("#rank-page").css({"visibility":"hidden"});
        $('.phbContent').css({'visibility':'hidden'});

    }else if(state == "2"){
        $("#rank-page").css({"visibility":"hidden"});
        $('.phbContent').css({'visibility':'hidden'});
        $('.logo_img').css({"visibility":"hidden"});
        $("#redPacket_page").show();
    }
}

function checkHowToPlay(which) {
    $("#deviceOption").hide();
    is_first = false;
    // if (isVR) {
    //     start_vr();
    // } else {
    //     start_panorama();
    //     console.log('开始了这个模式的游戏');
    // }
    start_panorama();
    console.log('开始了这个模式的游戏');
    document.getElementById('tutorial-page').style.visibility = 'hidden';
    document.getElementById('rank-page').style.visibility = 'hidden';
    $("#redPacket_page").hide();
    $('.phbContent').css({'visibility' : 'hidden'});
    // SiteMonitorButton('Confirm how to play', 1);



    if(which == 2){
        document.getElementById('start-button').style.visibility = 'hidden';
        document.getElementById('start-page').style.visibility = "hidden";
        playAgain();
    }
}

function hideInvite() {
    document.getElementById('end-page-invite-bt').src = "textures/page003/invite-2.png";
    document.getElementById('invite').style.visibility = 'hidden';
    // SiteMonitorButton('Hide Invite', 1);
}

function showInvite() {
    document.getElementById('invite').style.visibility = 'visible';
    document.getElementById('end-page-invite-bt').src = 'textures/page003/invite-clicked-2.png';
    // SiteMonitorButton('Show Invite', 1);
}


//排行榜
function hideRank() {
    document.getElementById('rank-page').style.visibility = 'hidden';
    // SiteMonitorButton('Hide Rank', 1);
}

function showRank(even,stateC) {
    state = stateC;
    rankGet();

    $('.logo_img').css({'zIndex' : 10});    
    $('.logo_img').css({"visibility":"visible"});
    document.getElementById('rank-page').style.visibility = 'visible';
    myscroll2.refresh();
    // SiteMonitorButton('Show Rank', 1);
}
var button_playAgain_clicked = new Image();
button_playAgain_clicked.src = 'textures/page003/button-playAgain-clicked-2.png';
var button_vr_clicked = new Image();
button_vr_clicked.src = 'textures/page001/button-vr-clicked.png';
var button_360_clicked = new Image();
button_360_clicked.src = 'textures/page001/button-360-clicked.png';
var button_invite_clicked = new Image();
button_invite_clicked.src = 'textures/page003/invite-clicked-2.png';

function playAgain(){
    isStart = false;
    player_search_time = 0;
    elements_index = 0;
    for(var i=0;i<targets_icon.length;i++){
        targets_icon[i].material.map = targets_icon[i].userData.defaultIcon;
        targets_icon[i].material.needUpdates =true;
    }
    refreshPlayerSearchTime();
}
function replay(img) {
    //img.src = 'textures/page003/button-playAgain-clicked-2.png';

    setTimeout(function() {
        playAgain();
        //document.getElementById('button-vr').src = 'textures/page001/button-vr.png';
        document.getElementById('button-360').src = 'textures/page001/button-360.png';
        document.getElementById('start-button').style.visibility = 'visible';
        document.getElementById("start-page").style.visibility = "visible";
        $('.logo_img').css({'visibility' : 'visible'});
        document.getElementById("redPacket_page").style.visibility = "hidden";
        document.getElementById("end-page-1").style.visibility = "hidden";
        // document.getElementById("end-page-rank-bt1").style.visibility = "hidden";
        //img.src = 'textures/page003/button-playAgain-2.png';
    }, 20);
    // SiteMonitorButton('Replay', 1);
}
function shareFriend(){
    $("#share_page").show();
}

function start() {
    updateElement();
    isStart = true;
    document.getElementById('start-button').style.visibility = 'hidden';
    document.getElementById("start-page").style.visibility = "hidden";
    // document.getElementById('button-vr').src = 'textures/page001/button-vr.png';
    document.getElementById('button-360').src = 'textures/page001/button-360.png';
    scene.add(fade_sphere);
    fade_sphere.material.opacity = fade_sphere_max_opacity;
    is_fadeout_white_sphere = true;
    is_fading_background = true;
    fade_timer = 0;
}

function init() {
    disableRankWhenNotWeChat();
    createCountdownTimerMesh();
    //createCountdownLevelTextMesh();
    //创建时间
    createTimerMesh();
    initTargets();
    initTargetsIcon();
    panorama_sphere = createPanoramaSphere();
    fade_sphere = createFadeSphere();
    hot_spot_mesh = createHotSpot();


    //播放背景音乐
     var _vedio = document.getElementById('background-music');
     _vedio.src = "audios/bass.mp3";
     _vedio.play();
      _vedio.loop = true;

     $("body").click(function(event){
         event.preventDefault();
     });
}

function initTargetsIcon() {
    //right top
    targets_root = new THREE.Object3D();
    createTargetIcon('textures/page002/njt_icon_red.png', new THREE.Vector3(-0.15, 0, -1),1);
    createTargetIcon('textures/page002/njt_icon_purple.png', new THREE.Vector3(-0.4, 0, -1),1);
    createTargetIcon('textures/page002/njt_icon_orange.png', new THREE.Vector3(-0.65, 0, -1),1);
    createTargetIcon('textures/page002/njt_icon_blue.png', new THREE.Vector3(-0.9, 0, -1),1);
    createTargetIcon('textures/page002/njt_icon_add1.png', new THREE.Vector3(-0.45, -0.3, -1),2);
    createTargetIcon('textures/page002/njt_icon_add2.png', new THREE.Vector3(-0.15, -0.3, -1),2);
    //createLevelText();
    camera.add(targets_root);
    updateTargetIconPosition();
}
var targets_root = new THREE.Object3D();
var level_text_root, level_text_array = [];

function createLevelText() {
    for (var i = 1; i <= 3; i++) {
        var tex = loadTexture('textures/page002/level_text_' + i + '.png');
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.616, 0.2, 1, 1), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 1
        }));
        mesh.renderOrder = -1;
        level_text_array.push(mesh);
    }
    var pos = new THREE.Vector3(-0.2, -0.15, -1);

    level_text_root = new THREE.Object3D();
    level_text_root.position.copy(pos);
    level_text_array.forEach(function(mesh) {
        mesh.position.copy(pos);
    });
    targets_root.add(level_text_root);
}

function createTargetIcon(tex_url, pos,ratio) {
    //0.57->0.255,0.88->
    var geometry;
    if(ratio == 1){
        geometry = new THREE.PlaneGeometry(0.322, 0.275, 1, 1);//0.44
    }else{
        geometry = new THREE.PlaneGeometry(0.162, 0.275, 1, 1);
    }

    var icon = loadTexture(tex_url);
    var target_icon_mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        map: icon,
        transparent: true,
        opacity: 1
    }));
    target_icon_mesh.renderOrder = -1;

    var target_root = new THREE.Object3D();
    target_root.position.copy(pos);
    target_icon_mesh.position.copy(pos);
    target_root.add(target_icon_mesh);
    targets_root.add(target_root);

    target_icon_mesh.position.copy(pos);
    target_icon_mesh.userData.defaultIcon = icon;
    targets_icon.push(target_icon_mesh);
}

function updateTargetIconPosition() {
    var coordinate = isVR ? new THREE.Vector3(0.7, 1.5, -1) : new THREE.Vector3(1.4, 1.5, -1);
    var ray_dis = 32;
    var ray = new THREE.Ray(camera.position, coordinate.unproject(camera));
    var pos = camera.worldToLocal(ray.at(ray_dis));
    targets_root.position.copy(pos);
}

function resetTargetIcon() {
    for (var i = 0; i < targets_icon.length; i++) {
        targets_icon[i].material.opacity = 0.5;
    }
}
var units_mesh_array = [];
var tens_mesh_array = [];
var hundreds_mesh_array = [];
var thousand_mesh_array = [];
var decimal_place_mesh_array = [];
var second_decimal_place_mesh_array = [];
var timer_mesh_root, point_root, units_root, tens_root, hundreds_root,
    decimal_place_root, second_decimal_place_root;

function createTimerMesh() {
    for (var i = 0; i <= 9; i++) {
        var tex = loadTexture('textures/page002/number/' + i + '.png');
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.255, 1, 1), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 1
        }));
        mesh.renderOrder = -1;
        units_mesh_array.push(mesh);
        tens_mesh_array.push(mesh.clone());
        hundreds_mesh_array.push(mesh.clone());
        thousand_mesh_array.push(mesh.clone());
        // decimal_place_mesh_array.push(mesh.clone());
        // second_decimal_place_mesh_array.push(mesh.clone());
    }
    //point mesh
    var point_mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.255, 1, 1), new THREE.MeshBasicMaterial({
        map: loadTexture('textures/page002/number/point.png'),
        transparent: true,
        opacity: 1
    }));
    point_mesh.renderOrder = -1;
    timer_mesh_root = new THREE.Object3D();
    timer_mesh_root.position.copy(new THREE.Vector3(0, 0, -1));

    //point position
    var pos = new THREE.Vector3(0.5, -0.1, -1);
    point_root = new THREE.Object3D();
    point_root.position.copy(pos);
    point_mesh.position.copy(pos);
    point_root.add(point_mesh);
    timer_mesh_root.add(point_root);

    //units position
    pos = new THREE.Vector3(0.67, -0.1, -1);
    units_root = new THREE.Object3D();
    units_root.position.copy(pos);
    units_mesh_array.forEach(function(mesh) {
        mesh.position.copy(pos);
    });
    units_root.add(units_mesh_array[0]);
    timer_mesh_root.add(units_root);

    //tens position
    pos = new THREE.Vector3(0.57, -0.1, -1);
    tens_root = new THREE.Object3D();
    tens_root.position.copy(pos);
    tens_mesh_array.forEach(function(mesh) {
        mesh.position.copy(pos);
    });
    tens_root.add(tens_mesh_array[0]);
    timer_mesh_root.add(tens_root);

    //hundreds position
    pos = new THREE.Vector3(0.41, -0.1, -1);
    hundreds_root = new THREE.Object3D();
    hundreds_root.position.copy(pos);
    hundreds_mesh_array.forEach(function(mesh) {
        mesh.position.copy(pos);
    });
    hundreds_root.add(hundreds_mesh_array[0]);
    timer_mesh_root.add(hundreds_root);

    //thousand position
    pos = new THREE.Vector3(0.3, -0.1, -1);
    thousand_root = new THREE.Object3D();
    thousand_root.position.copy(pos);
    thousand_mesh_array.forEach(function(mesh) {
        mesh.position.copy(pos);
    });
    thousand_root.add(thousand_mesh_array[0]);
    timer_mesh_root.add(thousand_root);

    //decimal_place position
    // pos = new THREE.Vector3(0.4, -0.1, -1);
    // decimal_place_root = new THREE.Object3D();
    // decimal_place_root.position.copy(pos);
    // decimal_place_mesh_array.forEach(function(mesh) {
    //     mesh.position.copy(pos);
    // });
    // decimal_place_root.add(decimal_place_mesh_array[0]);
    // timer_mesh_root.add(decimal_place_root);

    //second_decimal_place position
    // pos = new THREE.Vector3(0.5, -0.1, -1);
    // second_decimal_place_root = new THREE.Object3D();
    // second_decimal_place_root.position.copy(pos);
    // second_decimal_place_mesh_array.forEach(function(mesh) {
    //     mesh.position.copy(pos);
    // });
    // second_decimal_place_root.add(second_decimal_place_mesh_array[0]);
    // timer_mesh_root.add(second_decimal_place_root);

    //秒
    //sec mesh
    // var sec_mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.255, 0.255, 1, 1), new THREE.MeshBasicMaterial({
    //     map: loadTexture('textures/page002/second.png'),
    //     transparent: true,
    //     opacity: 1
    // }));
    // sec_mesh.renderOrder = -1;
    //秒

    //sec position
    pos = new THREE.Vector3(0.62, -0.1, -1);
    var sce_root = new THREE.Object3D();
    sce_root.position.copy(pos);
    //秒
    // sec_mesh.position.copy(pos);
    // sce_root.add(sec_mesh);
    //秒
    timer_mesh_root.add(sce_root);

    camera.add(timer_mesh_root);
    updateTimerMeshPosition();
    refreshPlayerSearchTime();
}

function updateTimerMeshPosition() {
    var coordinate = isVR ? new THREE.Vector3(-0.7, 1.6, -1) : new THREE.Vector3(-1.4, 1.6, -1);
    var ray_dis = 32;
    var ray = new THREE.Ray(camera.position, coordinate.unproject(camera));
    var pos = camera.worldToLocal(ray.at(ray_dis));
    timer_mesh_root.position.copy(pos);
}

function formatFloat(num, pos) {
    var size = Math.pow(10, pos);
    return Math.round(num * size) / size;
}


//更新时间
function refreshPlayerSearchTime() {
    var units = Math.floor(player_search_time) % 10;
    units_root.remove(units_root.children[0]);
    units_root.add(units_mesh_array[units]);

    var tens = Math.floor(player_search_time / 10) % 6;
    tens_root.remove(tens_root.children[0]);
    tens_root.add(tens_mesh_array[tens]);

    var hundreds = Math.floor(player_search_time / 60) % 10;
    hundreds_root.remove(hundreds_root.children[0]);
    hundreds_root.add(hundreds_mesh_array[hundreds]);

    var thousands = Math.floor(player_search_time / 3600) % 10;
    thousand_root.remove(thousand_root.children[0]);
    thousand_root.add(thousand_mesh_array[thousands]);

    // var decimal_place = Math.floor(player_search_time * 10) % 10;
    // decimal_place_root.remove(decimal_place_root.children[0]);
    // decimal_place_root.add(decimal_place_mesh_array[decimal_place]);

    // var second_decimal_place = Math.round(player_search_time * 100) % 10;
    // second_decimal_place_root.remove(second_decimal_place_root.children[0]);
    // second_decimal_place_root.add(second_decimal_place_mesh_array[second_decimal_place]);
}
var countdown_root, countdown_mesh_array = [];

function createCountdownTimerMesh() {
    for (var i = 0; i <= 3; i++) {
        var tex = loadTexture('textures/page002/countN/' + i + '.jpg');
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 3.2, 1, 1), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 1
        }));
        mesh.renderOrder = 11;
        countdown_mesh_array.push(mesh);
    }
    var pos = new THREE.Vector3(0, 0, -0.1);
    countdown_root = new THREE.Object3D();
    countdown_root.position.copy(pos);
    countdown_mesh_array.forEach(function(mesh) {
        var scale = 0.1;
        mesh.position.copy(pos);
        mesh.scale.set(scale, scale, scale);
    });
    camera.add(countdown_root);
}

function refreshCountdownTime() {
    var units = Math.ceil(start_countdown) % 10;
    countdown_root.remove(countdown_root.children[0]);
    if (units == 0) {
        hideCountdownTime()
    } else if (countdown_mesh_array[units]) {
        countdown_root.add(countdown_mesh_array[units]);
    }
}

function hideCountdownTime() {
    $("#deviceOption").show();
    setTimeout(function(){$("#deviceOption").remove();},5000);
    if (countdown_root.children[0])
        countdown_root.remove(countdown_root.children[0]);
}
var countdown_level_text_root, countdown_level_text_array = [];

function createCountdownLevelTextMesh() {
    for (var i = 1; i <= 3; i++) {
        var tex = loadTexture('textures/page002/level_text_' + i + '.png');
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.666, 0.216, 1, 1), new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 1
        }));
        countdown_level_text_array.push(mesh);
    }
    var pos = new THREE.Vector3(0, 0.03, -0.1);
    countdown_level_text_root = new THREE.Object3D();
    countdown_level_text_root.position.copy(pos);
    countdown_level_text_array.forEach(function(mesh) {
        var scale = 0.1;
        mesh.position.copy(pos);
        mesh.scale.set(scale, scale, scale);
    });
    camera.add(countdown_level_text_root);
}

function createPanoramaSphere() {
    var panorama_sphere = new THREE.Mesh(new THREE.SphereGeometry(500, 80, 50), new THREE.MeshBasicMaterial({
        //TODO
        map: elements_background[0]
    }));
    panorama_sphere.scale.x = -1;
    scene.add(panorama_sphere);

    return panorama_sphere;
}

function createFadeSphere() {
    var fade_sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 80, 50), new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: fade_sphere_max_opacity
    }));
    fade_sphere.renderOrder = -1;
    fade_sphere.scale.x = -1;
    // scene.add(fade_sphere);
    return fade_sphere;
}

function getCameraFront(dis) {
    return getFront(camera, dis);
}

function createHotSpot() {
    var hot_spot_mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3, 1, 1), new THREE.MeshBasicMaterial({
        map: loadTexture("textures/cursor.png"),
        transparent: true,
        opacity: 1
    }));
    hot_spot_mesh.renderOrder = -1;
    hot_spot_mesh.position.copy(getCameraFront(-2));
    hot_spot_mesh.lookAt(camera.position);
    scene.add(camera);
    camera.add(hot_spot_mesh);
    return hot_spot_mesh;
}

var tick = 0;
var flag = false;
function sprAnimate(){
    requestAnimationFrame(sprAnimate);
    tick++;
    if (isStart) {
        if(tick % 30 == 0){
            if(!flag){
                flag = true;
                Global_mesh_1.material.map = Global_target_1.find_textures;
                Global_mesh_2.material.map = Global_target_2.find_textures;
            }else{
                flag = false;
                Global_mesh_1.material.map = Global_target_1.hide_textures;
                Global_mesh_2.material.map = Global_target_2.hide_textures; 
            }
        }
    }
}
// Request animation frame loop function
var load_progress = 0;

function animate(timestamp) {
    requestAnimationFrame(animate);
    delta_time = clock.getDelta();
    delta_time = Math.min(delta_time, 0.05);
    TWEEN.update();
    controls.update();
    if (!isStart) {
        //var progress = formatFloat(loaded_panorama_texture_count / (total_panorama_texture_count), 2);
        load_progress += delta_time;
        load_progress = formatFloat(load_progress, 2);
        //load_progress = Math.min(load_progress, progress);
        if(load_progress < 1 && load_progress >0.2){
            var process = formatFloat(load_progress * 83, 0) + "%";
            $(".loading-line-bg-1").css("width",process);
            $(".progress-text").html(formatFloat(load_progress * 100, 0) + "%");
        }
        if(load_progress < 1 && load_progress >0.15){
            var process = formatFloat(load_progress * 73, 0) + "%";
            $(".loading-cow").css("left",process);
            //document.getElementById("progress").innerHTML = "" + formatFloat(load_progress * 100, 0) + "%";
        }
        if(load_progress < 1 && load_progress >0.05){
            var process = formatFloat(load_progress * 58, 0) + "%";
            $(".loading-cow-1").css("left",process);
            //document.getElementById("progress").innerHTML = "" + formatFloat(load_progress * 100, 0) + "%";
        }
        return;
    }

    // Render the scene through the manager.
    manager.render(scene, camera, timestamp);

    if (is_fading_background)
        fadingBackground();

    if (start_countdown > 0) {
        start_countdown -= delta_time;
        refreshCountdownTime();
        return;
    } else {
        //hideCountdownTime();
    }
    // Update VR headset position and apply to camera.
    controls.update();


    if (player_can_search)
        updateHotSpot();

    if (player_can_search) {
        //时间不短累加
        player_search_time += delta_time;

        refreshPlayerSearchTime();
    }
}

function isAllTargetFind() {
    var is_finish = true;
    for (var i = 0; i < targets.length; i++) {
        is_finish &= targets[i].isFind;
    }
    return is_finish;
}

function updateHotSpot() {
    hot_spot_raycaster.setFromCamera(hot_spot_raycaster_coords, camera);
    var intersects = hot_spot_raycaster.intersectObjects(hot_spot_raycaster_objects);
    if (intersects.length > 0) {
        if (is_looking && (looking_target == intersects[0].object)) {
            hot_spot_timer += delta_time;
            if (hot_spot_timer >= lookingFocusTime) {
                if (!looking_target.isFind) {
                    targetFound();
                }
            }
        } else if (!intersects[0].object.isFind) {
            setLooking(intersects[0].object);
        }
    } else {
        clearLooking();
    }
    var pro = Math.min(1, hot_spot_timer / lookingFocusTime);
    hot_spot_mesh.scale.set(1, 1, 1).multiplyScalar(1 - pro);
}

function targetFound() {
    var horizontals = [
        -1.2451,-0.484362,-0.90299,
        0.01318526,0.611675,-0.0196028,
        -0.1538233,0.15701824,0.02454494,
        4.6878948,-1.82939,-1.5957137,
        0,0,0,
        -2.95372,-0.314302,3.131771
    ];
    var idx = looking_target.target_date.index;
    var x = horizontals[3*idx];
    var y = horizontals[3*idx+1];
    var z = horizontals[3*idx+2];
    if(x!=0){
        looking_target.rotation.set(x,y,z);
        if(idx==2) looking_target.scale.y=0.4;
    }
    looking_target.isFind = true;
    looking_target.material.opacity = 1;
    looking_target.material.map = looking_target.target_date.find_textures;
    looking_target.geometry.verticesNeedUpdate = true;
    looking_target.foundAnimation = new targetFoundAnimation(looking_target, camera, targets_icon[looking_target.target_date.index]);
    looking_target.foundAnimation.start();

    clearLooking();
    if (isAllTargetFind()) {
        nextScreen();
    }
}

function con(){
    //var w = 9,h = 2.328;
    //arr[0].set(-w,h,0);
    //arr[1].set(w,h,0);
    //arr[2].set(-w,-h,0);
    //arr[3].set(w,-h,0);
}

function setLooking(target) {
    is_looking = true;
    looking_target = target;
    hot_spot_timer = 0;
}

function clearLooking() {
    is_looking = false;
    looking_target = undefined;
    hot_spot_timer = 0;
}

function nextScreen() {
    player_can_search = false;
    setTimeout(function() {
        //level_text_root.remove(level_text_array[elements_index]);
        //elements_index++;
        end();
        return;
        //下面两行代码屏蔽23关
        if (elements_index < elements_background.length) {
            changeBackground();
        } else {
            end();
        }
    }, 2000);
}

function disableRankWhenNotWeChat() {
    if (!isCorrectWeChatOpenID()) {
        $("#ending-text-1").remove();
        $("#ending-text-2").remove();
        $("#ending-text-3").remove();
        $("#ending-text-4").css('font-size', '20px').css('line-height', '250%');
        $("#ending-text-5").remove();
        $("#ending-text-6").css('padding-right', '20%')
            .html('恭喜你成功找到全部的东西！');
    }
}

function end() {
    isVR = false;
    $("#deviceOption").hide();
    manager.onBackClick_();
    document.getElementById("end-page").style.visibility = "visible";
    $("#end-page").show();
    //        document.getElementById("ending-img").src = wechat_head_img_url;

    var best_score = formatFloat(player_search_time, 2);
    // $(".challenge-success").html("好腻害！挑战用时：<br>"+best_score+"秒；当前排名第1<br>浓99红包已为你包好<br>赶紧抽选吧");
    $(".challenge-success").html("好腻害！挑战用时：<br>"+best_score+"秒！<br>"+"当前排名第1！<br>浓99红包已为你包好<br>赶紧挑选一个吧！");

    //if (isCorrectWeChatOpenID())
    //    document.getElementById("end-text-name").innerHTML = "" + wechat_nickname;

    rankPatch(best_score * best_score_mut);
}

function changeBackground() {
    scene.add(fade_sphere);
    is_fading_background = true;
    fade_timer = 0;
}
var is_countdown = false;

function fadingBackground() {
    fade_timer += delta_time;
    var opacity = fade_timer / fade_time;
    if (is_fadeout_white_sphere) {
        //fade out fade sphere
        if (opacity < fade_sphere_max_opacity) {
            opacity = Math.min(fade_sphere_max_opacity, opacity);
            fade_sphere.material.opacity = fade_sphere_max_opacity - opacity;
            if (opacity > fade_sphere_max_opacity * 0.5 && !is_countdown) {
                is_countdown = true;
                start_countdown = 3;
            }
        } else {
            fade_sphere.material.opacity = 0;
            is_fadeout_white_sphere = false;
            is_fading_background = false;
            fade_timer = 0;
            player_can_search = true;
            //countdown_level_text_root.remove(countdown_level_text_array[elements_index]);
            scene.remove(fade_sphere);
        }
    } else {
        if (opacity < fade_sphere_max_opacity) {
            opacity = Math.min(fade_sphere_max_opacity, opacity);
            fade_sphere.material.opacity = opacity;
        } else {
            fade_sphere.material.opacity = fade_sphere_max_opacity;
            is_fadeout_white_sphere = true;
            fade_timer = 0;

            updateElement();
        }
    }
}

function updateElement() {
    is_countdown = false;
    panorama_sphere.material.map = elements_background[elements_index];
    //countdown_level_text_root.add(countdown_level_text_array[elements_index]);
    //level_text_root.add(level_text_array[elements_index]);
    updateTargets();
}

function waitWechat() {
    if (wechat_ready) {
        init();
        // Kick off animation loop
        animate();
        sprAnimate();
    } else {
        requestAnimationFrame(waitWechat);
    }
}
waitWechat();
window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

function onResize(e) {
    effect.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    updateTargetIconPosition();
    updateTimerMeshPosition();
}