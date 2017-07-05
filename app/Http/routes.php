<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

//user
Route::get('/user/get_user_info', 'UserController@get_user_info');
Route::any('/user/login', 'UserController@login');
Route::post('/user/registe', 'UserController@registe');
Route::post('/user/check_username', 'UserController@check_username');

//article
Route::get('/article/get_article_list', 'ArticleController@get_article_list');
Route::post('article/add_article', 'ArticleController@add_article');
Route::match(['get', 'post'], 'article/get_article_by_id', 'ArticleController@get_article_by_id');

//tag
Route::post('article/new_tag', 'ArticleController@new_tag');
