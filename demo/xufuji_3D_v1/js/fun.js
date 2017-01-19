function getFront(obj, distance) {
    distance = distance || -1;
    var matrix = new THREE.Matrix4();
    matrix.extractRotation(obj.matrix);

    var direction = new THREE.Vector3(0, 0, distance);
    direction.applyMatrix4(matrix);
    return direction;
}

function getUp(obj, distance) {
    distance = distance || 1;
    var matrix = new THREE.Matrix4();
    matrix.extractRotation(obj.matrix);

    var direction = new THREE.Vector3(0, distance, 0);
    direction.applyMatrix4(matrix);
    return direction;
}

function getJumpUpPosition(mesh) {
    var pos = mesh.position.clone().add(getUp(mesh, 10));
    return vectorToTweenPosition(pos);
}

function getJumpCameraPosition() {
    var pos = getFront(camera, -20);
    return vectorToTweenPosition(pos);
}

function getFlyUpPositionStep_1(camera, i) {
    var ray = new THREE.Ray(camera.position, new THREE.Vector3(0.1 * i, 0.2, -1).unproject(camera));
    var pos = ray.at(200);
    return vectorToTweenPosition(pos);
}

function getFlyUpPositionStep_2(camera, i) {
    var ray = new THREE.Ray(camera.position, new THREE.Vector3(0.9, 0.9, -1).unproject(camera));
    var pos = ray.at(10000);
    return vectorToTweenPosition(pos);
}

function vectorToTweenPosition(pos) {
    return {
        x: pos.x,
        y: pos.y,
        z: pos.z
    };
}

var targetFoundAnimation = function(mesh, camera, target_icon) {
    var jumpUpTime = 200;
    var jumpDownTime = 200;
    var jumpCameraTime = 400;
    var stayCameraTime = 3000;
    var flyUpTime = 400;
    var currentPosition = {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z
    };
    var currentOpacity = {
        opacity: 1
    };
    var jumpUpPosition = getJumpUpPosition(mesh);
    var originPosition = {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z
    };
    var jumpCameraPosition = getJumpCameraPosition();
    var flyUpPositionStep_1 = getFlyUpPositionStep_1(camera, mesh.target_date.index);
    var flyUpPositionStep_2 = getFlyUpPositionStep_2(camera, mesh.target_date.index);

    //jump to camera shift
    var currentShift = {
        y: 0
    };
    var firstShift = {
        y: 15
    };
    var secondShift = {
        y: 0
    };

    var jump_up_tween = new TWEEN.Tween(currentPosition)
        .to(jumpUpPosition, jumpUpTime)
        .onUpdate(function() {
            update();
        });
    var jump_down_tween = new TWEEN.Tween(currentPosition)
        .to(originPosition, jumpDownTime)
        .onUpdate(function() {
            update();
        });
    var jump_to_camera_tween = new TWEEN.Tween(currentPosition)
        .to(jumpCameraPosition, jumpCameraTime)
        .onUpdate(function() {
            update();
        });
    var jump_to_camera_first_shift_tween = new TWEEN.Tween(currentShift)
        .to(firstShift, jumpCameraTime * 0.5)
        .onUpdate(function() {
            update();
        });
    var jump_to_camera_second_shift_tween = new TWEEN.Tween(currentShift)
        .to(secondShift, jumpCameraTime * 0.5)
        .onUpdate(function() {
            update();
        });
    jump_to_camera_first_shift_tween.chain(jump_to_camera_second_shift_tween);
    var stay_camera_tween = new TWEEN.Tween(currentPosition)
        .to(currentPosition, stayCameraTime)
        .onUpdate(function() {
            update();
        });
    var fly_up_step_split = 0.7;
    var fly_up_step_1_tween = new TWEEN.Tween(currentPosition)
        .to(flyUpPositionStep_1, flyUpTime * fly_up_step_split)
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(function() {
            update();
        });
    var fly_up_step_2_tween = new TWEEN.Tween(currentPosition)
        .to(flyUpPositionStep_2, flyUpTime * (1 - fly_up_step_split))
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(function() {
            update();
        });
    var fly_up_step_2_opacity_tween = new TWEEN.Tween(currentOpacity)
        .to(0, flyUpTime / 2)
        .easing(TWEEN.Easing.Exponential.In)
        .onUpdate(function() {
            update();
        });
    jump_up_tween.chain(jump_down_tween);
    jump_down_tween.chain(jump_to_camera_tween);
    jump_to_camera_tween.chain(stay_camera_tween);
    stay_camera_tween.chain(fly_up_step_1_tween);
    fly_up_step_1_tween.chain(fly_up_step_2_tween);
    jump_to_camera_tween.onStart(function() {
        jump_to_camera_first_shift_tween.start();
    });
    fly_up_step_2_tween.onStart(function() {
        fly_up_step_2_opacity_tween.start();
    });
    var candyTexture = mesh.target_date.hide_textures;
    fly_up_step_2_tween.onComplete(function() {
        target_icon.material.opacity = 1;
        target_icon.material.map = candyTexture;
        target_icon.material.needUpdates =true;

        if(window.orientation == 90 || window.orientation == -90){
            document.getElementById("congratulate_page").style.transform = "rotateZ("+window.orientation+"deg)";
        }
        $("#congratulate_page").show();
        setTimeout(function(){$("#congratulate_page").hide();},1000);
    });
    this.start = function() {
        jump_up_tween.start();
    };
    var update = function() {
        mesh.position.set(currentPosition.x, currentPosition.y + currentShift.y, currentPosition.z);
        mesh.material.opacity = currentOpacity.opacity;
    };
};
