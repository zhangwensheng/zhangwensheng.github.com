var tableE = document.getElementById("rank-table");

function removeRankTableData() {
    $('#rank-table').find('tr').remove();
}
var rank_data = [];
var current_rank_page_index = 0;
var next_rank_page_index = 0;
var last_rank_page_index = 0;
var current_rank_page_count = 0;

function createRankTableData(data) {
    if (data && data.user) {
        document.getElementById("rank-text-rank").innerHTML = '' + data.user.rank;
    }

    if (data && data.users) {
        rank_data = data.users;
        var height = $('#rank-table').height();
        current_rank_page_count = Math.floor(height / 50);
        current_rank_page_index = 0;
        next_rank_page_index = current_rank_page_index + current_rank_page_count;
        page_number = 1;
        updatePageNumber();
        total_page_number = Math.ceil(rank_data.length / current_rank_page_count);
        // document.getElementById("rank-text-total-page").innerHTML = '' + total_page_number;
        $('#page-number').height($('#next_Rank_Page').height() / 2);
        for (var i = current_rank_page_index; i < next_rank_page_index; i++) {
            console.log('dafsdf')
            if (i < rank_data.length){
                createRankRow(rank_data[i], i);
                console.log('1')
            }else{    
                createRankRow({}, i);
                console.log('2')
            }
        }
    }
}
var button_next_page_clicked = new Image();
button_next_page_clicked.src = 'textures/page003/page_right_clicked.png';
var button_last_page_clicked = new Image();
button_last_page_clicked.src = 'textures/page003/page_left_clicked.png';
var page_number = 1;
var total_page_number = 10;

function nextRankPage() {
    if (current_rank_page_index >= (rank_data.length - current_rank_page_count))
        return;
    removeRankTableData();
    last_rank_page_index = current_rank_page_index;
    current_rank_page_index = next_rank_page_index;
    next_rank_page_index = current_rank_page_index + current_rank_page_count;
    for (var i = current_rank_page_index; i < next_rank_page_index; i++) {
        if (i < rank_data.length)
            createRankRow(rank_data[i], i);
        else
            createRankRow({}, i);
    }
    page_number++;
    updatePageNumber();
    document.getElementById("next_Rank_Page").src = "textures/page003/page_right_clicked.png";
    setTimeout(function() {
        document.getElementById("next_Rank_Page").src = "textures/page003/page_right.png";
    }, 500);
}

function updatePageNumber() {
    // document.getElementById("rank-text-current-page").innerHTML = '' + page_number;
}

function lastRankPage() {
    if (current_rank_page_index == 0)
        return;
    removeRankTableData();
    next_rank_page_index = current_rank_page_index;
    current_rank_page_index = last_rank_page_index;
    last_rank_page_index = current_rank_page_index - current_rank_page_count;
    for (var i = current_rank_page_index; i < next_rank_page_index; i++) {
        if (i < rank_data.length)
            createRankRow(rank_data[i], i);
        else
            createRankRow({}, i);
    }
    page_number--;
    updatePageNumber();
    document.getElementById("last_Rank_Page").src = "textures/page003/page_left_clicked.png";
    setTimeout(function() {
        document.getElementById("last_Rank_Page").src = "textures/page003/page_left.png";
    }, 500);
}

function createRankRow(user, i) {
    console.log('here')
    //        var head_img_url = user.headimgurl || 'textures/page003/default_head_img.png';
    //        var headImg = $(document.createElement('img')).attr('src', head_img_url).attr('width', 64).attr('height', 64).attr('class', 'head-icon');
    var rank = user.rank || (i + 1);
    rank = (rank > rank_data.length) ? '' : rank;
    var user_best_score = (user.best_score || 0) / best_score_mut;
    user_best_score = (rank > rank_data.length || user_best_score == 0) ? '' : user_best_score;
    var nickname = user.nickname || '';
    nickname = (rank > rank_data.length) ? '' : nickname;
    $('.phbContent').append(
        $('<tr>').height('40px').width('100%')
        .append($('<td>').attr('height', 20).width('20%').attr('align', 'center').attr('valign', 'middle').html(rank))
        // .append($('<td>').attr('height', 64).attr('width', 64).attr('align', 'center').attr('valign', 'middle').append(headImg))
        .append($('<td>').attr('height', 20).width('60%').attr('align', 'left').attr('valign', 'middle').attr('class', 'rank-table-td').html(nickname))
        .append($('<td>').attr('height', 20).width('20%').attr('align', 'left').attr('valign', 'middle').css('padding-left', '10px').css('float', 'left').html(user_best_score))
    );
}
var best_score_mut = 1000;


var Rank_Data = {
    end : "2016-08-25T00:00:00.000+08:00",
    game_start : true,
    gaming : false,
    now : "2016-09-21T08:45:14.774+08:00",
    start : "2016-08-09T00:00:00.000+08:00",
    user : null,
    users : [
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        },
        {
            user_score : 88888,
            headimgurl : 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
            nick_id : 'test_id'
        }
    ]
}
//获取排行榜数据所需链接
// var pizza_hut_url = 'http://c2.pizzahut.com.cn/';
function rankGet() {
    //        if (!isCorrectWeChatOpenID())
    //            return;
    // var url = pizza_hut_url + "api/users?openid=" + wechat_openid;
    // $.ajax({
    //         type: "GET",
    //         url: url,
    //         headers: {
    //             Authorization: "PizzaHutTurtle-Token api_key=1:areyouwantplayninjaturtle?\\n"
    //         },
    //         dataType: "json"
    // })
    // .done(function(data) {
    //     console.log(data);
    //     removeRankTableData();
    //     createRankTableData(data);
    // })
    // .fail(function() {
    //     console.warn("Rank get error");
    // });

    // removeRankTableData();
    // createRankTableData(Rank_Data);

    creatRankList(Rank_Data.users);

}

function creatRankList(data){
    var _html = '';
    for(var i = 0;i < data.length; i++){
        _html += '<li>';
        _html +=     '<span>'+(i+1)+'</span>';
        _html +=     '<span>';
        _html +=         '<img src='+data[i].headimgurl+' class="headImg">';
        _html +=     '</span>';
        _html +=     '<span> ID：'+data[i].nick_id+'</span>';
        _html +=     '<span>score：'+data[i].user_score+'分</span>';
        _html += '</li>';
    }

    $('.phbContent').css("visibility","visible");
    $('.phbContent ul').append(_html);
}

function rankPatch(best_score) {
    if (!isCorrectWeChatOpenID())
        return;
    var url = pizza_hut_url + "api/users/" + wechat_openid + "?data[nickname]=" + wechat_nickname + "&data[headimgurl]=" + wechat_head_img_url + "&data[best_score]=" + best_score;
    $.ajax({
            type: "PATCH",
            url: url,
            headers: {
                Authorization: "PizzaHutTurtle-Token api_key=1:areyouwantplayninjaturtle?\\n"
            },
            dataType: "json"
        })
        .done(function(data) {
            log(data);
            var user_best_score = (data.user.best_score || 0) / best_score_mut;
            document.getElementById("end-text-rank").innerHTML = "" + data.user.rank;
            document.getElementById("end-text-best-score").innerHTML = "" + user_best_score;
        })
        .fail(function() {
            console.warn("Rank patch error");
        });
}