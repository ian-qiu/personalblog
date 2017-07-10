<?php
namespace App\Helpers;

use App\Facades\UtilHelperFacade;
use App\Model\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Redis;

class UtilHelper
{
    /**
     * 数据返回
     * @param string $data
     * @param 状态码 $status
     * @param 提示信息 $msg
     * @param 扩展信息 $ext
     */
    function build_return($data = '', $status = 0, $msg = '', $ext = NULL)
    {
//    if(empty($msg)) {
//        $CI = &get_instance();
//        $pms_status = $CI->config->item('pms_status');
//        if(array_key_exists($status, $pms_status)) {
//            $msg = $pms_status[$status];
//        }
//    }
        $ret = array(
            'status' => $status,
            'msg' => $msg,
            'data' => $data
        );

        if ($ext) {
            $ret['ext'] = $ext;
        }
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($ret, JSON_UNESCAPED_UNICODE);
        exit(0);
    }


    /**
     * 输入验证(只支持POST请求中传递JSON对象的情况)
     * @param array $keys 参数key数组
     * @throws Exception
     */
    function requires_input(array $keys, $frm)
    {

        if (!is_array($keys)) {
            throw new Exception('第一个参数arr必须是数组！');
        }

        foreach ($keys as $index => $key) {
            if (!isset($frm[$key]) || is_null($frm[$key]) || $frm[$key] === '') {
                $this->build_return(NULL, API_STATUS_LACK_PARAMS, '缺失必要参数:' . $key);
            }
        }
        return $frm;
    }

    /*
     * 获取登录信息
     */
    public function get_login_info()
    {
        $rd_session = Cookie::get('username');
        $username = Redis::get($rd_session);

        $login_info = [];
        if (!empty($username)) {
            $login_info = User::get_by_username($username);
        }
        return $login_info;
    }

    function get_param_from_array($array, $key, $param = '', $default = '')
    {
        if (isset($array[$key])) {
            if ($param) {
                return $array[$key][$param];
            } else {
                return $array[$key];
            }
        } else {
            return $default;
        }
    }

}
