<?php

namespace App\Http\Controllers;

use App\Facades\UtilHelperFacade;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;


class UserController extends Controller
{
    private $shack = 0;

    public function get_user_info()
    {
        $callback_url = Config::get('api_config.callback_url');
        $rd_session = Cookie::get('username');
        if (empty($rd_session)) {
            redirect($callback_url);
        } else {
            $username = Redis::get($rd_session);
            if (empty($username)) {
                redirect($callback_url);
            } else {
                $user_info = User::get_by_username($username);
                UtilHelperFacade:build_return($user_info);
            }
        }
    }

    /*
     * 用户是否登录
     */
    public function test()
    {
        return crypt(sha1(12345678), 1234568);
    }


    /*
     * 用户登录
     */
    public function login(Request $request)
    {
        $input = UtilHelperFacade::requires_input(array('username', 'password'), $request->input());
        $username = $input['username'];
        $password = $input['password'];

        $user_info = User::get_by_username($username);
        if (empty($user_info)) {
            UtilHelperFacade::build_return('无用户', API_STATUS_INVALID_PARAMS);
        } else {
            if (md5($password) == md5($user_info->password)) {
                $rd_session = $this->create_rd_session();
                Cookie::make($rd_session, $username);
                Redis::set($rd_session, $username);
                //登录状态保持两个小时
                Redis::expire($rd_session, 7200);
                UtilHelperFacade::build_return();
            }
        }
    }

    /*
     * 注册用户
     */
    public function registe(Request $request)
    {
        $input = UtilHelperFacade::requires_input(array('username', 'password'), $request->input());
        $username = $input['username'];
        $password = $input['password'];

        $user_info = User::get_by_username($username);

        $salt = $this->create_rd_session();
        if (empty($user_info)) {
            if (!empty($password)) {
                $res = DB::table('t_user_0')->insert(['name' => $username, 'password' => crypt(sha1($password), $salt),
                    'salt' => $salt, 'created_at' => date('Y-m-d H:i:s')
                ]);
                UtilHelperFacade::build_return($res, '注册成功');
            }
        }
        UtilHelperFacade::build_return('', API_STATUS_INVALID_PARAMS, '注册失败');
    }

    /*
     * 生成rd_session
     */
    private function create_rd_session($length = 16)
    {
        exec('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 168', $rd_session);
        $rd_session = substr(trim($rd_session[0]), 0, $length);
        if (empty($rd_session)) {
            $this->create_rd_session();
            $this->shack += 1;
            if ($this->shack > 3) {
                UtilHelperFacade::build_return('网络波动,创建rd_session失败', API_STATUS_INVALID_PARAMS);
            }
        }
        return $rd_session;
    }

    /*
     * 用户名是否注册
     */
    public function check_username(Request $request)
    {
        $input = $request->input();

        $user = User::get_by_username($input);
        if (!empty($user)) {
            UtilHelperFacade::build_return('', API_STATUS_INVALID_PARAMS, '用户名重复');
        }
        UtilHelperFacade::build_return();
    }
}
