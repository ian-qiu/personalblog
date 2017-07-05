<?php

//pms_status常量
defined('API_STATUS_SUCCESS') OR define('API_STATUS_SUCCESS', 0); //成功
defined('API_STATUS_NO_PERMISSION') OR define('API_STATUS_NO_PERMISSION', -1); //无访问权限
defined('API_STATUS_LACK_PARAMS') OR define('API_STATUS_LACK_PARAMS', -2); //缺少必要参数
defined('API_STATUS_INVALID_PARAMS') OR define('API_STATUS_INVALID_PARAMS', -3); //无效参数
defined('API_STATUS_DB_EXCEPTION') OR define('API_STATUS_DB_EXCEPTION', -4); //数据库异常
defined('API_STATUS_INVALID_RESULT') OR define('API_STATUS_INVALID_RESULT', -5); //无有效结果
defined('API_STATUS_INVALID_PROCESS') OR define('API_STATUS_INVALID_PROCESS', -6); //非法操作流程
defined('API_STATUS_UPLOAD_EXCEPTION') OR define('API_STATUS_UPLOAD_EXCEPTION', -7); //上传失败
defined('API_STATUS_SERVICE_EXCEPTION') OR define('API_STATUS_SERVICE_EXCEPTION', -8); //服务异常
defined('API_STATUS_UNLOGIN_EXCEPTION') OR define('API_STATUS_UNLOGIN_EXCEPTION', -9); //帐号未登录
defined('API_STATUS_UNKNOW_EXCEPTION') OR define('API_STATUS_UNKNOW_EXCEPTION', -10); //未知异常
defined('API_STATUS_PARTIAL_SUCCESS') OR define('API_STATUS_PARTIAL_SUCCESS', -11); //部分成功（用于批量操作时）
defined('API_STATUS_REDIS_EXCEPTION') OR define('API_STATUS_REDIS_EXCEPTION', -12); //redis缓存异常
defined('API_STATUS_NO_RIGHT') OR define('API_STATUS_NO_RIGHT', -13); //权限系统鉴权失败(操作权限及公寓权限异常用此值)
defined('API_STATUS_INVALID_LOGIN_INFO') OR define('API_STATUS_INVALID_LOGIN_INFO', -14); //公寓切换导致的营业日或公寓id不匹配
defined('API_STATUS_LOGIN_ERROR') OR define('API_STATUS_LOGIN_ERROR', -101); //缺少必要参数

//用户系统错误码
defined('E_USER_OR_PASSWD_NOT_MATCH') OR define('E_USER_OR_PASSWD_NOT_MATCH', -400); //密码或用户不匹配
defined('E_USER_BINED') OR define('E_USER_BINED', -401); //帐号已被其他userId绑定
defined('E_USER_NOT_FOUND') OR define('E_USER_NOT_FOUND', -402); //没有这个用户
defined('E_SKEY_INVAILD') OR define('E_SKEY_INVAILD', -403); //无效的skey
defined('E_SKEY_EXPIRE') OR define('E_SKEY_EXPIRE', -404); //skey过期
defined('E_CREATE_USERID') OR define('E_CREATE_USERID', -405); //分配userId失败
defined('E_REGISTED') OR define('E_REGISTED', -406); //帐号已注册过
defined('E_MOBILE_NOT_MATCH') OR define('E_MOBILE_NOT_MATCH', -407); //手机号和用户的绑定的手机号不匹配
defined('E_BINDED_MOBILE') OR define('E_BINDED_MOBILE', -408); //已绑定手机
defined('E_BINDED_WX') OR define('E_BINDED_WX', -409); //微信帐号已被绑定
defined('E_BINDED_NAME') OR define('E_BINDED_NAME', -410); //已绑定了帐号名
defined('E_BINDED_EMAIL') OR define('E_BINDED_EMAIL', -411); //已绑定了邮箱
defined('E_WX_NOT_MAXTCH') OR define('E_WX_NOT_MAXTCH', -412); //微信帐号不匹配
defined('E_NOT_WX_AUTH') OR define('E_NOT_WX_AUTH', -413); //非微信授权登录
defined('E_OPENID_NOT_MATCH') OR define('E_OPENID_NOT_MATCH', -414); //openId不匹配
defined('E_CHANGE_SKEY') OR define('E_CHANGE_SKEY', -415); //迁移skey失败，需要重新登录
defined('E_CODE_NOT_MATCH') OR define('E_CODE_NOT_MATCH', -416); //验证码不匹配
defined('E_CODE_EXPIRE') OR define('E_CODE_EXPIRE', -417); //验证码已过期
defined('E_PARAM') OR define('E_PARAM', -418); //参数错误
defined('E_EMAIL_NOT_SET') OR define('E_EMAIL_NOT_SET', -419); //邮箱未设置
defined('E_TOKEN_USED') OR define('E_TOKEN_USED', -420); //token已被使用
defined('E_TOKEN_EXPIRE') OR define('E_TOKEN_EXPIRE', -421); //token已过期
defined('E_DEL_USER') OR define('E_DEL_USER', -422); //被删除用户
defined('E_EMAIL_SEND_FAILED') OR define('E_EMAIL_SEND_FAILED', -433); //连接邮件服务器失败