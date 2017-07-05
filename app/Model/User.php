<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected  $table = 't_user_0';
    public $timestamps = false;
    protected $guarded = [];
    protected $primaryKey = 'user_id';

    public static function get_by_username($username)
    {
        return User::where('name', $username)->get()->toArray();
    }
}
